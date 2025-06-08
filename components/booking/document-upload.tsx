"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Check, AlertCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { carService } from "@/lib/services/car-service"

interface DocumentUploadProps {
  carId: number
  onDocumentsSubmitted: (bookingId: number) => void
}

interface DocumentStatus {
  file: File | null
  uploaded: boolean
  uploading: boolean
}

export function DocumentUpload({ carId, onDocumentsSubmitted }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<{
    aadhar: DocumentStatus
    driving_license: DocumentStatus
    selfie: DocumentStatus
  }>({
    aadhar: { file: null, uploaded: false, uploading: false },
    driving_license: { file: null, uploaded: false, uploading: false },
    selfie: { file: null, uploaded: false, uploading: false },
  })

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    address: "",
    contact: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Get the latest booking for this car
    const fetchBookingData = async () => {
      try {
        const dashboardData = await carService.getUserDashboard()
        const latestBooking = dashboardData.bookings
          .filter((b: any) => b.car_id === carId)
          .sort((a: any, b: any) => b.id - a.id)[0]
        
        if (latestBooking) {
          setBookingData(latestBooking)
          // Pre-fill personal info if available
          if (latestBooking.documents) {
            setPersonalInfo({
              name: latestBooking.documents.name || "",
              address: latestBooking.documents.address || "",
              contact: latestBooking.documents.contact || "",
            })
          }
        }
      } catch (error) {
        console.error("Failed to fetch booking data:", error)
      }
    }

    fetchBookingData()
  }, [carId])

  const handleFileChange = (documentType: keyof typeof documents, file: File | null) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: {
        ...prev[documentType],
        file,
        uploaded: false,
      },
    }))
  }

  const handleSubmitDocuments = async () => {
    if (!bookingData) {
      toast({
        title: "Error",
        description: "No booking found for document upload",
        variant: "destructive",
      })
      return
    }

    const allFilesSelected = Object.values(documents).every((doc) => doc.file)
    const personalInfoComplete = personalInfo.name && personalInfo.address && personalInfo.contact

    if (!allFilesSelected || !personalInfoComplete) {
      toast({
        title: "Missing Information",
        description: "Please fill all personal information and upload all required documents",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      
      // Add personal information
      formData.append("name", personalInfo.name)
      formData.append("address", personalInfo.address)
      formData.append("contact", personalInfo.contact)

      // Add document files
      Object.entries(documents).forEach(([type, doc]) => {
        if (doc.file) {
          formData.append(type, doc.file)
        }
      })

      const response = await carService.uploadDocuments(bookingData.id, formData)
      
      toast({
        title: "Success",
        description: response.message || "Documents submitted successfully",
      })
      
      onDocumentsSubmitted(bookingData.id)
    } catch (error) {
      console.error("Failed to submit documents:", error)
      toast({
        title: "Submission Failed",
        description: "Failed to submit documents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const documentTypes = [
    {
      key: "aadhar" as const,
      label: "Aadhar Card",
      description: "Upload a clear photo of your Aadhar card",
      required: true,
    },
    {
      key: "driving_license" as const,
      label: "Driving License",
      description: "Upload a clear photo of your valid driving license",
      required: true,
    },
    {
      key: "selfie" as const,
      label: "Selfie",
      description: "Upload a clear selfie for verification",
      required: true,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Document Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Document Requirements:</p>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  <li>All documents must be clear and readable</li>
                  <li>Documents should be valid and not expired</li>
                  <li>File size should not exceed 5MB per document</li>
                  <li>Accepted formats: JPG, PNG, PDF</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact Number *</Label>
                <Input
                  id="contact"
                  value={personalInfo.contact}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, contact: e.target.value })}
                  placeholder="Enter your contact number"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  placeholder="Enter your complete address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Upload Documents</h3>
            {documentTypes.map((docType) => {
              const document = documents[docType.key]
              return (
                <div key={docType.key} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <Label className="text-base font-medium">
                        {docType.label}
                        {docType.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{docType.description}</p>
                    </div>
                    {document.file && (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChange(docType.key, e.target.files?.[0] || null)}
                      className="flex-1"
                    />
                  </div>

                  {document.file && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: {document.file.name} ({(document.file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmitDocuments}
          disabled={submitting || !bookingData}
          className="w-full md:w-auto"
          size="lg"
        >
          {submitting ? "Submitting..." : "Submit Documents"}
        </Button>
      </div>
    </motion.div>
  )
}
