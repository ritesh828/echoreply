import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-6">
            At EchoReply, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you use our AI-powered Twitter automation platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Account Information:</strong> When you sign up using Twitter OAuth, we collect your Twitter username, profile picture, and basic profile information</li>
            <li><strong>Settings and Preferences:</strong> Keywords you want to track, reply templates, and automation preferences</li>
            <li><strong>Billing Information:</strong> Payment details processed through Stripe (we don't store credit card information)</li>
            <li><strong>Communication Preferences:</strong> Email preferences and notification settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Usage Data:</strong> How you interact with our platform, features used, and performance metrics</li>
            <li><strong>Device Information:</strong> Browser type, IP address, device identifiers, and operating system</li>
            <li><strong>Log Data:</strong> Server logs, error reports, and diagnostic information</li>
            <li><strong>Cookies and Similar Technologies:</strong> Session management and analytics tracking</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Twitter API Data</h3>
          <p className="text-gray-700 mb-6">
            With your explicit permission through Twitter OAuth, we access your Twitter account to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Read your tweets and mentions</li>
            <li>Post tweets and replies on your behalf</li>
            <li>Monitor keywords across Twitter</li>
            <li>Analyze engagement metrics</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Provide and maintain our AI-powered automation services</li>
            <li>Improve and personalize your experience</li>
            <li>Develop new features and functionality</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and promotions</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Detect, investigate, and prevent fraud and security issues</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Storage and Security</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Data Storage</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Database:</strong> Your data is stored securely in Neon Tech PostgreSQL databases</li>
            <li><strong>Encryption:</strong> All data is encrypted in transit using HTTPS/TLS</li>
            <li><strong>Backups:</strong> Regular encrypted backups are maintained for disaster recovery</li>
            <li><strong>Retention:</strong> We retain your data as long as your account is active, or as required by law</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Security Measures</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Industry-standard security practices and regular security audits</li>
            <li>Role-based access controls and authentication</li>
            <li>Regular vulnerability scanning and penetration testing</li>
            <li>Employee training on data protection and privacy</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
          <p className="text-gray-700 mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Twitter API:</strong> For accessing Twitter data and posting content</li>
            <li><strong>OpenAI:</strong> For AI-powered reply generation</li>
            <li><strong>Stripe:</strong> For payment processing</li>
            <li><strong>Neon Tech:</strong> For database hosting</li>
            <li><strong>Vercel:</strong> For hosting and deployment</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Your Rights</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Update or correct your information</li>
            <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
            <li><strong>Portability:</strong> Export your data in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Account Management</h3>
          <p className="text-gray-700 mb-6">
            You can manage your data and preferences through your account settings. You can also revoke 
            Twitter OAuth permissions at any time through your Twitter account settings.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our Service is not intended for children under 13 years of age. We do not knowingly collect 
            personal information from children under 13. If you believe we have collected such information, 
            please contact us immediately.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
          <p className="text-gray-700 mb-6">
            Your information may be processed and stored in the United States or other countries where our 
            service providers operate. We ensure appropriate safeguards are in place for international transfers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have questions about this Privacy Policy or your data, please contact us:
            <br />
            Email: <a href="mailto:privacy@echoreply.com" className="text-blue-600 hover:text-blue-800">privacy@echoreply.com</a>
            <br />
            Address: EchoReply, 123 Tech Street, San Francisco, CA 94105, USA
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