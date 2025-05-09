// js/camera.js versi fix dan optimal

// Global scope
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let frameImg = new Image();

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");

  // Preload frame image
  frameImg.src = "assets/images/fotoo.png"; // 1080x1350
  frameImg.onerror = () => console.error("❌ Gagal memuat frame overlay");

  // Setup camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(err => {
      console.error("Camera error:", err);
      alert("Kamera tidak tersedia. Gunakan perangkat lain.");
    });

  // Tombol global
  window.takeSelfie = takeSelfie;
});

async function takeSelfie() {
  // Tunggu Firebase siap
  let db;
  try {
    db = await window.firebaseReady;
  } catch {
    return alert("Firebase belum siap");
  }

  const winnerKey = sessionStorage.getItem("lastWinnerKey");
  if (!winnerKey) {
    return alert("Tidak ada referensi pemenang. Jalankan game dahulu.");
  }

  const video = document.getElementById("video");
  if (!video.videoWidth || !video.videoHeight) {
    return alert("Kamera belum siap. Coba lagi.");
  }

  const targetW = 1080, targetH = 1350;
  canvas.width = targetW;
  canvas.height = targetH;

  // Ambil frame video
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

  // Crop aspect 4:5
  const inputRatio = tempCanvas.width / tempCanvas.height;
  const targetRatio = targetW / targetH;
  let cropW = tempCanvas.width, cropH = tempCanvas.height;
  if (inputRatio > targetRatio) cropW = tempCanvas.height * targetRatio;
  else cropH = tempCanvas.width / targetRatio;

  const cropX = (tempCanvas.width - cropW) / 2;
  const cropY = (tempCanvas.height - cropH) / 2;

  // Gambar hasil crop ke canvas final
  ctx.drawImage(
    tempCanvas,
    cropX, cropY, cropW, cropH,
    0, 0, targetW, targetH
  );

  // Overlay frame
  if (frameImg.complete) {
    ctx.drawImage(frameImg, 0, 0, targetW, targetH);
  } else {
    await new Promise(resolve => {
      frameImg.onload = () => { ctx.drawImage(frameImg, 0, 0, targetW, targetH); resolve(); };
      frameImg.onerror = () => { console.warn("⚠️ Frame gagal dimuat"); resolve(); };
    });
  }

  const dataUrl = canvas.toDataURL("image/png");

  try {
    await db.ref(`winners/${winnerKey}`).update({ selfie: dataUrl });
    alert("✅ Selfie disimpan ke Firebase. Mengalihkan kembali...");
  } catch (err) {
    console.error("❌ Gagal menyimpan selfie:", err);
    alert("❌ Gagal menyimpan selfie, tetap melanjutkan...");
  }

  window.location.href = "index.html";
}
