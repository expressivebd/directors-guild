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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Download, Eye, Plus } from "lucide-react"
import { useState } from "react"

interface Payment {
  id: string
  memberName: string
  memberEmail: string
  amount: number
  type: "membership" | "event" | "workshop" | "late_fee"
  status: "completed" | "pending" | "failed" | "refunded"
  date: string
  method: "card" | "bank" | "paypal" | "cash"
  transactionId: string
}

const mockPayments: Payment[] = [
  {
    id: "1",
    memberName: "John Smith",
    memberEmail: "john.smith@email.com",
    amount: 150.0,
    type: "membership",
    status: "completed",
    date: "2024-01-20",
    method: "card",
    transactionId: "TXN-001-2024",
  },
  {
    id: "2",
    memberName: "Sarah Johnson",
    memberEmail: "sarah.j@email.com",
    amount: 75.0,
    type: "workshop",
    status: "pending",
    date: "2024-01-19",
    method: "paypal",
    transactionId: "TXN-002-2024",
  },
  {
    id: "3",
    memberName: "Michael Chen",
    memberEmail: "m.chen@email.com",
    amount: 200.0,
    type: "event",
    status: "completed",
    date: "2024-01-18",
    method: "bank",
    transactionId: "TXN-003-2024",
  },
  {
    id: "4",
    memberName: "Emily Davis",
    memberEmail: "emily.d@email.com",
    amount: 25.0,
    type: "late_fee",
    status: "failed",
    date: "2024-01-17",
    method: "card",
    transactionId: "TXN-004-2024",
  },
]

