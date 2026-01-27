import React from 'react';
import { CheckSquare, Bell, FileText, Globe, Download } from 'lucide-react';

const Features = ({ data, onDownloadReg }) => {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Deep Dive into Capabilities</h2>
          <p className="text-slate-400">Powerful tools designed for the modern compliance officer.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="glass-panel p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
              <div className="bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-slate-200">Risk Heatmap</h4>
                  <span className="px-2 py-1 bg-red-900/50 text-red-400 text-xs rounded-full font-medium border border-red-500/20">High Priority</span>
                </div>
                <div className="grid grid-cols-3 gap-2 h-48">
                  <div className="bg-red-500/20 rounded border border-red-500/30"></div>
                  <div className="bg-orange-500/20 rounded border border-orange-500/30"></div>
                  <div className="bg-green-500/20 rounded border border-green-500/30"></div>
                  <div className="bg-red-500/40 rounded border border-red-500/50"></div>
                  <div className="bg-yellow-500/20 rounded border border-yellow-500/30"></div>
                  <div className="bg-green-500/20 rounded border border-green-500/30"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="h-12 w-12 bg-brand-900/50 rounded-xl flex items-center justify-center text-brand-500 mb-6 border border-brand-500/20">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Real-time Alerts for Control Deficiencies</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Don't wait for the audit. Get instant notifications when controls fail or key risk indicators breach thresholds.
              Our system continuously monitors your operational environment.
            </p>
            <ul className="space-y-3">
              {[
                'Instant notification via Email/SMS',
                'Automated remediation workflows',
                'Audit trail for every alert'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckSquare className="h-5 w-5 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-12 w-12 bg-purple-900/50 rounded-xl flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Global & Local Framework Alignment</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {data.features.frameworksDesc}
            </p>
            <ul className="space-y-3">
              {data.features.frameworksList.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <FileText className="h-5 w-5 text-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="glass-panel p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
              <div className="bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-700">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <button 
                      key={i} 
                      onClick={() => onDownloadReg(`Regulation_Update_v${i}.0`)}
                      className="w-full flex items-center justify-between p-3 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition-colors group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center text-xs text-slate-400 group-hover:text-white transition-colors">PDF</div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Regulation_Update_v{i}.0</div>
                      </div>
                      <Download className="h-4 w-4 text-slate-500 group-hover:text-brand-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
