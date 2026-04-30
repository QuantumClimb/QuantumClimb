import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { X } from "lucide-react";

type LegalPageProps = Readonly<{
  onClose: () => void;
}>;

export function PrivacyPolicy({ onClose }: LegalPageProps) {
  return (
    <section className="py-24 bg-black min-h-screen">
      <div className="container mx-auto px-6 pt-20">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded transition-colors z-40">
            <X size={24} className="text-white" />
          </button>
        </div>
        <Reveal type="fade-up" className="max-w-3xl mx-auto">
          <SectionHeader title="Privacy Policy" subtitle="Last updated: April 30, 2026" />
          
          <div className="mt-12 space-y-8 text-zinc-400">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">1. Introduction</h3>
              <p className="leading-relaxed">
                Quantum Climb ("Company", "we", "our", or "us") operates the Quantum Climb website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">2. Information Collection and Use</h3>
              <p className="leading-relaxed mb-4">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              <ul className="space-y-3 ml-4">
                <li><strong className="text-white">Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                  <ul className="mt-2 ml-4 space-y-2">
                    <li>• Email address</li>
                    <li>• First name and last name</li>
                    <li>• Phone number</li>
                    <li>• Address, State, Province, ZIP/Postal code, City</li>
                    <li>• Cookies and Usage Data</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">3. Use of Data</h3>
              <p className="leading-relaxed mb-3">Quantum Climb uses the collected data for various purposes:</p>
              <ul className="space-y-2 ml-4">
                <li>• To provide and maintain our Service</li>
                <li>• To notify you about changes to our Service</li>
                <li>• To allow you to participate in interactive features of our Service</li>
                <li>• To provide customer support</li>
                <li>• To gather analysis or valuable information so that we can improve our Service</li>
                <li>• To monitor the usage of our Service</li>
                <li>• To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">4. Security of Data</h3>
              <p className="leading-relaxed">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. Quantum Climb is SOC2 Type II compliant and maintains enterprise-grade security measures.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">5. Changes to This Privacy Policy</h3>
              <p className="leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">6. Contact Us</h3>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us via email at qcquantumclimb@gmail.com or reach out through our contact form.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TermsOfService({ onClose }: LegalPageProps) {
  return (
    <section className="py-24 bg-black min-h-screen">
      <div className="container mx-auto px-6 pt-20">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded transition-colors z-40">
            <X size={24} className="text-white" />
          </button>
        </div>
        <Reveal type="fade-up" className="max-w-3xl mx-auto">
          <SectionHeader title="Terms of Service" subtitle="Last updated: April 30, 2026" />
          
          <div className="mt-12 space-y-8 text-zinc-400">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h3>
              <p className="leading-relaxed">
                By accessing and using the Quantum Climb website and services, you accept and agree to be bound by and comply with the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">2. Use License</h3>
              <p className="leading-relaxed mb-3">
                Permission is granted to temporarily download one copy of the materials (information or software) on Quantum Climb's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Modifying or copying the materials</li>
                <li>• Using the materials for any commercial purpose or for any public display</li>
                <li>• Attempting to decompile or reverse engineer any software on the website</li>
                <li>• Removing any copyright or other proprietary notations from the materials</li>
                <li>• Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">3. Disclaimer</h3>
              <p className="leading-relaxed">
                The materials on Quantum Climb's website are provided on an 'as is' basis. Quantum Climb makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">4. Limitations</h3>
              <p className="leading-relaxed">
                In no event shall Quantum Climb or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Quantum Climb website.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">5. Accuracy of Materials</h3>
              <p className="leading-relaxed">
                The materials appearing on Quantum Climb's website could include technical, typographical, or photographic errors. Quantum Climb does not warrant that any of the materials on its website are accurate, complete, or current. Quantum Climb may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">6. Contact Information</h3>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at qcquantumclimb@gmail.com.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CookiePolicy({ onClose }: LegalPageProps) {
  return (
    <section className="py-24 bg-black min-h-screen">
      <div className="container mx-auto px-6 pt-20">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded transition-colors z-40">
            <X size={24} className="text-white" />
          </button>
        </div>
        <Reveal type="fade-up" className="max-w-3xl mx-auto">
          <SectionHeader title="Cookie Policy" subtitle="Last updated: April 30, 2026" />
          
          <div className="mt-12 space-y-8 text-zinc-400">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">1. What Are Cookies</h3>
              <p className="leading-relaxed">
                Cookies are small pieces of data stored on your device (computer or mobile device) when you visit our website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">2. How We Use Cookies</h3>
              <p className="leading-relaxed mb-3">Quantum Climb uses cookies for the following purposes:</p>
              <ul className="space-y-2 ml-4">
                <li>• To enable certain functions of the website</li>
                <li>• To remember your preferences and settings</li>
                <li>• To understand how visitors use our website</li>
                <li>• To identify and prevent fraudulent activity</li>
                <li>• To improve the performance and functionality of our website</li>
                <li>• To deliver targeted advertising based on your interests</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">3. Types of Cookies</h3>
              <p className="leading-relaxed mb-3"><strong className="text-white">Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.</p>
              <p className="leading-relaxed mb-3"><strong className="text-white">Analytical Cookies:</strong> These cookies help us understand how visitors interact with our website. This information helps us improve the website and user experience.</p>
              <p className="leading-relaxed"><strong className="text-white">Marketing Cookies:</strong> These cookies are used to track visitors across websites to display targeted advertisements based on a visitor's interests.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">4. Cookie Control</h3>
              <p className="leading-relaxed">
                You can control and/or delete cookies as you wish. Most browsers allow you to refuse cookies and to alert you when cookies are being sent. If you disable cookies in your browser, some parts of our website may not function properly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">5. Third-Party Cookies</h3>
              <p className="leading-relaxed">
                In addition to our own cookies, we may also use various third-parties' cookies to report usage statistics of the website, deliver advertisements on and off the website, and so forth.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">6. Contact Us</h3>
              <p className="leading-relaxed">
                If you have questions about our Cookie Policy, please contact us at qcquantumclimb@gmail.com.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
