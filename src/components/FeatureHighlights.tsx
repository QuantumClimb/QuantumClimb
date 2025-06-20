import '../styles.css';
import { FaServer, FaCube, FaCreditCard } from 'react-icons/fa';

const FeatureHighlights = () => {
  return (
    <section className="features-section">
      <h1 className="hero-title">Smart Apps For Smarter Business</h1>
      <p className="features-intro">
        We build apps for people who are tired of DIY tools that don't quite work, abandoned domain names, and agencies that charge the moon.
      </p>

      <div className="features-grid">
        <div className="feature">
          <FaServer className="feature-icon" />
          <h3 className="feature-title">We Host Everything</h3>
          <p className="feature-desc">Fast Next Generation Vercel servers with your own .app domain.</p>
        </div>
        <div className="feature">
          <FaCube className="feature-icon" />
          <h3 className="feature-title">All–In–One</h3>
          <p className="feature-desc">We build it, update it, and make sure it never breaks.</p>
        </div>
        <div className="feature">
          <FaCreditCard className="feature-icon" />
          <h3 className="feature-title">Simple Pricing</h3>
          <p className="feature-desc">Monthly subscription. No big upfront fees or hidden costs.</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
