import { useState, useEffect } from 'react'
import {
  Users, Search, Download, Printer, ArrowUpDown,
  ChevronUp, ChevronDown, Filter, Crown, MapPin, Mail, Phone, BarChart3,
} from 'lucide-react'
import { customerApi } from '../services/customerApi'
import { generateCSV, downloadCSV, printData, sortData, filterData } from '../utils/export'

export default function AllCustomers({ onNavigateDashboard }) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortKey, setSortKey] = useState('totalOrderAmount')
  const [sortDir, setSortDir] = useState('desc')
  const [membershipFilter, setMembershipFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerApi.getAllCustomers()
        setCustomers(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load customers.')
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  const cities = [...new Set(customers.map((c) => c.city))].sort()
  const memberships = [...new Set(customers.map((c) => c.membership))].sort()

  let filtered = filterData(customers, searchQuery, ['customerId', 'name', 'email', 'mobile', 'city'])
  if (membershipFilter !== 'all') {
    filtered = filtered.filter((c) => c.membership === membershipFilter)
  }
  if (cityFilter !== 'all') {
    filtered = filtered.filter((c) => c.city === cityFilter)
  }
  const sorted = sortData(filtered, sortKey, sortDir)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'totalOrderAmount' ? 'desc' : 'asc')
    }
  }

  const handleExportCSV = () => {
    const headers = [
      'Customer ID', 'Name', 'Email', 'Mobile', 'City',
      'Membership', 'Preferred Channel', 'Total Orders', 'Total Amount',
    ]
    const rows = sorted.map((c) => [
      c.customerId, c.name, c.email, c.mobile, c.city,
      c.membership, c.preferredChannel,
      (c.orders ? c.orders.length : 0).toString(),
      `₹${c.totalOrderAmount.toLocaleString('en-IN')}`,
    ])
    downloadCSV(generateCSV(headers, rows), 'all-customers.csv')
  }

  const handlePrint = () => {
    const headers = ['Customer ID', 'Name', 'Email', 'City', 'Membership', 'Channel', 'Orders', 'Total Spent']
    const rows = sorted.map((c) => [
      c.customerId, c.name, c.email, c.city, c.membership,
      c.preferredChannel, (c.orders ? c.orders.length : 0).toString(),
      `₹${c.totalOrderAmount.toLocaleString('en-IN')}`,
    ])
    printData('All Customers', headers, rows)
  }

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 text-text-muted" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3.5 h-3.5 text-primary" />
      : <ChevronDown className="w-3.5 h-3.5 text-primary" />
  }

  const membershipBadge = (m) => {
    switch (m) {
      case 'Platinum': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Gold': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'Silver': return 'bg-gray-100 text-gray-600 border-gray-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const columns = [
    ['customerId', 'Customer ID'],
    ['name', 'Name'],
    ['email', 'Email'],
    ['mobile', 'Mobile'],
    ['city', 'City'],
    ['membership', 'Membership'],
    ['preferredChannel', 'Channel'],
    ['totalOrderAmount', 'Total Spent'],
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-primary-dark to-accent text-white py-8 px-4 sm:px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">All Customers</h1>
                <p className="text-white/80 text-sm mt-1">{customers.length} customers total</p>
              </div>
            </div>
            {onNavigateDashboard && (
              <button
                onClick={onNavigateDashboard}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/15 backdrop-blur-sm rounded-lg hover:bg-white/25 transition-all text-sm font-medium"
              >
                <BarChart3 className="w-4 h-4" /> Dashboard
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 border border-border">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, city, or ID..."
                className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-white text-foreground border border-border rounded-lg font-medium hover:bg-gray-50 transition-all text-sm ${showFilters ? 'ring-2 ring-primary/30 border-primary' : ''}`}
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
              <button onClick={handleExportCSV} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-all text-sm shadow-sm">
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button onClick={handlePrint} className="inline-flex items-center gap-2 px-4 py-2 bg-white text-foreground border border-border rounded-lg font-medium hover:bg-gray-50 transition-all text-sm shadow-sm">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-text-muted" />
                <select
                  value={membershipFilter}
                  onChange={(e) => setMembershipFilter(e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="all">All Memberships</option>
                  {memberships.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-text-muted" />
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="all">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              {(membershipFilter !== 'all' || cityFilter !== 'all' || searchQuery) && (
                <button
                  onClick={() => { setMembershipFilter('all'); setCityFilter('all'); setSearchQuery('') }}
                  className="text-sm text-primary hover:underline whitespace-nowrap self-center"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-text-muted mb-3">
          Showing {sorted.length} of {customers.length} customers
        </p>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16 text-text-muted">Loading customers...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">{error}</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-border">
                    {columns.map(([key, label]) => (
                      <th
                        key={key}
                        onClick={() => handleSort(key)}
                        className="text-left py-3 px-3 text-text-muted font-medium cursor-pointer hover:text-foreground transition-colors whitespace-nowrap select-none"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {label} <SortIcon col={key} />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((c) => (
                    <tr key={c.customerId} className="border-b border-border/40 hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono text-xs">{c.customerId}</td>
                      <td className="py-3 px-3 font-medium text-foreground">{c.name}</td>
                      <td className="py-3 px-3 text-text-muted">{c.email}</td>
                      <td className="py-3 px-3 text-text-muted">{c.mobile}</td>
                      <td className="py-3 px-3 text-foreground">{c.city}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${membershipBadge(c.membership)}`}>
                          {c.membership}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-text-muted">{c.preferredChannel}</td>
                      <td className="py-3 px-3 font-bold text-foreground">₹{c.totalOrderAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      
    </div>
  )
}
