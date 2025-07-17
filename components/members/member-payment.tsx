"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign } from "lucide-react"
import type { PaymentHistoryItem } from "@/lib/types"
import { set } from "date-fns"

interface MemberPaymentProps {
  memberId: string
}

export default function MemberPayment({ memberId }: MemberPaymentProps) {
  const [currentDue, setCurrentDue] = useState(0)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock payment history data
    const mockHistory: PaymentHistoryItem[] = [
      { month: "December 2024", amount: 150, status: "unpaid" },
      { month: "November 2024", amount: 150, status: "unpaid" },
      { month: "October 2024", amount: 150, status: "paid" },
      { month: "September 2024", amount: 150, status: "paid" },
      { month: "August 2024", amount: 150, status: "paid" },
      { month: "July 2024", amount: 150, status: "paid" },
      { month: "June 2024", amount: 150, status: "paid" },
      { month: "May 2024", amount: 150, status: "paid" },
      { month: "April 2024", amount: 150, status: "paid" },
      { month: "March 2024", amount: 150, status: "paid" },
      { month: "February 2024", amount: 150, status: "paid" },
      { month: "January 2024", amount: 150, status: "paid" },
    ]

    setPaymentHistory(mockHistory)
    
    // Calculate and set the current due amount
    const unpaidPayments = mockHistory.filter(payment => payment.status === "unpaid")
    const totalDue = unpaidPayments.reduce((total, payment) => total + payment.amount, 0)
    setCurrentDue(totalDue)
    
    setLoading(false)
  }, [memberId])


  const handlePayNow = () => {
    // Here you would integrate with a payment processor like Stripe
    console.log("Processing payment for:", currentDue)
    alert("Payment processing would be implemented here with Stripe or similar service")
  }

  const calculateDue = () => {
    const unpaidPayments = paymentHistory.filter(payment => payment.status === "unpaid")
    const totalDue = unpaidPayments.reduce((total, payment) => total + payment.amount, 0)
    return totalDue
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Payment History - Left Side */}
      <div className="lg:col-span-3">
        <Card className="bg-zinc-900">
          <CardContent className="p-6">
            {/* Current Due Section */}
            <div className="mb-6">
              <Card className={currentDue > 0 ? "bg-red-900/20 border-red-500/20" : "bg-green-900/20 border-green-500/20"}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className={`w-6 h-6 ${currentDue > 0 ? "text-red-500" : "text-green-500"}`} />
                      <div>
                        <h3 className={`text-lg font-bold ${currentDue > 0 ? "text-red-400" : "text-green-400"}`}>
                          {currentDue > 0 ? "Current Due" : "No Current Dues"}
                        </h3>
                        <p className="text-2xl font-bold text-white">
                          {currentDue > 0 ? `$${currentDue}` : "All Paid Up!"}
                        </p>
                      </div>
                    </div>
                    {currentDue > 0 && (
                      <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg" onClick={handlePayNow}>
                        Pay Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment History Table */}
            <h2 className="text-2xl font-bold mb-6">Payment History (Last 12 Months)</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-3 px-4 font-semibold">Month</th>
                    <th className="text-left py-3 px-4 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                      <td className="py-3 px-4">{payment.month}</td>
                      <td className="py-3 px-4 font-semibold">${payment.amount}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={payment.status === "paid" ? "default" : "destructive"}
                          className={payment.status === "paid" ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {payment.status === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Due Info - Right Side */}
      <div className="lg:col-span-1">
        <Card className="bg-zinc-900 sticky top-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {currentDue > 0 ? "Current Due" : "Payment Status"}
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <p className={`text-3xl font-bold ${currentDue > 0 ? "text-red-400" : "text-green-400"}`}>
                  {currentDue > 0 ? `$${currentDue}` : "All Paid Up!"}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {currentDue > 0 ? "Monthly Membership Fee" : "No outstanding dues"}
                </p>
              </div>

              {currentDue > 0 && (
                <>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Due Date:</span>
                      <span>Jan 1, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Late Fee:</span>
                      <span>$25 (after 7 days)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment Method:</span>
                      <span>Credit Card</span>
                    </div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handlePayNow}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay ${currentDue}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">Secure payment processing via Stripe</p>
                </>
              )}

              {currentDue === 0 && (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-green-400 font-medium">Your account is up to date!</p>
                  <p className="text-xs text-gray-500">Next payment due: Feb 1, 2025</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
