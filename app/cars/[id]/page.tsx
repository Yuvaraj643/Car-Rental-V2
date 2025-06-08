"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Fuel, MapPin, Shield, Star, Users, Info, AlertCircle } from "lucide-react"
import { CarImageGallery } from "@/components/cars/car-image-gallery"
import { CarFeatures } from "@/components/cars/car-features"
import { CarReviews } from "@/components/cars/car-reviews"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { carService } from "@/lib/services/car-service"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { useAuth } from "@/hooks/use-auth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const carId = Number.parseInt(params.id)
  const [car, setCar] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])

  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await carService.getCars()
        if (data.cars && data.cars[carId]) {
          setCar(data.cars[carId])

          // Process unavailable dates from blocks
          if (data.cars[carId].blocks && data.cars[carId].blocks.length > 0) {
            const blockedDates: Date[] = []
            data.cars[carId].blocks.forEach((block: { start: string; end: string }) => {
              const startDate = new Date(block.start)
              const endDate = new Date(block.end)

              // Add all dates between start and end to blockedDates
              const currentDate = new Date(startDate)
              while (currentDate <= endDate) {
                blockedDates.push(new Date(currentDate))
                currentDate.setDate(currentDate.getDate() + 1)
              }
            })

            setUnavailableDates(blockedDates)
          }
        } else {
          setError("Car not found")
          toast({
            title: "Error",
            description: "Car not found",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Failed to fetch car:", error)
        setError("Failed to load car details")
        toast({
          title: "Error",
          description: "Failed to load car details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [carId, router, toast])

  const calculateBookingDetails = async () => {
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Select Dates",
        description: "Please select both pickup and return dates",
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)

    try {
      // Format dates for API
      const startTime = format(dateRange.from, "yyyy-MM-dd HH:mm")
      const endTime = format(dateRange.to, "yyyy-MM-dd HH:mm")

      const details = await carService.bookCar(carId, startTime, endTime)
      setBookingDetails(details)

      toast({
        title: "Price Calculated",
        description: "Booking details have been calculated successfully",
      })
    } catch (error) {
      console.error("Failed to calculate booking:", error)
      toast({
        title: "Error",
        description: "Failed to calculate booking details. Please try different dates.",
        variant: "destructive",
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book this car",
      })
      router.push("/auth/login")
      return
    }

    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Select Dates",
        description: "Please select both pickup and return dates",
        variant: "destructive",
      })
      return
    }

    if (!bookingDetails) {
      toast({
        title: "Calculate Price",
        description: "Please calculate the price before booking",
        variant: "destructive",
      })
      return
    }

    const startTime = format(dateRange.from, "yyyy-MM-dd HH:mm")
    const endTime = format(dateRange.to, "yyyy-MM-dd HH:mm")

    router.push(`/booking/${carId}?start=${startTime}&end=${endTime}`)
  }

  // Function to check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        unavailableDate.getFullYear() === date.getFullYear() &&
        unavailableDate.getMonth() === date.getMonth() &&
        unavailableDate.getDate() === date.getDate(),
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-300 rounded w-1/4" />
              <div className="h-96 bg-gray-300 rounded" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                  <div className="h-4 bg-gray-300 rounded w-2/3" />
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

  if (error || !car) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-md">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || "Car not found"}</AlertDescription>
            </Alert>
            <div className="text-center">
              <Button onClick={() => router.push("/cars")}>Back to Cars</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const isCarAvailable = !car.blocks || car.blocks.length === 0

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-primary">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/cars" className="hover:text-primary">
              Cars
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{car.name}</span>
          </div>

          {/* Car Title Section */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{car.name}</h1>
                <Badge className={isCarAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {isCarAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {car.location}
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span>4.8</span>
                  <span className="text-gray-500 ml-1">(124 reviews)</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold text-primary">₹{car.price_per_day}</div>
              <div className="text-sm text-gray-600">per day</div>
            </div>
          </div>

          {/* Unavailable Alert */}
          {!isCarAvailable && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Car Currently Unavailable</AlertTitle>
              <AlertDescription>
                This car is currently blocked by the owner. Please check back later or choose another car.
              </AlertDescription>
            </Alert>
          )}

          {/* Car Gallery and Booking Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Car Gallery - Takes 2/3 of the width on large screens */}
            <div className="lg:col-span-2">
              <CarImageGallery images={car.images} carName={car.name} />
            </div>

            {/* Booking Card - Takes 1/3 of the width on large screens */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 border sticky top-24"
              >
                <h2 className="text-xl font-bold mb-4">Book this car</h2>

                {isCarAvailable ? (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Dates</label>
                      <DateRangePicker
                        value={dateRange}
                        onChange={setDateRange}
                        className="w-full"
                        placeholder="Select pickup and return dates"
                        disabled={isDateUnavailable}
                      />
                      {unavailableDates.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Some dates are unavailable due to owner restrictions
                        </p>
                      )}
                    </div>

                    {bookingDetails ? (
                      <div className="mb-6 space-y-3">
                        <h3 className="font-semibold">Price Breakdown</h3>
                        <div className="flex justify-between text-sm">
                          <span>
                            Car rental (
                            {Math.ceil(bookingDetails.breakdown.car_price_total / Number(car.price_per_day))} days)
                          </span>
                          <span>₹{bookingDetails.breakdown.car_price_total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Car wash charge</span>
                          <span>₹{bookingDetails.breakdown.car_wash_charge}</span>
                        </div>
                        {bookingDetails.breakdown.late_night_charge > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Late night charge</span>
                            <span>₹{bookingDetails.breakdown.late_night_charge}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold pt-2 border-t">
                          <span>Total</span>
                          <span>₹{bookingDetails.breakdown.total_amount}</span>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={calculateBookingDetails}
                        variant="outline"
                        className="w-full mb-4"
                        disabled={!dateRange.from || !dateRange.to || isCalculating}
                      >
                        {isCalculating ? "Calculating..." : "Calculate Price"}
                      </Button>
                    )}

                    <Button
                      onClick={handleBookNow}
                      className="w-full"
                      disabled={!dateRange.from || !dateRange.to || !bookingDetails}
                    >
                      Book Now
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">This car is currently unavailable for booking.</p>
                    <Button variant="outline" onClick={() => router.push("/cars")}>
                      Browse Other Cars
                    </Button>
                  </div>
                )}

                <div className="mt-6 text-sm text-gray-600">
                  <div className="flex items-center mb-2">
                    <Shield className="h-4 w-4 mr-2 text-green-600" />
                    Free cancellation up to 24 hours before pickup
                  </div>
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-600" />
                    No security deposit required
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Car Details Tabs */}
          <Tabs defaultValue="details" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Car Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium">Seats</span>
                  </div>
                  <p>{car.seats} seats</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Fuel className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium">Fuel Type</span>
                  </div>
                  <p>{car.fuel_type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium">Model Year</span>
                  </div>
                  <p>{car.purchase_date ? new Date(car.purchase_date).getFullYear() : "2023"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <span className="font-medium">Availability</span>
                  </div>
                  <p>{isCarAvailable ? "Available" : "Blocked"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">About this car</h3>
                <p className="text-gray-700 leading-relaxed">
                  The {car.name} is a {car.vehicle_color} {car.fuel_type} vehicle with {car.seats} seats, perfect for
                  {Number.parseInt(car.seats) >= 6
                    ? " family trips and group outings"
                    : " city driving and weekend getaways"}
                  . This well-maintained vehicle offers a smooth driving experience with excellent fuel efficiency and
                  modern features for your comfort and convenience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Owner Information</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Owner:</span> {car.owner_name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Response Rate:</span> 98%
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Response Time:</span> Within 1 hour
                </p>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <CarFeatures />
            </TabsContent>

            <TabsContent value="reviews">
              <CarReviews />
            </TabsContent>

            <TabsContent value="policies">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Rental Policies</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Minimum rental period is 24 hours.</li>
                    <li>Driver must be at least 21 years old with a valid driving license.</li>
                    <li>Security deposit may be required at the time of pickup.</li>
                    <li>Fuel policy: Return with the same fuel level as pickup.</li>
                    <li>Late returns will incur additional charges.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Cancellation Policy</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Free cancellation up to 24 hours before pickup.</li>
                    <li>50% refund for cancellations between 24 and 12 hours before pickup.</li>
                    <li>No refund for cancellations less than 12 hours before pickup.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Insurance Coverage</h3>
                  <p className="text-gray-700 mb-4">
                    All rentals include basic insurance coverage. Additional coverage options are available at pickup.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Collision Damage Waiver (CDW)</li>
                    <li>Third-Party Liability</li>
                    <li>Personal Accident Insurance (optional)</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
