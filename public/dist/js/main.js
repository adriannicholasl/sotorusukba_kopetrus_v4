"use strict";
require("core-js/modules/es.array.find.js"),
  require("core-js/modules/es.array.join.js"),
  require("core-js/modules/es.array.map.js"),
  require("core-js/modules/es.object.to-string.js"),
  (function (e) {
    try {
      var o = document.getElementById("widgetChart1");
      o &&
        ((o.height = 130),
        new Chart(o, {
          type: "line",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            type: "line",
            datasets: [{ data: [78, 81, 80, 45, 34, 12, 40], label: "Dataset", backgroundColor: "rgba(255,255,255,.1)", borderColor: "rgba(255,255,255,.55)" }],
          },
          options: {
            maintainAspectRatio: !0,
            legend: { display: !1 },
            layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
            responsive: !0,
            scales: { xAxes: [{ gridLines: { color: "transparent", zeroLineColor: "transparent" }, ticks: { fontSize: 2, fontColor: "transparent" } }], yAxes: [{ display: !1, ticks: { display: !1 } }] },
            title: { display: !1 },
            elements: { line: { borderWidth: 0 }, point: { radius: 0, hitRadius: 10, hoverRadius: 4 } },
          },
        }));
      var o = document.getElementById("widgetChart2");
      o &&
        ((o.height = 130),
        new Chart(o, {
          type: "line",
          data: { labels: ["January", "February", "March", "April", "May", "June"], type: "line", datasets: [{ data: [1, 18, 9, 17, 34, 22], label: "Dataset", backgroundColor: "transparent", borderColor: "rgba(255,255,255,.55)" }] },
          options: {
            maintainAspectRatio: !1,
            legend: { display: !1 },
            responsive: !0,
            tooltips: { mode: "index", titleFontSize: 12, titleFontColor: "#000", bodyFontColor: "#000", backgroundColor: "#fff", titleFontFamily: "Montserrat", bodyFontFamily: "Montserrat", cornerRadius: 3, intersect: !1 },
            scales: { xAxes: [{ gridLines: { color: "transparent", zeroLineColor: "transparent" }, ticks: { fontSize: 2, fontColor: "transparent" } }], yAxes: [{ display: !1, ticks: { display: !1 } }] },
            title: { display: !1 },
            elements: { line: { tension: 1e-5, borderWidth: 1 }, point: { radius: 4, hitRadius: 10, hoverRadius: 4 } },
          },
        }));
      var o = document.getElementById("widgetChart3");
      o &&
        ((o.height = 130),
        new Chart(o, {
          type: "line",
          data: { labels: ["January", "February", "March", "April", "May", "June"], type: "line", datasets: [{ data: [65, 59, 84, 84, 51, 55], label: "Dataset", backgroundColor: "transparent", borderColor: "rgba(255,255,255,.55)" }] },
          options: {
            maintainAspectRatio: !1,
            legend: { display: !1 },
            responsive: !0,
            tooltips: { mode: "index", titleFontSize: 12, titleFontColor: "#000", bodyFontColor: "#000", backgroundColor: "#fff", titleFontFamily: "Montserrat", bodyFontFamily: "Montserrat", cornerRadius: 3, intersect: !1 },
            scales: { xAxes: [{ gridLines: { color: "transparent", zeroLineColor: "transparent" }, ticks: { fontSize: 2, fontColor: "transparent" } }], yAxes: [{ display: !1, ticks: { display: !1 } }] },
            title: { display: !1 },
            elements: { line: { borderWidth: 1 }, point: { radius: 4, hitRadius: 10, hoverRadius: 4 } },
          },
        }));
      var o = document.getElementById("widgetChart4");
      o &&
        ((o.height = 115),
        new Chart(o, {
          type: "bar",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{ label: "My First dataset", data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75], borderColor: "transparent", borderWidth: "0", backgroundColor: "rgba(255,255,255,.3)" }],
          },
          options: { maintainAspectRatio: !0, legend: { display: !1 }, scales: { xAxes: [{ display: !1, categoryPercentage: 1, barPercentage: 0.65 }], yAxes: [{ display: !1 }] } },
        }));
      var o = document.getElementById("recent-rep-chart");
      o &&
        ((o.height = 250),
        new Chart(o, {
          type: "line",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", ""],
            datasets: [
              { label: "My First dataset", backgroundColor: "rgba(0,173,95,0.8)", borderColor: "transparent", pointHoverBackgroundColor: "#fff", borderWidth: 0, data: [52, 60, 55, 50, 65, 80, 57, 70, 105, 115] },
              { label: "My Second dataset", backgroundColor: "rgba(0,181,233,0.8)", borderColor: "transparent", pointHoverBackgroundColor: "#fff", borderWidth: 0, data: [102, 70, 80, 100, 56, 53, 80, 75, 65, 90] },
            ],
          },
          options: {
            maintainAspectRatio: !0,
            legend: { display: !1 },
            responsive: !0,
            scales: {
              xAxes: [{ gridLines: { drawOnChartArea: !0, color: "#f2f2f2" }, ticks: { fontFamily: "Poppins", fontSize: 12 } }],
              yAxes: [{ ticks: { beginAtZero: !0, maxTicksLimit: 5, stepSize: 50, max: 150, fontFamily: "Poppins", fontSize: 12 }, gridLines: { display: !0, color: "#f2f2f2" } }],
            },
            elements: { point: { radius: 0, hitRadius: 10, hoverRadius: 4, hoverBorderWidth: 3 } },
          },
        }));
      var o = document.getElementById("percent-chart");
      o &&
        ((o.height = 280),
        new Chart(o, {
          type: "doughnut",
          data: {
            datasets: [{ label: "My First dataset", data: [60, 40], backgroundColor: ["#00b5e9", "#fa4251"], hoverBackgroundColor: ["#00b5e9", "#fa4251"], borderWidth: [0, 0], hoverBorderColor: ["transparent", "transparent"] }],
            labels: ["Products", "Services"],
          },
          options: {
            maintainAspectRatio: !1,
            responsive: !0,
            cutoutPercentage: 55,
            animation: { animateScale: !0, animateRotate: !0 },
            legend: { display: !1 },
            tooltips: { titleFontFamily: "Poppins", xPadding: 15, yPadding: 10, caretPadding: 0, bodyFontSize: 16 },
          },
        }));
    } catch (a) {
      console.log(a);
    }
    try {
      var o = document.getElementById("recent-rep2-chart");
      o &&
        ((o.height = 230),
        new Chart(o, {
          type: "line",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", ""],
            datasets: [
              { label: "My First dataset", backgroundColor: "rgba(0,173,95,0.2)", borderColor: "rgba(0,173,95,0.9)", pointHoverBackgroundColor: "#fff", borderWidth: 0, data: [52, 60, 55, 50, 65, 80, 57, 70, 105, 115] },
              { label: "My Second dataset", backgroundColor: "rgba(0,181,233,0.2)", borderColor: "rgba(0,181,233,0.9)", pointHoverBackgroundColor: "#fff", borderWidth: 0, data: [102, 70, 80, 100, 56, 53, 80, 75, 65, 90] },
            ],
          },
          options: {
            maintainAspectRatio: !0,
            legend: { display: !1 },
            responsive: !0,
            scales: {
              xAxes: [{ gridLines: { drawOnChartArea: !0, color: "#f2f2f2" }, ticks: { fontFamily: "Poppins", fontSize: 12 } }],
              yAxes: [{ ticks: { beginAtZero: !0, maxTicksLimit: 5, stepSize: 50, max: 150, fontFamily: "Poppins", fontSize: 12 }, gridLines: { display: !0, color: "#f2f2f2" } }],
            },
            elements: { point: { radius: 0, hitRadius: 10, hoverRadius: 4, hoverBorderWidth: 3 }, line: { tension: 0 } },
          },
        }));
    } catch (t) {
      console.log(t);
    }
    try {
      var r = "rgba(0,181,233,0.9)",
        n = "rgba(0,173,95,0.9)",
        o = document.getElementById("recent-rep3-chart");
      o &&
        ((o.height = 230),
        new Chart(o, {
          type: "line",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", ""],
            datasets: [
              { label: "My First dataset", backgroundColor: "transparent", borderColor: n, pointHoverBackgroundColor: "#fff", borderWidth: 0, data: [52, 60, 55, 50, 65, 80, 57, 115], pointBackgroundColor: n },
              { label: "My Second dataset", backgroundColor: "transparent", borderColor: r, pointHoverBackgroundColor: "#fff", borderWidth: 0, data: [102, 70, 80, 100, 56, 53, 80, 90], pointBackgroundColor: r },
            ],
          },
          options: {
            maintainAspectRatio: !1,
            legend: { display: !1 },
            responsive: !0,
            scales: {
              xAxes: [{ gridLines: { drawOnChartArea: !0, color: "#f2f2f2" }, ticks: { fontFamily: "Poppins", fontSize: 12 } }],
              yAxes: [{ ticks: { beginAtZero: !0, maxTicksLimit: 5, stepSize: 50, max: 150, fontFamily: "Poppins", fontSize: 12 }, gridLines: { display: !1, color: "#f2f2f2" } }],
            },
            elements: { point: { radius: 3, hoverRadius: 4, hoverBorderWidth: 3, backgroundColor: "#333" } },
          },
        }));
    } catch (i) {
      console.log(i);
    }
    try {
      var o = document.getElementById("widgetChart5");
      o &&
        ((o.height = 220),
        new Chart(o, {
          type: "bar",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{ label: "My First dataset", data: [78, 81, 80, 64, 65, 80, 70, 75, 67, 85, 66, 68], borderColor: "transparent", borderWidth: "0", backgroundColor: "#ccc" }],
          },
          options: { maintainAspectRatio: !0, legend: { display: !1 }, scales: { xAxes: [{ display: !1, categoryPercentage: 1, barPercentage: 0.65 }], yAxes: [{ display: !1 }] } },
        }));
    } catch (l) {
      console.log(l);
    }
    try {
      var o = document.getElementById("percent-chart2");
      o &&
        ((o.height = 209),
        new Chart(o, {
          type: "doughnut",
          data: {
            datasets: [{ label: "My First dataset", data: [60, 40], backgroundColor: ["#00b5e9", "#fa4251"], hoverBackgroundColor: ["#00b5e9", "#fa4251"], borderWidth: [0, 0], hoverBorderColor: ["transparent", "transparent"] }],
            labels: ["Products", "Services"],
          },
          options: {
            maintainAspectRatio: !1,
            responsive: !0,
            cutoutPercentage: 87,
            animation: { animateScale: !0, animateRotate: !0 },
            legend: { display: !1, position: "bottom", labels: { fontSize: 14, fontFamily: "Poppins,sans-serif" } },
            tooltips: { titleFontFamily: "Poppins", xPadding: 15, yPadding: 10, caretPadding: 0, bodyFontSize: 16 },
          },
        }));
    } catch (s) {
      console.log(s);
    }
    try {
      var o = document.getElementById("sales-chart");
      o &&
        ((o.height = 150),
        new Chart(o, {
          type: "line",
          data: {
            labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            type: "line",
            defaultFontFamily: "Poppins",
            datasets: [
              {
                label: "Foods",
                data: [0, 30, 10, 120, 50, 63, 10],
                backgroundColor: "transparent",
                borderColor: "rgba(220,53,69,0.75)",
                borderWidth: 3,
                pointStyle: "circle",
                pointRadius: 5,
                pointBorderColor: "transparent",
                pointBackgroundColor: "rgba(220,53,69,0.75)",
              },
              {
                label: "Electronics",
                data: [0, 50, 40, 80, 40, 79, 120],
                backgroundColor: "transparent",
                borderColor: "rgba(40,167,69,0.75)",
                borderWidth: 3,
                pointStyle: "circle",
                pointRadius: 5,
                pointBorderColor: "transparent",
                pointBackgroundColor: "rgba(40,167,69,0.75)",
              },
            ],
          },
          options: {
            responsive: !0,
            tooltips: { mode: "index", titleFontSize: 12, titleFontColor: "#000", bodyFontColor: "#000", backgroundColor: "#fff", titleFontFamily: "Poppins", bodyFontFamily: "Poppins", cornerRadius: 3, intersect: !1 },
            legend: { display: !1, labels: { usePointStyle: !0, fontFamily: "Poppins" } },
            scales: {
              xAxes: [{ display: !0, gridLines: { display: !1, drawBorder: !1 }, scaleLabel: { display: !1, labelString: "Month" }, ticks: { fontFamily: "Poppins" } }],
              yAxes: [{ display: !0, gridLines: { display: !1, drawBorder: !1 }, scaleLabel: { display: !0, labelString: "Value", fontFamily: "Poppins" }, ticks: { fontFamily: "Poppins" } }],
            },
            title: { display: !1, text: "Normal Legend" },
          },
        }));
    } catch (d) {
      console.log(d);
    }
    try {
      var o = document.getElementById("team-chart");
      o &&
        ((o.height = 150),
        new Chart(o, {
          type: "line",
          data: {
            labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
            type: "line",
            defaultFontFamily: "Poppins",
            datasets: [
              {
                data: [0, 7, 3, 5, 2, 10, 7],
                label: "Expense",
                backgroundColor: "rgba(0,103,255,.15)",
                borderColor: "rgba(0,103,255,0.5)",
                borderWidth: 3.5,
                pointStyle: "circle",
                pointRadius: 5,
                pointBorderColor: "transparent",
                pointBackgroundColor: "rgba(0,103,255,0.5)",
              },
            ],
          },
          options: {
            responsive: !0,
            tooltips: { mode: "index", titleFontSize: 12, titleFontColor: "#000", bodyFontColor: "#000", backgroundColor: "#fff", titleFontFamily: "Poppins", bodyFontFamily: "Poppins", cornerRadius: 3, intersect: !1 },
            legend: { display: !1, position: "top", labels: { usePointStyle: !0, fontFamily: "Poppins" } },
            scales: {
              xAxes: [{ display: !0, gridLines: { display: !1, drawBorder: !1 }, scaleLabel: { display: !1, labelString: "Month" }, ticks: { fontFamily: "Poppins" } }],
              yAxes: [{ display: !0, gridLines: { display: !1, drawBorder: !1 }, scaleLabel: { display: !0, labelString: "Value", fontFamily: "Poppins" }, ticks: { fontFamily: "Poppins" } }],
            },
            title: { display: !1 },
          },
        }));
    } catch ($) {
      console.log($);
    }
    try {
      var o = document.getElementById("barChart");
      o &&
        ((o.height = 200),
        new Chart(o, {
          type: "bar",
          defaultFontFamily: "Poppins",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              { label: "My First dataset", data: [65, 59, 80, 81, 56, 55, 40], borderColor: "rgba(0, 123, 255, 0.9)", borderWidth: "0", backgroundColor: "rgba(0, 123, 255, 0.5)", fontFamily: "Poppins" },
              { label: "My Second dataset", data: [28, 48, 40, 19, 86, 27, 90], borderColor: "rgba(0,0,0,0.09)", borderWidth: "0", backgroundColor: "rgba(0,0,0,0.07)", fontFamily: "Poppins" },
            ],
          },
          options: { legend: { position: "top", labels: { fontFamily: "Poppins" } }, scales: { xAxes: [{ ticks: { fontFamily: "Poppins" } }], yAxes: [{ ticks: { beginAtZero: !0, fontFamily: "Poppins" } }] } },
        }));
    } catch (p) {
      console.log(p);
    }
    try {
      var o = document.getElementById("radarChart");
      o &&
        ((o.height = 200),
        new Chart(o, {
          type: "radar",
          data: {
            labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
            defaultFontFamily: "Poppins",
            datasets: [
              { label: "My First dataset", data: [65, 59, 66, 45, 56, 55, 40], borderColor: "rgba(0, 123, 255, 0.6)", borderWidth: "1", backgroundColor: "rgba(0, 123, 255, 0.4)" },
              { label: "My Second dataset", data: [28, 12, 40, 19, 63, 27, 87], borderColor: "rgba(0, 123, 255, 0.7", borderWidth: "1", backgroundColor: "rgba(0, 123, 255, 0.5)" },
            ],
          },
          options: { legend: { position: "top", labels: { fontFamily: "Poppins" } }, scale: { ticks: { beginAtZero: !0, fontFamily: "Poppins" } } },
        }));
    } catch (c) {
      console.log(c);
    }
    try {
      var o = document.getElementById("lineChart");
      o &&
        ((o.height = 150),
        new Chart(o, {
          type: "line",
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            defaultFontFamily: "Poppins",
            datasets: [
              { label: "My First dataset", borderColor: "rgba(0,0,0,.09)", borderWidth: "1", backgroundColor: "rgba(0,0,0,.07)", data: [22, 44, 67, 43, 76, 45, 12] },
              { label: "My Second dataset", borderColor: "rgba(0, 123, 255, 0.9)", borderWidth: "1", backgroundColor: "rgba(0, 123, 255, 0.5)", pointHighlightStroke: "rgba(26,179,148,1)", data: [16, 32, 18, 26, 42, 33, 44] },
            ],
          },
          options: {
            legend: { position: "top", labels: { fontFamily: "Poppins" } },
            responsive: !0,
            tooltips: { mode: "index", intersect: !1 },
            hover: { mode: "nearest", intersect: !0 },
            scales: { xAxes: [{ ticks: { fontFamily: "Poppins" } }], yAxes: [{ ticks: { beginAtZero: !0, fontFamily: "Poppins" } }] },
          },
        }));
    } catch (g) {
      console.log(g);
    }
    try {
      var o = document.getElementById("doughutChart");
      o &&
        ((o.height = 150),
        new Chart(o, {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [45, 25, 20, 10],
                backgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
                hoverBackgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
              },
            ],
            labels: ["Green", "Green", "Green", "Green"],
          },
          options: { legend: { position: "top", labels: { fontFamily: "Poppins" } }, responsive: !0 },
        }));
    } catch (b) {
      console.log(b);
    }
    try {
      var o = document.getElementById("pieChart");
      o &&
        ((o.height = 200),
        new Chart(o, {
          type: "pie",
          data: {
            datasets: [
              {
                data: [45, 25, 20, 10],
                backgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
                hoverBackgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.7)", "rgba(0, 123, 255,0.5)", "rgba(0,0,0,0.07)"],
              },
            ],
            labels: ["Green", "Green", "Green"],
          },
          options: { legend: { position: "top", labels: { fontFamily: "Poppins" } }, responsive: !0 },
        }));
    } catch (y) {
      console.log(y);
    }
    try {
      var o = document.getElementById("polarChart");
      o &&
        ((o.height = 200),
        new Chart(o, {
          type: "polarArea",
          data: {
            datasets: [{ data: [15, 18, 9, 6, 19], backgroundColor: ["rgba(0, 123, 255,0.9)", "rgba(0, 123, 255,0.8)", "rgba(0, 123, 255,0.7)", "rgba(0,0,0,0.2)", "rgba(0, 123, 255,0.5)"] }],
            labels: ["Green", "Green", "Green", "Green"],
          },
          options: { legend: { position: "top", labels: { fontFamily: "Poppins" } }, responsive: !0 },
        }));
    } catch (u) {
      console.log(u);
    }
    try {
      var o = document.getElementById("singelBarChart");
      o &&
        ((o.height = 150),
        new Chart(o, {
          type: "bar",
          data: {
            labels: ["Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat"],
            datasets: [{ label: "My First dataset", data: [40, 55, 75, 81, 56, 55, 40], borderColor: "rgba(0, 123, 255, 0.9)", borderWidth: "0", backgroundColor: "rgba(0, 123, 255, 0.5)" }],
          },
          options: { legend: { position: "top", labels: { fontFamily: "Poppins" } }, scales: { xAxes: [{ ticks: { fontFamily: "Poppins" } }], yAxes: [{ ticks: { beginAtZero: !0, fontFamily: "Poppins" } }] } },
        }));
    } catch (h) {
      console.log(h);
    }
  })(jQuery),
  (function (e) {
    var o = ["header", "aside"]
      .map(function (e) {
        return e + ' a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])';
      })
      .join(", ");
    e(".animsition").animsition({
      inClass: "fade-in",
      outClass: "fade-out",
      inDuration: 900,
      outDuration: 900,
      linkElement: o,
      loading: !0,
      loadingParentElement: "html",
      loadingClass: "page-loader",
      loadingInner: '<div class="page-loader__spin"></div>',
      timeout: !1,
      timeoutCountdown: 5e3,
      onLoadEvent: !0,
      browser: ["animation-duration", "-webkit-animation-duration"],
      overlay: !1,
      overlayClass: "animsition-overlay-slide",
      overlayParentElement: "html",
      transition: function e(o) {
        window.location.href = o;
      },
    });
  })(jQuery),
  (function (e) {
    try {
      var o = e("#vmap");
      o[0] &&
        o.vectorMap({
          map: "world_en",
          backgroundColor: null,
          color: "#ffffff",
          hoverOpacity: 0.7,
          selectedColor: "#1de9b6",
          enableZoom: !0,
          showTooltip: !0,
          values: sample_data,
          scaleColors: ["#1de9b6", "#03a9f5"],
          normalizeFunction: "polynomial",
        });
    } catch (a) {
      console.log(a);
    }
    try {
      var t = e("#vmap1");
      t[0] && t.vectorMap({ map: "europe_en", color: "#007BFF", borderColor: "#fff", backgroundColor: "#fff", enableZoom: !0, showTooltip: !0 });
    } catch (r) {
      console.log(r);
    }
    try {
      var n = e("#vmap2");
      n[0] &&
        n.vectorMap({
          map: "usa_en",
          color: "#007BFF",
          borderColor: "#fff",
          backgroundColor: "#fff",
          enableZoom: !0,
          showTooltip: !0,
          selectedColor: null,
          hoverColor: null,
          colors: { mo: "#001BFF", fl: "#001BFF", or: "#001BFF" },
          onRegionClick: function e(o, a, t) {
            o.preventDefault();
          },
        });
    } catch (i) {
      console.log(i);
    }
    try {
      var l = e("#vmap3");
      l[0] &&
        l.vectorMap({
          map: "germany_en",
          color: "#007BFF",
          borderColor: "#fff",
          backgroundColor: "#fff",
          onRegionClick: function e(o, a, t) {
            var r = 'You clicked "' + t + '" which has the code: ' + a.toUpperCase();
            alert(r);
          },
        });
    } catch (s) {
      console.log(s);
    }
    try {
      var d = e("#vmap4");
      d[0] && d.vectorMap({ map: "france_fr", color: "#007BFF", borderColor: "#fff", backgroundColor: "#fff", enableZoom: !0, showTooltip: !0 });
    } catch ($) {
      console.log($);
    }
    try {
      var p = e("#vmap5");
      p[0] &&
        p.vectorMap({
          map: "russia_en",
          color: "#007BFF",
          borderColor: "#fff",
          backgroundColor: "#fff",
          hoverOpacity: 0.7,
          selectedColor: "#999999",
          enableZoom: !0,
          showTooltip: !0,
          scaleColors: ["#C8EEFF", "#006491"],
          normalizeFunction: "polynomial",
        });
    } catch (c) {
      console.log(c);
    }
    try {
      var g = e("#vmap6");
      g[0] &&
        g.vectorMap({
          map: "brazil_br",
          color: "#007BFF",
          borderColor: "#fff",
          backgroundColor: "#fff",
          onRegionClick: function e(o, a, t) {
            var r = 'You clicked "' + t + '" which has the code: ' + a.toUpperCase();
            alert(r);
          },
        });
    } catch (b) {
      console.log(b);
    }
  })(jQuery),
  (function (e) {
    try {
      e(".js-progressbar-simple").each(function () {
        var o = e(this),
          a = !1;
        e(window).on("load", function () {
          o.waypoint(
            function () {
              a ||
                ((a = !0),
                o.progressbar({
                  update: function e(o, a) {
                    a.find(".js-value").html(o + "%");
                  },
                }));
            },
            { offset: "bottom-in-view" }
          );
        });
      });
    } catch (o) {
      console.log(o);
    }
  })(jQuery),
  (function (e) {
    try {
      e(".js-scrollbar1")[0] && new PerfectScrollbar(".js-scrollbar1"), e(".js-scrollbar2")[0] && new PerfectScrollbar(".js-scrollbar2");
    } catch (o) {
      console.log(o);
    }
  })(jQuery),
  (function (e) {
    try {
      e(".js-select2").each(function () {
        e(this).select2({ minimumResultsForSearch: 20, dropdownParent: e(this).next(".dropDownSelect2") });
      });
    } catch (o) {
      console.log(o);
    }
  })(jQuery),
  (function (e) {
    try {
      for (var o = e(".js-item-menu"), a = -1, t = 0; t < o.length; t++)
        e(o[t]).on("click", function (t) {
          if ((t.preventDefault(), e(".js-right-sidebar").removeClass("show-sidebar"), jQuery.inArray(this, o) == a)) e(this).toggleClass("show-dropdown"), (a = -1);
          else {
            for (var r = 0; r < o.length; r++) e(o[r]).removeClass("show-dropdown");
            e(this).toggleClass("show-dropdown"), (a = jQuery.inArray(this, o));
          }
        });
      e(".js-item-menu, .js-dropdown").click(function (e) {
        e.stopPropagation();
      }),
        e("body,html").on("click", function () {
          for (var e = 0; e < o.length; e++) o[e].classList.remove("show-dropdown");
          a = -1;
        });
    } catch (r) {
      console.log(r);
    }
    e(window).width();
    var n = e(".js-right-sidebar");
    e(".js-sidebar-btn").on("click", function (e) {
      e.preventDefault();
      for (var t = 0; t < o.length; t++) o[t].classList.remove("show-dropdown");
      (a = -1), n.toggleClass("show-sidebar");
    }),
      e(".js-right-sidebar, .js-sidebar-btn").click(function (e) {
        e.stopPropagation();
      }),
      e("body,html").on("click", function () {
        n.removeClass("show-sidebar");
      });
    try {
      e(".js-arrow").each(function () {
        var o = e(this);
        o.on("click", function (e) {
          e.preventDefault(), o.find(".arrow").toggleClass("up"), o.toggleClass("open"), o.parent().find(".js-sub-list").slideToggle("250");
        });
      });
    } catch (i) {
      console.log(i);
    }
    try {
      e(".hamburger").on("click", function () {
        e(this).toggleClass("is-active"), e(".navbar-mobile").slideToggle("500");
      }),
        e(".navbar-mobile__list li.has-dropdown > a").on("click", function () {
          var o = e(this).siblings("ul.navbar-mobile__dropdown");
          return e(this).toggleClass("active"), e(o).slideToggle("500"), !1;
        });
    } catch (l) {
      console.log(l);
    }
  })(jQuery),
  (function (e) {
    try {
      var o = e(".js-list-load");
      o[0] &&
        o.each(function () {
          var o = e(this);
          o.find(".js-load-item").hide(),
            o.find(".js-load-btn").on("click", function (a) {
              e(this)
                .text("Loading...")
                .delay(1500)
                .queue(function (a) {
                  e(this).hide(), o.find(".js-load-item").fadeToggle("slow", "swing");
                }),
                a.preventDefault();
            });
        });
    } catch (a) {
      console.log(a);
    }
  })(jQuery),
  (function (e) {
    try {
      e('[data-toggle="tooltip"]').tooltip();
    } catch (o) {
      console.log(o);
    }
    try {
      e(".js-inbox"),
        e(".au-message__item").each(function () {
          e(this).on("click", function () {
            e(this).parent().parent().parent().toggleClass("show-chat-box");
          });
        });
    } catch (a) {
      console.log(a);
    }
  })(jQuery);
