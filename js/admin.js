document.addEventListener("DOMContentLoaded", () => {
    const levelSelect = document.getElementById("levelSelect");
    const speedInput = document.getElementById("speedInput");
    const toleranceInput = document.getElementById("toleranceInput");
  
    // Untuk 3 hadiah
    const rewardInputs = [
      document.getElementById("rewardInput1"),
      document.getElementById("rewardInput2"),
      document.getElementById("rewardInput3")
    ];
    const iconInputs = [
      document.getElementById("iconInput1"),
      document.getElementById("iconInput2"),
      document.getElementById("iconInput3")
    ];
    const previewIcons = [
      document.getElementById("previewIcon1"),
      document.getElementById("previewIcon2"),
      document.getElementById("previewIcon3")
    ];
  
    function loadSettings() {
      const level = levelSelect.value;
      if (window.db) {
        db.ref(`settings/level${level}`).once("value", snapshot => {
          const conf = snapshot.val() || {};
          speedInput.value = conf.speed || "";
          toleranceInput.value = conf.tolerance || "";
  
          if (conf.rewards && Array.isArray(conf.rewards)) {
            conf.rewards.forEach((r, i) => {
              if (rewardInputs[i]) rewardInputs[i].value = r.reward || "";
              if (previewIcons[i]) previewIcons[i].src = r.icon || "";
            });
          }
        });
      } else {
        alert("Firebase belum siap");
      }
    }
  
    function saveSettings() {
      const level = levelSelect.value;
      const speed = speedInput.value;
      const tolerance = toleranceInput.value;
  
      const rewards = [];
  
      function uploadToFirebase() {
        if (rewards.length === 3) {
          db.ref(`settings/level${level}`).set({
            speed,
            tolerance,
            rewards
          }).then(() => {
            alert("✅ Data berhasil disimpan ke Firebase!");
            loadSettings();
          });
        }
      }
  
      for (let i = 0; i < 3; i++) {
        const name = rewardInputs[i].value.trim();
        const file = iconInputs[i].files[0];
  
        if (!name) {
          alert(`❗ Nama hadiah ${i + 1} kosong`);
          return;
        }
  
        const finish = (iconBase64) => {
          rewards.push({
            reward: name,
            icon: iconBase64
          });
          uploadToFirebase();
        };
  
        if (file) {
          const reader = new FileReader();
          reader.onload = () => finish(reader.result);
          reader.readAsDataURL(file);
        } else {
          finish(previewIcons[i].src);  // Gunakan gambar lama
        }
      }
    }
  
    window.saveSettings = saveSettings;
    levelSelect.addEventListener("change", loadSettings);
  
    // Tampilkan preview gambar saat file diganti
    iconInputs.forEach((input, index) => {
      input.addEventListener("change", () => {
        const file = input.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            previewIcons[index].src = reader.result;
          };
          reader.readAsDataURL(file);
        }
      });
    });
  
    // Tunggu firebase ready
    const interval = setInterval(() => {
      if (window.db) {
        clearInterval(interval);
        loadSettings();
      }
    }, 300);
  });
  