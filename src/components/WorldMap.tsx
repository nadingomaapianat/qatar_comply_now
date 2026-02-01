import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Region {
  id: string;
  name: string;
  coordinates: [number, number];
  route: string;
  available: boolean;
  selected?: boolean;
}

const regions: Region[] = [
  { id: 'qatar', name: 'Qatar', coordinates: [51.2, 25.3], route: '/', available: true },
  { id: 'uae', name: 'UAE', coordinates: [54.0, 24.0], route: '#', available: false },
  { id: 'bahrain', name: 'Bahrain', coordinates: [50.5, 26.0], route: '#', available: false },
  { id: 'kuwait', name: 'Kuwait', coordinates: [47.5, 29.3], route: '#', available: false },
];

interface WorldMapProps {
  selectedRegion?: string;
  onClose?: () => void;
}

const WorldMap = ({ selectedRegion, onClose }: WorldMapProps) => {
  const navigate = useNavigate();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (region: Region) => {
    if (region.available) {
      navigate(region.route);
      onClose?.();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] bg-[#0a1210] rounded-2xl overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Container */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 400,
          center: [42, 24],
        }}
        className="w-full h-full relative z-10"
        style={{ pointerEvents: 'auto' }}
      >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isQatar = countryName === 'Qatar';
                const isHighlighted = isQatar;
                
                const getRoute = () => {
                  if (isQatar) return '/';
                  return null;
                };

                const isHovered = regions.find(r => r.id === 'qatar' && isQatar)?.id === hoveredRegion;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={(e) => {
                      e.stopPropagation();
                      const route = getRoute();
                      if (route) {
                        navigate(route);
                      }
                    }}
                    onMouseEnter={() => {
                      if (isQatar) setHoveredRegion('qatar');
                    }}
                    onMouseLeave={() => setHoveredRegion(null)}
                    fill={
                      isHovered 
                        ? 'hsl(160, 100%, 51%)' 
                        : isHighlighted 
                          ? 'hsl(160, 84%, 39%)' 
                          : '#1e2d28'
                    }
                    stroke="#2a3f38"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none', cursor: isHighlighted ? 'pointer' : 'default' },
                      hover: { outline: 'none', fill: isHighlighted ? 'hsl(160, 100%, 51%)' : '#2a3f38', cursor: isHighlighted ? 'pointer' : 'default' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Region Markers */}
          {regions.map((region) => (
            <Marker
              key={region.id}
              coordinates={region.coordinates}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region)}
              style={{ cursor: region.available ? 'pointer' : 'not-allowed' }}
            >
              {/* Pulse animation for available regions */}
              {region.available && (
                <>
                  <circle r={8} fill="hsl(var(--accent) / 0.3)" className="animate-ping" />
                  <circle r={6} fill="hsl(var(--accent) / 0.5)" />
                </>
              )}
              
              {/* Center dot */}
              <circle
                r={4}
                fill={
                  region.id === selectedRegion
                    ? 'hsl(var(--accent))'
                    : region.available
                      ? 'hsl(var(--primary))'
                      : '#4a5a55'
                }
                stroke={region.available ? 'hsl(var(--accent))' : '#4a5a55'}
                strokeWidth={2}
              />

              {/* Hover label */}
              {(hoveredRegion === region.id || region.id === selectedRegion) && (
                <g>
                  <rect
                    x={-40}
                    y={-35}
                    width={80}
                    height={24}
                    rx={4}
                    fill="hsl(var(--background) / 0.95)"
                    stroke={region.available ? 'hsl(var(--primary))' : '#4a5a55'}
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    y={-18}
                    style={{
                      fontFamily: 'system-ui',
                      fontSize: 11,
                      fontWeight: 600,
                      fill: region.available ? 'hsl(var(--foreground))' : '#6a7a75',
                    }}
                  >
                    {region.name}
                    {!region.available && ' (Soon)'}
                  </text>
                </g>
              )}
            </Marker>
          ))}
        
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-xl p-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Selected Region</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-primary border-2 border-accent" />
            <span className="text-muted-foreground">Available Regions</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            <span className="text-muted-foreground">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Active region */}
      <div className="absolute top-4 right-4 glass rounded-xl px-4 py-2">
        <div className="text-sm text-muted-foreground">Region</div>
        <div className="text-2xl font-bold gradient-text">Qatar</div>
      </div>
    </div>
  );
};

export default WorldMap;
