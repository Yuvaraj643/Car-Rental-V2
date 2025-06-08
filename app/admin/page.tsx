"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CarIcon, Users, CreditCard, TrendingUp, Search, Filter, MoreHorizontal, CheckCircle, XCircle, Plus } from 'lucide-react'
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { adminService } from "@/lib/services/admin-service"
import Image from "next/image"

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
  documents?: {
    name: string
    address: string
    contact: string
    files: Record<string, string>
  }
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
  email: string
  phone_number: string
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [approvals, setApprovals] = useState<{ approvals: Booking[]; cars: Car[] } | null>(null)
  const [dashboardData, setDashboardData] = useState<{ cars: Car[] } | null>(null)
  const [bookingsData, setBookingsData] = useState<{ bookings: Booking[]; cars: Car[] } | null>(null)
  const [earningsData, setEarningsData] = useState<any>(null)

  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/")
      return
    }

    const fetchData = async () => {
      try {
        const [approvalsData, dashData, bookingsData, earningsData] = await Promise.all([
          adminService.getApprovals(),
          adminService.getDashboard(),
          adminService.getBookings(),
          adminService.getEarnings(),
        ])

        setApprovals(approvalsData)
        setDashboardData(dashData)
        setBookingsData(bookingsData)
        setEarningsData(earningsData)
      } catch (error) {
        console.error("Failed to fetch admin data:", error)
        toast({
          title: "Error",
          description: "Failed to load admin dashboard",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated, user, router, toast])

  const handleApproveBooking = async (bookingId: number) => {
    try {
      await adminService.approveBooking(bookingId)
      toast({
        title: "Success",
        description: "Booking approved successfully",
      })
      // Refresh approvals
      const approvalsData = await adminService.getApprovals()
      setApprovals(approvalsData)
    } catch (error) {
      console.error("Failed to approve booking:", error)
      toast({
        title: "Error",
        description: "Failed to approve booking",
        variant: "destructive",
      })
    }
  }

  const handleRejectBooking = async (bookingId: number) => {
    try {
      await adminService.rejectBooking(bookingId)
      toast({
        title: "Success",
        description: "Booking rejected successfully",
      })
      // Refresh approvals
      const approvalsData = await adminService.getApprovals()
      setApprovals(approvalsData)
    } catch (error) {
      console.error("Failed to reject booking:", error)
      toast({
        title: "Error",
        description: "Failed to reject booking",
        variant: "destructive",
      })
    }
  }

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

  const getCarForBooking = (carId: number, cars: Car[]): Car | undefined => {
    return cars.find(car => car.id === carId)
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

  const stats = {
    totalCars: dashboardData?.cars.length || 0,
    totalBookings: bookingsData?.bookings.length || 0,
    pendingApprovals: approvals?.approvals.length || 0,
    totalRevenue: earningsData?.total_platform || 0,
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your car rental platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CarIcon className="h-8 w-8 text-primary" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Cars</p>
                      <p className="text-2xl font-bold">{stats.totalCars}</p>
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
                    <Users className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                      <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                      <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="approvals">Approvals ({stats.pendingApprovals})</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="cars">Cars</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {approvals?.approvals.slice(0, 3).map((booking) => {
                          const car = getCarForBooking(booking.car_id, approvals.cars)
                          return (
                            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h3 className="font-medium">{car?.name || "Unknown Car"}</h3>
                                <p className="text-sm text-gray-600">{booking.user_email}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(booking.start_time).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleApproveBooking(booking.id)}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleRejectBooking(booking.id)}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                        {(!approvals?.approvals || approvals.approvals.length === 0) && (
                          <p className="text-gray-600 text-center py-4">No pending approvals</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bookingsData?.bookings.slice(0, 5).map((booking, index) => {
                          const car = getCarForBooking(booking.car_id, bookingsData.cars)
                          return (
                            <div key={booking.id} className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                              <div className="flex-1">
                                <p className="text-sm">
                                  Booking for {car?.name || "Unknown Car"} by {booking.user_email}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(booking.start_time).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                        {(!bookingsData?.bookings || bookingsData.bookings.length === 0) && (
                          <p className="text-gray-600 text-center py-4">No recent activity</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="approvals">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvals?.approvals.map((booking) => {
                        const car = getCarForBooking(booking.car_id, approvals.cars)
                        return (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden">
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
                                    <h3 className="font-semibold">{car?.name || "Unknown Car"}</h3>
                                    <p className="text-sm text-gray-600">{booking.user_email}</p>
                                  </div>
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status.replace("_", " ").charAt(0).toUpperCase() +
                                      booking.status.replace("_", " ").slice(1)}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
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
                                    <span className="font-medium">Documents:</span>{" "}
                                    {booking.documents ? "Submitted" : "Not submitted"}
                                  </div>
                                  <div>
                                    <span className="font-medium">Car Owner:</span> {car?.owner_name || "Unknown"}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveBooking(booking.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectBooking(booking.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem>View Documents</DropdownMenuItem>
                                    <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                                    <DropdownMenuItem>View Car Details</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {(!approvals?.approvals || approvals.approvals.length === 0) && (
                        <div className="text-center py-12">
                          <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
                          <p className="text-gray-600">All bookings have been processed</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>All Bookings</CardTitle>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookingsData?.bookings
                        .filter(
                          (booking) =>
                            booking.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            getCarForBooking(booking.car_id, bookingsData.cars)
                              ?.name.toLowerCase()
                              .includes(searchTerm.toLowerCase()),
                        )
                        .map((booking) => {
                          const car = getCarForBooking(booking.car_id, bookingsData.cars)
                          return (
                            <div key={booking.id} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-4 mb-2">
                                    <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden">
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
                                      <h3 className="font-semibold">{car?.name || "Unknown Car"}</h3>
                                      <p className="text-sm text-gray-600">{booking.user_email}</p>
                                    </div>
                                    <Badge className={getStatusColor(booking.status)}>
                                      {booking.status.replace("_", " ").charAt(0).toUpperCase() +
                                        booking.status.replace("_", " ").slice(1)}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
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
                                      <span className="font-medium">Car Owner:</span> {car?.owner_name || "Unknown"}
                                    </div>
                                    <div>
                                      <span className="font-medium">Booking ID:</span> #{booking.id}
                                    </div>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                                    <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                                    <DropdownMenuItem>Cancel Booking</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          )
                        })}
                      {(!bookingsData?.bookings || bookingsData.bookings.length === 0) && (
                        <div className="text-center py-12">
                          <CarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                          <p className="text-gray-600">No bookings have been made yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cars">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Manage Cars</CardTitle>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Car
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData?.cars.map((car, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                  {car.images?.[0] && (
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
                                  <h3 className="font-semibold">{car.name}</h3>
                                  <p className="text-sm text-gray-600">{car.owner_name}</p>
                                </div>
                                <Badge className="bg-green-100 text-green-800">Active</Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Location:</span> {car.location}
                                </div>
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
                                  <span className="font-medium">Contact:</span> {car.phone_number}
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Car</DropdownMenuItem>
                                <DropdownMenuItem>Contact Owner</DropdownMenuItem>
                                <DropdownMenuItem>Block Dates</DropdownMenuItem>
                                <DropdownMenuItem>Suspend Car</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                      {(!dashboardData?.cars || dashboardData.cars.length === 0) && (
                        <div className="text-center py-12">
                          <CarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                          <p className="text-gray-600">No cars have been added to the platform yet</p>
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
                      <CardTitle>Platform Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600">Total Platform Revenue</p>
                            <p className="text-2xl font-bold text-green-600">
                              ₹{earningsData?.total_platform?.toLocaleString() || 0}
                            </p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Earnings by Owner</h4>
                          {earningsData?.per_owner?.map((owner: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded">
                              <span className="text-sm">{owner.owner_email}</span>
                              <span className="font-medium">₹{owner.owner_total.toLocaleString()}</span>
                            </div>
                          ))}
                          {(!earningsData?.per_owner || earningsData.per_owner.length === 0) && (
                            <p className="text-gray-600 text-center py-4">No earnings data available</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {earningsData?.per_booking?.slice(0, 5).map((booking: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded">
                            <div>
                              <p className="font-medium">{booking.car_name}</p>
                              <p className="text-sm text-gray-600">{booking.period}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">₹{booking.booking_amount.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">
                                Platform: ₹{booking.platform_share.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        {(!earningsData?.per_booking || earningsData.per_booking.length === 0) && (
                          <p className="text-gray-600 text-center py-4">No booking revenue data available</p>
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
