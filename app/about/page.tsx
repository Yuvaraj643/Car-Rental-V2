"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    description: "10+ years in automotive industry",
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    description: "Tech leader with startup experience",
  },
  {
    name: "Amit Patel",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    description: "Expert in logistics and operations",
  },
  {
    name: "Sneha Reddy",
    role: "Customer Success",
    image: "/placeholder.svg?height=300&width=300",
    description: "Passionate about customer experience",
  },
]

const values = [
  {
    icon: Users,
    title: "Customer First",
    description: "We prioritize our customers' needs and satisfaction above everything else.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate to provide the best car rental experience.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "We maintain the highest standards in our fleet and service quality.",
  },
  {
    icon: Heart,
    title: "Trust",
    description: "We build lasting relationships based on trust and transparency.",
  },
]

export default function AboutPage() {
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About DriveEase</h1>
              <p className="text-xl md:text-2xl text-white/90">
                Revolutionizing car rentals with technology, trust, and exceptional service since 2020.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    DriveEase was born from a simple idea: car rentals should be easy, transparent, and accessible to
                    everyone. Founded in 2020 by a team of automotive and technology enthusiasts, we set out to
                    transform the traditional car rental industry.
                  </p>
                  <p>
                    We noticed that existing car rental services were often complicated, expensive, and unreliable. Long
                    queues, hidden fees, and poor customer service were common complaints. We knew there had to be a
                    better way.
                  </p>
                  <p>
                    Today, DriveEase connects thousands of car owners with travelers across India, creating a
                    peer-to-peer marketplace that benefits everyone. Our platform ensures quality, safety, and
                    convenience while making car rentals more affordable and accessible.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="DriveEase Story"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission & Vision</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're driven by our commitment to make transportation accessible, sustainable, and enjoyable for
                everyone.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To democratize car rentals by creating a trusted, technology-driven platform that connects car
                      owners with renters, providing affordable, convenient, and reliable transportation solutions
                      across India.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To become India's most trusted car-sharing platform, fostering a community where mobility is
                      shared, sustainable, and accessible to all, while empowering car owners to monetize their assets
                      effectively.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape our company culture.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind DriveEase who work tirelessly to make your car rental experience
                exceptional.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">DriveEase by Numbers</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our growth and impact in the car rental industry speaks for itself.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Happy Customers" },
                { number: "500+", label: "Cars Available" },
                { number: "50+", label: "Cities Covered" },
                { number: "4.8/5", label: "Average Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
