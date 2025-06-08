"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CarIcon, CreditCard, TrendingUp, Calendar, Edit, Eye, MoreHorizontal, Clock, MapPin } from 'lucide-react'
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ownerService } from "@/lib/services/owner-service"
import Image from "next/image"

interface Car {
  name: string
  location: string
  price_per_day: string
  seats: string
  fuel_type: string
  vehicle_color: string
  images: string[]
  owner_name: string
  email: string
  phone_number: string
  blocks: Array<{ start: string; end: string }>
}

interface Booking {
  id: number
  car_id: number
  user_email: string
  start_time: string
  end_time: string
  status: string
  breakdown: {
    total_amount: number
  }
}

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<{
    cars: Car[]
    live_bookings: Booking[]
    owner_car_pairs: any[]
  } | null>(null)
  const [earningsData, setEarningsData] = useState<any>(null)

  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "owner") {
      router.push("/")
      return
    }

    const fetchData = async () => {
      try {
        const [dashData, earningsData] = await Promise.all([
          ownerService.getDashboard(),
          ownerService.getEarnings(),
        ])

        setDashboardData(dashData)
        setEarningsData(earningsData)
      } catch (error) {
        console.error("Failed to fetch owner data:", error)
        toast({
          title: "Error",
          description: "Failed to load owner dashboard",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated, user, router, toast])

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

  const getAvailabilityColor = (car: Car) => {
    const hasActiveBlocks = car.blocks && car.blocks.length > 0
    if (hasActiveBlocks) {
      return "bg-red-100 text-red-800"
    }
    return "bg-green-100 text-green-800"
  }

  const getAvailabilityText = (car: Car) => {
    const hasActiveBlocks = car.blocks && car.blocks.length > 0
    return hasActiveBlocks ? "Blocked" : "Available"
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-300 rounded w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
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
    totalCars: dashboardData.cars.length,
    totalEarnings: earningsData?.total_owner || 0,
    totalBookings: earningsData?.per_booking?.length || 0,
    activeBookings: dashboardData.live_bookings.length,
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
              <p className="text-gray-600">Manage your cars and track your earnings</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CarIcon className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">My Cars</p>
                      <p className="text-2xl font-bold">{stats.totalCars}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
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
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                      <p className="text-2xl font-bold">{stats.activeBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cars">My Cars</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {earningsData?.per_booking?.slice(0, 3).map((booking: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{booking.car_name}</h3>
                              <p className="text-sm text-gray-600">{booking.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₹{booking.owner_share.toLocaleString()}</p>
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            </div>
                          </div>
                        ))}
                        {(!earningsData?.per_booking || earningsData.per_booking.length === 0) && (
                          <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No bookings yet</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Car Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dashboardData.cars.map((car, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center">
                              <div className="w-12 h-8 bg-gray-200 rounded mr-3 overflow-hidden">
                                {car.images?.[0] && (
                                  <Image
                                    src={`http://127.0.0.1:5000/static/images/${car.images[0]}`}
                                    alt={car.name}
                                    width={48}
                                    height={32}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{car.name}</h3>
                                <p className="text-sm text-gray-600">₹{car.price_per_day}/day</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getAvailabilityColor(car)}>{getAvailabilityText(car)}</Badge>
                            </div>
                          </div>
                        ))}
                        {dashboardData.cars.length === 0 && (
                          <div className="text-center py-8">
                            <CarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No cars listed yet</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="cars">
                <Card>
                  <CardHeader>
                    <CardTitle>My Cars</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.cars.map((car, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden">
                                  {car.images?.[0] && (
                                    <Image
                                      src={`http://127.0.0.1:5000/static/images/${car.images[0]}`}
                                      alt={car.name}
                                      width={80}
                                      height={56}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold">{car.name}</h3>
                                  <div className="flex items-center text-gray-600 text-sm">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {car.location}
                                  </div>
                                </div>
                                <Badge className={getAvailabilityColor(car)}>{getAvailabilityText(car)}</Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Price:</span> ₹{car.price_per_day}/day
                                </div>
                                <div>
                                  <span className="font-medium">Seats:</span> {car.seats}
                                </div>
                                <div>
                                  <span className="font-medium">Fuel:</span> {car.fuel_type}
                                </div>
                                <div>
                                  <span className="font-medium">Color:</span> {car.vehicle_color}
                                </div>
                                <div>
                                  <span className="font-medium">Blocks:</span> {car.blocks?.length || 0}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                  <DropdownMenuItem>Manage Blocks</DropdownMenuItem>
                                  <DropdownMenuItem>Update Availability</DropdownMenuItem>
                                  <DropdownMenuItem>Manage Photos</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                      {dashboardData.cars.length === 0 && (
                        <div className="text-center py-12">
                          <CarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No cars listed</h3>
                          <p className="text-gray-600 mb-6">Contact admin to add your cars to the platform</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.live_bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <div>
                                  <h3 className="font-semibold">Booking #{booking.id}</h3>
                                  <p className="text-sm text-gray-600">{booking.user_email}</p>
                                </div>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status.replace("_", " ").charAt(0).toUpperCase() +
                                    booking.status.replace("_", " ").slice(1)}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Dates:</span>{" "}
                                  {new Date(booking.start_time).toLocaleDateString()} to{" "}
                                  {new Date(booking.end_time).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="font-medium">Amount:</span> ₹
                                  {booking.breakdown.total_amount.toLocaleString()}
                                </div>
                                <div>
                                  <span className="font-medium">Car:</span>{" "}
                                  {dashboardData.cars[booking.car_id]?.name || "Unknown"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              <Button size="sm">Manage Ride</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {dashboardData.live_bookings.length === 0 && (
                        <div className="text-center py-12">
                          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No live bookings</h3>
                          <p className="text-gray-600">No active bookings at the moment</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Earnings Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600">Total Earnings</p>
                            <p className="text-2xl font-bold text-green-600">
                              ₹{earningsData?.total_owner?.toLocaleString() || 0}
                            </p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-600">This Month</p>
                            <p className="text-lg font-bold">₹0</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm text-gray-600">Last Month</p>
                            <p className="text-lg font-bold">₹0</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Earnings by Booking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {earningsData?.per_booking?.map((booking: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{booking.car_name}</p>
                              <p className="text-sm text-gray-600">{booking.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₹{booking.owner_share.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">
                                Total: ₹{booking.booking_amount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        {(!earningsData?.per_booking || earningsData.per_booking.length === 0) && (
                          <div className="text-center py-8">
                            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No earnings yet</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
