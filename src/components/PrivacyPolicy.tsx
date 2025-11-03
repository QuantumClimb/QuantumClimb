import '../styles.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-updated">Last Updated: November 3, 2025</p>

        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            At Quantum Climb, we are committed to protecting your privacy and ensuring the security 
            of your personal information. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you visit our website or use our services.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance 
            with this policy. If you do not agree with our policies and practices, please do not use 
            our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          
          <h3>Personal Information</h3>
          <p>We may collect the following types of personal information:</p>
          <ul className="policy-list">
            <li><strong>Contact Information:</strong> Name, email address, phone number, WhatsApp contact</li>
            <li><strong>Business Information:</strong> Company name, business type, industry</li>
            <li><strong>Communication Data:</strong> Messages, inquiries, and feedback you send to us</li>
            <li><strong>Project Information:</strong> Details about your project requirements and specifications</li>
          </ul>

          <h3 className="mt-4">Technical Information</h3>
          <p>We automatically collect certain information when you visit our website:</p>
          <ul className="policy-list">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Device identifiers and mobile network information</li>
          </ul>

          <h3 className="mt-4">Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and 
            store certain information. You can instruct your browser to refuse all cookies or to 
            indicate when a cookie is being sent.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for various purposes:</p>
          <ul className="policy-list">
            <li><strong>Service Delivery:</strong> To provide, maintain, and improve our services</li>
            <li><strong>Communication:</strong> To respond to inquiries, provide customer support, and send updates</li>
            <li><strong>Project Management:</strong> To understand requirements and deliver custom solutions</li>
            <li><strong>Analytics:</strong> To analyze usage patterns and improve user experience</li>
            <li><strong>Marketing:</strong> To send newsletters and promotional materials (with your consent)</li>
            <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
            <li><strong>Security:</strong> To detect, prevent, and address technical issues and security threats</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Information Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share 
            your information only in the following circumstances:
          </p>
          <ul className="policy-list">
            <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our website and services (e.g., hosting providers, analytics services)</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental request</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users</li>
            <li><strong>With Consent:</strong> When you have given explicit consent to share your information</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction. 
            These measures include:
          </p>
          <ul className="policy-list">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Secure development practices</li>
            <li>Regular backups and disaster recovery procedures</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the internet or electronic storage is 100% secure. 
            While we strive to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes 
            outlined in this Privacy Policy, unless a longer retention period is required or permitted 
            by law. When we no longer need your information, we will securely delete or anonymize it.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Your Privacy Rights</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul className="policy-list">
            <li><strong>Access:</strong> Request access to your personal information we hold</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Objection:</strong> Object to the processing of your personal information</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us using the information provided at the end 
            of this policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services. We are not responsible 
            for the privacy practices or content of these third parties. We encourage you to review 
            the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly 
            collect personal information from children. If you believe we have collected information 
            from a child, please contact us immediately, and we will take steps to delete such information.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on computers located outside of 
            your jurisdiction where data protection laws may differ. We ensure appropriate safeguards 
            are in place to protect your information in accordance with this Privacy Policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>11. Progressive Web App (PWA) Specific</h2>
          <p>
            Our Progressive Web App may store certain data locally on your device for offline 
            functionality and improved performance. This includes:
          </p>
          <ul className="policy-list">
            <li>Cached website assets and content</li>
            <li>Application preferences and settings</li>
            <li>Temporary data for offline functionality</li>
          </ul>
          <p className="mt-4">
            You can clear this data at any time through your browser settings or by uninstalling 
            the PWA.
          </p>
        </section>

        <section className="policy-section">
          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices 
            or legal requirements. We will notify you of any material changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically for any changes. Your 
            continued use of our services after changes are posted constitutes your acceptance of 
            the updated policy.
          </p>
        </section>

        <section className="policy-section">
          <h2>13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our 
            data practices, please contact us at:
          </p>
          <ul className="policy-list">
            <li><strong>Email:</strong> QuantumClimb@users.noreply.github.com</li>
            <li><strong>WhatsApp:</strong> +60 11-6424 2145</li>
            <li><strong>Website:</strong> https://quantumclimb.vercel.app</li>
          </ul>
          <p className="mt-4">
            We will respond to your inquiries within a reasonable timeframe and make every effort 
            to address your concerns.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
