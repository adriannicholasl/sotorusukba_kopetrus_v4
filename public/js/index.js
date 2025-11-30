"use strict";
function startGame(e) {
  sessionStorage.setItem("audioAllowed", "true"),
    document.body.classList.remove("fade-in"),
    document.body.classList.add("fade-out"),
    setTimeout(function () {
      window.location.href = "select-reward.html?level=".concat(e);
    }, 500);
}
document.addEventListener("DOMContentLoaded", function () {
  var e = document.getElementById("loader");
  e && (e.style.display = "none");
  var t = document.querySelector(".background"),
    r = document.querySelector(".content");
  t && (t.style.height = "100vh"),
    r && (r.style.height = "100vh"),
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
