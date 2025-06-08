"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Fuel, Car } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CarCardProps {
  car: {
    name: string
    location: string
    price_per_day: string
    seats: string
    fuel_type: string
    vehicle_color: string
    images: string[]
    owner_name: string
    blocks?: Array<{ start: string; end: string }>
  }
  carId: number
  viewMode: "grid" | "list"
}

export function CarCard({ car, carId, viewMode }: CarCardProps) {
  const isAvailable = !car.blocks || car.blocks.length === 0

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full">
        <div className={viewMode === "grid" ? "flex flex-col" : "flex flex-col md:flex-row"}>
          {/* Car Image */}
          <div
            className={`relative ${
              viewMode === "grid" ? "h-48" : "h-48 md:h-auto md:w-1/3"
            } overflow-hidden bg-gray-200`}
          >
            {car.images && car.images.length > 0 ? (
              <Image
                src={`http://127.0.0.1:5000/static/images/${car.images[0]}`}
                alt={car.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Car className="h-12 w-12 text-gray-400" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge className={isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </div>

          {/* Car Details */}
          <CardContent
            className={`flex flex-col ${viewMode === "grid" ? "p-4" : "p-4 md:p-6 md:w-2/3"} justify-between h-full`}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{car.name}</h3>
                <p className="text-lg font-bold text-primary">₹{car.price_per_day}/day</p>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{car.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{car.seats} seats</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Fuel className="h-4 w-4 mr-1" />
                  <span className="text-sm">{car.fuel_type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Immediate</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span
                    className="h-4 w-4 mr-1 rounded-full"
                    style={{ backgroundColor: car.vehicle_color.toLowerCase() }}
                  ></span>
                  <span className="text-sm">{car.vehicle_color}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <Link href={`/cars/${carId}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
