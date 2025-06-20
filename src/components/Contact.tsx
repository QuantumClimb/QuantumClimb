import '../styles.css';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="contact-section">
      <h1 className="hero-title">You were meant to be <br /> more than just a number</h1>
      <p className="contact-text">Reach out anytime - we're just a tap away.</p>
      <div className="contact-buttons">
        <a
          href="https://wa.me/+601164242145"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          <FaWhatsapp className="contact-icon" />
          WhatsApp Us
        </a>
        <a
          href="https://www.instagram.com/quantum.climb/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          <FaInstagram className="contact-icon" />
          Instagram
        </a>
      </div>
    </section>
  );
};

export default Contact;
