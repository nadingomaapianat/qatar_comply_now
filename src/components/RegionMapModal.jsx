import React, { memo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const RegionMapModal = ({ isOpen, onClose, onSelectRegion, currentRegion }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Glow Effect behind Map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50 z-10 relative">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Select Your Region
              {hoveredRegion && <span className="text-brand-400 text-sm font-normal animate-pulse">• {hoveredRegion}</span>}
            </h2>
            <p className="text-slate-400">Click on a highlighted country to switch regulatory context.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden cursor-move z-0">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 120,
              center: [20, 10] // Center nicely on EMEA
            }}
            className="w-full h-full"
          >
            <ZoomableGroup zoom={1.5} center={[30, 20]} minZoom={1} maxZoom={4}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const isEgypt = countryName === "Egypt";
                    const isQatar = countryName === "Qatar";
                    const isSelectable = isEgypt || isQatar;
                    const isSelected = (isEgypt && currentRegion === 'egypt') || (isQatar && currentRegion === 'qatar');

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          if (isEgypt) onSelectRegion('egypt');
                          if (isQatar) onSelectRegion('qatar');
                        }}
                        onMouseEnter={() => {
                          if (isSelectable) setHoveredRegion(countryName);
                        }}
                        onMouseLeave={() => {
                          setHoveredRegion(null);
                        }}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={countryName}
                        style={{
                          default: {
                            fill: isSelected 
                              ? "#22c55e" // Brand Green
                              : isSelectable 
                                ? "#1e293b" // Slate 800 (Clickable)
                                : "#0f172a", // Slate 900 (Background)
                            stroke: isSelectable ? "#4ade80" : "#1e293b",
                            strokeWidth: isSelectable ? 0.5 : 0.5,
                            outline: "none",
                            cursor: isSelectable ? "pointer" : "default",
                            filter: isSelected ? "drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))" : "none",
                            transition: "all 0.3s ease"
                          },
                          hover: {
                            fill: isSelectable ? "#4ade80" : "#0f172a",
                            stroke: isSelectable ? "#fff" : "#1e293b",
                            strokeWidth: isSelectable ? 1 : 0.5,
                            outline: "none",
                            cursor: isSelectable ? "pointer" : "default",
                            filter: isSelectable ? "drop-shadow(0 0 15px rgba(74, 222, 128, 0.6))" : "none",
                            transition: "all 0.3s ease"
                          },
                          pressed: {
                            fill: isSelectable ? "#16a34a" : "#0f172a",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
          <Tooltip id="my-tooltip" style={{ backgroundColor: "#1e293b", color: "#fff", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }} />
          
          {/* Legend/Helper */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-6 md:left-6 bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-lg z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-sm text-slate-300">Selected Region</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-slate-800 border border-brand-400"></div>
              <span className="text-sm text-slate-300">Available Regions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800"></div>
              <span className="text-sm text-slate-500">Coming Soon</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default memo(RegionMapModal);
