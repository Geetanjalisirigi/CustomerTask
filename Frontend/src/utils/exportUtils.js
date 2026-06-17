export const generateCSV = (data) => {
  const { customerDetails, orders } = data
  
  const headers = ['Customer ID', 'Name', 'Email', 'Mobile', 'City', 'Membership', 'Preferred Channel', 'Total Orders', 'Total Amount']
  const customerRow = [
    customerDetails.customerId,
    customerDetails.name,
    customerDetails.email,
    customerDetails.mobile,
    customerDetails.city,
    customerDetails.membership,
    customerDetails.preferredChannel,
    orders.length,
    `₹${customerDetails.totalOrderAmount.toFixed(2)}`
  ]
  
  let csv = headers.join(',') + '\n'
  csv += customerRow.map(cell => `"${cell}"`).join(',') + '\n\n'
  
  csv += 'ORDER DETAILS\n'
  csv += ['Order ID', 'Amount'].join(',') + '\n'
  orders.forEach(order => {
    csv += [order.orderId, `₹${order.amount.toFixed(2)}`].map(cell => `"${cell}"`).join(',') + '\n'
  })
  
  return csv
}

export const downloadCSV = (csv, fileName = 'customer-data.csv') => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const printData = (customerDetails, orders) => {
  const printWindow = window.open('', '_blank')
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Customer Profile - ${customerDetails.name}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { border-bottom: 2px solid #0066cc; padding-bottom: 20px; margin-bottom: 30px; }
        h1 { margin: 0; color: #0066cc; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #0066cc; font-size: 18px; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .info-item { }
        .info-label { font-weight: bold; color: #666; font-size: 12px; }
        .info-value { font-size: 14px; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f5f5f5; font-weight: bold; color: #333; }
        .total { font-weight: bold; background-color: #f9f9f9; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Customer Profile</h1>
        <p style="margin: 0; color: #666; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="section">
        <h2>Customer Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Customer ID</div>
            <div class="info-value">${customerDetails.customerId}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Full Name</div>
            <div class="info-value">${customerDetails.name}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">${customerDetails.email}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Mobile</div>
            <div class="info-value">${customerDetails.mobile}</div>
          </div>
          <div class="info-item">
            <div class="info-label">City</div>
            <div class="info-value">${customerDetails.city}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Membership</div>
            <div class="info-value">${customerDetails.membership}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Preferred Channel</div>
            <div class="info-value">${customerDetails.preferredChannel}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Total Amount Spent</div>
            <div class="info-value" style="color: #0066cc; font-weight: bold;">₹${customerDetails.totalOrderAmount.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Order History (${orders.length} orders)</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(order => `
              <tr>
                <td>${order.orderId}</td>
                <td style="text-align: right; font-weight: bold;">₹${order.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr class="total">
              <td>Total</td>
              <td style="text-align: right;">₹${orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>This is an automated report. Please verify the information before use.</p>
      </div>
    </body>
    </html>
  `
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.print()
}
