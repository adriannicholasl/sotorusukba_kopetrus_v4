// js/camera.js versi Firebase

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
    video.srcObject = stream;
    })
    .catch((err) => {
    alert("Kamera tidak tersedia. Gunakan perangkat lain.");
    console.error("Camera error:", err);
    });

window.takeSelfie = () => {
    if (!video.videoWidth || !video.videoHeight) {
    alert("Kamera belum siap. Coba lagi.");
    return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frame = new Image();
    frame.src = "assets/images/fotoo.png"; // Ganti sesuai frame yang kamu pakai

    frame.onload = () => {
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");

    if (!window.db) return alert("Firebase belum siap");

    // Ambil ID pemenang terakhir
    db.ref("winners").limitToLast(1).once("value", snapshot => {
        const data = snapshot.val();
        if (!data) return alert("Belum ada pemenang untuk disisipkan selfie.");

        const lastKey = Object.keys(data)[0];
        db.ref(`winners/${lastKey}`).update({ selfie: dataUrl })
        .then(() => alert("✅ Selfie disimpan ke Firebase."))
        .catch(err => alert("❌ Gagal menyimpan selfie."));
    });
    };

    frame.onerror = () => {
    alert("Gagal memuat frame gambar.");
    };
};
});
