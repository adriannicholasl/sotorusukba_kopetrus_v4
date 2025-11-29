// Ambil level
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level") || 1;

// Elemen DOM
const rewardContainer = document.getElementById("rewardContainer");
const startBtn = document.getElementById("startGameBtn");
const codeInput = document.getElementById("codeInput");
const loadingEl = document.getElementById("loading");

let selectedReward = null;
let dbGlobal = null;

// Enable/disable tombol
function updateStartButtonState() {
  startBtn.disabled = !(selectedReward && codeInput.value.trim().length > 0);
}

// Event input kode
codeInput.addEventListener("input", updateStartButtonState);

// Klik reward
function selectRewardHandler(div, r) {
  document.querySelectorAll(".reward-option").forEach((el) => el.classList.remove("selected"));
  div.classList.add("selected");
  selectedReward = r;
  updateStartButtonState();
}

// Load reward dari Firebase
async function loadRewards() {
  loadingEl.style.display = "block";

  // Tunggu Firebase siap
  while (typeof window.firebaseReady === "undefined") {
    await new Promise((res) => setTimeout(res, 100));
  }
  dbGlobal = await window.firebaseReady;

  try {
    const snapshot = await dbGlobal.ref(`settings/level${level}`).once("value");
    const conf = snapshot.val() || {};
    const rewards = Array.isArray(conf.rewards) ? conf.rewards : [];
    loadingEl.style.display = "none";

    if (!rewards.length) {
      rewardContainer.innerHTML = "<p>Tidak ada hadiah ditemukan untuk level ini.</p>";
      startBtn.disabled = true;
      return;
    }

    rewards.forEach((r, i) => {
      const div = document.createElement("div");
      div.className = "reward-option";
      div.innerHTML = `<img src="${r.icon}" alt="Reward ${i + 1}" /><div class="reward-name">${r.reward}</div>`;
      div.addEventListener("click", () => selectRewardHandler(div, r));
      rewardContainer.appendChild(div);
    });
  } catch (err) {
    loadingEl.style.display = "none";
    console.error("Error loadRewards:", err);
    alert("Gagal memuat hadiah.");
  }
}

// Tombol Mulai Game
startBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!selectedReward) {
    alert("Silakan pilih hadiah dahulu!");
    return;
  }

  const code = codeInput.value.trim();
  if (!code) {
    alert("Masukkan kode akses!");
    return;
  }

  if (!dbGlobal) {
    alert("Firebase belum siap!");
    return;
  }

  startBtn.disabled = true;
  startBtn.textContent = "Memeriksa kode...";

  try {
    const snap = await dbGlobal.ref(`access_codes/${code}`).once("value");
    const data = snap.val();

    if (!data) {
      alert("Kode tidak ditemukan!");
      startBtn.textContent = "MULAI GAME";
      updateStartButtonState();
      return;
    }

    // Normalisasi status
    const status = (data.status || "").trim().toLowerCase();

    if (status !== "tersedia") {
      const msg = status === "terpakai" ? "Kode sudah dipakai!" : status === "kadaluwarsa" ? "Kode sudah kadaluwarsa!" : "Kode tidak valid!";
      alert(msg);
      startBtn.textContent = "MULAI GAME";
      updateStartButtonState();
      return;
    }

    // Simpan reward & kode di sessionStorage
    sessionStorage.setItem(
      "selectedReward",
      JSON.stringify({
        reward: selectedReward.reward,
        icon: selectedReward.icon,
        code,
      })
    );

    // Update status kode menjadi Terpakai
    await dbGlobal.ref(`access_codes/${code}`).update({ status: "Terpakai" });

    // Lanjut ke game
    window.location.href = `game.html?level=${level}`;
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat memeriksa kode.");
    startBtn.textContent = "MULAI GAME";
    updateStartButtonState();
  }
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  // Hapus sessionStorage lama untuk mencegah bypass
  sessionStorage.removeItem("selectedReward");
  startBtn.disabled = true;
  loadRewards();
});
