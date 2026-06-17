import { Mail, Phone, MapPin, Award } from 'lucide-react'

const MembershipBadge = ({ membership }) => {
  const colors = {
    Gold: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Silver: 'bg-gray-100 text-gray-800 border-gray-300',
    Platinum: 'bg-blue-100 text-blue-800 border-blue-300',
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
        colors[membership] || 'bg-gray-100 text-gray-800 border-gray-300'
      }`}
    >
      {membership}
    </span>
  )
}

const Avatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const colors = [
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-green-400 to-green-600',
  ]

  const colorIndex = name.charCodeAt(0) % colors.length

  return (
    <div
      className={`w-16 h-16 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
    >
      {initials}
    </div>
  )
}

export default function ProfileCard({ customer }) {
  if (!customer) return null

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-border">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <Avatar name={customer.name} />
        </div>
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {customer.name}
              </h2>
              <p className="text-text-muted text-lg mb-4">{customer.customerId}</p>
              <MembershipBadge membership={customer.membership} />
            </div>
            <div className="flex-shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-2xl font-bold text-primary">
                  ₹{customer.totalOrderAmount?.toLocaleString('en-IN') || '0'}
                </p>
                <p className="text-text-muted text-sm">Total Spending</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-text-muted text-sm">Email</p>
                <p className="font-medium text-foreground break-all">
                  {customer.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-text-muted text-sm">Mobile</p>
                <p className="font-medium text-foreground">{customer.mobile}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-text-muted text-sm">City</p>
                <p className="font-medium text-foreground">{customer.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-text-muted text-sm">Membership</p>
                <p className="font-medium text-foreground">
                  {customer.membership}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
