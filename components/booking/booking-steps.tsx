"use client"

import { motion } from "framer-motion"
import { Check, CreditCard, FileText, Info } from "lucide-react"

interface BookingStepsProps {
  currentStep: "details" | "payment" | "documents" | "confirmation"
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  const steps = [
    {
      id: "details",
      name: "Booking Details",
      icon: Info,
    },
    {
      id: "payment",
      name: "Payment",
      icon: CreditCard,
    },
    {
      id: "documents",
      name: "Documents",
      icon: FileText,
    },
    {
      id: "confirmation",
      name: "Confirmation",
      icon: Check,
    },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            {/* Connecting line */}
            {index > 0 && (
              <div
                className={`absolute top-4 -left-1/2 w-full h-1 ${
                  index <= currentStepIndex ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}

            {/* Step circle */}
            <motion.div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                index <= currentStepIndex ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              } mb-2`}
              animate={{
                scale: index === currentStepIndex ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: index === currentStepIndex ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 2,
              }}
            >
              {index < currentStepIndex ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
            </motion.div>

            {/* Step name */}
            <span
              className={`text-xs font-medium ${
                index <= currentStepIndex ? "text-primary" : "text-gray-500"
              } text-center hidden sm:block`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
