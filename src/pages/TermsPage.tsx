import React from 'react';
import { motion } from 'motion/react';
import { Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="container px-4 py-12 md:py-24 max-w-4xl mx-auto">
      <div className="mb-12">
        <Link to="/" className="text-white/40 hover:text-white transition-colors text-sm mb-6 inline-block">
          &larr; Back to Home
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-4"
        >
          Terms & Conditions
        </motion.h1>
        <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-3xl p-6 md:p-12 space-y-8 prose prose-invert max-w-none prose-blue"
      >
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold m-0">1. Accounts & Email Rules</h2>
          </div>
          <p className="text-white/80 leading-relaxed">
            To maintain a secure environment, we strictly enforce email domain policies. Only users with verifiable accounts from major providers (Gmail, Yahoo, Outlook, Hotmail) are permitted to sign up. Disposable, temporary, or unverified email domains are strictly blocked.
          </p>
          <p className="text-white/80 leading-relaxed mt-2">
            You must verify your email address to activate your account and receive your initial free credits. Duplicate accounts from the same user or device may result in permanent suspension.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold m-0">2. Free Credit System</h2>
          </div>
          <p className="text-white/80 leading-relaxed">
            Upon successful registration, Free users are granted 3 APK build credits. These credits are automatically refilled to a maximum of 3 exactly 14 days from your registration date, and every 14 days thereafter.
          </p>
          <ul className="text-white/80 space-y-2 mt-4 ml-6 list-disc">
            <li>Credits do not roll over. If you have 2 credits remaining on your reset day, your balance resets to 3, not 5.</li>
            <li>Credits are deducted immediately upon initiating a build. Server errors or build crashes will automatically refund your credits.</li>
            <li>Once your balance reaches 0, you must wait for your next reset date or upgrade to a Premium Plan to continue building.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">3. Premium Plans & Credits</h2>
          <p className="text-white/80 leading-relaxed">
            We offer various paid tiers (Pro, Business, Enterprise) to suit different volume needs and provide premium support. By subscribing to a Premium Plan:
          </p>
          <ul className="text-white/80 space-y-2 mt-4 ml-6 list-disc">
            <li><strong>Paid Credits Do Not Refill:</strong> Premium plans grant a specific number of credits ONE TIME. They do not automatically refill every month. Once exhausted, you must purchase a new plan or top-up.</li>
            <li><strong>Free Plan:</strong> Includes a mandatory "APKify Builder" branding watermark upon app launch.</li>
            <li><strong>Paid Plans:</strong> 100% watermark removal guaranteed. Your app remains strictly your own branding.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">4. Acceptable Use Policy</h2>
          <p className="text-white/80 leading-relaxed">
            You agree not to use our platform to build APKs for malicious, illegal, or harmful purposes, including but not limited to malware, phishing sites, or copyright-infringing content. We reserve the right to suspend any account found violating this policy without refund.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">5. Build Storage & History</h2>
          <p className="text-white/80 leading-relaxed">
            Your build history is stored according to your plan's limits (e.g., 10 builds for Free, 50 builds for Enterprise). Older builds may be automatically purged to save space. We are not responsible for the long-term storage of generated APK files; please download your builds promptly.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
