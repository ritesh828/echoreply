"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Zap, Twitter, ArrowRight, Star, Plus, Send, CheckCircle, Target } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink {
          50% { border-color: transparent }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }
        
        .animate-pop-in {
          animation: popIn 0.5s ease-out forwards;
        }
        
        .animate-pulse-border {
          animation: pulse 2s infinite;
        }
        
        .typing-effect {
          overflow: hidden;
          border-right: 2px solid #fff;
          white-space: nowrap;
          animation: typing 2s steps(40, end), blink 0.75s step-end infinite;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white">
              <MessageCircle className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold">EchoReply</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-white hover:bg-gray-800 bg-transparent cursor-pointer"
              onClick={() => {
                window.location.href = '/api/auth/signin'
              }}
            >
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-600 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
            >
              Turn Conversations Into <span className="text-gray-300">Conversions.</span>
            </h1>
            <p
              className={`text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed transition-all duration-600 delay-200 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
            >
              EchoReply helps you monitor Twitter for the right conversations and reply instantly with AI — building
              awareness, engagement, and leads without the hard work.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-600 delay-400 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-xl bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
                onClick={() => {
                  window.location.href = '/api/auth/signin'
                }}
              >
                <Twitter className="w-5 h-5 mr-2" />
                Sign in with Twitter
              </Button>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl border-gray-600 text-white hover:bg-gray-800 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-400/20"
                >
                  See Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" data-animate id="how-it-works">
        <div className="container px-4 mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-600 ${
              visibleSections.has("how-it-works") ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to turn Twitter conversations into business growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              className={`p-8 rounded-2xl bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10 ${
                visibleSections.has("how-it-works") ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-0 text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${
                    visibleSections.has("how-it-works") ? "animate-bounce-in" : "opacity-0 scale-50"
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Step 1: Add Your Brand</h3>
                <p className="text-gray-400 leading-relaxed">
                  Set up your brand keywords, competitors, and industry terms to monitor across Twitter.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`p-8 rounded-2xl bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10 ${
                visibleSections.has("how-it-works") ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-0 text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${
                    visibleSections.has("how-it-works") ? "animate-bounce-in" : "opacity-0 scale-50"
                  }`}
                  style={{ animationDelay: "0.4s" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Step 2: Let AI Do the Work</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our AI monitors Twitter 24/7 and generates smart, contextual replies that match your brand voice.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`p-8 rounded-2xl bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10 ${
                visibleSections.has("how-it-works") ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-0 text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${
                    visibleSections.has("how-it-works") ? "animate-bounce-in" : "opacity-0 scale-50"
                  }`}
                  style={{ animationDelay: "0.5s" }}
                >
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Step 3: Reply & Grow</h3>
                <p className="text-gray-400 leading-relaxed">
                  Review, customize, and post AI-generated replies to engage with prospects and grow your audience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900/50" data-animate id="feature-highlight">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <Card
              className={`p-12 rounded-2xl bg-black border-gray-800 transition-all duration-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10 ${
                visibleSections.has("feature-highlight") ? "animate-pop-in" : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <CardContent className="p-0">
                <div
                  className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${
                    visibleSections.has("feature-highlight") ? "animate-bounce-in" : "opacity-0 scale-50"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-white">Light Auto-Replies</h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  When enabled, AI-generated replies are published directly under tweets that match your keywords.
                  Smart. Subtle. Non-spammy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20" data-animate id="testimonials">
        <div className="container px-4 mx-auto max-w-7xl">
          <div
            className={`text-center mb-16 transition-all duration-600 ${
              visibleSections.has("testimonials") ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real results from real businesses using EchoReply</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card
              className={`p-8 rounded-2xl bg-gray-900 border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 ${
                visibleSections.has("testimonials") ? "animate-pop-in" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "EchoReply helped me turn random tweets into real leads."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-white">Samir</p>
                  <p className="text-gray-400">SaaS Founder</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`p-8 rounded-2xl bg-gray-900 border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 ${
                visibleSections.has("testimonials") ? "animate-pop-in" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "I gained 300 followers in a week and booked 2 customer calls."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-white">Michael</p>
                  <p className="text-gray-400">Consultant</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`p-8 rounded-2xl bg-gray-900 border-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 ${
                visibleSections.has("testimonials") ? "animate-pop-in" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "Now EchoReply finds tweets, writes replies, and I just hit post."
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-white">Aditi</p>
                  <p className="text-gray-400">Indie Hacker</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20" data-animate id="final-cta">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-600 ${
                visibleSections.has("final-cta") ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
            >
              Your customers are already tweeting. Don't miss the conversation.
            </h2>
            <p
              className={`text-xl text-gray-400 mb-8 transition-all duration-600 delay-200 ${
                visibleSections.has("final-cta") ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
            >
              Join thousands of businesses already converting conversations into customers.
            </p>
            <div
              className={`transition-all duration-600 delay-400 ${
                visibleSections.has("final-cta") ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-xl bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 relative overflow-hidden group cursor-pointer"
                onClick={() => {
                  window.location.href = '/api/auth/signin'
                }}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-gray-200 to-white transition-all duration-300 group-hover:w-full"></span>
                <span className="relative flex items-center">
                  <Twitter className="w-5 h-5 mr-2" />
                  Start Free with Twitter Login
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Site Details Section */}
      <section className="py-20 lg:py-32 bg-gray-900">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What is EchoReply?</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              EchoReply is a comprehensive AI-powered Twitter automation platform that helps businesses, 
              influencers, and agencies grow their Twitter presence through intelligent automation, 
              keyword tracking, and AI-generated engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Connect Your Twitter Account</h4>
                    <p className="text-gray-400 text-sm">Secure OAuth 2.0 connection with read/write permissions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Set Up Keyword Tracking</h4>
                    <p className="text-gray-400 text-sm">Monitor keywords, hashtags, mentions, and competitor activity</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">AI Generates Smart Replies</h4>
                    <p className="text-gray-400 text-sm">Our AI creates contextual, engaging responses in your brand voice</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Track Performance & Optimize</h4>
                    <p className="text-gray-400 text-sm">Monitor engagement, refine strategies, and scale your success</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Key Capabilities</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300">Real-time keyword monitoring across Twitter</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300">AI-generated replies with brand voice consistency</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300">Automated posting and scheduling</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300">Advanced analytics and reporting</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300">Multi-account management</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300">Competitor tracking and analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" data-animate className="py-20 lg:py-32">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Twitter Automation Suite</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From keyword discovery to AI-powered engagement, EchoReply provides everything you need 
              to succeed on Twitter. <Link href="/features" className="text-blue-400 hover:text-blue-300">Explore all features →</Link>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Keyword Monitoring</h3>
                <p className="text-gray-400 mb-3">
                  Track keywords, mentions, and hashtags in real-time. Monitor competitor activity and industry trends.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Real-time keyword alerts</li>
                  <li>• Competitor tracking</li>
                  <li>• Sentiment analysis</li>
                  <li>• Industry trend monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Replies</h3>
                <p className="text-gray-400 mb-3">
                  Generate contextual, engaging replies with AI that understands your brand voice and audience.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Natural language processing</li>
                  <li>• Brand voice consistency</li>
                  <li>• Multi-language support</li>
                  <li>• Tone customization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Automated Posting</h3>
                <p className="text-gray-400 mb-3">
                  Schedule and automate your content with smart timing for maximum engagement.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Smart scheduling</li>
                  <li>• Queue management</li>
                  <li>• Bulk upload</li>
                  <li>• Optimal timing AI</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-800 py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white">
                  <MessageCircle className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold">EchoReply</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 max-w-md">
                AI-powered Twitter automation platform that helps businesses, influencers, and agencies 
                grow their Twitter presence through intelligent automation and engagement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/api/auth/signin" className="hover:text-white transition-colors">Get Started</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 EchoReply. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built with ❤️ for the Twitter community
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
