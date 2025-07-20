"use client"

import type React from "react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { useAdminAuth } from "@/lib/admin-auth"
import { UnauthorizedMessage } from "@/components/admin/unauthorized-message"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Calendar, Search, Edit, Trash2, MoreVertical } from "lucide-react"
import { useState } from "react"

interface Incentive {
  id: string
  title: string
  description: string
  type: "discount" | "rebate" | "grant" | "service" | "equipment"
  value: string
  provider: string
  category: string
  status: "active" | "inactive" | "expired"
  startDate: string
  endDate: string
  eligibility: string
  claimCount: number
  maxClaims?: number
  featured: boolean
}

const mockIncentives: Incentive[] = [
  {
    id: "1",
    title: "Equipment Rental Discount",
    description: "Get 25% off on all camera and lighting equipment rentals from our partner studios.",
    type: "discount",
    value: "25%",
    provider: "TechGear Rentals",
    category: "Equipment",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    eligibility: "All active members",
    claimCount: 45,
    maxClaims: 100,
    featured: true,
  },
  {
    id: "2",
    title: "Post-Production Grant",
    description: "Financial assistance up to $5,000 for post-production costs on independent films.",
    type: "grant",
    value: "$5,000",
    provider: "Directors Guild Foundation",
    category: "Financial",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    eligibility: "Members with 2+ years experience",
    claimCount: 12,
    maxClaims: 25,
    featured: true,
  },
  {
    id: "3",
    title: "Workshop Series Access",
    description: "Free access to advanced filmmaking workshops and masterclasses.",
    type: "service",
    value: "Free Access",
    provider: "Digital Arts Academy",
    category: "Education",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    eligibility: "Premium members only",
    claimCount: 78,
    featured: false,
  },
]

