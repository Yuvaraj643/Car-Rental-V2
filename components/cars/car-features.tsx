"use client"

import { motion } from "framer-motion"
import {
  AirVent,
  Bluetooth,
  Camera,
  Fuel,
  Gauge,
  Lock,
  MapPin,
  Music,
  Snowflake,
  Umbrella,
  Wifi,
  Wind,
} from "lucide-react"

const features = [
  {
    icon: Snowflake,
    name: "Air Conditioning",
    description: "Climate control for comfortable driving in any weather",
  },
  {
    icon: Music,
    name: "Audio System",
    description: "Premium sound system with multiple speakers",
  },
  {
    icon: Bluetooth,
    name: "Bluetooth",
    description: "Connect your devices wirelessly for calls and music",
  },
  {
    icon: Camera,
    name: "Backup Camera",
    description: "Rear view camera for safe parking and maneuvering",
  },
  {
    icon: Gauge,
    name: "Cruise Control",
    description: "Maintain a constant speed for highway driving",
  },
  {
    icon: MapPin,
    name: "GPS Navigation",
    description: "Built-in navigation system for hassle-free travel",
  },
  {
    icon: Lock,
    name: "Keyless Entry",
    description: "Convenient access without using physical keys",
  },
  {
    icon: Umbrella,
    name: "Sunroof",
    description: "Retractable roof panel for fresh air and sunlight",
  },
  {
    icon: Wifi,
    name: "Wi-Fi Hotspot",
    description: "Stay connected with in-car internet access",
  },
  {
    icon: AirVent,
    name: "Heated Seats",
    description: "Warm seating for cold weather comfort",
  },
  {
    icon: Wind,
    name: "Power Windows",
    description: "Electric window controls for all passengers",
  },
  {
    icon: Fuel,
    name: "Fuel Efficient",
    description: "Optimized engine for maximum fuel economy",
  },
]

export function CarFeatures() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Car Features</h3>
        <p className="text-gray-700 mb-6">
          This vehicle comes equipped with a range of features designed for your comfort, convenience, and safety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="bg-primary/10 p-3 rounded-full">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">{feature.name}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
