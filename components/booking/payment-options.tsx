"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, Shield, Info } from 'lucide-react'
import { carService } from "@/lib/services/car-service"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface PaymentOptionsProps {
  bookingDetails: any
  orderId: string
  onPaymentSuccess: (paymentId: string, orderId: string, signature: string) => void
}

export function PaymentOptions({ bookingDetails, orderId, onPaymentSuccess }: PaymentOptionsProps) {
  const [paymentMethod, setPaymentMethod] = useState<"full" | "partial">("full")
  const [loading, setLoading] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  const { toast } = useToast()

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    // Fetch payment details
    const fetchPaymentDetails = async () => {
      try {
        const details = await carService.getPaymentDetails()
        setPaymentDetails(details)
      } catch (error) {
        console.error("Failed to fetch payment details:", error)
        toast({
          title: "Error",
          description: "Failed to load payment details",
          variant: "destructive",
        })
      }
    }

    fetchPaymentDetails()

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [toast])

  const handlePayment = async () => {
    if (!paymentDetails || !paymentDetails.razorpay_key) {
      toast({
        title: "Error",
        description: "Payment details not available",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      let orderResponse
      if (paymentMethod === "full") {
        // Use the existing order ID for full payment
        orderResponse = { order_id: orderId, amount: bookingDetails.breakdown.total_amount }
      } else {
        // Create new order for partial payment
        orderResponse = await carService.reserveCar(
          bookingDetails.car_id,
          bookingDetails.start_time,
          bookingDetails.end_time
        )
      }

      const amount = paymentMethod === "full" 
        ? bookingDetails.breakdown.total_amount 
        : orderResponse.down_payment || Math.round(bookingDetails.breakdown.total_amount * 0.1)

      const options = {
        key: paymentDetails.razorpay_key,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "DriveEase",
        description: `Car Rental - ${paymentMethod === "full" ? "Full Payment" : "Partial Payment"}`,
        order_id: orderResponse.order_id,
        handler: (response: any) => {
          handlePaymentSuccess(response)
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment initiation failed:", error)
      toast({
        title: "Payment Failed",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const handlePaymentSuccess = async (response: any) => {
    try {
      // Verify payment with backend
      await carService.confirmPayment(
        response.razorpay_payment_id,
        response.razorpay_order_id,
        response.razorpay_signature,
      )
      onPaymentSuccess(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
    } catch (error) {
      console.error("Payment verification failed:", error)
      toast({
        title: "Payment Verification Failed",
        description: "Please contact support for assistance",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fullAmount = bookingDetails.breakdown.total_amount
  const partialAmount = Math.round(fullAmount * 0.1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={(value: "full" | "partial") => setPaymentMethod(value)}>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Pay Full Amount</div>
                      <div className="text-sm text-gray-600">Complete payment now</div>
                    </div>
                    <div className="text-lg font-bold">₹{fullAmount}</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="partial" id="partial" />
                <Label htmlFor="partial" className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Pay Partial Amount (10%)</div>
                      <div className="text-sm text-gray-600">Reserve now, pay remaining later</div>
                    </div>
                    <div className="text-lg font-bold">₹{partialAmount}</div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>

          {paymentMethod === "partial" && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Partial Payment Terms:</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>Pay 10% now to reserve the car</li>
                    <li>Remaining amount due at pickup</li>
                    <li>Booking will be cancelled if full payment not made within 24 hours of pickup time</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Powered by Razorpay</p>
                <p className="text-sm text-gray-500">Secure payment gateway</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                SSL Encrypted
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                PCI Compliant
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Your payment information is secure and encrypted. We do not store your card details.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handlePayment} disabled={loading || !paymentDetails} className="w-full md:w-auto" size="lg">
          {loading ? "Processing..." : `Pay ₹${paymentMethod === "full" ? fullAmount : partialAmount}`}
        </Button>
      </div>
    </motion.div>
  )
}
