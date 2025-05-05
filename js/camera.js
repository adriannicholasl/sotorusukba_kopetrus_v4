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



    // EDITED by Adriannicholasl
    // Mengambil foto dari video dan menyimpannya ke Firebase   
    // FIXED Ukuran gambar untuk feed IG potret 4:5 (1080x1350)
    window.takeSelfie = () => {
        if (!video.videoWidth || !video.videoHeight) {
            alert("Kamera belum siap. Coba lagi.");
            return;
        }
    
        // Ukuran target untuk feed IG potret
        const targetWidth = 1080;
        const targetHeight = 1350;
    
        canvas.width = targetWidth;
        canvas.height = targetHeight;
    
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = video.videoWidth;
        tempCanvas.height = video.videoHeight;
    
        // Ambil dari video (gambar asli)
        tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    
        // Hitung cropping dari rasio 4:5
        const inputRatio = tempCanvas.width / tempCanvas.height;
        const targetRatio = targetWidth / targetHeight;
    
        let cropWidth = tempCanvas.width;
        let cropHeight = tempCanvas.height;
    
        if (inputRatio > targetRatio) {
            // Gambar lebih lebar dari 4:5 → potong sisi kiri-kanan
            cropWidth = tempCanvas.height * targetRatio;
        } else {
            // Gambar lebih tinggi dari 4:5 → potong atas-bawah
            cropHeight = tempCanvas.width / targetRatio;
        }
    
        const cropX = (tempCanvas.width - cropWidth) / 2;
        const cropY = (tempCanvas.height - cropHeight) / 2;
    
        // Gambar ke canvas akhir (1080x1350)
        ctx.drawImage(
            tempCanvas,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            targetWidth,
            targetHeight
        );
    
        const frame = new Image();
        frame.src = "assets/images/fotoo.png"; // HARUS ukuran 1080x1350
    
        frame.onload = () => {
            ctx.drawImage(frame, 0, 0, targetWidth, targetHeight);
            const dataUrl = canvas.toDataURL("image/png");
    
            if (!window.db) return alert("Firebase belum siap");
    
            db.ref("winners").limitToLast(1).once("value", snapshot => {
                const data = snapshot.val();
                if (!data) return alert("Belum ada pemenang untuk disisipkan selfie.");
    
                const lastKey = Object.keys(data)[0];
                db.ref(`winners/${lastKey}`).update({ selfie: dataUrl })
                .then(() => {
                    alert("✅ Selfie disimpan ke Firebase. Mengalihkan kembali...");
                    window.location.href = "https://adriannicholasl.github.io/sotorusukba_kopetrus_v4/";
                })
                .catch(err => {
                    alert("❌ Gagal menyimpan selfie. Mengalihkan kembali...");
                    window.location.href = "https://adriannicholasl.github.io/sotorusukba_kopetrus_v4/";
                });
            });
        };
    
        frame.onerror = () => {
            alert("Gagal memuat frame gambar.");
        };
    };
    
});
