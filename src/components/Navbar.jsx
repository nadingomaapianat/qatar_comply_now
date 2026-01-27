import React, { useState } from 'react';
import { Menu, X, ShieldCheck, ChevronDown, Map } from 'lucide-react';

const Navbar = ({ currentRegion, regions, onOpenMap, onLogin, onGetStarted }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-brand-500" />
            <span className="font-bold text-xl text-white">comply.now</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#solutions" className="text-slate-300 hover:text-brand-400 transition-colors">Solutions</a>
            <a href="#journey" className="text-slate-300 hover:text-brand-400 transition-colors">How it Works</a>
            <a href="#features" className="text-slate-300 hover:text-brand-400 transition-colors">Features</a>
            
            {/* Map Trigger Button */}
            <button 
              onClick={onOpenMap}
              className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-md hover:bg-slate-800 transition-all border border-slate-800 hover:border-brand-500/30"
            >
              <span className="text-xl">{regions[currentRegion].flag}</span>
              <span className="text-sm font-medium">{regions[currentRegion].name}</span>
              <Map className="h-4 w-4 ml-1 text-brand-500" />
            </button>

            <button 
              onClick={() => {
                console.log('Navbar Get Started Clicked');
                if (onGetStarted) onGetStarted();
              }}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#solutions" className="block px-3 py-2 text-slate-300 hover:text-brand-400 hover:bg-slate-800 rounded-md">Solutions</a>
            <a href="#journey" className="block px-3 py-2 text-slate-300 hover:text-brand-400 hover:bg-slate-800 rounded-md">How it Works</a>
            <a href="#features" className="block px-3 py-2 text-slate-300 hover:text-brand-400 hover:bg-slate-800 rounded-md">Features</a>
            
            {/* Mobile Map Trigger */}
            <div className="px-3 py-2">
              <button 
                onClick={() => {
                  onOpenMap();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-md border border-slate-700 bg-slate-800 text-white"
              >
                <span>{regions[currentRegion].flag}</span>
                <span className="font-medium">Switch Region (Map)</span>
                <Map className="h-4 w-4 text-brand-500" />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2 px-3">
              <button onClick={onGetStarted} className="w-full bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-500">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
