"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { BookingSteps } from "@/components/booking/booking-steps"
import { BookingDetails } from "@/components/booking/booking-details"
import { PaymentOptions } from "@/components/booking/payment-options"
import { DocumentUpload } from "@/components/booking/document-upload"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { carService } from "@/lib/services/car-service"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

export default function BookingPage({ params }: { params: { id: string } }) {
  const carId = Number.parseInt(params.id)
  const [car, setCar] = useState<any>(null)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState<"details" | "payment" | "documents" | "confirmation">("details")
  const [bookingId, setBookingId] = useState<number | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { isAuthenticated, user } = useAuth()

  const startTime = searchParams.get("start")
  const endTime = searchParams.get("end")

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book a car",
      })
      router.push("/auth/login")
      return
    }

    if (!startTime || !endTime) {
      toast({
        title: "Missing information",
        description: "Please select dates before booking",
      })
      router.push(`/cars/${carId}`)
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch booking details
        const details = await carService.bookCar(carId, startTime, endTime)
        setBookingDetails(details)
        setCar(details.car)
      } catch (error) {
        console.error("Failed to fetch booking data:", error)
        setError("Failed to load booking details. The car might not be available for the selected dates.")
        toast({
          title: "Error",
          description: "Failed to load booking details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [carId, startTime, endTime, isAuthenticated, router, toast, user])

  const handleReserve = async () => {
    try {
      setLoading(true)
      const response = await carService.reserveCar(carId, startTime!, endTime!)
      setOrderId(response.order_id)
      setCurrentStep("payment")
      toast({
        title: "Car Reserved",
        description: "Please complete the payment to confirm your booking",
      })
    } catch (error) {
      console.error("Failed to reserve car:", error)
      toast({
        title: "Reservation Failed",
        description: "Unable to reserve the car. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = (paymentId: string, orderId: string, signature: string) => {
    // In a real app, this would verify the payment with the backend
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully",
    })
    setCurrentStep("documents")
  }

  const handleDocumentsSubmitted = (bookingId: number) => {
    setBookingId(bookingId)
    setCurrentStep("confirmation")
    toast({
      title: "Documents Submitted",
      description: "Your documents have been submitted for review",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-300 rounded w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <div className="h-12 bg-gray-300 rounded" />
                  <div className="h-64 bg-gray-300 rounded" />
                </div>
                <div className="h-64 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-md">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="text-center">
              <Button onClick={() => router.push(`/cars/${carId}`)}>Back to Car Details</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!car || !bookingDetails) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Booking Information Not Available</h1>
            <p className="mb-6">We couldn't load the booking details. Please try again.</p>
            <Button onClick={() => router.push(`/cars/${carId}`)}>Back to Car Details</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book Your Car</h1>
            <p className="text-gray-600">Complete your booking in a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 of the width on large screens */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <BookingSteps currentStep={currentStep} />
                </CardContent>
              </Card>

              <Tabs value={currentStep} className="mb-8">
                <TabsContent value="details">
                  <BookingDetails
                    car={car}
                    bookingDetails={bookingDetails}
                    startTime={startTime!}
                    endTime={endTime!}
                    onContinue={handleReserve}
                    loading={loading}
                  />
                </TabsContent>

                <TabsContent value="payment">
                  <PaymentOptions
                    bookingDetails={bookingDetails}
                    orderId={orderId!}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </TabsContent>

                <TabsContent value="documents">
                  <DocumentUpload carId={carId} onDocumentsSubmitted={handleDocumentsSubmitted} />
                </TabsContent>

                <TabsContent value="confirmation">
                  <BookingConfirmation bookingId={bookingId!} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Summary - Takes 1/3 of the width on large screens */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 border sticky top-24"
              >
                <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-lg w-20 h-20 mr-4 overflow-hidden">
                      {car.images && car.images.length > 0 && (
                        <Image
                          src={`http://127.0.0.1:5000/static/images/${car.images[0]}`}
                          alt={car.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{car.name}</h3>
                      <p className="text-sm text-gray-600">{car.location}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pickup Date</span>
                      <span className="font-medium">{startTime?.split(" ")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pickup Time</span>
                      <span className="font-medium">{startTime?.split(" ")[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return Date</span>
                      <span className="font-medium">{endTime?.split(" ")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return Time</span>
                      <span className="font-medium">{endTime?.split(" ")[1]}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Car Rental</span>
                      <span>₹{bookingDetails.breakdown.car_price_total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Car Wash Charge</span>
                      <span>₹{bookingDetails.breakdown.car_wash_charge}</span>
                    </div>
                    {bookingDetails.breakdown.late_night_charge > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Late Night Charge</span>
                        <span>₹{bookingDetails.breakdown.late_night_charge}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>₹{bookingDetails.breakdown.total_amount}</span>
                  </div>

                  {currentStep === "payment" && (
                    <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                      <p className="font-medium">Payment Pending</p>
                      <p>Please complete your payment to confirm the booking.</p>
                    </div>
                  )}

                  {currentStep === "documents" && (
                    <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                      <p className="font-medium">Documents Required</p>
                      <p>Please upload the required documents to proceed.</p>
                    </div>
                  )}

                  {currentStep === "confirmation" && (
                    <div className="bg-green-50 p-3 rounded-md text-sm text-green-800">
                      <p className="font-medium">Booking Submitted</p>
                      <p>Your booking is awaiting approval.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
