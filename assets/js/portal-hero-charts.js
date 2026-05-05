/**
 * Hero metrics: Swiper (illustration + Apex bar + Apex line + category chart).
 * Covers all Odisha districts plus common portal police units — replace seeded values via API later.
 */
(function () {
  "use strict";

  /** Alphabetical-ish police labels: 30 districts + typical CCTNS / portal units */
  var DISTRICT_LABELS = [
    "ANGUL",
    "BALANGIR",
    "BALASORE",
    "BARGARH",
    "BHADRAK",
    "BERHAMPUR",
    "BOUDH",
    "CID",
    "CRIME BRANCH",
    "CUTTACK",
    "CUTTACK RURAL",
    "DEOGARH",
    "DHENKANAL",
    "GAJAPATI",
    "GANJAM",
    "JAGATSINGHPUR",
    "JAJPUR",
    "JHARSUGUDA",
    "KALAHANDI",
    "KANDHAMAL",
    "KENDRAPARA",
    "KEONJHAR",
    "KHORDHA",
    "KORAPUT",
    "MALKANGIRI",
    "MAYURBHANJ",
    "NABARANGPUR",
    "NAYAGARH",
    "NUAPADA",
    "PURI",
    "RAILWAY",
    "RAYAGADA",
    "ROURKELA",
    "SAMBALPUR",
    "SCRB OD",
    "SUBARNAPUR",
    "SUNDARGARH",
    "UPD BBSR",
  ];

  var FONT = '"Inter",system-ui,sans-serif';
  var CHART_FG = "#0f172a";
  var ACCENT = "#0b5cad";
  var ACCENT_DEEP = "#003566";

  var SLIDE_AUToplay_MS = 5000;

  function seedFromLabel(name) {
    var h = 2166136261;
    var i = 0;
    for (; i < name.length; i += 1) {
      h ^= name.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  var METRICS = DISTRICT_LABELS.map(function (name) {
    var s = seedFromLabel(name);
    return {
      district: name,
      usersLogin: 4500 + (s % 31000),
      characterCert: 11000 + (s % 72000),
    };
  });

  var DISTRICTS = METRICS.map(function (r) {
    return r.district;
  });
  var LOGINS = METRICS.map(function (r) {
    return r.usersLogin;
  });
  var CHAR_CERT = METRICS.map(function (r) {
    return r.characterCert;
  });
  var CATEGORY_METRICS = [
    { name: "No users created", requests: 18240, completed: 17126 },
    { name: "Users login", requests: 68430, completed: 64218 },
    { name: "Complaint", requests: 22910, completed: 20104 },
    { name: "Feedback", requests: 9820, completed: 9116 },
    { name: "Citizen information", requests: 11840, completed: 11012 },
    { name: "FIR copy", requests: 14220, completed: 13124 },
    { name: "Character certificate", requests: 33760, completed: 30542 },
    { name: "Event", requests: 8860, completed: 8130 },
    { name: "Procession", requests: 7440, completed: 6886 },
    { name: "Protest / strike", requests: 6910, completed: 6214 },
    { name: "PG / tenant", requests: 16040, completed: 14928 },
    { name: "Employee verification", requests: 17180, completed: 16086 },
  ];
  var CATEGORY_NAMES = CATEGORY_METRICS.map(function (r) {
    return r.name;
  });
  var CATEGORY_REQUESTS = CATEGORY_METRICS.map(function (r) {
    return r.requests;
  });
  var CATEGORY_COMPLETED = CATEGORY_METRICS.map(function (r) {
    return r.completed;
  });

  var barChart;
  var lineChart;
  var categoryChart;
  var swiperInstance;
  var chartsReady = false;

  function apexDefaults() {
    return {
      chart: {
        fontFamily: FONT,
        foreColor: CHART_FG,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      grid: {
        borderColor: "#e2e8f0",
        strokeDashArray: 4,
        padding: { left: 4, right: 12 },
      },
      tooltip: { theme: "light", x: { show: true } },
    };
  }

  /** Inner canvas height: tall enough for every bar; outer box stays fixed (CSS scroll). */
  function barChartContentHeightPx() {
    var n = METRICS.length;
    return Math.min(2400, Math.max(320, Math.round(n * 28 + 160)));
  }

  /** Apex line canvas height (taller than visible frame → vertical scroll in .portal-hero-apex-scroll--line). */
  function lineChartPlotHeightPx() {
    var n = METRICS.length;
    return Math.min(520, Math.max(340, Math.round(280 + n * 5)));
  }

  function categoryChartPlotHeightPx() {
    var n = CATEGORY_METRICS.length;
    return Math.min(820, Math.max(360, Math.round(130 + n * 36)));
  }

  function resizeCharts() {
    if (!chartsReady) return;
    try {
      if (barChart) barChart.resize();
      if (lineChart) lineChart.resize();
      if (categoryChart) categoryChart.resize();
    } catch (_) {
      /* ignore */
    }
  }

  function renderChartsOnce() {
    if (chartsReady || typeof ApexCharts === "undefined") return;
    var barEl = document.querySelector("#portalHeroChartBar");
    var lineEl = document.querySelector("#portalHeroChartLine");
    var categoryEl = document.querySelector("#portalHeroChartCategory");
    if (!barEl || !lineEl || !categoryEl) return;

    var d = apexDefaults();
    var barH = barChartContentHeightPx();
    var lineH = lineChartPlotHeightPx();
    var categoryH = categoryChartPlotHeightPx();
    var thinLabelsLocal = METRICS.length > 20;
    function lineCatLabelFmt(val) {
      if (!thinLabelsLocal) return val;
      var i = DISTRICTS.indexOf(val);
      if (i < 0) return val;
      return i % 2 === 0 ? val : "";
    }

    barChart = new ApexCharts(barEl, {
      chart: Object.assign({}, d.chart, { type: "bar", height: barH }),
      grid: Object.assign({}, d.grid, {
        padding: { left: 4, right: 8 },
      }),
      tooltip: d.tooltip,
      series: [{ name: "Character certificates", data: CHAR_CERT }],
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 3,
          barHeight: "72%",
          dataLabels: { position: "right" },
        },
      },
      colors: [ACCENT],
      dataLabels: {
        enabled: true,
        offsetX: 2,
        style: { colors: ["#475569"], fontSize: "9px", fontWeight: 600 },
        formatter: function (val) {
          return val >= 1000 ? Math.round(val / 1000) + "k" : String(val);
        },
      },
      xaxis: {
        categories: DISTRICTS,
        labels: {
          trim: false,
          maxHeight: 100,
          style: { fontSize: "10px", fontWeight: 500 },
        },
      },
      yaxis: { labels: { maxWidth: 160, style: { fontSize: "10px" } } },
    });

    lineChart = new ApexCharts(lineEl, {
      chart: Object.assign({}, d.chart, {
        type: "line",
        height: lineH,
        redrawOnParentResize: true,
      }),
      grid: d.grid,
      tooltip: d.tooltip,
      series: [{ name: "Users login", data: LOGINS }],
      stroke: { curve: "smooth", width: 2 },
      markers: {
        size: thinLabelsLocal ? 0 : 3,
        strokeWidth: 2,
        strokeColors: "#fff",
        hover: { sizeOffset: thinLabelsLocal ? 0 : 2 },
      },
      colors: [ACCENT_DEEP],
      xaxis: {
        categories: DISTRICTS,
        labels: {
          rotate: thinLabelsLocal ? -55 : -35,
          rotateAlways: true,
          hideOverlappingLabels: false,
          style: { fontSize: thinLabelsLocal ? "8px" : "10px" },
          formatter: thinLabelsLocal ? lineCatLabelFmt : undefined,
          maxHeight: thinLabelsLocal ? 120 : undefined,
        },
        tickPlacement: "on",
      },
      yaxis: {
        labels: {
          formatter: function (v) {
            return v >= 1000 ? Math.round(v / 1000) + " k" : String(v);
          },
        },
      },
    });

    categoryChart = new ApexCharts(categoryEl, {
      chart: Object.assign({}, d.chart, { type: "bar", height: categoryH, stacked: false }),
      grid: Object.assign({}, d.grid, {
        padding: { left: 6, right: 12 },
      }),
      tooltip: d.tooltip,
      colors: [ACCENT, "#5da9e9"],
      series: [
        { name: "Requests", data: CATEGORY_REQUESTS },
        { name: "Completed", data: CATEGORY_COMPLETED },
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "62%",
          borderRadius: 3,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          formatter: function (v) {
            return v >= 1000 ? Math.round(v / 1000) + "k" : String(v);
          },
          style: { fontSize: "10px" },
        },
      },
      yaxis: {
        categories: CATEGORY_NAMES,
        labels: {
          maxWidth: 190,
          style: { fontSize: "10px", fontWeight: 600 },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        fontSize: "11px",
      },
    });

    barChart.render();
    lineChart.render();
    categoryChart.render();
    chartsReady = true;
    setTimeout(resizeCharts, 50);
    setTimeout(resizeCharts, 400);
  }

  function prefersReducedMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  }

  function initSwiper() {
    var el = document.querySelector(".portal-hero-metrics-swiper");
    if (!el || typeof Swiper === "undefined") return;

    swiperInstance = new Swiper(el, {
      loop: false,
      speed: 450,
      spaceBetween: 0,
      autoHeight: false,
      watchOverflow: true,
      autoplay: {
        delay: SLIDE_AUToplay_MS,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        waitForTransition: true,
      },
      pagination: {
        el: el.querySelector(".portal-hero-metrics-pagination"),
        clickable: true,
      },
      navigation: {
        nextEl: el.querySelector(".portal-hero-metrics-next"),
        prevEl: el.querySelector(".portal-hero-metrics-prev"),
      },
      on: {
        afterInit: function () {
          setTimeout(resizeCharts, 120);
        },
        slideChangeTransitionEnd: function () {
          setTimeout(resizeCharts, 80);
        },
      },
      a11y: {
        enabled: true,
        prevSlideMessage: "Previous overview slide",
        nextSlideMessage: "Next overview slide",
      },
    });
  }

  function boot() {
    renderChartsOnce();
    initSwiper();
    setTimeout(resizeCharts, 200);
  }

  window.addEventListener("load", boot);

  var resizeTick = null;
  window.addEventListener("resize", function () {
    if (resizeTick) window.clearTimeout(resizeTick);
    resizeTick = window.setTimeout(resizeCharts, 150);
  });

  document.addEventListener("portalUiLangChanged", function () {
    setTimeout(resizeCharts, 100);
  });
})();
