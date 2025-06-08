"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, FileCheck, AlertCircle } from "lucide-react"
import { carService } from "@/lib/services/car-service"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface BookingConfirmationProps {
  bookingId: number
}

export function BookingConfirmation({ bookingId }: BookingConfirmationProps) {
  const [bookingStatus, setBookingStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchBookingStatus = async () => {
      try {
        // In a real implementation, you would fetch the booking status from the API
        const dashboardData = await carService.getUserDashboard()
        const booking = dashboardData.bookings.find((b: any) => b.id === bookingId)

        if (booking) {
          setBookingStatus(booking.status)
        } else {
          setError("Booking not found. It may have been cancelled or removed.")
        }
      } catch (error) {
        console.error("Failed to fetch booking status:", error)
        setError("Failed to load booking status. Please check your dashboard for updates.")
      } finally {
        setLoading(false)
      }
    }

    fetchBookingStatus()
  }, [bookingId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Processing Your Booking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Please wait while we process your booking...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            Booking Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            Booking Submitted Successfully
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-green-100 rounded-full p-6 mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600 text-center mb-6">
              Your booking has been submitted successfully and is now{" "}
              {bookingStatus === "approved" ? "approved" : "awaiting approval"}.
            </p>

            <div className="w-full max-w-md bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Booking ID</p>
                    <p className="text-gray-600">#{bookingId}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-gray-600 capitalize">{bookingStatus?.replace("_", " ")}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileCheck className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Next Steps</p>
                    <p className="text-gray-600">
                      {bookingStatus === "approved"
                        ? "Your booking is approved. You can pick up the car at the scheduled time."
                        : "Our team will review your documents and approve your booking soon."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
