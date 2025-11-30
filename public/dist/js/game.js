"use strict";
require("core-js/modules/es.array.iterator.js"),
  require("core-js/modules/es.object.keys.js"),
  require("core-js/modules/es.object.to-string.js"),
  require("core-js/modules/es.regexp.exec.js"),
  require("core-js/modules/es.string.iterator.js"),
  require("core-js/modules/es.string.search.js"),
  require("core-js/modules/es.string.trim.js"),
  require("core-js/modules/web.dom-collections.iterator.js"),
  require("core-js/modules/web.url-search-params.js");
var gameInterval,
  gameCountdown,
  query = new URLSearchParams(window.location.search),
  level = parseInt(query.get("level")) || 1,
  speed = 20,
  tolerance = 8,
  rewardConfig = { reward: "Tanpa Nama", icon: "assets/images/winner.png" },
  isMoving = !0,
  posX = 0,
  gameEnded = !1,
  gameStarted = !1,
  movingIntervalStarted = !1,
  objectCenterRatio = null,
  object = document.getElementById("object"),
  target = document.getElementById("target"),
  titleGame = document.getElementById("title-game"),
  tapSound = document.getElementById("tapSound"),
  winSound = document.getElementById("winSound"),
  loseSound = document.getElementById("loseSound"),
  countdownOverlay = document.getElementById("countdownOverlay"),
  countdownText = document.getElementById("countdownText"),
  startBtn = document.getElementById("startBtn"),
  startOverlay = document.getElementById("startOverlay"),
  countdownNumber = 3;
countdownText && (countdownText.innerText = countdownNumber);
var storedReward = sessionStorage.getItem("selectedReward");
if (storedReward)
  try {
    (rewardConfig = JSON.parse(storedReward)), console.log("\uD83C\uDF81 Hadiah terpilih:", rewardConfig);
  } catch (e) {
    console.warn("⚠️ Gagal parse selectedReward:", e);
  }
