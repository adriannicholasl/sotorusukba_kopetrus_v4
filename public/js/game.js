// =========================
// game.js (Final Stable)
// =========================

// Ambil level dari URL
const query = new URLSearchParams(window.location.search);
let level = parseInt(query.get("level"));
if (![1, 2, 3, 4].includes(level)) level = 1;

// Default config
let speed = 20;
let tolerance = 10;
let rewardConfig = { reward: "Tanpa Nama", icon: "assets/images/winner.png", code: null };

// State permainan
let gameInterval, gameCountdown;
let isMoving = true,
  posX = 0,
  gameEnded = false,
  gameStarted = false,
  movingIntervalStarted = false;
let countdownNumber = 3;

// Elemen DOM
const object = document.getElementById("object");
const target = document.getElementById("target");
const titleGame = document.getElementById("title-game");

const tapSound = document.getElementById("tapSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

const countdownOverlay = document.getElementById("countdownOverlay");
const countdownText = document.getElementById("countdownText");

const startBtn = document.getElementById("startBtn");
const startOverlay = document.getElementById("startOverlay");

// Tampilkan angka countdown
if (countdownText) countdownText.innerText = countdownNumber;
// Deteksi halaman dengan lebih aman
const currentUrl = window.location.href;

const isGamePage = currentUrl.includes("game.html") || document.body.classList.contains("game-page");

// Kalau kamu ingin lebih aman lagi, tambahkan class di game.html:
// <body class="game-page">

// ============================
// Ambil reward dari sessionStorage (FINAL FIX)
// ============================
// ============================
// Cek Reward HANYA jika benar-benar di game.html
// ============================
// ============================
// Ambil Reward dari sessionStorage TANPA menghentikan game.js
// ============================
if (isGamePage) {
  const storedReward = sessionStorage.getItem("selectedReward");

  if (!storedReward) {
    console.warn("Tidak ada reward — lanjutkan game tanpa reward");
    rewardConfig = { reward: "Tanpa Nama", icon: "", code: null };
  } else {
    try {
      rewardConfig = JSON.parse(storedReward);
    } catch (err) {
      console.warn("Reward tidak valid — lanjutkan game");
      rewardConfig = { reward: "Tanpa Nama", icon: "", code: null };
    }
  }
}

// ===============================
// Tunggu Firebase Ready
// ===============================
async function waitForFirebaseReady(timeout = 5000) {
  const start = Date.now();
  while (typeof window.firebaseReady === "undefined") {
    if (Date.now() - start > timeout) {
      alert("Firebase gagal konek.");
      throw new Error("Timeout firebaseReady");
    }
    await new Promise((res) => setTimeout(res, 100));
  }
  return await window.firebaseReady;
}

// Init Game
(async function initGame() {
  try {
    const db = await waitForFirebaseReady();
    window.db = db;
    await fetchSettingsFromFirebase();
  } catch (e) {
    console.error("Init gagal:", e);
  }
})();

// Ambil speed / tolerance dari Firebase
async function fetchSettingsFromFirebase() {
  try {
    const snap = await window.db.ref(`settings/level${level}`).once("value");
    const data = snap.val() || {};
    speed = parseInt(data.speed) || speed;
    tolerance = parseInt(data.tolerance) || tolerance;
  } catch (err) {
    alert("Gagal load pengaturan level.");
  }
}

async function fetchSettingsFromFirebase() {
  try {
    const snap = await window.db.ref(`settings/level${level}`).once("value");
    const data = snap.val() || {};
    speed = parseInt(data.speed) || speed;
    tolerance = parseInt(data.tolerance) || tolerance;

    // 🔹 Tambahkan log di sini
    console.log(`Level: ${level}, Speed: ${speed}, Tolerance: ${tolerance}`);
  } catch (err) {
    alert("Gagal load pengaturan level.");
  }
}

// ===============================
// Hitung Mundur
// ===============================
function startCountdown() {
  const interval = setInterval(() => {
    countdownNumber--;
    if (countdownNumber > 0) {
      countdownText.innerText = countdownNumber;
    } else if (countdownNumber === 0) {
      countdownText.innerText = "GO!";
    } else {
      clearInterval(interval);
      countdownOverlay.style.display = "none";
      gameStarted = true;

      setTimeout(() => {
        centerObjectToTarget();
        object.style.display = "block";
        target.style.display = "block";
        titleGame.style.display = "flex";
        requestAnimationFrame(() => object.classList.add("show"));
        startGame();
      }, 50);
    }
  }, 1000);
}

// ===============================
// Start Game
// ===============================
function startGame() {
  if (movingIntervalStarted) return;
  movingIntervalStarted = true;

  let duration = 20 + (5 - level) * 2;
  document.getElementById("timeLeft").innerText = duration;

  moveObject();

  gameCountdown = setInterval(() => {
    if (duration <= 0) return endGame(false);
    duration--;
    document.getElementById("timeLeft").innerText = duration;
  }, 1000);
}

// Gerak object
function moveObject() {
  if (!isMoving || gameEnded) return;

  const tRect = target.getBoundingClientRect();
  const oRect = object.getBoundingClientRect();

  const targetCenter = tRect.left + tRect.width / 2;
  const objectCenter = oRect.left + oRect.width / 2;

  if (Math.abs(targetCenter - objectCenter) < 100) {
    speed = Math.max(5, speed);
  }

  posX += speed;
  if (posX > window.innerWidth) posX = -object.offsetWidth;

  object.style.left = `${posX}px`;

  gameInterval = requestAnimationFrame(moveObject);
}

// ===============================
// Klik untuk hit → otomatis
// ===============================
document.body.addEventListener("click", () => {
  if (!gameStarted || gameEnded || countdownNumber > 0) return;

  tapSound.play();

  if (isMoving) {
    cancelAnimationFrame(gameInterval);
    isMoving = false;
    checkHit(); // tetap panggil cek hit
  }
});

// ===============================
// Cek hit target (ubah untuk auto resume)
// ===============================
function checkHit() {
  const o = object.getBoundingClientRect();
  const t = target.getBoundingClientRect();

  const offsetX = Math.abs(o.left + o.width / 2 - (t.left + t.width / 2));
  const offsetY = Math.abs(o.top + o.height / 2 - (t.top + t.height / 2));

  const overlap = o.left <= t.right && o.right >= t.left && o.top <= t.bottom && o.bottom >= t.top;

  if (overlap && offsetX <= tolerance && offsetY <= tolerance) {
    document.body.style.backgroundColor = "#4CAF50";
    endGame(true);
  } else {
    document.body.style.backgroundColor = "#F44336";
    // Jika belum pas, tunggu 1 detik lalu lanjutkan gerak otomatis
    setTimeout(() => {
      if (!gameEnded) {
        isMoving = true;
        moveObject();
      }
    }, 750);
  }
}

function centerObjectToTarget() {
  const t = target.getBoundingClientRect();
  const w = object.offsetWidth || 100;
  object.style.left = `${t.left + t.width / 2 - w / 2}px`;
}

// ===============================
// End Game
// ===============================
function endGame(win) {
  cancelAnimationFrame(gameInterval);
  clearInterval(gameCountdown);
  movingIntervalStarted = false;
  gameEnded = true;

  if (win) {
    winSound.play();
    setTimeout(animateWin, 800);
    setTimeout(() => showWinModal(), 1600);
  } else {
    loseSound.play();
    animateLose();
    setTimeout(() => showLoseModal(), 7000);
  }
}

// Modal Menang
function showWinModal() {
  document.getElementById("winRewardCode").textContent = rewardConfig.reward;

  const icon = document.getElementById("winRewardIcon");
  icon.src = rewardConfig.icon;
  icon.alt = rewardConfig.reward;

  // Tampilkan Reward Code (PERMINTAAN KAMU)
  const codeEl = document.getElementById("winRewardCodeDetail");
  if (codeEl) codeEl.textContent = rewardConfig.code || "-";

  document.getElementById("winModal").classList.replace("hidden", "show");
}

// Modal Kalah
function showLoseModal() {
  document.getElementById("loseModal").classList.replace("hidden", "show");
}

// ===============================
// Simpan Pemenang ke Firebase
// ===============================
async function saveWinner() {
  const nama = document.getElementById("nama").value.trim();
  const ig = document.getElementById("instagram").value.trim();
  const telp = document.getElementById("telepon").value.trim();

  if (!nama || !telp) return alert("Nama & Telepon wajib diisi!");

  const timestamp = new Date().toISOString();

  const entry = {
    nama,
    ig,
    telp,
    level,
    reward: rewardConfig.reward,
    rewardIcon: rewardConfig.icon,
    rewardCode: rewardConfig.code, // 🟢 ADA (kolom yang kamu minta)
    timestamp,
  };

  try {
    const db = await window.firebaseReady;

    // Pastikan kode unik
    const cek = await db.ref("winners").orderByChild("rewardCode").equalTo(rewardConfig.code).once("value");

    if (cek.exists()) {
      alert("Kode ini sudah dipakai pemenang lain!");
      return;
    }

    const newRef = db.ref("winners").push();
    const key = newRef.key;

    sessionStorage.setItem("lastWinnerKey", key);
    await newRef.set(entry);

    updateSelfieQR(key);

    alert("Data pemenang berhasil disimpan!");
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan pemenang.");
  }
}

// ===============================
// Animasi
// ===============================
function animateWin() {
  object.style.transition = "transform 0.5s ease";
  object.style.transform = "scale(1.3) rotate(10deg)";
  setTimeout(() => (object.style.transform = "scale(1) rotate(0)"), 700);
}

function animateLose() {
  object.style.animation = "shake 0.5s ease";
  setTimeout(() => {
    object.style.transition = "transform 2.5s ease-out";
    object.style.transform = "translate(100vw, -50%)";
  }, 500);
}

// ===============================
// Mulai Game
// ===============================
if (startBtn) {
  startBtn.addEventListener("click", () => {
    [tapSound, winSound, loseSound].forEach((s) => {
      s.muted = true;
      s.play().then(() => {
        s.pause();
        s.muted = false;
        s.currentTime = 0;
      });
    });

    const cSound = document.getElementById("countdownSound");
    if (cSound) cSound.play().catch(() => {});

    startOverlay.style.display = "none";
    startCountdown();
  });
}

// ===============================
// Reset
// ===============================
function resetGameState() {
  posX = 0;
  isMoving = true;
  gameEnded = false;
  gameStarted = false;
  movingIntervalStarted = false;
  countdownNumber = 3;
  object.style.left = "0px";
  object.style.display = "none";
  target.style.display = "none";
  titleGame.style.display = "none";
}
