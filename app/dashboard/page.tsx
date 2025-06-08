"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CarIcon, CreditCard, FileText, MapPin, Star, Clock, AlertCircle } from 'lucide-react'
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { carService } from "@/lib/services/car-service"
import Image from "next/image"

interface Booking {
  id: number
  car_id: number
  start_time: string
  end_time: string
  status: string
  ride_status?: string
  breakdown: {
    total_amount: number
    car_price_total: number
    car_wash_charge: number
    late_night_charge: number
  }
  down_payment: number
  due_amount: number
  documents?: {
    name: string
    address: string
    contact: string
    files: Record<string, string>
  }
  start_otp?: string
  end_otp?: string
  actual_start_time?: string
}

interface Car {
  name: string
  location: string
  price_per_day: string
  seats: string
  fuel_type: string
  vehicle_color: string
  images: string[]
  owner_name: string
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<{
    bookings: Booking[]
    cars: Car[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    const fetchDashboard = async () => {
      try {
        const data = await carService.getUserDashboard()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [isAuthenticated, router, toast])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "documents_rejected":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getRideStatusColor = (rideStatus?: string) => {
    switch (rideStatus) {
      case "live":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getCarForBooking = (carId: number): Car | undefined => {
    return dashboardData?.cars.find((car) => car.id === carId)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-300 rounded w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-300 rounded" />
                ))}
              </div>
              <div className="h-96 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Unable to Load Dashboard</h1>
            <p className="mb-6">Please try refreshing the page.</p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const stats = {
    totalBookings: dashboardData.bookings.length,
    activeBookings: dashboardData.bookings.filter((b) => b.status === "approved" && !b.ride_status).length,
    completedBookings: dashboardData.bookings.filter((b) => b.ride_status === "completed").length,
    totalSpent: dashboardData.bookings
      .filter((b) => b.status === "approved")
      .reduce((sum, b) => sum + b.breakdown.total_amount, 0),
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.email?.split("@")[0]}!</h1>
              <p className="text-gray-600">Manage your bookings and account settings</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CarIcon className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <p className="text-2xl font-bold">{stats.totalBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                      <p className="text-2xl font-bold">{stats.activeBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold">{stats.completedBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Spent</p>
                      <p className="text-2xl font-bold">₹{stats.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dashboardData.bookings.slice(0, 3).map((booking) => {
                          const car = getCarForBooking(booking.car_id)
                          return (
                            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center">
                                <div className="w-16 h-12 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                                  {car?.images?.[0] && (
                                    <Image
                                      src={`http://127.0.0.1:5000/static/images/${car.images[0]}`}
                                      alt={car.name}
                                      width={64}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium">{car?.name || "Unknown Car"}</h3>
                                  <p className="text-sm text-gray-600">
                                    {new Date(booking.start_time).toLocaleDateString()} -{" "}
                                    {new Date(booking.end_time).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">₹{booking.breakdown.total_amount.toLocaleString()}</p>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status.replace("_", " ").charAt(0).toUpperCase() +
                                    booking.status.replace("_", " ").slice(1)}
                                </Badge>
                              </div>
                            </div>
                          )
                        })}
                        {dashboardData.bookings.length === 0 && (
                          <div className="text-center py-8">
                            <CarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No bookings yet</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button asChild className="w-full">
                          <Link href="/cars">Browse Cars</Link>
                        </Button>
                        {dashboardData.bookings.some((b) => b.due_amount > 0) && (
                          <Button variant="outline" className="w-full">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Pending Amount
                          </Button>
                        )}
                        {dashboardData.bookings.some((b) => b.status === "documents_rejected") && (
                          <Button variant="outline" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            Resubmit Documents
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dashboardData.bookings.length === 0 ? (
                      <div className="text-center py-12">
                        <CarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-600 mb-6">Start your journey by booking your first car</p>
                        <Button asChild>
                          <Link href="/cars">Browse Cars</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dashboardData.bookings.map((booking) => {
                          const car = getCarForBooking(booking.car_id)
                          return (
                            <motion.div
                              key={booking.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex items-center mb-4 md:mb-0">
                                  <div className="w-24 h-16 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                                    {car?.images?.[0] && (
                                      <Image
                                        src={`http://127.0.0.1:5000/static/images/${car.images[0]}`}
                                        alt={car.name}
                                        width={96}
                                        height={64}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-lg">{car?.name || "Unknown Car"}</h3>
                                    <div className="flex items-center text-gray-600 text-sm">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {car?.location || "Unknown Location"}
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm mt-1">
                                      <Calendar className="h-4 w-4 mr-1" />
                                      {new Date(booking.start_time).toLocaleDateString()} -{" "}
                                      {new Date(booking.end_time).toLocaleDateString()}
                                    </div>
                                    {booking.ride_status && (
                                      <div className="flex items-center text-gray-600 text-sm mt-1">
                                        <Clock className="h-4 w-4 mr-1" />
                                        Ride Status: {booking.ride_status}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-col md:items-end">
                                  <div className="flex gap-2 mb-2">
                                    <Badge className={getStatusColor(booking.status)}>
                                      {booking.status.replace("_", " ").charAt(0).toUpperCase() +
                                        booking.status.replace("_", " ").slice(1)}
                                    </Badge>
                                    {booking.ride_status && (
                                      <Badge className={getRideStatusColor(booking.ride_status)}>
                                        {booking.ride_status.charAt(0).toUpperCase() + booking.ride_status.slice(1)}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-lg font-bold">
                                    ₹{booking.breakdown.total_amount.toLocaleString()}
                                  </div>
                                  {booking.due_amount > 0 && (
                                    <div className="text-sm text-red-600 font-medium">
                                      Due: ₹{booking.due_amount.toLocaleString()}
                                    </div>
                                  )}
                                  <div className="flex gap-2 mt-2">
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                    {booking.due_amount > 0 && (
                                      <Button size="sm">Pay Due</Button>
                                    )}
                                    {booking.status === "documents_rejected" && (
                                      <Button size="sm" variant="destructive">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        Resubmit Docs
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      My Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.bookings
                        .filter((b) => b.documents)
                        .map((booking) => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-medium">Booking #{booking.id}</h3>
                                <p className="text-sm text-gray-600">{booking.documents?.name}</p>
                              </div>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.replace("_", " ").charAt(0).toUpperCase() +
                                  booking.status.replace("_", " ").slice(1)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {booking.documents?.files &&
                                Object.entries(booking.documents.files).map(([type, path]) => (
                                  <div key={type} className="border rounded p-3">
                                    <p className="text-sm font-medium capitalize">
                                      {type.replace("_", " ")}
                                    </p>
                                    <p className="text-xs text-gray-500">Uploaded</p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      {dashboardData.bookings.filter((b) => b.documents).length === 0 && (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No documents uploaded yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.bookings
                        .filter((b) => b.status === "approved")
                        .map((booking) => {
                          const car = getCarForBooking(booking.car_id)
                          return (
                            <div key={booking.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">{car?.name || "Unknown Car"}</h3>
                                  <p className="text-sm text-gray-600">
                                    Booking #{booking.id.toString().padStart(6, "0")}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {new Date(booking.start_time).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold">
                                    ₹{booking.breakdown.total_amount.toLocaleString()}
                                  </div>
                                  {booking.due_amount > 0 ? (
                                    <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
                                  ) : (
                                    <Badge className="bg-green-100 text-green-800">Paid</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      {dashboardData.bookings.filter((b) => b.status === "approved").length === 0 && (
                        <div className="text-center py-8">
                          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No payments yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
