"use strict";
document.addEventListener("DOMContentLoaded", function () {
  var e = document.getElementById("loader");
  e && (e.style.display = "none");
  var r = document.querySelector(".background"),
    t = document.querySelector(".content");
  r && (r.style.height = "100vh"),
    t && (t.style.height = "100vh"),
    window.scrollTo(0, 0),
    (document.body.scrollTop = 0),
    (document.documentElement.scrollTop = 0),
    document.fullscreenElement &&
      document.exitFullscreen().catch(function (e) {
        console.warn("Tidak bisa keluar dari fullscreen:", e);
      });
  var n = document.getElementById("object");
  if (n) {
    var o = (window.innerWidth - 100) / 2;
    n.style.left = o + "px";
  }
  function l() {
    var e = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", "".concat(e, "px"));
  }
  l(), window.addEventListener("resize", l);
}),
  "serviceWorker" in navigator &&
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function (e) {
        return console.log("Service Worker registered!", e);
      })
      .catch(function (e) {
        return console.log("Service Worker failed:", e);
      });
