import '../styles.css';

const VideoSection = () => {
  return (
    <section className="video-section">
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/6A_wAEr7nLs?loop=1&mute=1&playlist=6A_wAEr7nLs&autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1"
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
