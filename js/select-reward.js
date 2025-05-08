// Mengambil parameter level dari URL
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level") || 1; // Default level 1 jika tidak ada level yang diberikan
const rewardContainer = document.getElementById("rewardContainer");
const startBtn = document.getElementById("startGameBtn");

let selectedReward = null;

// Fungsi untuk memuat hadiah berdasarkan level
function loadRewards() {
  if (!window.db) return alert("Firebase belum siap!");
  db.ref(`settings/level${level}`).once("value", (snapshot) => {
    const conf = snapshot.val();
    if (conf && Array.isArray(conf.rewards)) {
      conf.rewards.forEach((r, i) => {
        const div = document.createElement("div");
        div.className = "reward-option";
        div.innerHTML = `
        <img src="${r.icon}" alt="Reward ${i + 1}" />
        <div class="reward-name">${r.reward}</div>
      `;
        // Menambahkan event listener untuk memilih hadiah
        div.addEventListener("click", () => {
          document.querySelectorAll(".reward-option").forEach((opt) => opt.classList.remove("selected"));
          div.classList.add("selected");
          selectedReward = r;
          startBtn.disabled = false; // Mengaktifkan tombol "Mulai Game" setelah hadiah dipilih
        });
        rewardContainer.appendChild(div);
      });
    } else {
      rewardContainer.innerHTML = "<p>Tidak ada hadiah ditemukan untuk level ini.</p>";
    }
  });
}

// Event listener untuk tombol "Mulai Game"
startBtn.addEventListener("click", () => {
  if (!selectedReward) return alert("Silakan pilih hadiah dahulu!");
  sessionStorage.setItem("selectedReward", JSON.stringify(selectedReward)); // Menyimpan hadiah yang dipilih
  window.location.href = `game.html?level=${level}`; // Mengarahkan ke halaman permainan
});

// Tunggu hingga Firebase siap sebelum memuat hadiah
const wait = setInterval(() => {
  if (window.db) {
    clearInterval(wait);
    loadRewards(); // Memuat hadiah
  }
}, 300);