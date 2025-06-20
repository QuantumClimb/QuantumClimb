import '../styles.css';

interface SlideCardProps {
  title: string;
  subtitle: string;
  body: string;
  image: string;
}

const SlideCard: React.FC<SlideCardProps> = ({ title, subtitle, body, image }) => {
  return (
    <div className="slide-card">
      <div className="slide-card-text">
        <h2 className="slide-title">{title}</h2>
        <p className="slide-subtitle">{subtitle}</p>
        <p className="slide-body">{body}</p>
      </div>
      <div className="slide-card-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default SlideCard;
