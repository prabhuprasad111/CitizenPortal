import ApexCharts from 'apexcharts';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const DISTRICT_LABELS = [
  'ANGUL', 'BALANGIR', 'BALASORE', 'BARGARH', 'BHADRAK', 'BERHAMPUR', 'BOUDH', 'CID',
  'CRIME BRANCH', 'CUTTACK', 'CUTTACK RURAL', 'DEOGARH', 'DHENKANAL', 'GAJAPATI', 'GANJAM',
  'JAGATSINGHPUR', 'JAJPUR', 'JHARSUGUDA', 'KALAHANDI', 'KANDHAMAL', 'KENDRAPARA', 'KEONJHAR',
  'KHORDHA', 'KORAPUT', 'MALKANGIRI', 'MAYURBHANJ', 'NABARANGPUR', 'NAYAGARH', 'NUAPADA', 'PURI',
  'RAILWAY', 'RAYAGADA', 'ROURKELA', 'SAMBALPUR', 'SCRB OD', 'SUBARNAPUR', 'SUNDARGARH', 'UPD BBSR',
];

const FONT = '"Inter",system-ui,sans-serif';
const CHART_FG = '#0f172a';
const ACCENT = '#0b5cad';
const ACCENT_DEEP = '#003566';

function seedFromLabel(name: string) {
  let h = 2166136261;
  for (let i = 0; i < name.length; i += 1) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const METRICS = DISTRICT_LABELS.map((name) => {
  const s = seedFromLabel(name);
  return { district: name, usersLogin: 4500 + (s % 31000), characterCert: 11000 + (s % 72000) };
});

const DISTRICTS = METRICS.map((r) => r.district);
const LOGINS = METRICS.map((r) => r.usersLogin);
const CHAR_CERT = METRICS.map((r) => r.characterCert);

const CATEGORY_METRICS = [
  { name: 'No users created', requests: 18240, completed: 17126 },
  { name: 'Users login', requests: 68430, completed: 64218 },
  { name: 'Complaint', requests: 22910, completed: 20104 },
  { name: 'Feedback', requests: 9820, completed: 9116 },
  { name: 'Citizen information', requests: 11840, completed: 11012 },
  { name: 'FIR copy', requests: 14220, completed: 13124 },
  { name: 'Character certificate', requests: 33760, completed: 30542 },
  { name: 'Event', requests: 8860, completed: 8130 },
  { name: 'Procession', requests: 7440, completed: 6886 },
  { name: 'Protest / strike', requests: 6910, completed: 6214 },
  { name: 'PG / tenant', requests: 16040, completed: 14928 },
  { name: 'Employee verification', requests: 17180, completed: 16086 },
];

const CATEGORY_NAMES = CATEGORY_METRICS.map((r) => r.name);
const CATEGORY_REQUESTS = CATEGORY_METRICS.map((r) => r.requests);
const CATEGORY_COMPLETED = CATEGORY_METRICS.map((r) => r.completed);

export function initHeroCharts(): (() => void) | undefined {
  const barEl = document.querySelector('#portalHeroChartBar');
  const lineEl = document.querySelector('#portalHeroChartLine');
  const categoryEl = document.querySelector('#portalHeroChartCategory');
  if (!barEl || !lineEl || !categoryEl) return undefined;

  const apexDefaults = () => ({
    chart: { fontFamily: FONT, foreColor: CHART_FG, toolbar: { show: false }, zoom: { enabled: false } },
    grid: { borderColor: '#e2e8f0', strokeDashArray: 4, padding: { left: 4, right: 12 } },
    tooltip: { theme: 'light' as const, x: { show: true } },
  });

  const barH = Math.min(2400, Math.max(320, Math.round(METRICS.length * 28 + 160)));
  const lineH = Math.min(520, Math.max(340, Math.round(280 + METRICS.length * 5)));
  const categoryH = Math.min(820, Math.max(360, Math.round(130 + CATEGORY_METRICS.length * 36)));
  const thinLabels = METRICS.length > 20;
  const d = apexDefaults();

  const barChart = new ApexCharts(barEl, {
    chart: { ...d.chart, type: 'bar', height: barH },
    grid: { ...d.grid, padding: { left: 4, right: 8 } },
    tooltip: d.tooltip,
    series: [{ name: 'Character certificates', data: CHAR_CERT }],
    plotOptions: { bar: { horizontal: true, borderRadius: 3, barHeight: '72%', dataLabels: { position: 'right' } } },
    colors: [ACCENT],
    dataLabels: {
      enabled: true,
      offsetX: 2,
      style: { colors: ['#475569'], fontSize: '9px', fontWeight: 600 },
      formatter: (val: number) => (val >= 1000 ? `${Math.round(val / 1000)}k` : String(val)),
    },
    xaxis: { categories: DISTRICTS, labels: { trim: false, maxHeight: 100, style: { fontSize: '10px', fontWeight: 500 } } },
    yaxis: { labels: { maxWidth: 160, style: { fontSize: '10px' } } },
  });

  const lineChart = new ApexCharts(lineEl, {
    chart: { ...d.chart, type: 'line', height: lineH, redrawOnParentResize: true },
    grid: d.grid,
    tooltip: d.tooltip,
    series: [{ name: 'Users login', data: LOGINS }],
    stroke: { curve: 'smooth', width: 2 },
    markers: { size: thinLabels ? 0 : 3, strokeWidth: 2, strokeColors: '#fff' },
    colors: [ACCENT_DEEP],
    xaxis: {
      categories: DISTRICTS,
      labels: {
        rotate: thinLabels ? -55 : -35,
        rotateAlways: true,
        style: { fontSize: thinLabels ? '8px' : '10px' },
        formatter: thinLabels
          ? (val: string) => {
              const i = DISTRICTS.indexOf(val);
              return i < 0 || i % 2 === 0 ? val : '';
            }
          : undefined,
      },
    },
    yaxis: {
      labels: {
        formatter: (v: number) => (v >= 1000 ? `${Math.round(v / 1000)} k` : String(v)),
      },
    },
  });

  const categoryChart = new ApexCharts(categoryEl, {
    chart: { ...d.chart, type: 'bar', height: categoryH, stacked: false },
    colors: [ACCENT, '#5da9e9'],
    series: [
      { name: 'Requests', data: CATEGORY_REQUESTS },
      { name: 'Completed', data: CATEGORY_COMPLETED },
    ],
    plotOptions: { bar: { horizontal: true, barHeight: '62%', borderRadius: 3 } },
    dataLabels: { enabled: false },
    xaxis: {
      labels: {
        formatter: (v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)),
        style: { fontSize: '10px' },
      },
    },
    yaxis: { categories: CATEGORY_NAMES, labels: { maxWidth: 190, style: { fontSize: '10px', fontWeight: 600 } } },
    legend: { position: 'top', horizontalAlign: 'left', fontSize: '11px' },
  });

  void barChart.render();
  void lineChart.render();
  void categoryChart.render();

  const resizeCharts = () => {
    try {
      void barChart.updateOptions({}, false, true);
      void lineChart.updateOptions({}, false, true);
      void categoryChart.updateOptions({}, false, true);
    } catch {
      /* ignore */
    }
  };

  let swiperInstance: Swiper | null = null;
  const heroEl = document.querySelector('.portal-hero-metrics-swiper');
  if (heroEl) {
    swiperInstance = new Swiper(heroEl as HTMLElement, {
      modules: [Autoplay, Navigation, Pagination],
      loop: false,
      speed: 450,
      autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: {
        el: heroEl.querySelector('.portal-hero-metrics-pagination') as HTMLElement,
        clickable: true,
      },
      navigation: {
        nextEl: heroEl.querySelector('.portal-hero-metrics-next') as HTMLElement,
        prevEl: heroEl.querySelector('.portal-hero-metrics-prev') as HTMLElement,
      },
      on: {
        afterInit: () => setTimeout(resizeCharts, 120),
        slideChangeTransitionEnd: () => setTimeout(resizeCharts, 80),
      },
    });
  }

  let resizeTick: ReturnType<typeof setTimeout> | undefined;
  const onResize = () => {
    if (resizeTick) clearTimeout(resizeTick);
    resizeTick = setTimeout(resizeCharts, 150);
  };
  const onLang = () => setTimeout(resizeCharts, 100);

  window.addEventListener('resize', onResize);
  document.addEventListener('portalUiLangChanged', onLang);
  setTimeout(resizeCharts, 200);

  return () => {
    window.removeEventListener('resize', onResize);
    document.removeEventListener('portalUiLangChanged', onLang);
    barChart.destroy();
    lineChart.destroy();
    categoryChart.destroy();
    swiperInstance?.destroy(true, true);
  };
}