function IncentiveDetailsDialog({ incentive, onClose }: { incentive: Incentive; onClose: () => void }) {
  return (
    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-white">Incentive Details</DialogTitle>
        <DialogDescription className="text-slate-400">Complete incentive information and eligibility</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-white">{incentive.title}</h3>
              {incentive.featured && (
                <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">Featured</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <Badge
                className={
                  incentive.status === "active"
                    ? "bg-green-600 text-white"
                    : incentive.status === "inactive"
                      ? "bg-gray-600 text-white"
                      : "bg-red-600 text-white"
                }
              >
                {incentive.status.charAt(0).toUpperCase() + incentive.status.slice(1)}
              </Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-400">
                {incentive.type.charAt(0).toUpperCase() + incentive.type.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Description</label>
          <p className="text-slate-200 mt-2">{incentive.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Value</label>
            <p className="text-white font-medium text-lg">{incentive.value}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Provider</label>
            <p className="text-white">{incentive.provider}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Category</label>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {incentive.category}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Claims</label>
            <p className="text-white">
              {incentive.claimCount}
              {incentive.maxClaims ? ` / ${incentive.maxClaims}` : ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Start Date</label>
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-white">{new Date(incentive.startDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">End Date</label>
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-white">{new Date(incentive.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Eligibility Requirements</label>
          <p className="text-slate-200 mt-2">{incentive.eligibility}</p>
        </div>

        {incentive.maxClaims && (
          <div>
            <label className="text-sm font-medium text-slate-300">Usage Progress</label>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Claims Used</span>
                <span className="text-slate-300">
                  {Math.round((incentive.claimCount / incentive.maxClaims) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-violet-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(incentive.claimCount / incentive.maxClaims) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-600">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

function IncentiveForm({ incentive, onClose }: { incentive?: Incentive; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: incentive?.title || "",
    description: incentive?.description || "",
    type: incentive?.type || "discount",
    value: incentive?.value || "",
    provider: incentive?.provider || "",
    category: incentive?.category || "",
    status: incentive?.status || "active",
    startDate: incentive?.startDate || "",
    endDate: incentive?.endDate || "",
    eligibility: incentive?.eligibility || "",
    maxClaims: incentive?.maxClaims?.toString() || "",
    featured: incentive?.featured || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving incentive:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-slate-200">
            Incentive Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Enter incentive title"
            required
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-slate-200">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Detailed description of the incentive"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type" className="text-slate-200">
              Type
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="discount" className="text-white hover:bg-slate-600">
                  Discount
                </SelectItem>
                <SelectItem value="rebate" className="text-white hover:bg-slate-600">
                  Rebate
                </SelectItem>
                <SelectItem value="grant" className="text-white hover:bg-slate-600">
                  Grant
                </SelectItem>
                <SelectItem value="service" className="text-white hover:bg-slate-600">
                  Service
                </SelectItem>
                <SelectItem value="equipment" className="text-white hover:bg-slate-600">
                  Equipment
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="value" className="text-slate-200">
              Value
            </Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="e.g., 25%, $5,000, Free Access"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="provider" className="text-slate-200">
              Provider
            </Label>
            <Input
              id="provider"
              value={formData.provider}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="Organization providing the incentive"
              required
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-slate-200">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="Equipment" className="text-white hover:bg-slate-600">
                  Equipment
                </SelectItem>
                <SelectItem value="Financial" className="text-white hover:bg-slate-600">
                  Financial
                </SelectItem>
                <SelectItem value="Education" className="text-white hover:bg-slate-600">
                  Education
                </SelectItem>
                <SelectItem value="Services" className="text-white hover:bg-slate-600">
                  Services
                </SelectItem>
                <SelectItem value="Software" className="text-white hover:bg-slate-600">
                  Software
                </SelectItem>
                <SelectItem value="Networking" className="text-white hover:bg-slate-600">
                  Networking
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate" className="text-slate-200">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white focus:border-purple-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-slate-200">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white focus:border-purple-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="eligibility" className="text-slate-200">
              Eligibility
            </Label>
            <Input
              id="eligibility"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="Who can claim this incentive"
              required
            />
          </div>
          <div>
            <Label htmlFor="maxClaims" className="text-slate-200">
              Max Claims (optional)
            </Label>
            <Input
              id="maxClaims"
              type="number"
              value={formData.maxClaims}
              onChange={(e) => setFormData({ ...formData, maxClaims: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="Maximum number of claims"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="status" className="text-slate-200">
            Status
          </Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="active" className="text-white hover:bg-slate-600">
                Active
              </SelectItem>
              <SelectItem value="inactive" className="text-white hover:bg-slate-600">
                Inactive
              </SelectItem>
              <SelectItem value="expired" className="text-white hover:bg-slate-600">
                Expired
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
          />
          <Label htmlFor="featured" className="text-slate-200">
            Featured Incentive
          </Label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-slate-600">
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
          {incentive ? "Update Incentive" : "Create Incentive"}
        </Button>
      </div>
    </form>
  )
}

export default function IncentivesControl() {
  const { admin, hasPermission } = useAdminAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingIncentive, setEditingIncentive] = useState<Incentive | null>(null)
  const [selectedIncentive, setSelectedIncentive] = useState<Incentive | null>(null)

  if (!admin || !hasPermission("incentives.read")) {
    return (
      <AdminLayout>
        <UnauthorizedMessage
          message="You don't have permission to manage incentives"
          description="Contact your administrator to get the required permissions."
        />
      </AdminLayout>
    )
  }

  const filteredIncentives = mockIncentives.filter((incentive) => {
    const matchesSearch =
      incentive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incentive.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incentive.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || incentive.status === statusFilter
    const matchesType = typeFilter === "all" || incentive.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Incentives Control</h1>
            <p className="text-slate-400 text-sm md:text-base">Manage member incentives, discounts, and benefits</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Create Incentive
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Incentive</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Add a new incentive or benefit for Directors Guild members.
                </DialogDescription>
              </DialogHeader>
              <IncentiveForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Total Incentives</p>
                <p className="text-xl md:text-3xl font-bold text-white">{mockIncentives.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Active Incentives</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockIncentives.filter((i) => i.status === "active").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Total Claims</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockIncentives.reduce((sum, i) => sum + i.claimCount, 0)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Expiring Soon</p>
                <p className="text-xl md:text-3xl font-bold text-white">2</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search incentives by title, description, or provider..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-600">
                      All Status
                    </SelectItem>
                    <SelectItem value="active" className="text-white hover:bg-slate-600">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive" className="text-white hover:bg-slate-600">
                      Inactive
                    </SelectItem>
                    <SelectItem value="expired" className="text-white hover:bg-slate-600">
                      Expired
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-600">
                      All Types
                    </SelectItem>
                    <SelectItem value="discount" className="text-white hover:bg-slate-600">
                      Discount
                    </SelectItem>
                    <SelectItem value="rebate" className="text-white hover:bg-slate-600">
                      Rebate
                    </SelectItem>
                    <SelectItem value="grant" className="text-white hover:bg-slate-600">
                      Grant
                    </SelectItem>
                    <SelectItem value="service" className="text-white hover:bg-slate-600">
                      Service
                    </SelectItem>
                    <SelectItem value="equipment" className="text-white hover:bg-slate-600">
                      Equipment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incentives List */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {filteredIncentives.map((incentive) => (
                <div
                  key={incentive.id}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{incentive.title}</h3>
                    <p className="text-sm text-slate-400 truncate">{incentive.provider}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <div className="overflow-x-auto">
                      <div className="flex items-center space-x-2 min-w-max">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedIncentive(incentive)}
                              className="bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 whitespace-nowrap"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          {selectedIncentive && (
                            <IncentiveDetailsDialog
                              incentive={selectedIncentive}
                              onClose={() => setSelectedIncentive(null)}
                            />
                          )}
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white hover:bg-slate-600"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-700 border-slate-600" align="end">
                            <DropdownMenuItem
                              className="text-slate-200 hover:bg-slate-600 cursor-pointer"
                              onClick={() => setEditingIncentive(incentive)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Incentive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-600 cursor-pointer">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Incentive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredIncentives.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No incentives found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingIncentive} onOpenChange={() => setEditingIncentive(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Incentive</DialogTitle>
              <DialogDescription className="text-slate-400">
                Make changes to the incentive details and settings.
              </DialogDescription>
            </DialogHeader>
            {editingIncentive && (
              <IncentiveForm incentive={editingIncentive} onClose={() => setEditingIncentive(null)} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
