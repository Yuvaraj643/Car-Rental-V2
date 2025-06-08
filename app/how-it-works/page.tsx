"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, CreditCard, Key, CheckCircle, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: Search,
    title: "Search & Select",
    description: "Browse our extensive collection of cars and find the perfect vehicle for your needs.",
    details: [
      "Filter by location, price, and car type",
      "View detailed car information and photos",
      "Check availability for your dates",
      "Read reviews from previous renters",
    ],
  },
  {
    icon: CreditCard,
    title: "Book & Pay",
    description: "Secure your booking with our easy payment process and instant confirmation.",
    details: [
      "Choose full payment or partial payment option",
      "Secure payment through Razorpay",
      "Instant booking confirmation",
      "Flexible cancellation policy",
    ],
  },
  {
    icon: Key,
    title: "Upload Documents",
    description: "Upload required documents for verification and approval.",
    details: [
      "Upload driving license, Aadhar, and PAN card",
      "Quick document verification process",
      "Secure document storage",
      "One-time upload for future bookings",
    ],
  },
  {
    icon: CheckCircle,
    title: "Get Approved & Drive",
    description: "Once approved, collect your car and enjoy your journey.",
    details: [
      "Receive approval notification",
      "Meet owner at pickup location",
      "Complete vehicle inspection",
      "Start your journey with confidence",
    ],
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "All vehicles come with comprehensive insurance coverage for your peace of mind.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you whenever you need help.",
  },
  {
    icon: Users,
    title: "Verified Owners",
    description: "All car owners are verified and rated by our community for your safety.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">How DriveEase Works</h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">Rent a car in 4 simple steps. It's that easy!</p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/cars">Start Booking Now</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Steps to Get Started</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our streamlined process makes car rental effortless and transparent.
              </p>
            </motion.div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
                >
                  <div className="lg:w-1/2">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step {index + 1}</div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                      <step.icon className="h-24 w-24 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DriveEase?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide additional benefits to ensure your car rental experience is safe, convenient, and enjoyable.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <benefit.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Got questions? We've got answers to help you get started.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What documents do I need to rent a car?",
                  answer:
                    "You need a valid driving license, Aadhar card, and PAN card. All documents must be clear and not expired.",
                },
                {
                  question: "How long does the approval process take?",
                  answer:
                    "Document verification typically takes 2-4 hours during business hours. You'll receive an email notification once approved.",
                },
                {
                  question: "Can I cancel my booking?",
                  answer:
                    "Yes, you can cancel your booking. Free cancellation is available up to 24 hours before pickup. Check our cancellation policy for details.",
                },
                {
                  question: "What if the car breaks down during my rental?",
                  answer:
                    "We provide 24/7 roadside assistance. Contact our support team immediately, and we'll arrange for help or a replacement vehicle.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust DriveEase for their car rental needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/cars">Browse Cars</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
