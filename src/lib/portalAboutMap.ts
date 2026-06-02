import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { publicAssetUrl } from '@/lib/publicAssetUrl';

type GeoFeature = {
  properties?: { Dist_Name?: string; Dist_Code?: string | number };
  geometry?: { type: string; coordinates: unknown };
};

type GeoData = { features?: GeoFeature[] };

declare global {
  interface Window {
    __ODISHA_DISTRICTS_GEOJSON__?: GeoData;
  }
}

const POPULATIONS: Record<string, number> = {
  'Ganjam': 3529031,
  'Cuttack': 2624470,
  'Mayurbhanj': 2519738,
  'Balasore': 2320492,
  'Baleshwar': 2320492,
  'Khordha': 2251752,
  'Sundargarh': 2093437,
  'Jajpur': 1842897,
  'Jajapur': 1842897,
  'Puri': 1698730,
  'Balangir': 1648997,
  'Bhadrak': 1506337,
  'Bargarh': 1481255,
  'Kendrapara': 1440361,
  'Kendujhar': 1801733,
  'Keonjhar': 1801733,
  'Kalahandi': 1576869,
  'Rayagada': 967911,
  'Koraput': 1379647,
  'Nabarangpur': 1220946,
  'Dhenkanal': 1192811,
  'Jagatsinghapur': 1136971,
  'Jagatsinghpur': 1136971,
  'Nayagarh': 962789,
  'Kandhamal': 733110,
  'Sambalpur': 1041099,
  'Nuapada': 610492,
  'Malkangiri': 613192,
  'Jharsuguda': 579505,
  'Subarnapur': 610183,
  'Sonepur': 610183,
  'Boudh': 441162,
  'Debagarh': 312520,
  'Deogarh': 312520,
  'Gajapati': 577817,
  'Angul': 1273821,
};

function getColor(pop: number): string {
  return pop > 3000000 ? '#08306b' :
         pop > 2500000 ? '#08519c' :
         pop > 2000000 ? '#2171b5' :
         pop > 1500000 ? '#4292c6' :
         pop > 1000000 ? '#6baed6' :
         pop > 500000  ? '#9ecae1' :
                         '#c6dbef';
}

function getDistrictStats(distName: string) {
  // Deterministic seed based on district name characters
  let seed = 0;
  for (let i = 0; i < distName.length; i++) {
    seed += distName.charCodeAt(i);
  }
  
  const pop = POPULATIONS[distName] || 1000000;
  // Calculate relative realistic values based on population
  const complaints = Math.floor((pop * 0.003) + (seed % 150));
  const charCerts = Math.floor((pop * 0.08) + (seed % 500));
  const seniorReqs = Math.floor((pop * 0.005) + (seed % 100));

  return {
    population: pop,
    complaints: complaints,
    charCerts: charCerts,
    seniorReqs: seniorReqs
  };
}

function showMapLoadHint(mapEl: HTMLElement, message: string) {
  mapEl.innerHTML = `<p class="portal-about-map-load-hint" style="padding:1rem 1.25rem;margin:0;font-size:0.95rem;line-height:1.5;color:#2f4f6f;background:#f0f6fb;border-radius:12px;">${message}</p>`;
}

