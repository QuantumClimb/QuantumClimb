import '../styles.css';

const CancellationRefund = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Cancellation and Refund Policy</h1>
        <p className="policy-updated">Last Updated: November 3, 2025</p>

        <section className="policy-section">
          <h2>1. Overview</h2>
          <p>
            At Quantum Climb, we strive to deliver high-quality services and ensure customer 
            satisfaction. This policy outlines our terms for project cancellations and refunds. 
            We encourage clients to carefully review this policy before engaging our services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Project Cancellation Policy</h2>
          
          <h3>2.1 Cancellation by Client</h3>
          <p>
            Clients may cancel a project at any time by providing written notice via email or WhatsApp. 
            The cancellation will be effective upon receipt of the notice. Refund eligibility will 
            depend on the project stage at the time of cancellation.
          </p>

          <h3 className="mt-4">2.2 Cancellation by Quantum Climb</h3>
          <p>
            We reserve the right to cancel a project if:
          </p>
          <ul className="policy-list">
            <li>The client breaches the terms of the project agreement</li>
            <li>Payment is not received as per the agreed schedule</li>
            <li>The client provides false or misleading information</li>
            <li>The project requirements are beyond our capabilities</li>
            <li>Circumstances beyond our control make project completion impossible</li>
          </ul>
          <p className="mt-4">
            In such cases, any payments received will be refunded based on work completed up to 
            the cancellation date.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Refund Policy</h2>
          
          <h3>3.1 Refund Eligibility Based on Project Stage</h3>
          
          <div className="refund-stage">
            <h4>Stage 1: Initial Consultation & Planning (0-25% Complete)</h4>
            <ul className="policy-list">
              <li><strong>Full Refund (100%):</strong> Available within 7 days of project initiation if no substantial work has begun</li>
              <li><strong>Partial Refund (75%):</strong> Available if initial consultation and requirements gathering are complete but development has not started</li>
              <li><strong>Deductions:</strong> Initial consultation fees and administrative costs may be deducted</li>
            </ul>
          </div>

          <div className="refund-stage mt-4">
            <h4>Stage 2: Development in Progress (26-50% Complete)</h4>
            <ul className="policy-list">
              <li><strong>Partial Refund (50%):</strong> Available based on work completed</li>
              <li><strong>Assessment:</strong> We will assess the work completed and provide an itemized breakdown</li>
              <li><strong>Deliverables:</strong> Client receives all work completed to date</li>
            </ul>
          </div>

          <div className="refund-stage mt-4">
            <h4>Stage 3: Advanced Development (51-75% Complete)</h4>
            <ul className="policy-list">
              <li><strong>Partial Refund (25%):</strong> Limited refund available</li>
              <li><strong>Completion Option:</strong> We recommend completing the project rather than cancelling</li>
              <li><strong>Work Transfer:</strong> All completed work and source code will be delivered</li>
            </ul>
          </div>

          <div className="refund-stage mt-4">
            <h4>Stage 4: Final Testing & Deployment (76-100% Complete)</h4>
            <ul className="policy-list">
              <li><strong>No Refund:</strong> No refunds available at this stage</li>
              <li><strong>Rationale:</strong> Substantial work has been completed and delivered</li>
              <li><strong>Amendments:</strong> Minor adjustments may be made as per the agreement</li>
            </ul>
          </div>

          <h3 className="mt-6">3.2 Non-Refundable Items</h3>
          <p>The following items are non-refundable regardless of project stage:</p>
          <ul className="policy-list">
            <li>Third-party service fees (hosting, domains, licenses, APIs)</li>
            <li>Payment processing fees</li>
            <li>Custom assets purchased specifically for the project (stock images, fonts, etc.)</li>
            <li>Initial consultation fees (if specified separately)</li>
            <li>Work completed by subcontractors or third-party vendors</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Refund Process</h2>
          
          <h3>4.1 How to Request a Refund</h3>
          <ol className="policy-list">
            <li>Send a written cancellation and refund request via email to QuantumClimb@users.noreply.github.com</li>
            <li>Include your project details, reason for cancellation, and original payment information</li>
            <li>We will acknowledge receipt within 2 business days</li>
            <li>Our team will review your request and assess the project stage</li>
            <li>You will receive a refund determination within 5-7 business days</li>
          </ol>

          <h3 className="mt-4">4.2 Refund Timeline</h3>
          <ul className="policy-list">
            <li><strong>Approval Time:</strong> 5-7 business days for refund assessment</li>
            <li><strong>Processing Time:</strong> 7-14 business days after approval</li>
            <li><strong>Method:</strong> Refunds will be issued to the original payment method</li>
            <li><strong>Bank Processing:</strong> Additional 3-5 business days depending on your bank</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>5. Payment Schedule and Cancellation</h2>
          
          <h3>5.1 Milestone-Based Projects</h3>
          <p>
            For projects with milestone-based payments:
          </p>
          <ul className="policy-list">
            <li>Payment is required upon completion of each milestone</li>
            <li>Cancellation will be assessed based on completed milestones</li>
            <li>Refunds will not include payment for completed milestones</li>
            <li>Partial milestone work may be pro-rated</li>
          </ul>

          <h3 className="mt-4">5.2 Fixed-Price Projects</h3>
          <p>
            For fixed-price projects with upfront payment:
          </p>
          <ul className="policy-list">
            <li>Standard refund policy applies based on project stage</li>
            <li>Progress assessments will determine refund amount</li>
            <li>Detailed work logs will be provided for transparency</li>
          </ul>

          <h3 className="mt-4">5.3 Subscription or Retainer Services</h3>
          <ul className="policy-list">
            <li>Monthly subscriptions can be cancelled anytime</li>
            <li>No refunds for the current billing period</li>
            <li>Cancellation effective from the next billing cycle</li>
            <li>Unused hours in retainer agreements may be refunded (pro-rated)</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Disputes and Resolution</h2>
          
          <h3>6.1 Dispute Process</h3>
          <p>If you disagree with our refund assessment:</p>
          <ol className="policy-list">
            <li>Contact us within 7 days of receiving the refund determination</li>
            <li>Provide detailed reasons for your dispute</li>
            <li>We will arrange a meeting or call to discuss concerns</li>
            <li>We aim to reach a mutually agreeable solution</li>
          </ol>

          <h3 className="mt-4">6.2 Mediation</h3>
          <p>
            If we cannot reach an agreement, both parties agree to attempt mediation before 
            pursuing legal action. The cost of mediation will be shared equally.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Exceptions and Special Circumstances</h2>
          
          <h3>7.1 Force Majeure</h3>
          <p>
            In cases of force majeure (natural disasters, pandemics, war, etc.) that prevent 
            project completion:
          </p>
          <ul className="policy-list">
            <li>Projects may be paused without penalty</li>
            <li>Timelines will be extended accordingly</li>
            <li>Partial refunds may be negotiated based on circumstances</li>
          </ul>

          <h3 className="mt-4">7.2 Technical Impossibility</h3>
          <p>
            If we determine that project requirements are technically impossible or legally 
            impermissible after project initiation:
          </p>
          <ul className="policy-list">
            <li>Full refund minus work completed and consultation fees</li>
            <li>Detailed explanation of technical limitations</li>
            <li>Alternative solutions may be proposed</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>8. Client Responsibilities</h2>
          <p>
            To ensure smooth project execution and avoid cancellation issues:
          </p>
          <ul className="policy-list">
            <li>Provide timely feedback and approvals</li>
            <li>Make payments according to the agreed schedule</li>
            <li>Provide accurate and complete project requirements</li>
            <li>Respond to communication within reasonable timeframes</li>
            <li>Review deliverables promptly upon submission</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>9. Amendments to This Policy</h2>
          <p>
            We reserve the right to modify this Cancellation and Refund Policy at any time. 
            Changes will be posted on this page with an updated "Last Updated" date. Projects 
            initiated before policy changes will be subject to the policy in effect at the time 
            of project commencement.
          </p>
        </section>

        <section className="policy-section">
          <h2>10. Contact Information</h2>
          <p>
            For questions about this policy or to request a cancellation or refund, please contact us:
          </p>
          <ul className="policy-list">
            <li><strong>Email:</strong> QuantumClimb@users.noreply.github.com</li>
            <li><strong>WhatsApp:</strong> +60 11-6424 2145</li>
            <li><strong>Website:</strong> https://quantumclimb.vercel.app</li>
          </ul>
          <p className="mt-4">
            We are committed to handling all cancellations and refunds fairly and transparently. 
            Our goal is to ensure customer satisfaction while maintaining fair business practices.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CancellationRefund;
