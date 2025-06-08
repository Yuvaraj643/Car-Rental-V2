"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterOptions {
  priceRange: [number, number]
  fuelType: string[]
  seats: string[]
  location: string
}

interface CarFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
}

export function CarFilters({ onFilterChange }: CarFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000],
    fuelType: [],
    seats: [],
    location: "All Locations",
  })

  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"]
  const seatOptions = ["2", "4", "5", "7", "8+"]
  const locations = ["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai"]

  const handleFuelTypeChange = (fuelType: string, checked: boolean) => {
    const newFuelTypes = checked
      ? [...filters.fuelType, fuelType]
      : filters.fuelType.filter((type) => type !== fuelType)

    const newFilters = { ...filters, fuelType: newFuelTypes }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSeatsChange = (seats: string, checked: boolean) => {
    const newSeats = checked ? [...filters.seats, seats] : filters.seats.filter((seat) => seat !== seats)

    const newFilters = { ...filters, seats: newSeats }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceRangeChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleLocationChange = (location: string) => {
    const newFilters = { ...filters, location }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      priceRange: [0, 10000] as [number, number],
      fuelType: [],
      seats: [],
      location: "All Locations",
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range (per day)</Label>
        <div className="px-3">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Fuel Type</Label>
        <div className="space-y-2">
          {fuelTypes.map((fuelType) => (
            <div key={fuelType} className="flex items-center space-x-2">
              <Checkbox
                id={fuelType}
                checked={filters.fuelType.includes(fuelType)}
                onCheckedChange={(checked) => handleFuelTypeChange(fuelType, checked as boolean)}
              />
              <Label htmlFor={fuelType} className="text-sm">
                {fuelType}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Seats */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Number of Seats</Label>
        <div className="space-y-2">
          {seatOptions.map((seats) => (
            <div key={seats} className="flex items-center space-x-2">
              <Checkbox
                id={seats}
                checked={filters.seats.includes(seats)}
                onCheckedChange={(checked) => handleSeatsChange(seats, checked as boolean)}
              />
              <Label htmlFor={seats} className="text-sm">
                {seats} seats
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Location</Label>
        <Select value={filters.location} onValueChange={handleLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Locations">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={clearFilters} className="w-full mt-4">
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}
