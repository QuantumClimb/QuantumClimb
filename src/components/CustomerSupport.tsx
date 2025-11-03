import '../styles.css';
import { FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa';

const CustomerSupport = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <h1 className="policy-title">Customer Support</h1>
        
        <section className="policy-section">
          <h2>We're Here to Help</h2>
          <p>
            At Quantum Climb, we're committed to providing exceptional support to help you succeed. 
            Whether you have questions about our services, need technical assistance, or want to discuss 
            a custom solution, our team is ready to assist you.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact Methods</h2>
          
          <div className="contact-method">
            <div className="contact-icon">
              <FaWhatsapp />
            </div>
            <div>
              <h3>WhatsApp</h3>
              <p>Quick responses to your queries</p>
              <a href="https://wa.me/+601164242145" target="_blank" rel="noopener noreferrer" className="contact-link">
                +60 11-6424 2145
              </a>
            </div>
          </div>

          <div className="contact-method">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div>
              <h3>Email</h3>
              <p>For detailed inquiries and documentation</p>
              <a href="mailto:QuantumClimb@users.noreply.github.com" className="contact-link">
                QuantumClimb@users.noreply.github.com
              </a>
            </div>
          </div>
        </section>

        <section className="policy-section">
          <h2>Support Hours</h2>
          <div className="support-hours">
            <FaClock className="hours-icon" />
            <div>
              <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (MYT)</p>
              <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM (MYT)</p>
              <p><strong>Sunday:</strong> Closed</p>
              <p className="mt-4 text-sm text-gray-600">
                * We aim to respond to all inquiries within 24 hours during business days
              </p>
            </div>
          </div>
        </section>

        <section className="policy-section">
          <h2>How We Can Help</h2>
          <ul className="policy-list">
            <li><strong>Technical Support:</strong> Assistance with our Progressive Web Apps and tools</li>
            <li><strong>General Inquiries:</strong> Questions about our services and capabilities</li>
            <li><strong>Custom Solutions:</strong> Discuss tailored software for your business needs</li>
            <li><strong>Project Consultation:</strong> Free initial consultation for new projects</li>
            <li><strong>Bug Reports:</strong> Report technical issues or bugs</li>
            <li><strong>Feature Requests:</strong> Suggest improvements or new features</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Before You Contact Us</h2>
          <p>To help us serve you better, please have the following information ready:</p>
          <ul className="policy-list">
            <li>Your name and business/organization name (if applicable)</li>
            <li>A clear description of your inquiry or issue</li>
            <li>Any relevant screenshots or error messages</li>
            <li>Your preferred method and time for follow-up</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Response Time</h2>
          <p>
            We strive to provide timely responses to all support requests:
          </p>
          <ul className="policy-list">
            <li><strong>WhatsApp:</strong> Usually within 2-4 hours during business hours</li>
            <li><strong>Email:</strong> Within 24 hours during business days</li>
            <li><strong>Complex Technical Issues:</strong> May require additional time for investigation</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Emergency Support</h2>
          <p>
            For critical issues affecting your live applications, please contact us via WhatsApp 
            with "URGENT" in your message. We'll prioritize your request and respond as quickly 
            as possible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CustomerSupport;
