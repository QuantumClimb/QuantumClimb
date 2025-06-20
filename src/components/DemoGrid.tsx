import { useState, useEffect } from 'react';
import '../styles.css';

interface DemoMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  isLoading: boolean;
}

const initialDemos: DemoMetadata[] = [
  {
    title: 'Soulrich',
    description: 'Loading...',
    image: '',
    url: 'https://soulrich.vercel.app/',
    isLoading: true
  },
  {
    title: 'DJMC Dave',
    description: 'Loading...',
    image: '',
    url: 'https://djmcdave.vercel.app/',
    isLoading: true
  },
  {
    title: 'Sunshine Cosmetics',
    description: 'Loading...',
    image: '',
    url: 'https://sunshinecosmetics.vercel.app/',
    isLoading: true
  },
  {
    title: 'DJ Lollipop',
    description: 'Loading...',
    image: '',
    url: 'https://djlollipop.vercel.app/',
    isLoading: true
  },
];

const DemoGrid = () => {
  const [demos, setDemos] = useState<DemoMetadata[]>(initialDemos);

  useEffect(() => {
    const fetchMetadata = async (url: string) => {
      try {
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          return {
            title: data.data.title || '',
            description: data.data.description || '',
            image: data.data.image?.url || '',
            url: url,
            isLoading: false
          };
        }
        return null;
      } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
      }
    };

    const updateDemosMetadata = async () => {
      const updatedDemos = await Promise.all(
        demos.map(async (demo) => {
          const metadata = await fetchMetadata(demo.url);
          return metadata || demo;
        })
      );
      setDemos(updatedDemos);
    };

    updateDemosMetadata();
  }, []);

  return (
    <section className="demo-grid">
      <h1 className="hero-title">Real People. Real Stories</h1>
      <div className="demo-cards">
        {demos.map((demo, index) => (
          <a href={demo.url} target="_blank" rel="noopener noreferrer" key={index} className={`demo-card ${demo.isLoading ? 'loading' : ''}`}>
            <div className="demo-image-wrapper">
              {demo.isLoading ? (
                <div className="demo-image-placeholder" />
              ) : (
                <img src={demo.image} alt={demo.title} className="demo-image" />
              )}
            </div>
            <div className="demo-content">
              <h3 className="demo-name">{demo.title}</h3>
              <p className="demo-description">
                {demo.isLoading ? 'Loading...' : demo.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default DemoGrid;
