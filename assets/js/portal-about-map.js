(function () {
  "use strict";

  function getFirstBoundaryPoint(feature) {
    if (!feature || !feature.geometry) return [85.24382319839297, 20.87778769961249];

    if (feature.geometry.type === "Polygon") {
      return ((feature.geometry.coordinates[0] || [])[0] || [85.24382319839297, 20.87778769961249]);
    }

    if (feature.geometry.type === "MultiPolygon") {
      return ((((feature.geometry.coordinates[0] || [])[0] || [])[0]) || [85.24382319839297, 20.87778769961249]);
    }

    return [85.24382319839297, 20.87778769961249];
  }

  function renderOdishaMap(mapEl, geoData) {
    var chart = echarts.init(mapEl);
    var features = geoData.features || [];
    var angulFeature = features.find(function (feature) {
      var props = feature.properties || {};
      return (props.Dist_Name || "").toLowerCase() === "angul";
    });
    var markerPoint = getFirstBoundaryPoint(angulFeature);
    var districtSeriesData = features.map(function (feature, idx) {
      var props = feature.properties || {};
      var distName = props.Dist_Name || "Unknown";
      var distCode = Number(props.Dist_Code || 0);
      var value = Number.isFinite(distCode) && distCode > 0 ? distCode : idx + 1;

      return {
        name: distName,
        value: value,
      };
    });
    var minVal = districtSeriesData.length ? districtSeriesData[0].value : 0;
    var maxVal = districtSeriesData.length ? districtSeriesData[0].value : 1;

    districtSeriesData.forEach(function (item) {
      if (item.value < minVal) minVal = item.value;
      if (item.value > maxVal) maxVal = item.value;
    });

    echarts.registerMap("odisha-districts", geoData);
    chart.setOption({
      backgroundColor: "#ffffff",
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          if (params.seriesType === "effectScatter") {
            return "Angul (" + markerPoint[1].toFixed(3) + ", " + markerPoint[0].toFixed(3) + ")";
          }
          return (params.name || "District") + "<br/>Code: " + (params.value || "-");
        },
      },
      visualMap: {
        min: minVal,
        max: maxVal,
        orient: "horizontal",
        left: "left",
        bottom: 10,
        text: ["High", "Low"],
        calculable: true,
        inRange: {
          color: ["#b6d8f5", "#0f67af", "#083a77"],
        },
        textStyle: {
          color: "#2f4f6f",
        },
      },
      geo: {
        map: "odisha-districts",
        nameProperty: "Dist_Name",
        roam: true,
        zoom: 1.15,
        label: {
          show: true,
          color: "#ffffff",
          fontSize: 9,
        },
        itemStyle: {
          areaColor: "#1b6db0",
          borderColor: "#d8efff",
          borderWidth: 1,
        },
        emphasis: {
          itemStyle: {
            areaColor: "#1484d1",
          },
          label: {
            show: true,
            color: "#ffffff",
            fontWeight: 700,
          },
        },
      },
      series: [
        {
          name: "Districts",
          type: "map",
          map: "odisha-districts",
          nameProperty: "Dist_Name",
          geoIndex: 0,
          data: districtSeriesData,
          selectedMode: false,
        },
        {
          name: "Route",
          type: "lines",
          coordinateSystem: "geo",
          polyline: true,
          data: [
            {
              coords: [markerPoint, [85.8245, 20.2961], [86.6745, 20.4625]],
            },
          ],
          lineStyle: {
            color: "#2b6ea8",
            width: 2,
            opacity: 0.75,
          },
          effect: {
            show: true,
            constantSpeed: 34,
            symbol: "circle",
            symbolSize: 6,
            trailLength: 0.28,
            color: "#2b6ea8",
          },
        },
        {
          name: "Location",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          data: [
            {
              name: "Angul",
              value: [markerPoint[0], markerPoint[1], 1],
            },
          ],
          symbolSize: 9,
          showEffectOn: "render",
          rippleEffect: {
            scale: 4,
            period: 3.2,
            brushType: "stroke",
          },
          itemStyle: {
            color: "#ffffff",
            borderColor: "#9ddfff",
            borderWidth: 1.5,
          },
          label: {
            show: true,
            position: "right",
            formatter: "{b}",
            color: "#ffffff",
            fontSize: 12,
            fontWeight: 700,
          },
        },
      ],
    });

    window.addEventListener("resize", function () {
      chart.resize();
    });
  }

  function showMapLoadHint(mapEl, message) {
    mapEl.innerHTML =
      '<p class="portal-about-map-load-hint" style="padding:1rem 1.25rem;margin:0;font-size:0.95rem;line-height:1.5;color:#2f4f6f;background:#f0f6fb;border-radius:12px;">' +
      message +
      "</p>";
  }

  function loadEmbedGeoJson(mapEl, onDone) {
    if (window.__ODISHA_DISTRICTS_GEOJSON__) {
      onDone(window.__ODISHA_DISTRICTS_GEOJSON__);
      return;
    }
    var script = document.createElement("script");
    script.src = "assets/data/odisha-districts.embed.js";
    script.async = true;
    script.onload = function () {
      if (window.__ODISHA_DISTRICTS_GEOJSON__) {
        onDone(window.__ODISHA_DISTRICTS_GEOJSON__);
      } else {
        showMapLoadHint(
          mapEl,
          "District map embed loaded but data was missing. Regenerate <code>assets/data/odisha-districts.embed.js</code> from the GeoJSON file."
        );
      }
    };
    script.onerror = function () {
      showMapLoadHint(
        mapEl,
        "Could not load <code>assets/data/odisha-districts.embed.js</code>. For <code>file://</code> preview that file must exist next to your HTML. With a server, <code>fetch</code> of the GeoJSON is used instead."
      );
    };
    document.head.appendChild(script);
  }

  async function initPortalAboutMap() {
    var mapEl = document.getElementById("portalAboutMap");
    if (!mapEl) return;

    if (typeof echarts === "undefined") {
      showMapLoadHint(
        mapEl,
        "Map library did not load. Check your network connection (ECharts is loaded from a CDN) and reload."
      );
      return;
    }

    function tryRender(geoData) {
      if (!(geoData.features || []).length) {
        showMapLoadHint(mapEl, "District map data is empty or invalid.");
        return;
      }
      renderOdishaMap(mapEl, geoData);
    }

    if (window.__ODISHA_DISTRICTS_GEOJSON__) {
      tryRender(window.__ODISHA_DISTRICTS_GEOJSON__);
      return;
    }

    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      try {
        var response = await fetch("assets/data/odisha-districts.geojson");
        if (response.ok) {
          var geoData = await response.json();
          tryRender(geoData);
          return;
        }
      } catch (error) {
        /* fall through to embed */
      }
    }

    loadEmbedGeoJson(mapEl, tryRender);
  }

  window.addEventListener("load", initPortalAboutMap);
})();
