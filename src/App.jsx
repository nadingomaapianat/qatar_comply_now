import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Solutions from './components/Solutions';
import Journey from './components/Journey';
import Features from './components/Features';
import Footer from './components/Footer';
import RegionMapModal from './components/RegionMapModal';
import ContactModal from './components/ContactModal';
import { regions } from './data/regions';

function App() {
  const [currentRegion, setCurrentRegion] = useState('egypt');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactTitle, setContactTitle] = useState("Get Started");
  
  const regionData = regions[currentRegion];

  const handleRegionSelect = (regionKey) => {
    setCurrentRegion(regionKey);
    setIsMapOpen(false);
  };

  const handleOpenContact = (title = "Get Started") => {
    console.log("Opening Contact Modal:", title);
    setContactTitle(title);
    setIsContactOpen(true);
  };

  const handleDownload = () => {
    // Simulate a PDF download
    const element = document.createElement("a");
    const file = new Blob(
      [`Comply.Now - ${regionData.name} Regulatory Report\n\nThis is a sample compliance report for ${regionData.name}.`], 
      {type: 'text/plain'}
    );
    element.href = URL.createObjectURL(file);
    element.download = `comply-now-${currentRegion}-report.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRegulationDownload = (docName) => {
    const element = document.createElement("a");
    const file = new Blob(
      [`Comply.Now - ${docName}\n\nOfficial Regulatory Update Document.\nRegion: ${regionData.name}`], 
      {type: 'text/plain'}
    );
    element.href = URL.createObjectURL(file);
    element.download = `${docName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-brand-500/30 relative overflow-x-hidden">
      {/* Ambient Lighting */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Top Left Glow - Green */}
        <div className="glow-point bg-brand-500/10 w-[600px] h-[600px] -top-32 -left-32 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Bottom Right Glow - Blue */}
        <div className="glow-point bg-blue-500/10 w-[700px] h-[700px] -bottom-32 -right-32 animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Center Accent - White/Purple Mix for Depth */}
        <div className="glow-point bg-white/5 w-[900px] h-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />
      </div>

      <Navbar 
        currentRegion={currentRegion} 
        regions={regions} 
        onOpenMap={() => setIsMapOpen(true)}
        onGetStarted={() => handleOpenContact("Get Started")}
      />

      <div className="relative z-10">
        <RegionMapModal 
          isOpen={isMapOpen} 
          onClose={() => setIsMapOpen(false)}
          onSelectRegion={handleRegionSelect}
          currentRegion={currentRegion}
        />

        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)}
          title={contactTitle}
        />

        <Hero 
          data={regionData} 
          onGetStarted={() => handleOpenContact("Take Compliance Assessment")}
          onRequestDemo={() => handleOpenContact("Request a Demo")}
          onDownload={handleDownload}
        />
        
        <PainPoints data={regionData} />
        <Solutions data={regionData} />
        <Journey />
        <Features 
          data={regionData} 
          onDownloadReg={handleRegulationDownload}
        />
        
        <Footer 
          data={regionData} 
          onStartAssessment={() => handleOpenContact("Start Light Assessment")}
          onBookDemo={() => handleOpenContact("Book a Demo")}
        />
      </div>
    </div>
  );
}

export default App;