function renderOdishaMap(mapEl: HTMLElement, geoData: GeoData): () => void {
  // Clear any existing elements or leaflet remnants
  mapEl.innerHTML = '';
  
  // Set explicit height
  mapEl.style.height = '480px';
  mapEl.style.width = '100%';
  mapEl.style.borderRadius = '12px';
  mapEl.style.overflow = 'hidden';
  mapEl.style.position = 'relative';

  // Create custom tooltip element
  const tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '10000';
  tooltip.style.background = 'rgba(33, 43, 54, 0.96)';
  tooltip.style.color = '#ffffff';
  tooltip.style.padding = '12px 16px';
  tooltip.style.borderRadius = '6px';
  tooltip.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.fontFamily = 'system-ui, sans-serif';
  tooltip.style.display = 'none';
  tooltip.style.border = '1px solid rgba(255, 255, 255, 0.15)';
  tooltip.style.minWidth = '230px';
  mapEl.appendChild(tooltip);

  // Initialize leaflet map centered on Odisha
  const map = L.map(mapEl, {
    center: [20.45, 84.85],
    zoom: 7,
    minZoom: 6,
    maxZoom: 10,
    zoomControl: true,
  });

  // Use the standard OpenStreetMap tile layer which provides the gorgeous greenish touch for forests/parks/mountains
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  // Styling function for GeoJSON features
  const styleFeature = (feature: any) => {
    const distName = feature.properties?.Dist_Name || '';
    const pop = POPULATIONS[distName] || 1000000;
    return {
      fillColor: getColor(pop),
      weight: 1.5,
      opacity: 0.95,
      color: '#2a445d',
      fillOpacity: 0.88,
    };
  };

  // Add the GeoJSON layer
  const geojsonLayer = L.geoJSON(geoData as any, {
    style: styleFeature,
    onEachFeature: (feature, layer: any) => {
      const distName = feature.properties?.Dist_Name || 'Unknown';
      
      // Add a centered label
      if (typeof layer.getBounds === 'function') {
        const bounds = layer.getBounds();
        const center = bounds.getCenter();
        
        // Centroid fine-tuning
        let centroid = center;
        if (distName === 'Kendrapara') centroid = L.latLng(20.52, 86.43);
        if (distName === 'Puri') centroid = L.latLng(19.89, 85.80);
        if (distName === 'Jagatsinghpur') centroid = L.latLng(20.21, 86.20);
        
        L.marker(centroid, {
          icon: L.divIcon({
            className: 'district-label',
            html: `<div style="color: #ffffff; font-weight: bold; font-size: 9.5px; text-shadow: 1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000; text-align: center; white-space: nowrap; font-family: system-ui, sans-serif;">${distName}</div>`,
            iconSize: [80, 20],
            iconAnchor: [40, 10]
          }),
          interactive: false
        }).addTo(map);
      }

      // Hover feedback and custom tooltip positioning
      layer.on({
        mouseover: (e: any) => {
          const l = e.target;
          l.setStyle({
            weight: 3.5,
            color: '#ffffff',
            fillOpacity: 0.95
          });
          l.bringToFront();

          // Update tooltip content
          const stats = getDistrictStats(distName);
          tooltip.style.display = 'block';
          tooltip.innerHTML = `
            <div style="font-weight: bold; font-size: 13.5px; margin-bottom: 6px; border-bottom: 1px solid rgba(255, 255, 255, 0.25); padding-bottom: 4px; color: #93c5fd;">${distName}</div>
            <div style="font-size: 11.5px; line-height: 1.7; color: #f8fafc;">
              <strong>Population:</strong> ${stats.population.toLocaleString()}<br/>
              <strong>Complaint Registration:</strong> ${stats.complaints.toLocaleString()}<br/>
              <strong>Character Certificate Request:</strong> ${stats.charCerts.toLocaleString()}<br/>
              <strong>Senior Citizen request:</strong> ${stats.seniorReqs.toLocaleString()}
            </div>
          `;
        },
        mousemove: (e: any) => {
          const containerRect = mapEl.getBoundingClientRect();
          const x = e.originalEvent.clientX - containerRect.left + 15;
          const y = e.originalEvent.clientY - containerRect.top - 15;
          
          // Constrain within map container borders
          const tooltipWidth = 240;
          const tooltipHeight = 110;
          const leftPos = x + tooltipWidth > containerRect.width ? x - tooltipWidth - 25 : x;
          const topPos = y + tooltipHeight > containerRect.height ? y - tooltipHeight - 10 : y;

          tooltip.style.left = `${leftPos}px`;
          tooltip.style.top = `${topPos}px`;
        },
        mouseout: (e: any) => {
          geojsonLayer.resetStyle(e.target);
          tooltip.style.display = 'none';
        }
      });
    }
  }).addTo(map);

  // Add the custom horizontal legend
  const legend = new L.Control({ position: 'bottomleft' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.background = 'rgba(255, 255, 255, 0.92)';
    div.style.padding = '8px 14px';
    div.style.borderRadius = '8px';
    div.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
    div.style.fontSize = '11px';
    div.style.color = '#2f4f6f';
    div.style.fontFamily = 'system-ui, sans-serif';
    div.style.minWidth = '220px';

    const grades = [0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000];
    
    div.innerHTML = `<div style="font-weight: bold; margin-bottom: 6px; text-align: left; font-size: 11px;">Population</div>`;
    
    let colorRow = `<div style="display: flex; height: 12px; margin-bottom: 4px; border-radius: 3px; overflow: hidden; border: 1px solid #cbd5e1;">`;
    let labelRow = `<div style="display: flex; justify-content: space-between; font-size: 9px; color: #475569; font-weight: 500;">`;
    
    grades.forEach((grade) => {
      const color = getColor(grade + 1);
      colorRow += `<div style="flex: 1; background: ${color};"></div>`;
      
      let labelText = '';
      if (grade === 0) labelText = '0';
      else if (grade >= 1000000) labelText = (grade / 1000000) + 'M';
      else labelText = (grade / 1000) + 'k';
      
      labelRow += `<span style="flex: 1; text-align: center; min-width: 25px;">${labelText}</span>`;
    });
    
    colorRow += `</div>`;
    labelRow += `</div>`;
    
    div.innerHTML += colorRow + labelRow;
    return div;
  };
  legend.addTo(map);

  const onResize = () => {
    map.invalidateSize();
  };
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
    map.remove();
  };
}

export function initOdishaMap(): (() => void) | undefined {
  const mapEl = document.getElementById('portalAboutMap');
  if (!mapEl) return undefined;

  let cleanup: (() => void) | undefined;
  let cancelled = false;

  const tryRender = (geoData: GeoData) => {
    if (cancelled) return;
    if (!(geoData.features || []).length) {
      showMapLoadHint(mapEl, 'District map data is empty or invalid.');
      return;
    }
    cleanup = renderOdishaMap(mapEl, geoData);
  };

  const load = async () => {
    let odishaGeo: GeoData | undefined;

    // Load Odisha districts GeoJSON map
    if (window.__ODISHA_DISTRICTS_GEOJSON__) {
      odishaGeo = window.__ODISHA_DISTRICTS_GEOJSON__;
    } else {
      try {
        const response = await fetch(publicAssetUrl('/assets/data/odisha-districts.geojson'));
        if (response.ok) {
          odishaGeo = (await response.json()) as GeoData;
        }
      } catch {
        /* fallback */
      }
    }

    if (odishaGeo) {
      tryRender(odishaGeo);
      return;
    }

    // Fallback embed
    const script = document.createElement('script');
    script.src = publicAssetUrl('/assets/data/odisha-districts.embed.js');
    script.async = true;
    script.onload = () => {
      if (window.__ODISHA_DISTRICTS_GEOJSON__) {
        tryRender(window.__ODISHA_DISTRICTS_GEOJSON__);
      } else {
        showMapLoadHint(mapEl, 'District map embed data was missing.');
      }
    };
    script.onerror = () => showMapLoadHint(mapEl, 'Could not load district map data.');
    document.head.appendChild(script);
  };

  void load();

  return () => {
    cancelled = true;
    cleanup?.();
  };
}
