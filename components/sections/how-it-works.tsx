"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Search, CreditCard, Key, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search & Select",
    description: "Browse our premium car collection and find the perfect vehicle for your journey.",
    color: "bg-blue-500",
  },
  {
    icon: CreditCard,
    title: "Book & Pay",
    description: "Secure your booking with our easy payment process and instant confirmation.",
    color: "bg-green-500",
  },
  {
    icon: Key,
    title: "Pick Up",
    description: "Collect your car from our convenient locations with contactless pickup.",
    color: "bg-purple-500",
  },
  {
    icon: CheckCircle,
    title: "Drive & Enjoy",
    description: "Hit the road and enjoy your premium driving experience with 24/7 support.",
    color: "bg-orange-500",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">How It Works</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get on the road in just 4 simple steps. Our streamlined process makes car rental effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <motion.div
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>

                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </CardContent>
              </Card>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
