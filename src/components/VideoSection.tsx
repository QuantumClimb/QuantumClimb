import '../styles.css';

const VideoSection = () => {
  return (
    <section className="video-section">
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/x27cjL7cOBA?loop=1&mute=1&playlist=x27cjL7cOBA&autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="Quantum Climb Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ backgroundColor: 'black' }}
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;
