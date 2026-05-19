import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
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

function getFirstBoundaryPoint(feature?: GeoFeature): [number, number] {
  const fallback: [number, number] = [85.24382319839297, 20.87778769961249];
  if (!feature?.geometry) return fallback;
  const g = feature.geometry;
  if (g.type === 'Polygon') {
    const ring = (g.coordinates as number[][][])[0];
    return (ring?.[0] as [number, number]) || fallback;
  }
  if (g.type === 'MultiPolygon') {
    const ring = (g.coordinates as number[][][][])[0]?.[0];
    return (ring?.[0] as [number, number]) || fallback;
  }
  return fallback;
}

function showMapLoadHint(mapEl: HTMLElement, message: string) {
  mapEl.innerHTML = `<p class="portal-about-map-load-hint" style="padding:1rem 1.25rem;margin:0;font-size:0.95rem;line-height:1.5;color:#2f4f6f;background:#f0f6fb;border-radius:12px;">${message}</p>`;
}

function renderOdishaMap(mapEl: HTMLElement, geoData: GeoData): () => void {
  const chart: ECharts = echarts.init(mapEl);
  const features = geoData.features || [];
  const angulFeature = features.find((f) => (f.properties?.Dist_Name || '').toLowerCase() === 'angul');
  const markerPoint = getFirstBoundaryPoint(angulFeature);
  const districtSeriesData = features.map((feature, idx) => {
    const props = feature.properties || {};
    const distName = props.Dist_Name || 'Unknown';
    const distCode = Number(props.Dist_Code || 0);
    const value = Number.isFinite(distCode) && distCode > 0 ? distCode : idx + 1;
    return { name: distName, value };
  });
  let minVal = districtSeriesData[0]?.value ?? 0;
  let maxVal = districtSeriesData[0]?.value ?? 1;
  districtSeriesData.forEach((item) => {
    if (item.value < minVal) minVal = item.value;
    if (item.value > maxVal) maxVal = item.value;
  });

  echarts.registerMap('odisha-districts', geoData as never);
  chart.setOption({
    backgroundColor: '#ffffff',
    tooltip: {
      trigger: 'item',
      formatter: (params: { seriesType?: string; name?: string; value?: number }) => {
        if (params.seriesType === 'effectScatter') {
          return `Angul (${markerPoint[1].toFixed(3)}, ${markerPoint[0].toFixed(3)})`;
        }
        return `${params.name || 'District'}<br/>Code: ${params.value ?? '-'}`;
      },
    },
    visualMap: {
      min: minVal,
      max: maxVal,
      orient: 'horizontal',
      left: 'left',
      bottom: 10,
      text: ['High', 'Low'],
      calculable: true,
      inRange: { color: ['#b6d8f5', '#0f67af', '#083a77'] },
      textStyle: { color: '#2f4f6f' },
    },
    geo: {
      map: 'odisha-districts',
      nameProperty: 'Dist_Name',
      roam: true,
      zoom: 1.15,
      label: { show: true, color: '#ffffff', fontSize: 9 },
      itemStyle: { areaColor: '#1b6db0', borderColor: '#d8efff', borderWidth: 1 },
      emphasis: {
        itemStyle: { areaColor: '#1484d1' },
        label: { show: true, color: '#ffffff', fontWeight: 700 },
      },
    },
    series: [
      {
        name: 'Districts',
        type: 'map',
        map: 'odisha-districts',
        nameProperty: 'Dist_Name',
        geoIndex: 0,
        data: districtSeriesData,
        selectedMode: false,
      },
      {
        name: 'Route',
        type: 'lines',
        coordinateSystem: 'geo',
        polyline: true,
        data: [{ coords: [markerPoint, [85.8245, 20.2961], [86.6745, 20.4625]] }],
        lineStyle: { color: '#2b6ea8', width: 2, opacity: 0.75 },
        effect: {
          show: true,
          constantSpeed: 34,
          symbol: 'circle',
          symbolSize: 6,
          trailLength: 0.28,
          color: '#2b6ea8',
        },
      },
      {
        name: 'Location',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        data: [{ name: 'Angul', value: [markerPoint[0], markerPoint[1], 1] }],
        symbolSize: 9,
        showEffectOn: 'render',
        rippleEffect: { scale: 4, period: 3.2, brushType: 'stroke' },
        itemStyle: { color: '#ffffff', borderColor: '#9ddfff', borderWidth: 1.5 },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 700,
        },
      },
    ],
  });

  const onResize = () => chart.resize();
  window.addEventListener('resize', onResize);
  return () => {
    window.removeEventListener('resize', onResize);
    chart.dispose();
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
    if (window.__ODISHA_DISTRICTS_GEOJSON__) {
      tryRender(window.__ODISHA_DISTRICTS_GEOJSON__);
      return;
    }
    try {
      const response = await fetch(publicAssetUrl('/assets/data/odisha-districts.geojson'));
      if (response.ok) {
        tryRender((await response.json()) as GeoData);
        return;
      }
    } catch {
      /* embed fallback */
    }
    const script = document.createElement('script');
    script.src = publicAssetUrl('/assets/data/odisha-districts.embed.js');
    script.async = true;
    script.onload = () => {
      if (window.__ODISHA_DISTRICTS_GEOJSON__) tryRender(window.__ODISHA_DISTRICTS_GEOJSON__);
      else showMapLoadHint(mapEl, 'District map embed data was missing.');
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
