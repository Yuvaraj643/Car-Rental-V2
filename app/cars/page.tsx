"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CarCard } from "@/components/cars/car-card"
import { CarFilters } from "@/components/cars/car-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid, List } from 'lucide-react'
import { carService } from "@/lib/services/car-service"
import { useToast } from "@/hooks/use-toast"

interface Car {
  name: string
  location: string
  price_per_day: string
  seats: string
  fuel_type: string
  vehicle_color: string
  images: string[]
  owner_name: string
  expiry_date: string
  blocks: Array<{ start: string; end: string }>
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getCars()
        setCars(data.cars)
        setFilteredCars(data.cars)
      } catch (error) {
        console.error("Failed to fetch cars:", error)
        toast({
          title: "Error",
          description: "Failed to load cars",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [toast])

  useEffect(() => {
    const filtered = cars.filter(
      (car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.fuel_type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCars(filtered)
  }, [searchTerm, cars])

  const handleFilterChange = (filters: any) => {
    let filtered = [...cars]

    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter((car) => {
        const price = parseInt(car.price_per_day)
        return price >= filters.priceRange[0] && price <= filters.priceRange[1]
      })
    }

    // Apply fuel type filter
    if (filters.fuelType && filters.fuelType.length > 0) {
      filtered = filtered.filter((car) => filters.fuelType.includes(car.fuel_type))
    }

    // Apply seats filter
    if (filters.seats && filters.seats.length > 0) {
      filtered = filtered.filter((car) => filters.seats.includes(car.seats))
    }

    // Apply location filter
    if (filters.location && filters.location !== "All Locations") {
      filtered = filtered.filter((car) => car.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.fuel_type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredCars(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-300 rounded w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-300 h-80 rounded-lg" />
                ))}
              </div>
            </div>
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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Ride</h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Choose from our premium collection of vehicles for your next adventure
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by car name, location, or fuel type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and View Controls */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <span className="text-gray-600">{filteredCars.length} cars available</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Panel */}
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="py-6 bg-gray-50 border-b"
          >
            <div className="container mx-auto px-4">
              <CarFilters onFilterChange={handleFilterChange} />
            </div>
          </motion.section>
        )}

        {/* Cars Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredCars.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No cars found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your search criteria or filters</p>
                <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
              </div>
            ) : (
              <motion.div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CarCard car={car} carId={index} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
