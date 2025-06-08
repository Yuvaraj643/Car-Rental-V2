"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

const faqCategories = [
  {
    category: "Booking & Reservations",
    faqs: [
      {
        question: "How do I book a car on DriveEase?",
        answer:
          "To book a car, simply search for available vehicles in your location, select your preferred dates, choose a car, and complete the booking process with payment and document upload.",
      },
      {
        question: "Can I modify my booking after confirmation?",
        answer:
          "Yes, you can modify your booking subject to availability and our modification policy. Changes may incur additional charges depending on the timing and nature of the modification.",
      },
      {
        question: "What is the minimum and maximum rental duration?",
        answer:
          "The minimum rental duration is 24 hours. There's no maximum limit, but for rentals longer than 30 days, please contact our support team for special rates.",
      },
      {
        question: "Can I book a car for someone else?",
        answer:
          "The primary renter must be the person who will be driving the car. However, you can add additional drivers during the booking process for an extra fee.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, UPI, and net banking through our secure payment partner Razorpay.",
      },
      {
        question: "Can I pay partially and complete payment later?",
        answer:
          "Yes, we offer a partial payment option where you can pay 10% upfront to reserve the car and complete the remaining payment before pickup.",
      },
      {
        question: "Are there any hidden charges?",
        answer:
          "No, we believe in transparent pricing. All charges including car rental, cleaning fee, and any applicable taxes are clearly displayed before you confirm your booking.",
      },
      {
        question: "What happens if I return the car late?",
        answer:
          "Late returns are subject to additional charges. We charge on an hourly basis for delays up to 3 hours, and a full day's charge for delays beyond 3 hours.",
      },
    ],
  },
  {
    category: "Documents & Verification",
    faqs: [
      {
        question: "What documents do I need to rent a car?",
        answer:
          "You need a valid driving license, Aadhar card, and PAN card. All documents must be clear, readable, and not expired.",
      },
      {
        question: "How long does document verification take?",
        answer:
          "Document verification typically takes 2-4 hours during business hours (9 AM - 6 PM). You'll receive an email notification once your documents are approved.",
      },
      {
        question: "Can I use a digital driving license?",
        answer:
          "Yes, we accept digital driving licenses issued by the government. However, we recommend carrying a physical copy as backup.",
      },
      {
        question: "What if my documents are rejected?",
        answer:
          "If your documents are rejected, you'll receive an email with the reason. You can re-upload corrected documents, and we'll review them again.",
      },
    ],
  },
  {
    category: "Car Pickup & Return",
    faqs: [
      {
        question: "Where can I pick up the car?",
        answer:
          "Car pickup locations are specified by the car owner. Most pickups happen at convenient locations like metro stations, malls, or the owner's residence.",
      },
      {
        question: "What should I check during car pickup?",
        answer:
          "Check the car's exterior and interior condition, fuel level, existing damages (if any), and ensure all documents are in order. Take photos for your records.",
      },
      {
        question: "Can I return the car to a different location?",
        answer:
          "Return location is typically the same as pickup. Different return locations may be possible with prior arrangement and additional charges.",
      },
      {
        question: "What if I can't reach the pickup location on time?",
        answer:
          "Contact the car owner and our support team immediately. We'll try to accommodate delays, but significant delays may result in booking cancellation.",
      },
    ],
  },
  {
    category: "Insurance & Safety",
    faqs: [
      {
        question: "Are the cars insured?",
        answer:
          "Yes, all cars on our platform have valid insurance. However, you're responsible for any damages during your rental period as per our terms.",
      },
      {
        question: "What happens if I have an accident?",
        answer:
          "Contact our emergency support immediately at +91 9999999999. Don't leave the accident site, file a police report if required, and follow our accident protocol.",
      },
      {
        question: "Am I covered for theft or damage?",
        answer:
          "Basic insurance covers third-party liability. For comprehensive coverage including theft and damage, you can opt for additional insurance during booking.",
      },
      {
        question: "Can I drive outside the city/state?",
        answer:
          "Interstate travel is allowed for most cars, but you must inform the car owner and get approval. Some owners may restrict travel to certain areas.",
      },
    ],
  },
  {
    category: "Cancellation & Refunds",
    faqs: [
      {
        question: "What is your cancellation policy?",
        answer:
          "Free cancellation up to 24 hours before pickup. 50% refund for cancellations between 24-12 hours before pickup. No refund for cancellations less than 12 hours before pickup.",
      },
      {
        question: "How long does it take to process refunds?",
        answer:
          "Refunds are processed within 5-7 business days to your original payment method. You'll receive an email confirmation once the refund is initiated.",
      },
      {
        question: "Can the car owner cancel my booking?",
        answer:
          "Car owners can cancel bookings in exceptional circumstances. If this happens, you'll receive a full refund and we'll help you find an alternative car.",
      },
      {
        question: "What if the car is not available at pickup?",
        answer:
          "If the car is unavailable due to the owner's fault, you'll receive a full refund plus compensation. We'll also try to arrange an alternative vehicle.",
      },
    ],
  },
]

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)

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
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Find answers to common questions about DriveEase car rentals
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No FAQs found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-12">
                {filteredFAQs.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{category.category}</h2>

                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const itemId = `${category.category}-${faqIndex}`
                        const isOpen = openItems.includes(itemId)

                        return (
                          <Card key={faqIndex} className="overflow-hidden">
                            <CardContent className="p-0">
                              <button
                                onClick={() => toggleItem(itemId)}
                                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex justify-between items-center">
                                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                                  {isOpen ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                  )}
                                </div>
                              </button>

                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="px-6 pb-6"
                                >
                                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </motion.div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
              <p className="text-gray-600 mb-8">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Call +91 9999999999
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
