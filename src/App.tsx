import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Slides from './components/Slides'
import DemoGrid from './components/DemoGrid'
import FeatureHighlights from './components/FeatureHighlights';
import QuantumSuite from './components/QuantumSuite';

import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <VideoSection />
      <Slides />
      <DemoGrid />
      <QuantumSuite />
      <FeatureHighlights />
      <Contact />
      <Footer />
    </>
  )
}

export default App
