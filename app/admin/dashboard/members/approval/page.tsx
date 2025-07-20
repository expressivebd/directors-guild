"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { useAdminAuth } from "@/lib/admin-auth"
import { UnauthorizedMessage } from "@/components/admin/unauthorized-message"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Search, MoreVertical, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

interface PendingMember {
  id: string
  name: string
  email: string
  phone: string
  appliedDate: string
  experience: string
  portfolio: string
  status: "pending" | "approved" | "rejected"
  bio: string
  specialization: string[]
}

const mockPendingMembers: PendingMember[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    appliedDate: "2024-01-15",
    experience: "5 years",
    portfolio: "https://johnsmith.portfolio.com",
    status: "pending",
    bio: "Experienced director with focus on documentary filmmaking and social impact stories.",
    specialization: ["Documentary", "Social Impact", "Short Films"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    appliedDate: "2024-01-18",
    experience: "8 years",
    portfolio: "https://sarahjohnson.com",
    status: "pending",
    bio: "Award-winning director specializing in narrative features and commercial work.",
    specialization: ["Narrative Features", "Commercials", "Music Videos"],
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 456-7890",
    appliedDate: "2024-01-20",
    experience: "3 years",
    portfolio: "https://michaelchen.works",
    status: "pending",
    bio: "Emerging director with background in animation and experimental filmmaking.",
    specialization: ["Animation", "Experimental", "Digital Art"],
  },
]

function MemberDetailsDialog({ member, onClose }: { member: PendingMember; onClose: () => void }) {
  const handleApprove = () => {
    console.log("Approving member:", member.id)
    onClose()
  }

  const handleReject = () => {
    console.log("Rejecting member:", member.id)
    onClose()
  }

  return (
    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-white">Member Application Details</DialogTitle>
        <DialogDescription className="text-slate-400">
          Review the complete application for {member.name}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <p className="text-white font-medium">{member.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Email</label>
            <p className="text-white">{member.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Phone</label>
            <p className="text-white">{member.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Experience</label>
            <p className="text-white">{member.experience}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Specializations</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {member.specialization.map((spec, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Biography</label>
          <p className="text-slate-200 mt-2 leading-relaxed">{member.bio}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Portfolio</label>
          <a
            href={member.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline mt-2 block"
          >
            {member.portfolio}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-slate-600">
          <Button
            variant="outline"
            onClick={handleReject}
            className="bg-red-600 border-red-500 text-white hover:bg-red-700"
          >
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
          >
            Approve
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default function MemberApproval() {
  const { admin, hasPermission } = useAdminAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMember, setSelectedMember] = useState<PendingMember | null>(null)

  if (!admin || !hasPermission("members.approve")) {
    return (
      <AdminLayout>
        <UnauthorizedMessage
          message="You don't have permission to approve members"
          description="Contact your administrator to get the required permissions."
        />
      </AdminLayout>
    )
  }

  const filteredMembers = mockPendingMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Member Approval</h1>
          <p className="text-slate-400 text-sm md:text-base">Review and approve new member applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Pending Applications</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockPendingMembers.filter((m) => m.status === "pending").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Approved Today</p>
                <p className="text-xl md:text-3xl font-bold text-white">12</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Rejected Today</p>
                <p className="text-xl md:text-3xl font-bold text-white">3</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Total Applications</p>
                <p className="text-xl md:text-3xl font-bold text-white">156</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-600">
                      All Status
                    </SelectItem>
                    <SelectItem value="pending" className="text-white hover:bg-slate-600">
                      Pending
                    </SelectItem>
                    <SelectItem value="approved" className="text-white hover:bg-slate-600">
                      Approved
                    </SelectItem>
                    <SelectItem value="rejected" className="text-white hover:bg-slate-600">
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{member.name}</h3>
                    <p className="text-sm text-slate-400 truncate">{member.email}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <div className="overflow-x-auto">
                      <div className="flex items-center space-x-2 min-w-max">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMember(member)}
                              className="bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 whitespace-nowrap"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          {selectedMember && (
                            <MemberDetailsDialog member={selectedMember} onClose={() => setSelectedMember(null)} />
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
                            <DropdownMenuItem className="text-slate-200 hover:bg-slate-600 cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Application
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-600 cursor-pointer">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Application
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No member applications found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
