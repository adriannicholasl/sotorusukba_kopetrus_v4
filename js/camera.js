const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let frameImg = new Image();
let storageRef;

// Ambil key dari URL
const params = new URLSearchParams(window.location.search);
const winnerKey = params.get("key");

// Fungsi tunggu Firebase siap (mirip game.js)
async function waitForFirebaseReady(timeout = 5000) {
  const start = Date.now();
  while (typeof window.firebaseReady === "undefined") {
    if (Date.now() - start > timeout) {
      alert("❌ Firebase belum siap setelah beberapa kali percobaan.");
      throw new Error("Timeout: firebaseReady belum tersedia.");
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  try {
    const db = await window.firebaseReady;
    console.log("✅ Firebase siap dan terkoneksi");
    window.db = db;
    return db;
  } catch (err) {
    console.error("❌ Gagal mendapatkan Firebase DB:", err);
    alert("❌ Gagal koneksi ke Firebase.");
    throw err;
  }
}

// Memuat Firebase Storage jika belum ada
function loadFirebaseStorageScript() {
  return new Promise((resolve, reject) => {
    if (firebase.storage) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-storage-compat.js';
    script.onload = () => {
      console.log("✅ Firebase Storage loaded");
      resolve();
    };
    script.onerror = () => reject("❌ Gagal memuat Firebase Storage.");
    document.head.appendChild(script);
  });
}

// Event utama
document.addEventListener("DOMContentLoaded", async () => {
  const video = document.getElementById("video");

  if (!winnerKey) {
    alert("❌ Tidak ada ID pemenang di URL.");
    return;
  }

  try {
    await loadFirebaseStorageScript();       // Pastikan storage siap
    await waitForFirebaseReady();            // Tunggu Firebase siap
    const app = firebase.app();
    const storage = firebase.storage(app);
    storageRef = storage.ref();
  } catch (err) {
    console.error("❌ Firebase belum siap:", err);
    alert("Firebase belum siap. Cek koneksi atau urutan skrip.");
    return;
  }

  // Load overlay frame
  frameImg.src = "assets/images/fotoo.png";
  frameImg.onerror = () => console.warn("❌ Gagal memuat frame overlay");

  // Akses kamera
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("Camera error:", err);
    alert("Kamera tidak tersedia. Gunakan perangkat lain.");
    return;
  }

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
      frameImg.onload = () => {
        ctx.drawImage(frameImg, 0, 0, targetW, targetH);
        resolve();
      };
      frameImg.onerror = () => {
        console.warn("⚠️ Frame gagal dimuat");
        resolve();
      };
    });
  }

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  const selfiePath = `selfies/${winnerKey}.jpg`;

  try {
    const selfieSnapshot = await storageRef.child(selfiePath).put(blob);
    const downloadURL = await selfieSnapshot.ref.getDownloadURL();
    await window.db.ref(`winners/${winnerKey}`).update({ selfie: downloadURL });

    alert("✅ Selfie disimpan di Firebase Storage dan Database!");
    window.location.href = "index.html";
  } catch (err) {
    console.error("❌ Gagal upload ke Firebase:", err);
    alert("❌ Gagal menyimpan selfie. Coba lagi nanti.");
  }
}