function PaymentDetailsDialog({ payment, onClose }: { payment: Payment; onClose: () => void }) {
  return (
    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-white">Payment Details</DialogTitle>
        <DialogDescription className="text-slate-400">
          Complete payment information for {payment.memberName}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Member Name</label>
            <p className="text-white font-medium">{payment.memberName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Email</label>
            <p className="text-white">{payment.memberEmail}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Amount</label>
            <p className="text-white font-medium">${payment.amount.toFixed(2)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Payment Method</label>
            <p className="text-white capitalize">{payment.method}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Transaction ID</label>
            <p className="text-white font-mono text-sm">{payment.transactionId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Date</label>
            <p className="text-white">{new Date(payment.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Type</label>
            <Badge variant="outline" className="ml-2 border-purple-500 text-purple-400">
              {payment.type.replace("_", " ").toUpperCase()}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Status</label>
            <Badge
              className={`ml-2 ${
                payment.status === "completed"
                  ? "bg-green-600"
                  : payment.status === "pending"
                    ? "bg-yellow-600"
                    : payment.status === "failed"
                      ? "bg-red-600"
                      : "bg-gray-600"
              } text-white`}
            >
              {payment.status.toUpperCase()}
            </Badge>
          </div>
        </div>

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

function AddPaymentDialog({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    memberName: "",
    memberEmail: "",
    amount: "",
    type: "membership",
    method: "cash",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding manual payment:", formData)
    onClose()
  }

  return (
    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
      <DialogHeader>
        <DialogTitle className="text-white">Add Manual Payment</DialogTitle>
        <DialogDescription className="text-slate-400">Record a cash payment or manual transaction</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="memberName" className="text-slate-300">
            Member Name
          </Label>
          <Input
            id="memberName"
            value={formData.memberName}
            onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Enter member name"
            required
          />
        </div>

        <div>
          <Label htmlFor="memberEmail" className="text-slate-300">
            Member Email
          </Label>
          <Input
            id="memberEmail"
            type="email"
            value={formData.memberEmail}
            onChange={(e) => setFormData({ ...formData, memberEmail: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="member@email.com"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount" className="text-slate-300">
              Amount ($)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <Label htmlFor="method" className="text-slate-300">
              Payment Method
            </Label>
            <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="cash" className="text-white hover:bg-slate-600">
                  Cash
                </SelectItem>
                <SelectItem value="check" className="text-white hover:bg-slate-600">
                  Check
                </SelectItem>
                <SelectItem value="bank" className="text-white hover:bg-slate-600">
                  Bank Transfer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="type" className="text-slate-300">
            Payment Type
          </Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="membership" className="text-white hover:bg-slate-600">
                Membership
              </SelectItem>
              <SelectItem value="event" className="text-white hover:bg-slate-600">
                Event
              </SelectItem>
              <SelectItem value="workshop" className="text-white hover:bg-slate-600">
                Workshop
              </SelectItem>
              <SelectItem value="late_fee" className="text-white hover:bg-slate-600">
                Late Fee
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-slate-600">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
          >
            Add Payment
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}

export default function PaymentDashboard() {
  const { admin, hasPermission } = useAdminAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)

  if (!admin || !hasPermission("payments.read")) {
    return (
      <AdminLayout>
        <UnauthorizedMessage
          message="You don't have permission to view payments"
          description="Contact your administrator to get the required permissions."
        />
      </AdminLayout>
    )
  }

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.memberEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesType = typeFilter === "all" || payment.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalRevenue = mockPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = mockPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600 text-white hover:bg-green-700">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-600 text-white hover:bg-yellow-700">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-600 text-white hover:bg-red-700">Failed</Badge>
      case "refunded":
        return <Badge className="bg-gray-600 text-white hover:bg-gray-700">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "membership":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            Membership
          </Badge>
        )
      case "event":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            Event
          </Badge>
        )
      case "workshop":
        return (
          <Badge variant="outline" className="border-green-500 text-green-400">
            Workshop
          </Badge>
        )
      case "late_fee":
        return (
          <Badge variant="outline" className="border-red-500 text-red-400">
            Late Fee
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Payment Dashboard</h1>
            <p className="text-slate-400 text-sm md:text-base">Monitor and manage member payments and transactions</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment
                </Button>
              </DialogTrigger>
              <AddPaymentDialog onClose={() => setIsAddPaymentOpen(false)} />
            </Dialog>
            <Button variant="outline" className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Total Revenue</p>
                <p className="text-xl md:text-3xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Pending Payments</p>
                <p className="text-xl md:text-3xl font-bold text-white">${pendingAmount.toFixed(2)}</p>
                <p className="text-xs text-yellow-400">
                  {mockPayments.filter((p) => p.status === "pending").length} transactions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Completed Today</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockPayments.filter((p) => p.status === "completed" && p.date === "2024-01-20").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Failed Payments</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockPayments.filter((p) => p.status === "failed").length}
                </p>
                <p className="text-xs text-red-400">Requires attention</p>
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
                    placeholder="Search by member name, email, or transaction ID..."
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
                    <SelectItem value="completed" className="text-white hover:bg-slate-600">
                      Completed
                    </SelectItem>
                    <SelectItem value="pending" className="text-white hover:bg-slate-600">
                      Pending
                    </SelectItem>
                    <SelectItem value="failed" className="text-white hover:bg-slate-600">
                      Failed
                    </SelectItem>
                    <SelectItem value="refunded" className="text-white hover:bg-slate-600">
                      Refunded
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
                    <SelectItem value="membership" className="text-white hover:bg-slate-600">
                      Membership
                    </SelectItem>
                    <SelectItem value="event" className="text-white hover:bg-slate-600">
                      Event
                    </SelectItem>
                    <SelectItem value="workshop" className="text-white hover:bg-slate-600">
                      Workshop
                    </SelectItem>
                    <SelectItem value="late_fee" className="text-white hover:bg-slate-600">
                      Late Fee
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Recent Transactions</CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Latest payment transactions and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 hover:bg-slate-700/50">
                    <TableHead className="text-slate-300">Member</TableHead>
                    <TableHead className="text-slate-300">Amount</TableHead>
                    <TableHead className="text-slate-300 hidden md:table-cell">Type</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300 hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-white text-sm">{payment.memberName}</p>
                          <p className="text-xs text-slate-400 md:hidden">{payment.memberEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-medium">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">{getTypeBadge(payment.type)}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-slate-300 hidden md:table-cell">
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPayment(payment)}
                              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                            >
                              <Eye className="w-4 h-4 md:mr-2" />
                              <span className="hidden md:inline">View</span>
                            </Button>
                          </DialogTrigger>
                          {selectedPayment && (
                            <PaymentDetailsDialog payment={selectedPayment} onClose={() => setSelectedPayment(null)} />
                          )}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No payments found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
