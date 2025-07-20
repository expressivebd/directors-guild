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
import { Plus, Edit, Trash2, MoreVertical, ExternalLink, Mail, Phone, MapPin, Search } from "lucide-react"
import { useState } from "react"

interface Partner {
  id: string
  name: string
  type: "company" | "individual" | "organization"
  category: string
  description: string
  email: string
  phone: string
  website: string
  address: string
  services: string[]
  status: "active" | "inactive" | "pending"
  featured: boolean
  rating: number
  reviewCount: number
  joinDate: string
}

const mockPartners: Partner[] = [
  {
    id: "1",
    name: "Cinematic Studios",
    type: "company",
    category: "Production Company",
    description:
      "Full-service film production company specializing in commercials, documentaries, and narrative features.",
    email: "info@cinematicstudios.com",
    phone: "+1 (555) 123-4567",
    website: "https://cinematicstudios.com",
    address: "123 Studio Drive, Los Angeles, CA 90028",
    services: ["Pre-Production", "Production", "Post-Production", "Equipment Rental"],
    status: "active",
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    joinDate: "2023-03-15",
  },
  {
    id: "2",
    name: "Digital Arts Academy",
    type: "organization",
    category: "Educational Institution",
    description: "Premier educational institution for digital filmmaking and visual effects training.",
    email: "partnerships@digitalartsacademy.edu",
    phone: "+1 (555) 987-6543",
    website: "https://digitalartsacademy.edu",
    address: "456 Creative Ave, New York, NY 10001",
    services: ["Course Discounts", "Workshop Access", "Certification Programs"],
    status: "active",
    featured: false,
    rating: 4.9,
    reviewCount: 18,
    joinDate: "2023-06-20",
  },
  {
    id: "3",
    name: "TechGear Rentals",
    type: "company",
    category: "Equipment Rental",
    description: "Professional camera and lighting equipment rental service for film productions.",
    email: "info@techgearrentals.com",
    phone: "+1 (555) 456-7890",
    website: "https://techgearrentals.com",
    address: "789 Equipment St, Atlanta, GA 30309",
    services: ["Rental Discounts", "Priority Booking", "Technical Support"],
    status: "pending",
    featured: false,
    rating: 4.6,
    reviewCount: 12,
    joinDate: "2024-01-10",
  },
]

