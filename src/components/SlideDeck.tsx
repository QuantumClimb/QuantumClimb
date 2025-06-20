import SlideCard from './SlideCard';
import { slidesData } from '../data/slidesData';

const SlideDeck = () => {
  return (
    <section className="slide-deck">
      {slidesData.map(slide => (
        <SlideCard
          key={slide.id}
          title={slide.title}
          subtitle={slide.subtitle}
          body={slide.body}
          image={slide.image}
        />
      ))}
    </section>
  );
};

export default SlideDeck;
