import '../styles.css';

const suiteData = [
  {
    icon: <img src="/images/suite/QuantumTrack.png" alt="QuantumTrack icon" width={256} height={256} />, // Blue wallet
    title: 'QuantumTrack',
    description: 'Stay in control of customer credit and dues.'
  },
  {
    icon: <img src="/images/suite/QuantumCare.png" alt="QuantumCare icon" width={256} height={256} />, // Purple cross
    title: 'QuantumCare',
    description: 'Book appointments, manage clinic records'
  },
  {
    icon: <img src="/images/suite/QuantumBite.png" alt="QuantumBite icon" width={256} height={256} />, // Gold bell
    title: 'QuantumBite',
    description: 'Build your online menu and take orders via WhatsApp'
  }
];

const QuantumSuite = () => {
  return (
    <section className="quantum-suite-section">
      <h1>Quantum Suite Coming Soon</h1>
      <p>New Arsenal of Readymade Tools</p>
      <div className="quantum-suite-cards">
        {suiteData.map((tool) => (
          <div key={tool.title} className="quantum-suite-card">
            <div className="quantum-suite-card-icon">{tool.icon}</div>
            {/* <h2 className="quantum-suite-card-title">{tool.title}</h2> */}
            <p className="quantum-suite-card-desc">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuantumSuite; 