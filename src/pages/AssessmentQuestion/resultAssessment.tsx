import React from "react";
import { AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";

// Placeholder chart components (replace with your chart library, e.g., Chart.js, Recharts, etc.)
const DonutChart = () => (
  <div className="flex items-center justify-center h-48">
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#f3f4f6" />
      <path d="M60 10 A50 50 0 1 1 59.9 10" fill="none" stroke="#ef4444" strokeWidth="20" />
    </svg>
  </div>
);

const BarChart = () => (
  <div className="flex items-end h-32 gap-2 px-4">
    {[100, 60, 60, 60, 60].map((v, i) => (
      <div key={i} className="flex flex-col items-center">
        <div style={{ height: `${v / 2}px` }} className="w-8 bg-red-400 rounded-t" />
        <span className="text-xs mt-1 rotate-[-30deg] whitespace-nowrap">
          {['ICT Governance', 'Risk Management', 'Incident Response', 'Testing & Audit', '3rd Party Risk'][i]}
        </span>
      </div>
    ))}
  </div>
);

const LineChart = () => (
  <div className="flex items-end h-32 px-4">
    <svg width="200" height="100">
      <polyline
        fill="none"
        stroke="#14B8A6"
        strokeWidth="3"
        points="0,80 40,60 80,50 120,40 160,30 200,20"
      />
      {[0, 40, 80, 120, 160, 200].map((x, i) => (
        <circle key={i} cx={x} cy={80 - i * 12} r="4" fill="#14B8A6" />
      ))}
    </svg>
  </div>
);

const ResultAssessment = () => {
  // Placeholder values for compliance
  const compliancePercent = 52;
  const complianceLevel = "Basic Compliance Readiness";
  return (
    <div className="min-h-screen bg-[#F2F4F7] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-center">
          <Logo className="h-12 w-auto" />
        </div>
        {/* Header and completion section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#003399] mb-2">Assessment Results</h1>
          <p className="text-gray-600 text-lg mb-6">Your Egypt compliance readiness evaluation</p>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center mb-6">
            <div className="flex items-center text-[#003399] text-xl font-semibold mb-2">
              <AlertTriangle className="w-6 h-6 text-[#ef4444] mr-2" />
              Assessment Complete
            </div>
            <div className="text-6xl font-bold text-[#003399] mb-2">{compliancePercent}%</div>
            <div className="text-2xl font-semibold text-[#ef4444] mb-1">{complianceLevel}</div>
            <div className="text-gray-500 text-base">Based on your initial assessment responses</div>
          </div>
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Overall Compliance */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold text-[#003399] mb-2">Overall Compliance</h2>
            <DonutChart />
          </div>
          {/* Egypt Domain Breakdown */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-[#003399] mb-2">Egypt Domain Breakdown</h2>
            <BarChart />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-[#003399] mb-2">Projected Readiness Timeline</h2>
          <LineChart />
        </div>
        {/* Next Steps Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#003399] mb-4">Next Steps</h2>
          <div className="bg-[#f6f8fa] rounded-lg p-6 mb-4">
            <div className="font-semibold mb-2">Ready for the next phase! <span className="font-normal">Continue to our Evidence Upload platform to:</span></div>
            
          </div>
          <a
            href="https://go.comply.now/" // TODO: Replace with your real URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#003399] hover:bg-[#002266] text-white font-semibold px-6 py-3 rounded transition-colors text-lg shadow"
          >
            Continue to Evidence Platform <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultAssessment;