function fetchSettingsFromFirebase() {
  if (!window.db) return alert("Firebase belum siap");
  console.log("\uD83D\uDCE5 Mengambil setting level ".concat(level, " dari Firebase...")),
    db.ref("settings/level".concat(level)).once("value", function (e) {
      var t = e.val();
      t
        ? ((speed = parseInt(t.speed || 20)), (tolerance = parseInt(t.tolerance || 8)), console.log("✅ Setting berhasil diambil:"), console.log("→ Speed: ".concat(speed)), console.log("→ Tolerance: ".concat(tolerance)))
        : console.log("⚠️ Tidak ada data setting untuk level ini."),
        console.log("✅ Setting berhasil diambil. Menunggu user klik Mulai...");
    });
}
function startCountdown() {
  var e = setInterval(function () {
    countdownNumber--,
      countdownText &&
        (countdownNumber > 0
          ? (countdownText.innerText = countdownNumber)
          : 0 === countdownNumber
          ? (countdownText.innerText = "GO!")
          : (clearInterval(e),
            countdownOverlay && (countdownOverlay.style.display = "none"),
            (gameStarted = !0),
            setTimeout(function () {
              centerObjectToTarget(),
                (object.style.display = "block"),
                (target.style.display = "block"),
                (titleGame.style.display = "flex"),
                requestAnimationFrame(function () {
                  return object.classList.add("show");
                }),
                startGame();
            }, 50)));
  }, 1e3);
}
function startGame() {
  if (!movingIntervalStarted) {
    movingIntervalStarted = !0;
    var e = 20 + (5 - level) * 2;
    (document.getElementById("timeLeft").innerText = e),
      moveObject(),
      (gameCountdown = setInterval(function () {
        if (e <= 0) return endGame(!1);
        e--, (document.getElementById("timeLeft").innerText = e);
      }, 1e3));
  }
}
function moveObject() {
  if (isMoving && !gameEnded) {
    var e,
      t = target.getBoundingClientRect(),
      n = object.getBoundingClientRect();
    100 > Math.abs(t.left + t.width / 2 - (n.left + n.width / 2)) && (speed = Math.max(5, speed)),
      (posX += speed) > window.innerWidth && (posX = -object.offsetWidth),
      (object.style.left = posX + "px"),
      (gameInterval = requestAnimationFrame(moveObject));
  }
}
function centerObjectToTarget() {
  var e = target.getBoundingClientRect(),
    t = object.offsetWidth || 100,
    n = e.left + e.width / 2;
  object.style.left = "".concat(n - t / 2, "px");
}
function endGame(e) {
  cancelAnimationFrame(gameInterval),
    clearInterval(gameCountdown),
    (movingIntervalStarted = !1),
    (gameEnded = !0),
    e
      ? (winSound.play(),
        setTimeout(function () {
          return animateWin();
        }, 1e3),
        setTimeout(function () {
          (document.getElementById("winRewardCode").textContent = rewardConfig.reward || "Kupon Hadiah"),
            (document.getElementById("winRewardIcon").src = rewardConfig.icon || "assets/images/winner.png"),
            (document.getElementById("winRewardIcon").alt = rewardConfig.reward),
            document.getElementById("winModal").classList.remove("hidden"),
            document.getElementById("winModal").classList.add("show");
        }, 2e3))
      : (loseSound.play(),
        animateLose(),
        setTimeout(function () {
          document.getElementById("loseModal").classList.remove("hidden"), document.getElementById("loseModal").classList.add("show");
        }, 7e3));
}
function saveWinner() {
  var e = document.getElementById("nama").value.trim(),
    t = document.getElementById("instagram").value.trim(),
    n = document.getElementById("telepon").value.trim(),
    o = new Date().toISOString();
  if (!e || !n) {
    alert("Nama dan Telepon wajib diisi!");
    return;
  }
  var a = { nama: e, ig: t, telp: n, level: level, reward: rewardConfig.reward, rewardIcon: rewardConfig.icon, timestamp: o };
  window.db
    ? db
        .ref("winners")
        .push()
        .set(a)
        .then(function () {
          return alert("✅ Data pemenang disimpan ke Firebase!");
        })
    : alert("Firebase belum siap.");
}
function animateWin() {
  (object.style.transition = "transform 0.5s ease"),
    (object.style.transform = "scale(1.3) rotate(10deg)"),
    setTimeout(function () {
      object.style.transform = "scale(1) rotate(0)";
    }, 1e3);
}
function animateLose() {
  (object.style.transition = "none"),
    (object.style.animation = "shake 0.5s ease"),
    (object.style.transform = "translate(-50%, -50%) rotate(0deg)"),
    object.offsetWidth,
    setTimeout(function () {
      (object.style.transition = "transform 2.5s ease-out"), (object.style.transform = "translate(100vw, -50%) rotate(0deg)");
    }, 500),
    setTimeout(function () {
      (object.style.transition = "transform 2.5s ease-in-out"), (object.style.transform = "translate(-100vw, -100vh) rotate(-135deg)");
    }, 3e3),
    setTimeout(function () {
      (object.style.transition = "transform 2.5s ease-in"), (object.style.transform = "translate(120vw, 100vh) rotate(45deg)");
    }, 5500);
}
document.body.addEventListener("click", function () {
  if (gameStarted && !gameEnded && !(countdownNumber > 0)) {
    if ((tapSound.play(), isMoving)) {
      cancelAnimationFrame(gameInterval), (isMoving = !1);
      var e = object.getBoundingClientRect(),
        t = target.getBoundingClientRect(),
        n = Math.abs(e.left + e.width / 2 - (t.left + t.width / 2)),
        o = Math.abs(e.top + e.height / 2 - (t.top + t.height / 2));
      e.left <= t.right && e.right >= t.left && e.top <= t.bottom && e.bottom >= t.top && n <= tolerance && o <= tolerance
        ? ((document.body.style.backgroundColor = "#4CAF50"), endGame(!0))
        : (document.body.style.backgroundColor = "#F44336"),
        (objectCenterRatio = e.left / window.innerWidth);
    } else (document.body.style.backgroundColor = "#F44336"), (isMoving = !0), moveObject();
  }
});
var waitFirebase = setInterval(function () {
  window.db && (clearInterval(waitFirebase), fetchSettingsFromFirebase());
}, 300);
startBtn &&
  startBtn.addEventListener("click", function () {
    [tapSound, winSound, loseSound].forEach(function (e) {
      (e.muted = !0),
        e
          .play()
          .then(function () {
            e.pause(), (e.muted = !1), (e.currentTime = 0);
          })
          .catch(function () {});
    });
    var e = document.getElementById("countdownSound");
    e &&
      e.play().catch(function (e) {
        return console.warn("❗ Gagal memutar countdown sound:", e);
      }),
      startOverlay && (startOverlay.style.display = "none"),
      startCountdown();
  });
