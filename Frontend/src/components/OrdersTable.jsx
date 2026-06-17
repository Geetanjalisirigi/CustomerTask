import { useState } from 'react'
import { ArrowUpDown, Download, ChevronUp, ChevronDown } from 'lucide-react'
import { generateCSV, downloadCSV, sortData } from '../utils/export'

export default function OrdersTable({ orders, customer }) {
  const [sortKey, setSortKey] = useState('orderId')
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'amount' ? 'desc' : 'asc')
    }
  }

  const sorted = sortData(orders, sortKey, sortDir)

  const handleExportCSV = () => {
    // Full CSV with customer details + all orders
    const headers = [
      'Customer ID', 'Name', 'Email', 'Mobile', 'City',
      'Membership', 'Preferred Channel', 'Total Amount',
      'Order ID', 'Order Amount',
    ]
    const rows = sorted.map((o) => [
      customer.customerId, customer.name, customer.email, customer.mobile, customer.city,
      customer.membership, customer.preferredChannel, customer.totalOrderAmount.toLocaleString('en-IN'),
      o.orderId, o.amount.toLocaleString('en-IN'),
    ])
    downloadCSV(generateCSV(headers, rows), `customer-${customer.customerId}-orders.csv`)
  }


  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3.5 h-3.5 text-primary" />
      : <ChevronDown className="w-3.5 h-3.5 text-primary" />
  }

  const columns = [
    ['orderId', 'Order ID'],
    ['amount', 'Amount'],
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-border mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold text-foreground">Order History</h3>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-all text-sm shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="text-left py-3 px-3 text-text-muted font-medium cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {label} <SortIcon col={key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((order) => (
              <tr key={order.orderId} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs">{order.orderId}</td>
                <td className="py-3 px-3 font-semibold">₹{order.amount.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
