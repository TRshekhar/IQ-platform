import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Privacy Policy — IQ Platform',
  description: 'Privacy Policy for IQ Platform. Learn how we handle your data.',
}

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>

        <div style={{ marginBottom: 40 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: 20,
          }}>Legal</span>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e2e8f0', marginTop: 16, marginBottom: 8 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: '#475569' }}>Last updated: June 2025</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          <Section title="1. Introduction">
            <p>Welcome to IQ Platform ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website at <strong style={{ color: '#818cf8' }}>https://iq-platform-plum.vercel.app</strong>.</p>
            <p>Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We do <strong style={{ color: '#e2e8f0' }}>not</strong> collect, transmit, or store any personal information on our servers. Specifically:</p>
            <ul>
              <li>Your name, age, education level, and occupation entered during the test are stored <strong style={{ color: '#e2e8f0' }}>only in your browser's localStorage</strong> on your device.</li>
              <li>Test results, IQ scores, and session history are stored locally in your browser and never sent to any external server.</li>
              <li>We do not use cookies for tracking or authentication.</li>
            </ul>
          </Section>

          <Section title="3. Third-Party Advertising (Google AdSense)">
            <p>We use Google AdSense to display advertisements on our website. Google AdSense may use cookies and web beacons to collect data in order to serve ads based on your prior visits to our website or other websites. This may include:</p>
            <ul>
              <li>Cookies that allow Google to serve ads based on your visits to this and other sites.</li>
              <li>The DoubleClick cookie used by Google in the ads served on our website.</li>
              <li>Anonymous data for ad targeting and measurement purposes.</li>
            </ul>
            <p>You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>Google Ads Settings</a>. You can also opt out of a third-party vendor's use of cookies for personalised advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>aboutads.info</a>.</p>
          </Section>

          <Section title="4. Analytics">
            <p>We may use anonymous analytics tools to understand aggregate usage patterns (e.g. page views, geographic region). These tools do not collect personally identifiable information and cannot be used to identify individual users.</p>
          </Section>

          <Section title="5. Children's Privacy">
            <p>Our website is accessible to users of all ages, including minors under the supervision of a parent or guardian. We do not knowingly collect personal data from children. Since all data is stored locally on the user's device and never transmitted to us, we cannot and do not collect any information from minors.</p>
          </Section>

          <Section title="6. Data Security">
            <p>All test data is stored in your browser's localStorage. It is accessible only to you on your device and is never transmitted to our servers. You can delete this data at any time by clearing your browser's local storage or using the "Clear all" option on the History page.</p>
          </Section>

          <Section title="7. Links to Other Websites">
            <p>Our website may contain links to third-party websites. We have no control over the content, privacy policies, or practices of any third-party sites and accept no responsibility for them. We encourage you to read the privacy policy of every site you visit.</p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date. You are advised to review this page periodically.</p>
          </Section>

          <Section title="9. Contact Us">
            <p>If you have any questions about this Privacy Policy, please contact us via our <a href="/contact" style={{ color: '#818cf8' }}>Contact page</a>.</p>
          </Section>

        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{
      padding: '24px 28px', borderRadius: 16,
      background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(99,102,241,0.1)',
    }}>
      <h2 style={{ fontSize: 17, fontWeight: 600, color: '#c7d2fe', marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
    </section>
  )
}
