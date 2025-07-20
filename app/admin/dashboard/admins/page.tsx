"use client"

import type React from "react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { useAdminAuth } from "@/lib/admin-auth"
import { UnauthorizedMessage } from "@/components/admin/unauthorized-message"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  UserPlus,
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  User,
  Crown,
  Settings,
  Newspaper,
  Handshake,
  Gift,
  Users,
  CreditCard,
  BookOpen,
} from "lucide-react"
import { useState } from "react"

interface Admin {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
  createdAt: string
  lastLogin?: string
}

const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@directorsguild.com",
    role: "super_admin",
    permissions: ["*"],
    createdAt: "2024-01-01",
    lastLogin: "2024-01-20",
  },
  {
    id: "2",
    name: "News Admin",
    email: "newsadmin@directorsguild.com",
    role: "news_admin",
    permissions: ["news.read", "news.create", "news.update", "news.delete"],
    createdAt: "2024-01-15",
    lastLogin: "2024-01-19",
  },
  {
    id: "3",
    name: "Partners Admin",
    email: "partnersadmin@directorsguild.com",
    role: "partners_admin",
    permissions: ["partners.read", "partners.create", "partners.update", "partners.delete"],
    createdAt: "2024-01-10",
    lastLogin: "2024-01-18",
  },
]

const roleOptions = [
  { value: "super_admin", label: "Super Admin", icon: Crown, color: "bg-gradient-to-r from-purple-600 to-violet-600" },
  { value: "news_admin", label: "News Admin", icon: Newspaper, color: "bg-blue-600" },
  { value: "partners_admin", label: "Partners Admin", icon: Handshake, color: "bg-green-600" },
  { value: "incentives_admin", label: "Incentives Admin", icon: Gift, color: "bg-orange-600" },
  { value: "members_admin", label: "Members Admin", icon: Users, color: "bg-indigo-600" },
  { value: "payments_admin", label: "Payments Admin", icon: CreditCard, color: "bg-emerald-600" },
  { value: "directory_admin", label: "Directory Admin", icon: BookOpen, color: "bg-teal-600" },
]

function AddAdminForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Adding new admin:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-slate-200">
            Full Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Enter admin's full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-slate-200">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="admin@directorsguild.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-slate-200">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Enter secure password"
            required
          />
        </div>

        <div>
          <Label htmlFor="role" className="text-slate-200">
            Access Level
          </Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
              <SelectValue placeholder="Select access level" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              {roleOptions.map((role) => (
                <SelectItem key={role.value} value={role.value} className="text-white hover:bg-slate-600">
                  <div className="flex items-center space-x-2">
                    <role.icon className="w-4 h-4" />
                    <span>{role.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-600">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Admin
        </Button>
      </div>
    </form>
  )
}

function AdminCard({ admin }: { admin: Admin }) {
  const roleInfo = roleOptions.find((r) => r.value === admin.role)
  const RoleIcon = roleInfo?.icon || Shield

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-full ${roleInfo?.color || "bg-slate-600"}`}>
              <RoleIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{admin.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{admin.email}</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <Badge
                  variant="secondary"
                  className={`${roleInfo?.color || "bg-slate-600"} text-white hover:opacity-90`}
                >
                  {roleInfo?.label || admin.role}
                </Badge>
                <span className="text-xs text-slate-400">
                  Created: {new Date(admin.createdAt).toLocaleDateString()}
                </span>
                {admin.lastLogin && (
                  <span className="text-xs text-slate-400">
                    Last login: {new Date(admin.lastLogin).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-400 mb-1">Permissions:</p>
                <div className="flex flex-wrap gap-1">
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
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-700 border-slate-600" align="end">
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-600 cursor-pointer">
                <Edit className="w-4 h-4 mr-2" />
                Edit Admin
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-slate-600 cursor-pointer">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ManageAdmins() {
  const { admin, hasPermission } = useAdminAuth()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  if (!admin || admin.role !== "super_admin") {
    return (
      <AdminLayout>
        <UnauthorizedMessage
          message="Super Admin Access Required"
          description="Only super administrators can manage admin accounts."
        />
      </AdminLayout>
    )
  }

  const filteredAdmins = mockAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Manage Admins</h1>
            <p className="text-slate-400">Manage administrator accounts and their access levels</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Administrator</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Create a new admin account with specific access permissions.
                </DialogDescription>
              </DialogHeader>
              <AddAdminForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Admins</p>
                  <p className="text-2xl font-bold text-white">{mockAdmins.length}</p>
                </div>
                <div className="p-3 rounded-full bg-purple-600">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Super Admins</p>
                  <p className="text-2xl font-bold text-white">
                    {mockAdmins.filter((a) => a.role === "super_admin").length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Active Today</p>
                  <p className="text-2xl font-bold text-white">
                    {mockAdmins.filter((a) => a.lastLogin === "2024-01-20").length}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-600">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Role Types</p>
                  <p className="text-2xl font-bold text-white">{new Set(mockAdmins.map((a) => a.role)).size}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-600">
                  <Settings className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Administrator Accounts</CardTitle>
            <CardDescription className="text-slate-400">
              Manage all administrator accounts and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Input
                placeholder="Search admins by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              />
            </div>

            <div className="space-y-4">
              {filteredAdmins.map((admin) => (
                <AdminCard key={admin.id} admin={admin} />
              ))}
            </div>

            {filteredAdmins.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No administrators found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
