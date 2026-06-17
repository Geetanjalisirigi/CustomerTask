import { ShoppingCart, TrendingUp, MessageSquare, Award } from 'lucide-react'

const KPICard = ({ icon: Icon, title, value, gradientFrom, gradientTo }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <Icon className="w-32 h-32 absolute -bottom-8 -right-8" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  )
}

export default function KPICards({ customer }) {
  if (!customer) return null

  const totalOrders = customer.orders?.length || 0
  const totalSpending = customer.totalOrderAmount || 0
  const preferredChannel = customer.preferredChannel || 'N/A'
  const membership = customer.membership || 'N/A'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KPICard
        icon={ShoppingCart}
        title="Total Orders"
        value={totalOrders}
        gradientFrom="#3b82f6"
        gradientTo="#1e40af"
      />
      <KPICard
        icon={TrendingUp}
        title="Total Spending"
        value={`₹${totalSpending.toLocaleString('en-IN')}`}
        gradientFrom="#10b981"
        gradientTo="#047857"
      />
      <KPICard
        icon={MessageSquare}
        title="Preferred Channel"
        value={preferredChannel}
        gradientFrom="#8b5cf6"
        gradientTo="#6d28d9"
      />
      <KPICard
        icon={Award}
        title="Membership"
        value={membership}
        gradientFrom="#f59e0b"
        gradientTo="#d97706"
      />
    </div>
  )
}
