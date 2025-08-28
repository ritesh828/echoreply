import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using EchoReply ("Service"), you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
          <p className="text-gray-700 mb-6">
            EchoReply is an AI-powered Twitter automation platform that helps users manage their Twitter presence 
            through automated replies, keyword tracking, and content scheduling. Our service includes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>AI-generated reply suggestions based on keywords and context</li>
            <li>Keyword monitoring and tracking across Twitter</li>
            <li>Automated posting and scheduling features</li>
            <li>Analytics and performance tracking</li>
            <li>Multi-account management (for premium users)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
          <p className="text-gray-700 mb-6">
            To use our Service, you must create an account using Twitter OAuth. You are responsible for maintaining 
            the security of your account and for all activities that occur under your account. You must immediately 
            notify us of any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
          <p className="text-gray-700 mb-4">You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Post or promote spam, hate speech, or harmful content</li>
            <li>Violate Twitter's Terms of Service or any applicable laws</li>
            <li>Impersonate others or misrepresent your identity</li>
            <li>Use automated systems for malicious purposes</li>
            <li>Attempt to reverse engineer or copy our AI technology</li>
            <li>Share your account credentials with unauthorized users</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Subscription and Billing</h2>
          <p className="text-gray-700 mb-6">
            EchoReply offers both free and premium subscription plans. Premium plans are billed monthly or annually 
            through Stripe. You can cancel your subscription at any time. Refunds are provided according to our 
            refund policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            The Service and its original content, features, and functionality are owned by EchoReply and are protected 
            by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            EchoReply shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting 
            from your access to or use of or inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any material 
            changes by posting the new Terms on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about these Terms, please contact us at:
            <br />
            Email: <a href="mailto:legal@echoreply.com" className="text-blue-600 hover:text-blue-800">legal@echoreply.com</a>
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}