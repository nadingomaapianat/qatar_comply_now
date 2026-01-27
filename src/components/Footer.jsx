import React from 'react';
import { ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';

const Footer = ({ data, onStartAssessment, onBookDemo }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      {/* Main CTA */}
      <div className="bg-brand-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">See Your Compliance Readiness in Minutes</h2>
          <p className="text-brand-100 mb-8 text-lg">
            Take our free light assessment and get a personalized report + access to the sandbox environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartAssessment}
              className="px-8 py-4 bg-white text-brand-600 font-bold rounded-lg shadow-xl hover:bg-slate-50 transition-colors"
            >
              Start Light Assessment
            </button>
            <button 
              onClick={onBookDemo}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-brand-500" />
              <span className="font-bold text-xl text-white">comply.now</span>
            </div>
            <p className="text-slate-400 text-sm">
              {data.footer.desc}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-400">Operational Resilience</a></li>
              <li><a href="#" className="hover:text-brand-400">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-brand-400">Data Protection</a></li>
              <li><a href="#" className="hover:text-brand-400">ESG & Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-400">Blog</a></li>
              <li><a href="#" className="hover:text-brand-400">Case Studies</a></li>
              <li><a href="#" className="hover:text-brand-400">Expert Network</a></li>
              <li><a href="#" className="hover:text-brand-400">Certified Training</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {data.footer.contact.email}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {data.footer.contact.phone}</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {data.footer.contact.address}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2024 comply.now. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
