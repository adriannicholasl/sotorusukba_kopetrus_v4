// js/firebase.js
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Gagal load ${src}`));
    document.head.appendChild(s);
  });
}

// Memuat Firebase script
window.firebaseReady = (async () => {
  try {
    await Promise.all([
      loadScript("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"),
      loadScript("https://www.gstatic.com/firebasejs/9.22.2/firebase-storage-compat.js"),
      loadScript("https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js"),
    ]);

    const firebaseConfig = {
      apiKey: "AIzaSyBcu0rGrmBITM9fJUWlpG5Sd8S_uhPgl3M",
      authDomain: "rusukbakopetrus.firebaseapp.com",
      projectId: "rusukbakopetrus",
      storageBucket: "rusukbakopetrus.firebasestorage.app",
      messagingSenderId: "616900062598",
      appId: "1:616900062598:web:c57da9b5b4986317afd007",
      databaseURL: "https://rusukbakopetrus-default-rtdb.asia-southeast1.firebasedatabase.app",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log("✅ Firebase connected");
    } else {
      console.warn("⚠️ Firebase sudah terinisialisasi");
    }

    const db = firebase.database();
    window.db = db; // Expose db untuk kode.js
    return db; // resolve promise
  } catch (err) {
    console.error("❌ Firebase gagal dimuat:", err);
    alert("❌ Gagal memuat Firebase. Cek koneksi atau URL skrip.");
    throw err; // reject promise
  }
})();
