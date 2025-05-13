let stream;
let storageRef;
let winnerKey;

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", async () => {
  const video = document.getElementById("video");

  // Mulai kamera
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error("❌ Tidak bisa akses kamera:", error);
    alert("Gagal mengakses kamera. Pastikan izin diberikan.");
    return;
  }

  // Tunggu firebase.js selesai load
  try {
    await waitForFirebaseReady();

    const app = firebase.app();
    const storage = firebase.storage(app);
    storageRef = storage.ref();

    const urlParams = new URLSearchParams(window.location.search);
    winnerKey = urlParams.get("winner");

    if (!winnerKey) {
      alert("Winner key tidak ditemukan di URL.");
    }
  } catch (error) {
    console.error("❌ Firebase error:", error);
    alert("Firebase belum siap. Silakan refresh halaman.");
  }
});

// Fungsi ambil gambar saat tombol ditekan
window.takeSelfie = async () => {
  if (!storageRef || !winnerKey) {
    alert("Firebase belum siap. Coba lagi.");
    return;
  }

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(async (blob) => {
    const path = `winners/${winnerKey}/selfie.jpg`;
    const fileRef = storageRef.child(path);

    try {
      console.log("📤 Mengunggah selfie...");
      await fileRef.put(blob);
      const downloadURL = await fileRef.getDownloadURL();

      await window.db.ref(`winners/${winnerKey}/selfieUrl`).set(downloadURL);
      console.log("✅ Selfie disimpan:", downloadURL);
      alert("✅ Foto berhasil disimpan!");
    } catch (error) {
      console.error("❌ Gagal upload:", error);
      alert("Gagal menyimpan gambar.");
    }
  }, "image/jpeg", 0.9);
};

// Fungsi helper tunggu Firebase siap
function waitForFirebaseReady() {
  return new Promise((resolve, reject) => {
    const check = () => {
      if (window.firebase && firebase.app && firebase.storage && window.db) {
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}