function PartnerDetailsDialog({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  return (
    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-white">Partner Details</DialogTitle>
        <DialogDescription className="text-slate-400">Complete partner information and benefits</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
              {partner.featured && (
                <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">Featured</Badge>
              )}
            </div>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {partner.category}
            </Badge>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Description</label>
          <p className="text-slate-200 mt-2">{partner.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-300">Contact Information</label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-200">{partner.email}</span>
                </div>
                {partner.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-200">{partner.phone}</span>
                  </div>
                )}
                {partner.website && (
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {partner.address && (
              <div>
                <label className="text-sm font-medium text-slate-300">Location</label>
                <div className="flex items-start space-x-2 mt-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span className="text-slate-200 text-sm">{partner.address}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {partner.services.length > 0 && (
          <div>
            <label className="text-sm font-medium text-slate-300">Services Offered</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {partner.services.map((service, index) => (
                <Badge key={index} variant="outline" className="border-purple-500 text-purple-400">
                  {service}
                </Badge>
              ))}
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

function PartnerForm({ partner, onClose }: { partner?: Partner; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: partner?.name || "",
    type: partner?.type || "company",
    category: partner?.category || "",
    description: partner?.description || "",
    email: partner?.email || "",
    phone: partner?.phone || "",
    website: partner?.website || "",
    address: partner?.address || "",
    services: partner?.services?.join(", ") || "",
    status: partner?.status || "pending",
    featured: partner?.featured || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving partner:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-slate-200">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="Company or individual name"
              required
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-slate-200">
              Type
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="company" className="text-white hover:bg-slate-600">
                  Company
                </SelectItem>
                <SelectItem value="individual" className="text-white hover:bg-slate-600">
                  Individual
                </SelectItem>
                <SelectItem value="organization" className="text-white hover:bg-slate-600">
                  Organization
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              <SelectItem value="Production Company" className="text-white hover:bg-slate-600">
                Production Company
              </SelectItem>
              <SelectItem value="Educational Institution" className="text-white hover:bg-slate-600">
                Educational Institution
              </SelectItem>
              <SelectItem value="Equipment Rental" className="text-white hover:bg-slate-600">
                Equipment Rental
              </SelectItem>
              <SelectItem value="Post-Production" className="text-white hover:bg-slate-600">
                Post-Production
              </SelectItem>
              <SelectItem value="Distribution" className="text-white hover:bg-slate-600">
                Distribution
              </SelectItem>
              <SelectItem value="Technology" className="text-white hover:bg-slate-600">
                Technology
              </SelectItem>
            </SelectContent>
          </Select>
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
            placeholder="Brief description of the partner"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="website" className="text-slate-200">
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-slate-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="contact@partner.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="text-slate-200">
              Phone
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="+1 (555) 123-4567"
            />
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
                <SelectItem value="pending" className="text-white hover:bg-slate-600">
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-slate-200">
            Address
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Full address or city, state"
          />
        </div>

        <div>
          <Label htmlFor="services" className="text-slate-200">
            Services (comma-separated)
          </Label>
          <Input
            id="services"
            value={formData.services}
            onChange={(e) => setFormData({ ...formData, services: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Pre-Production, Production, Post-Production, etc."
          />
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
            Featured Partner
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
          {partner ? "Update Partner" : "Add Partner"}
        </Button>
      </div>
    </form>
  )
}

export default function PartnersControl() {
  const { admin, hasPermission } = useAdminAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)

  if (!admin || !hasPermission("partners.read")) {
    return (
      <AdminLayout>
        <UnauthorizedMessage
          message="You don't have permission to manage partners"
          description="Contact your administrator to get the required permissions."
        />
      </AdminLayout>
    )
  }

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter
    const matchesCategory = categoryFilter === "all" || partner.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Partners Control</h1>
            <p className="text-slate-400 text-sm md:text-base">Manage partnership relationships and collaborations</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Partner</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Add a new partner organization to the Directors Guild network.
                </DialogDescription>
              </DialogHeader>
              <PartnerForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Total Partners</p>
                <p className="text-xl md:text-3xl font-bold text-white">{mockPartners.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Active Partners</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockPartners.filter((p) => p.status === "active").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Featured Partners</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockPartners.filter((p) => p.featured).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Pending Approval</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockPartners.filter((p) => p.status === "pending").length}
                </p>
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
                    placeholder="Search partners by name, description, or category..."
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
                    <SelectItem value="pending" className="text-white hover:bg-slate-600">
                      Pending
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-600">
                      All Categories
                    </SelectItem>
                    <SelectItem value="Production Company" className="text-white hover:bg-slate-600">
                      Production Company
                    </SelectItem>
                    <SelectItem value="Educational Institution" className="text-white hover:bg-slate-600">
                      Educational Institution
                    </SelectItem>
                    <SelectItem value="Equipment Rental" className="text-white hover:bg-slate-600">
                      Equipment Rental
                    </SelectItem>
                    <SelectItem value="Post-Production" className="text-white hover:bg-slate-600">
                      Post-Production
                    </SelectItem>
                    <SelectItem value="Distribution" className="text-white hover:bg-slate-600">
                      Distribution
                    </SelectItem>
                    <SelectItem value="Technology" className="text-white hover:bg-slate-600">
                      Technology
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partners List */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{partner.name}</h3>
                    <p className="text-sm text-slate-400 truncate">{partner.category}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <div className="overflow-x-auto">
                      <div className="flex items-center space-x-2 min-w-max">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPartner(partner)}
                              className="bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 whitespace-nowrap"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          {selectedPartner && (
                            <PartnerDetailsDialog partner={selectedPartner} onClose={() => setSelectedPartner(null)} />
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
                              onClick={() => setEditingPartner(partner)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Partner
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-600 cursor-pointer">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Partner
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPartners.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No partners found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingPartner} onOpenChange={() => setEditingPartner(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Partner</DialogTitle>
              <DialogDescription className="text-slate-400">
                Make changes to the partner information and details.
              </DialogDescription>
            </DialogHeader>
            {editingPartner && <PartnerForm partner={editingPartner} onClose={() => setEditingPartner(null)} />}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
