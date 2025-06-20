import { useState, useEffect } from 'react';
import '../styles.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

const slideImages = [
  '/images/slides/slide1.webp',
  '/images/slides/slide2.webp',
  '/images/slides/slide3.webp',
  '/images/slides/slide4.webp',
  '/images/slides/slide5.webp',
  '/images/slides/slide6.webp',
];

const Slides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
    setIsAutoPlaying(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  const getSlideClassName = (index: number) => {
    if (index === currentSlide) return 'carousel-slide active';
    if (index === ((currentSlide - 1 + slideImages.length) % slideImages.length)) return 'carousel-slide previous';
    return 'carousel-slide';
  };

  return (
    <section className="carousel-section">
      <div className="section-title">
        <h1>Build Once. Access Anywhere.</h1>
      </div>
      <div className="carousel-container">
        <div className="carousel">
          <button className="carousel-button prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <div className="carousel-track" {...handlers}>
            {slideImages.map((src, index) => (
              <div
                key={index}
                className={getSlideClassName(index)}
              >
                <img src={src} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          {slideImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slides;
