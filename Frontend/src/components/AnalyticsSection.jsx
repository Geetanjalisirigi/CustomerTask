import { TrendingUp, ShoppingCart, DollarSign, Target } from 'lucide-react'

export default function AnalyticsSection({ orders, totalAmount }) {
  if (!orders || orders.length === 0) return null

  const totalOrders = orders.length
  const avgOrderValue = (totalAmount / totalOrders).toFixed(2)
  const maxOrder = Math.max(...orders.map(o => o.amount)).toFixed(2)
  const minOrder = Math.min(...orders.map(o => o.amount)).toFixed(2)

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Spent',
      value: `₹${totalAmount.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Average Order',
      value: `₹${avgOrderValue}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Highest Order',
      value: `₹${maxOrder}`,
      icon: Target,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        Order Analytics
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className={`${stat.bgColor} rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
