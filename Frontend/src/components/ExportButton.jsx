import { Download, Printer } from 'lucide-react'
import { generateCSV, downloadCSV, printData } from '../utils/exportUtils'

export default function ExportButton({ customerDetails, orders }) {
  if (!customerDetails || !orders) return null

  const handleExportCSV = () => {
    const csv = generateCSV({ customerDetails, orders })
    downloadCSV(csv, `${customerDetails.customerId}-data.csv`)
  }

  const handlePrint = () => {
    printData(customerDetails, orders)
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExportCSV}
        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <Download className="w-4 h-4" />
        <span>Export CSV</span>
      </button>
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>
    </div>
  )
}
