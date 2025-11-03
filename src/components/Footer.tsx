import '../styles.css';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="/images/footer_logo.png" alt="Quantum Climb Logo" className="footer-logo" />
        <div className="footer-social">
          <a href="https://wa.me/+601164242145" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="social-icon" />
          </a>
          <a href="https://www.instagram.com/quantum.climb/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
        
        <div className="footer-links">
          <Link to="/customer-support" className="footer-link">Customer Support</Link>
          <span className="footer-separator">•</span>
          <Link to="/terms-conditions" className="footer-link">Terms & Conditions</Link>
          <span className="footer-separator">•</span>
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <span className="footer-separator">•</span>
          <Link to="/cancellation-refund" className="footer-link">Cancellation & Refund</Link>
        </div>
        
        <p className="footer-copy">© {new Date().getFullYear()} Quantum Climb. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
