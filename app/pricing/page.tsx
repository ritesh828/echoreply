"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      subtitle: "Starter",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: ["Track 1 keyword", "5 AI replies per day", "Manual reply posting only"],
    },
    {
      name: "Pro",
      subtitle: "",
      price: "$9",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Track 10 keywords",
        "Unlimited AI replies/day",
        "Auto-post replies directly to tweets",
        "Priority AI (faster response time)",
      ],
      popular: true,
    },
    {
      name: "Growth",
      subtitle: "",
      price: "$29",
      period: "/month",
      description: "For scaling businesses and teams",
      features: [
        "Track 50 keywords",
        "Unlimited replies",
        "Advanced analytics (reply performance, engagement)",
        "Team access (multiple accounts)",
        "Custom AI style (funny, professional, casual tone)",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold">
              EchoReply
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/pricing" className="text-white font-medium">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
            </nav>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Choose the perfect plan to turn your conversations into conversions. All plans include our core AI-powered
            reply features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`bg-gray-900 border-gray-700 relative hover:scale-105 transition-all duration-300 ease-out hover:shadow-2xl ${
                  plan.popular ? "ring-2 ring-white animate-pulse-border" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium animate-bounce">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                    {plan.subtitle && <span className="text-lg font-normal text-gray-400 ml-2">– {plan.subtitle}</span>}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mb-4">{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-white mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 ${
                      plan.popular ? "bg-white text-black hover:bg-gray-100" : "bg-white text-black hover:bg-gray-100"
                    }`}
                    size="lg"
                  >
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Can I change plans anytime?</h3>
              <p className="text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                prorate any billing differences.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">What happens if I exceed my reply limit?</h3>
              <p className="text-gray-300">
                We'll notify you when you're approaching your limit. You can either upgrade your plan or purchase
                additional replies as needed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Do you offer custom enterprise plans?</h3>
              <p className="text-gray-300">
                Yes! For large organizations with specific needs, we offer custom enterprise solutions. Contact our
                sales team to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">EchoReply</div>
            <div className="text-gray-400 text-sm">© 2024 EchoReply. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse-border {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.1);
          }
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  )
}
