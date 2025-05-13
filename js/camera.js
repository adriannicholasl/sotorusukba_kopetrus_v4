// ✅ js/camera.js versi optimal dengan penyimpanan selfie ke Firebase Storage

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let frameImg = new Image();

// Ambil key dari URL
const params = new URLSearchParams(window.location.search);
const winnerKey = params.get("key");

// Inisialisasi Firebase Storage
let storageRef;
document.addEventListener("DOMContentLoaded", async () => {
  const video = document.getElementById("video");

  if (!winnerKey) {
    alert("❌ Tidak ada ID pemenang di URL.");
    return;
  }

  // Tunggu Firebase siap & siapkan Storage
  try {
    const db = await window.firebaseReady;
    const app = firebase.app();
    const storage = firebase.storage(app);
    storageRef = storage.ref();
  } catch (err) {
    console.error("❌ Firebase belum siap:", err);
    alert("Firebase belum siap");
    return;
  }

  // Load overlay frame
  frameImg.src = "assets/images/fotoo.png";
  frameImg.onerror = () => console.warn("❌ Gagal memuat frame overlay");

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(err => {
      console.error("Camera error:", err);
      alert("Kamera tidak tersedia. Gunakan perangkat lain.");
    });

  window.takeSelfie = takeSelfie;
});

async function takeSelfie() {
  const video = document.getElementById("video");
  if (!video.videoWidth || !video.videoHeight) {
    return alert("Kamera belum siap. Coba lagi.");
  }

  const targetW = 1080, targetH = 1350;
  canvas.width = targetW;
  canvas.height = targetH;

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(video, 0, 0);

  const inputRatio = tempCanvas.width / tempCanvas.height;
  const targetRatio = targetW / targetH;
  let cropW = tempCanvas.width, cropH = tempCanvas.height;
  if (inputRatio > targetRatio) cropW = tempCanvas.height * targetRatio;
  else cropH = tempCanvas.width / targetRatio;

  const cropX = (tempCanvas.width - cropW) / 2;
  const cropY = (tempCanvas.height - cropH) / 2;

  ctx.drawImage(tempCanvas, cropX, cropY, cropW, cropH, 0, 0, targetW, targetH);
  if (frameImg.complete) {
    ctx.drawImage(frameImg, 0, 0, targetW, targetH);
  } else {
    await new Promise(resolve => {
      frameImg.onload = () => { ctx.drawImage(frameImg, 0, 0, targetW, targetH); resolve(); };
      frameImg.onerror = () => { console.warn("⚠️ Frame gagal dimuat"); resolve(); };
    });
  }

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  const selfiePath = `selfies/${winnerKey}.jpg`;

  try {
    const selfieSnapshot = await storageRef.child(selfiePath).put(blob);
    const downloadURL = await selfieSnapshot.ref.getDownloadURL();
    const db = await window.firebaseReady;
    await db.ref(`winners/${winnerKey}`).update({ selfie: downloadURL });
    alert("✅ Selfie disimpan di Firebase Storage dan Database!");
  } catch (err) {
    console.error("❌ Gagal upload ke Firebase Storage:", err);
    alert("❌ Gagal menyimpan selfie ke Storage.");
  }

  window.location.href = "index.html";
}
