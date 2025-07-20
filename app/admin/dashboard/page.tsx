"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { useAdminAuth } from "@/lib/admin-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Newspaper, CheckCircle, AlertCircle } from "lucide-react"

const statsData = [
  {
    title: "Total Members",
    value: "1,234",
  },
  {
    title: "Pending Approvals",
    value: "23",
  },
  {
    title: "Active Projects",
    value: "89",
  },
  {
    title: "Monthly Revenue",
    value: "$12,450",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "member_approval",
    message: "New member John Doe approved",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "payment",
    message: "Payment received from Sarah Wilson",
    time: "4 hours ago",
    icon: CreditCard,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "news",
    message: "New article published: Film Festival 2024",
    time: "6 hours ago",
    icon: Newspaper,
    color: "text-purple-500",
  },
  {
    id: 4,
    type: "alert",
    message: "Server maintenance scheduled",
    time: "1 day ago",
    icon: AlertCircle,
    color: "text-orange-500",
  },
]

export default function AdminDashboard() {
  const { admin } = useAdminAuth()

  if (!admin) {
    return <div>Loading...</div>
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm md:text-base">
            Welcome back, {admin.name}! Here's what's happening with the Directors Guild.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 md:p-6">
                <div className="text-center">
                  <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">{stat.title}</p>
                  <p className="text-xl md:text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Activities */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Recent Activities</CardTitle>
              <CardDescription className="text-slate-400 text-sm">Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-2 md:p-3 rounded-lg bg-slate-700/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-white truncate">{activity.message}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-slate-400 text-sm">Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="p-3 md:p-4 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white cursor-pointer hover:from-purple-700 hover:to-violet-700 transition-all text-center">
                  <p className="text-xs md:text-sm font-medium">Add Member</p>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-all text-center">
                  <p className="text-xs md:text-sm font-medium">Create News</p>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-all text-center">
                  <p className="text-xs md:text-sm font-medium">Add Partner</p>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-slate-700 text-white cursor-pointer hover:bg-slate-600 transition-all text-center">
                  <p className="text-xs md:text-sm font-medium">Add Incentive</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Role Info */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Your Access Level</CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Current permissions and role information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div>
                <p className="text-lg font-semibold text-white">{admin.name}</p>
                <p className="text-slate-400 text-sm">{admin.email}</p>
                <Badge variant="secondary" className="mt-2 bg-purple-600 text-white hover:bg-purple-700">
                  {admin.role.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-slate-400">Permissions:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {admin.permissions.slice(0, 3).map((permission, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                      {permission === "*" ? "All Access" : permission}
                    </Badge>
                  ))}
                  {admin.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                      +{admin.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
