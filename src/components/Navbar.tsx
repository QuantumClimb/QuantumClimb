import { useEffect, useState } from 'react';
import '../styles.css';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import 'flag-icons/css/flag-icons.min.css';

const Navbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [countryCode, setCountryCode] = useState('in');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) {
          setCountryCode(data.country_code.toLowerCase());
        }
      });

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="clock">{time}</span>
        <span className="flag-icon-wrapper">
          <span className={`fi fi-${countryCode}`}></span>
        </span>
      </div>

      <div className="navbar-center">
        <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-right">
        <a href="https://wa.me/+601164242145" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="social-icon" />
        </a>
        <a href="https://www.instagram.com/quantum.climb/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
      </div>
    </header>
  );
};

export default Navbar;
