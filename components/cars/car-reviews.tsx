"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Amazing car! Very clean and well-maintained. The owner was punctual and helpful. The car drove smoothly and was very fuel efficient. Would definitely rent again!",
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 month ago",
    comment:
      "Good experience overall. The car was in good condition and comfortable for our family trip. Pickup and drop-off were smooth. Only giving 4 stars because the AC took some time to cool.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 months ago",
    comment:
      "Excellent service! The car was spotless and performed perfectly throughout our journey. The owner was very professional and accommodating with our schedule changes.",
  },
]

const ratingStats = {
  5: 75,
  4: 18,
  3: 5,
  2: 1,
  1: 1,
}

export function CarReviews() {
  const averageRating = (5 * 75 + 4 * 18 + 3 * 5 + 2 * 1 + 1 * 1) / 100

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Rating Summary</h3>
            <div className="flex items-center mb-4">
              <div className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(averageRating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">Based on 124 reviews</div>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(ratingStats)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([rating, percentage]) => (
                  <div key={rating} className="flex items-center">
                    <div className="w-12 text-sm">{rating} stars</div>
                    <div className="flex-1 mx-2">
                      <Progress value={percentage} className="h-2" />
                    </div>
                    <div className="w-8 text-sm text-right">{percentage}%</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b pb-6 last:border-b-0"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-gray-600">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
