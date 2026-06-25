import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Terms & Conditions — IQ Platform',
  description: 'Terms and Conditions for using IQ Platform.',
}

export default function Terms() {
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
            Terms & Conditions
          </h1>
          <p style={{ fontSize: 14, color: '#475569' }}>Last updated: June 2025</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <Section title="1. Acceptance of Terms">
            <p>By accessing and using IQ Platform at <strong style={{ color: '#818cf8' }}>https://iq-platform-plum.vercel.app</strong>, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.</p>
          </Section>

          <Section title="2. Use of the Platform">
            <p>IQ Platform provides a free, browser-based cognitive assessment tool for educational and entertainment purposes. You agree to:</p>
            <ul>
              <li>Use the platform only for lawful purposes.</li>
              <li>Not attempt to reverse-engineer, scrape, or exploit the platform.</li>
              <li>Not misrepresent test results obtained from this platform in any professional, academic, or clinical context.</li>
              <li>Accept that results are estimates only and not clinically validated scores.</li>
            </ul>
          </Section>

          <Section title="3. Intellectual Property">
            <p>All content on IQ Platform, including but not limited to the ML scoring algorithm, question bank, design, code, and graphics, is the intellectual property of IQ Platform and is protected by applicable copyright and intellectual property laws.</p>
            <p>You may not copy, reproduce, distribute, or create derivative works from any content on this platform without prior written permission.</p>
          </Section>

          <Section title="4. Disclaimer of Warranties">
            <p>IQ Platform is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that:</p>
            <ul>
              <li>The platform will be uninterrupted, error-free, or free of viruses.</li>
              <li>The IQ scores or cognitive assessments provided are accurate, complete, or suitable for any specific purpose.</li>
              <li>Results will be consistent across multiple tests or comparable to other standardised IQ assessments.</li>
            </ul>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>To the fullest extent permitted by law, IQ Platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — this platform, including but not limited to reliance on any test results produced.</p>
          </Section>

          <Section title="6. Third-Party Advertising">
            <p>We display advertisements through Google AdSense. These ads are served by third parties and we do not control their content. We are not responsible for the content of any external advertisements or linked third-party websites. Your interaction with any such advertisements is solely between you and the advertiser.</p>
          </Section>

          <Section title="7. User Data">
            <p>All data entered during the test (name, age, education, test results) is stored locally in your browser's localStorage. We do not collect, store, or process this data on any server. See our <a href="/privacy-policy" style={{ color: '#818cf8' }}>Privacy Policy</a> for full details.</p>
          </Section>

          <Section title="8. Modifications to Terms">
            <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Continued use of the platform after changes are posted constitutes your acceptance of the revised terms.</p>
          </Section>

          <Section title="9. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from the use of this platform shall be subject to the exclusive jurisdiction of the courts of India.</p>
          </Section>

          <Section title="10. Contact">
            <p>For any questions regarding these Terms, please reach us via our <a href="/contact" style={{ color: '#818cf8' }}>Contact page</a>.</p>
          </Section>

        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{
      padding: '22px 26px', borderRadius: 14,
      background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(99,102,241,0.1)',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: '#c7d2fe', marginBottom: 12 }}>{title}</h2>
      <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </section>
  )
}
