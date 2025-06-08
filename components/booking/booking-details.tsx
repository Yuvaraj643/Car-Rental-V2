"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Fuel } from "lucide-react"
import Image from "next/image"

interface BookingDetailsProps {
  car: any
  bookingDetails: any
  startTime: string
  endTime: string
  onContinue: () => void
  loading: boolean
}

export function BookingDetails({ car, bookingDetails, startTime, endTime, onContinue, loading }: BookingDetailsProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const [date, time] = dateString.split(" ")
    return { date, time }
  }

  const pickupDate = formatDate(startTime)
  const returnDate = formatDate(endTime)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Car Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=250&width=400" alt={car.name} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-2">{car.name}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {car.location}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{car.seats} seats</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Fuel className="h-4 w-4 mr-2" />
                  <span>{car.fuel_type}</span>
                </div>
              </div>

              <div className="text-lg font-semibold text-primary">₹{car.price_per_day} per day</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Pickup Details</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-gray-600">{pickupDate.date}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-gray-600">{pickupDate.time}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-600">{car.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Return Details</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-gray-600">{returnDate.date}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div className="text-gray-600">{returnDate.time}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-600">{car.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Car rental ({bookingDetails.breakdown.car_price_total / car.price_per_day} days)
              </span>
              <span>₹{bookingDetails.breakdown.car_price_total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Car wash charge</span>
              <span>₹{bookingDetails.breakdown.car_wash_charge}</span>
            </div>
            {bookingDetails.breakdown.late_night_charge > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Late night charge</span>
                <span>₹{bookingDetails.breakdown.late_night_charge}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-3 border-t">
              <span>Total</span>
              <span>₹{bookingDetails.breakdown.total_amount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onContinue} disabled={loading} className="w-full md:w-auto">
          {loading ? "Processing..." : "Continue to Payment"}
        </Button>
      </div>
    </motion.div>
  )
}
