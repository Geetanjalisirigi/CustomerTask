export const generateCSV = (headers, rows) => {
  let csv = headers.map((h) => `"${h}"`).join(',') + '\n'
  rows.forEach((row) => {
    csv += row.map((cell) => `"${cell}"`).join(',') + '\n'
  })
  return csv
}

export const downloadCSV = (csv, fileName = 'export.csv') => {
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

export const printData = (title, headers, rows) => {
  const printWindow = window.open('', '_blank')
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        h1 { margin: 0; color: #2563eb; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f5f5f5; font-weight: bold; color: #333; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <p style="margin: 0; color: #666; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      <table>
        <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
      <div class="footer"><p>Customer Data Consolidation Dashboard</p></div>
    </body>
    </html>
  `
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.print()
}

export const sortData = (data, key, direction) => {
  return [...data].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal === null || aVal === undefined) return 1
    if (bVal === null || bVal === undefined) return -1

    let comparison = 0
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal
    } else {
      comparison = String(aVal).localeCompare(String(bVal))
    }
    return direction === 'asc' ? comparison : -comparison
  })
}

export const filterData = (data, query, fields) => {
  if (!query.trim()) return data
  const lowerQuery = query.toLowerCase()
  return data.filter((item) =>
    fields.some((field) => {
      const val = item[field]
      return val !== null && val !== undefined && String(val).toLowerCase().includes(lowerQuery)
    })
  )
}
