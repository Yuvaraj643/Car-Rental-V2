"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
              <p className="text-xl md:text-2xl text-white/90">
                Please read these terms carefully before using DriveEase services
              </p>
              <p className="text-white/80 mt-4">Last updated: January 1, 2024</p>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>1. Acceptance of Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>
                      By accessing and using DriveEase services, you accept and agree to be bound by the terms and
                      provision of this agreement. If you do not agree to abide by the above, please do not use this
                      service.
                    </p>
                    <p>
                      These Terms of Service ("Terms") govern your use of our website located at driveease.com (the
                      "Service") operated by DriveEase ("us", "we", or "our").
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>2. Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>To use our services, you must:</p>
                    <ul>
                      <li>Be at least 21 years old</li>
                      <li>Hold a valid driving license for at least 1 year</li>
                      <li>Provide valid identification documents</li>
                      <li>Have a valid payment method</li>
                      <li>Agree to these Terms of Service</li>
                    </ul>
                    <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>3. Booking and Reservations</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <h4>3.1 Booking Process</h4>
                    <p>
                      All bookings are subject to availability and confirmation. A booking is confirmed only when you
                      receive a confirmation email from us.
                    </p>

                    <h4>3.2 Payment</h4>
                    <p>
                      Payment must be made at the time of booking. We accept various payment methods as displayed on our
                      platform. All prices are in Indian Rupees (INR) and include applicable taxes.
                    </p>

                    <h4>3.3 Modifications</h4>
                    <p>
                      Booking modifications are subject to availability and may incur additional charges. Modifications
                      must be made at least 24 hours before the pickup time.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>4. Vehicle Use and Restrictions</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <h4>4.1 Permitted Use</h4>
                    <p>
                      Vehicles may only be used for lawful purposes and in accordance with traffic laws and regulations.
                    </p>

                    <h4>4.2 Prohibited Activities</h4>
                    <ul>
                      <li>Using the vehicle for commercial purposes without prior approval</li>
                      <li>Subletting or transferring the vehicle to third parties</li>
                      <li>Using the vehicle under the influence of alcohol or drugs</li>
                      <li>Smoking in the vehicle</li>
                      <li>Transporting illegal substances or materials</li>
                      <li>Off-road driving or racing</li>
                      <li>Exceeding passenger or weight limits</li>
                    </ul>

                    <h4>4.3 Geographic Restrictions</h4>
                    <p>
                      Vehicles must be used within the permitted geographic area as specified in your booking.
                      Interstate travel requires prior approval from the vehicle owner.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>5. Insurance and Liability</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <h4>5.1 Insurance Coverage</h4>
                    <p>
                      All vehicles are covered by basic insurance as required by law. However, you are responsible for
                      any damages, theft, or loss during the rental period.
                    </p>

                    <h4>5.2 Damage Responsibility</h4>
                    <p>
                      You are liable for any damage to the vehicle during your rental period, including but not limited
                      to:
                    </p>
                    <ul>
                      <li>Collision damage</li>
                      <li>Theft or vandalism</li>
                      <li>Interior damage</li>
                      <li>Missing accessories or equipment</li>
                      <li>Traffic violations and fines</li>
                    </ul>

                    <h4>5.3 Accident Procedure</h4>
                    <p>
                      In case of an accident, you must immediately contact our emergency support and local authorities
                      if required. Failure to report accidents may result in additional penalties.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>6. Cancellation and Refund Policy</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <h4>6.1 Customer Cancellation</h4>
                    <ul>
                      <li>Free cancellation: More than 24 hours before pickup</li>
                      <li>50% refund: 12-24 hours before pickup</li>
                      <li>No refund: Less than 12 hours before pickup</li>
                    </ul>

                    <h4>6.2 DriveEase Cancellation</h4>
                    <p>
                      We reserve the right to cancel bookings due to vehicle unavailability, safety concerns, or
                      violation of terms. In such cases, you will receive a full refund.
                    </p>

                    <h4>6.3 Refund Processing</h4>
                    <p>Refunds will be processed within 5-7 business days to your original payment method.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>7. Privacy and Data Protection</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>
                      Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
                      information when you use our services. By using our services, you agree to the collection and use
                      of information in accordance with our Privacy Policy.
                    </p>
                    <p>
                      We may share your information with vehicle owners as necessary to facilitate your booking and
                      rental experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>8. Limitation of Liability</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>DriveEase acts as a platform connecting vehicle owners with renters. We are not liable for:</p>
                    <ul>
                      <li>Vehicle condition or mechanical failures</li>
                      <li>Accidents or injuries during rental period</li>
                      <li>Loss of personal belongings</li>
                      <li>Indirect or consequential damages</li>
                      <li>Actions of vehicle owners or other users</li>
                    </ul>
                    <p>Our total liability shall not exceed the amount paid for the specific rental transaction.</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>9. Termination</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>
                      We may terminate or suspend your account and access to our services immediately, without prior
                      notice or liability, for any reason whatsoever, including without limitation if you breach the
                      Terms.
                    </p>
                    <p>
                      Upon termination, your right to use the service will cease immediately. If you wish to terminate
                      your account, you may simply discontinue using the service.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>10. Governing Law</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>
                      These Terms shall be interpreted and governed by the laws of India. Any disputes arising from
                      these terms or your use of our services shall be subject to the exclusive jurisdiction of the
                      courts in Hyderabad, Telangana.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>11. Changes to Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>
                      We reserve the right to modify or replace these Terms at any time. If a revision is material, we
                      will try to provide at least 30 days notice prior to any new terms taking effect.
                    </p>
                    <p>
                      Your continued use of the service after any such changes constitutes your acceptance of the new
                      Terms of Service.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>12. Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p>If you have any questions about these Terms of Service, please contact us:</p>
                    <ul>
                      <li>Email: legal@driveease.com</li>
                      <li>Phone: +91 1234567890</li>
                      <li>Address: 123 Tech Park, Hitech City, Hyderabad, Telangana 500081</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
