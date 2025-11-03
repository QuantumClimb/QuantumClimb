import '../styles.css';

const TermsConditions = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Terms and Conditions</h1>
        <p className="policy-updated">Last Updated: November 3, 2025</p>

        <section className="policy-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Quantum Climb website and services, you accept and agree to 
            be bound by the terms and provisions of this agreement. If you do not agree to these 
            terms, please do not use our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Services Description</h2>
          <p>
            Quantum Climb provides Progressive Web App (PWA) development, business automation tools, 
            and custom software solutions for small businesses. Our services include but are not 
            limited to:
          </p>
          <ul className="policy-list">
            <li>Progressive Web App development and deployment</li>
            <li>Custom software solutions tailored to business needs</li>
            <li>Business automation and workflow optimization</li>
            <li>Mobile-first responsive design and development</li>
            <li>Consulting and technical support services</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. User Responsibilities</h2>
          <p>As a user of our services, you agree to:</p>
          <ul className="policy-list">
            <li>Provide accurate and complete information when requested</li>
            <li>Maintain the confidentiality of any account credentials</li>
            <li>Use our services in compliance with all applicable laws and regulations</li>
            <li>Not attempt to interfere with or disrupt our services</li>
            <li>Not use our services for any illegal or unauthorized purpose</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Intellectual Property</h2>
          <p>
            All content, features, and functionality on the Quantum Climb website, including but 
            not limited to text, graphics, logos, images, and software, are the exclusive property 
            of Quantum Climb or its licensors and are protected by international copyright, trademark, 
            and other intellectual property laws.
          </p>
          <h3 className="mt-4">Custom Development Projects</h3>
          <p>
            For custom development projects, intellectual property rights will be defined in the 
            project agreement. Unless otherwise specified, the client will own the final deliverables 
            while Quantum Climb retains rights to reusable components and frameworks.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Payment Terms</h2>
          <ul className="policy-list">
            <li>Payment terms will be specified in individual project agreements</li>
            <li>All prices are in the currency specified in the quote or invoice</li>
            <li>Late payments may incur additional charges as specified in agreements</li>
            <li>Refunds are subject to our Cancellation and Refund Policy</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Service Availability</h2>
          <p>
            While we strive to maintain continuous service availability, we do not guarantee that 
            our services will be uninterrupted or error-free. We reserve the right to modify, 
            suspend, or discontinue any aspect of our services with or without notice.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Quantum Climb shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages, or any loss of 
            profits or revenues, whether incurred directly or indirectly, or any loss of data, 
            use, goodwill, or other intangible losses resulting from:
          </p>
          <ul className="policy-list">
            <li>Your use or inability to use our services</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information</li>
            <li>Any interruption or cessation of transmission to or from our services</li>
            <li>Any bugs, viruses, or other harmful code that may be transmitted through our services</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>8. Warranties and Disclaimers</h2>
          <p>
            Our services are provided "as is" and "as available" without warranties of any kind, 
            either express or implied. We do not warrant that our services will meet your requirements 
            or expectations, or that they will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Confidentiality</h2>
          <p>
            We respect the confidentiality of information shared by our clients. Any confidential 
            information disclosed during the course of business will be protected and not shared 
            with third parties except as required by law or with your explicit consent.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our services immediately, without 
            prior notice or liability, for any reason whatsoever, including without limitation if 
            you breach these Terms and Conditions.
          </p>
        </section>

        <section className="policy-section">
          <h2>11. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any 
            material changes by posting the new Terms and Conditions on this page and updating the 
            "Last Updated" date. Your continued use of our services after such modifications 
            constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="policy-section">
          <h2>12. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the 
            laws of Malaysia, without regard to its conflict of law provisions. Any disputes arising 
            from these terms shall be subject to the exclusive jurisdiction of the courts of Malaysia.
          </p>
        </section>

        <section className="policy-section">
          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <ul className="policy-list">
            <li>Email: QuantumClimb@users.noreply.github.com</li>
            <li>WhatsApp: +60 11-6424 2145</li>
            <li>Website: https://quantumclimb.vercel.app</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
