import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertTriangle, FileSpreadsheet, Shield, Download } from 'lucide-react';

const Hero = ({ data, onGetStarted, onRequestDemo, onDownload }) => {
  return (
    <div className="relative pt-24 pb-16 lg:pt-32 overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              New: COSO 2013 Maturity Calculator
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
              Your Regulatory Shield for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">{data.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
              Automate compliance, strengthen cybersecurity, protect data, and drive sustainable finance—all in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={onGetStarted}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-950 bg-white hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-0.5"
              >
                Take Compliance Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={onRequestDemo}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-base font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Request a Demo
              </button>
            </div>

            {/*<div className="flex items-center gap-4">
              <button 
                onClick={onDownload}
                className="flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors group"
              >
                <div className="p-2 bg-brand-500/10 rounded-full group-hover:bg-brand-500/20 transition-colors">
                  <Download className="h-4 w-4" />
                </div>
                Download 2024 Regulatory Report
              </button>
            </div>*/}
          </motion.div>

          {/* Right Visual - Split Screen Old vs New */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Background Decor - Enhanced White Glow */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="absolute top-20 left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-[80px]" />
            
            <div className="relative glass-panel rounded-2xl p-6 lg:p-8 border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {/* Floating Cards Animation Container */}
              <div className="grid grid-cols-2 gap-4 relative">
                
                {/* The Old Way */}
                <motion.div 
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 0.5, scale: 0.95 }}
                  className="bg-slate-800/50 rounded-xl p-4 border border-white/5 opacity-60 grayscale"
                >
                  <div className="flex items-center gap-2 mb-3 text-red-400 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4" /> Manual Risk
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-700/50 rounded w-3/4" />
                    <div className="h-2 bg-slate-700/50 rounded w-full" />
                    <div className="h-2 bg-slate-700/50 rounded w-5/6" />
                    <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                      <FileSpreadsheet className="h-4 w-4" /> Excel_v12_FINAL.xlsx
                    </div>
                  </div>
                </motion.div>

                {/* The New Way (Overlapping/Prominent) */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-800/80 rounded-xl p-4 shadow-2xl border border-white/20 col-span-2 sm:col-span-1 sm:absolute sm:top-1/4 sm:-right-8 sm:w-64 z-10 backdrop-blur-md"
                >
                  {/* Card Glow */}
                  <div className="absolute inset-0 bg-white/5 rounded-xl pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-brand-500/20 rounded-lg flex items-center justify-center text-brand-400 border border-brand-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Status</div>
                        <div className="text-sm font-bold text-white shadow-brand-500/50">Compliant</div>
                      </div>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-brand-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                  </div>
                  
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">COSO Framework</span>
                      <span className="text-brand-400 font-medium">98%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 w-[98%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    </div>
                    
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-slate-400">Cyber Resilience</span>
                      <span className="text-brand-400 font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 w-[92%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    </div>
                  </div>
                </motion.div>

                {/* Abstract Connection Lines - Glowing White */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 opacity-30" viewBox="0 0 100 100">
                  <path d="M10,50 Q50,10 90,50" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </svg>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
