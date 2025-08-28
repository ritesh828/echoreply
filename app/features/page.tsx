import Link from 'next/link';
import { CheckCircle, Zap, Target, Bot, BarChart3, Shield, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: "AI-Powered Reply Generation",
    description: "Advanced AI technology that generates contextual, engaging replies based on keywords and tweet content. Our AI understands tone, context, and brand voice to create authentic responses.",
    details: [
      "Natural language processing for human-like replies",
      "Brand voice customization",
      "Multi-language support",
      "Tone adjustment (professional, casual, humorous)",
      "Emoji and hashtag suggestions"
    ]
  },
  {
    icon: Target,
    title: "Smart Keyword Tracking",
    description: "Monitor Twitter for specific keywords, mentions, and hashtags in real-time. Never miss important conversations about your brand, industry, or competitors.",
    details: [
      "Real-time keyword monitoring",
      "Competitor tracking",
      "Industry trend analysis",
      "Sentiment analysis",
      "Customizable alert thresholds"
    ]
  },
  {
    icon: Zap,
    title: "Automated Posting",
    description: "Schedule and automate your Twitter content with intelligent timing. Our system determines optimal posting times for maximum engagement.",
    details: [
      "Smart scheduling based on audience activity",
      "Queue management system",
      "Bulk upload capabilities",
      "Holiday and event calendar integration",
      "Cross-timezone scheduling"
    ]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive analytics dashboard providing deep insights into your Twitter performance, engagement rates, and ROI metrics.",
    details: [
      "Engagement rate tracking",
      "Follower growth analytics",
      "Click-through rate monitoring",
      "Reply effectiveness metrics",
      "Competitive benchmarking"
    ]
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with OAuth 2.0, encrypted data storage, and compliance with privacy regulations including GDPR and CCPA.",
    details: [
      "OAuth 2.0 secure authentication",
      "End-to-end encryption",
      "GDPR and CCPA compliance",
      "Regular security audits",
      "Data backup and recovery"
    ]
  },
  {
    icon: Users,
    title: "Multi-Account Management",
    description: "Manage multiple Twitter accounts from a single dashboard. Perfect for agencies, social media managers, and businesses with multiple brands.",
    details: [
      "Unified dashboard for all accounts",
      "Team collaboration features",
      "Role-based access control",
      "Account-specific settings",
      "Bulk operations across accounts"
    ]
  }
];

const useCases = [
  {
    title: "Small Businesses",
    description: "Build brand presence and engage with customers without dedicated social media staff",
    benefits: ["24/7 customer engagement", "Consistent brand voice", "Time savings", "Cost-effective marketing"]
  },
  {
    title: "Social Media Agencies",
    description: "Manage multiple client accounts efficiently while maintaining quality and consistency",
    benefits: ["Scale client management", "White-label solutions", "Team collaboration", "Client reporting"]
  },
  {
    title: "Influencers",
    description: "Maintain high engagement rates while focusing on content creation and partnerships",
    benefits: ["Audience engagement", "Brand partnership support", "Time management", "Growth analytics"]
  },
  {
    title: "E-commerce Brands",
    description: "Drive sales through strategic Twitter engagement and customer support automation",
    benefits: ["Customer support automation", "Sales funnel integration", "Product promotion", "Review management"]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <br />
              <span className="text-blue-600">Twitter Success</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              EchoReply combines cutting-edge AI technology with intuitive design to help you 
              grow your Twitter presence, engage your audience, and achieve your social media goals.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From AI-powered replies to advanced analytics, EchoReply provides all the tools 
              you need to master Twitter marketing and engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect for Every Use Case</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a solo entrepreneur or a large agency, EchoReply adapts to your needs 
              and helps you achieve your Twitter marketing goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Key Benefits:</h4>
                  {useCase.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Excellence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technology stack for reliability, scalability, and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Processing</h3>
              <p className="text-gray-600">Instant keyword monitoring and AI response generation</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-gray-600">OAuth 2.0, encryption, and compliance standards</p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Comprehensive insights and performance tracking</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">Cutting-edge language models for natural responses</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Twitter Presence?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already growing their Twitter audience with EchoReply.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}