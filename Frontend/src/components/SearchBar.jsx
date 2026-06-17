import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

export default function SearchBar({ onSearch, isLoading, error }) {
  const [customerId, setCustomerId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (customerId.trim()) {
      onSearch(customerId)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-text-muted" />
          </div>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter Customer ID (Example: C1001)"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !customerId.trim()}
            className="absolute inset-y-0 right-0 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-r-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <div className="flex-1">
            <p className="text-red-800 font-medium">Customer not found</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}
