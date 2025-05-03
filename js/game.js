const query = new URLSearchParams(window.location.search);
const level = parseInt(query.get("level")) || 1;

let speed = 20;
let tolerance = 8;
let rewardConfig = { reward: "Tanpa Nama", icon: "assets/images/winner.png" };

let gameInterval, gameCountdown;
let isMoving = true, posX = 0, gameEnded = false, gameStarted = false, movingIntervalStarted = false;
let objectCenterRatio = null;

const object = document.getElementById("object");
const target = document.getElementById("target");
const titleGame = document.getElementById("title-game");
const tapSound = document.getElementById("tapSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const countdownOverlay = document.getElementById("countdownOverlay");
const countdownText = document.getElementById("countdownText");

let countdownNumber = 3;
if (countdownText) countdownText.innerText = countdownNumber;

// Ambil setting dari Firebase
function fetchSettingsFromFirebase() {
  if (!window.db) return alert("Firebase belum siap");

  console.log(`📥 Mengambil setting level ${level} dari Firebase...`);
  db.ref(`settings/level${level}`).once("value", snapshot => {
    const data = snapshot.val();
    if (data) {
      speed = parseInt(data.speed || 20);
      tolerance = parseInt(data.tolerance || 8);
      rewardConfig = data;

      console.log(`✅ Setting berhasil diambil:`);
      console.log(`→ Speed: ${speed}`);
      console.log(`→ Tolerance: ${tolerance}`);
      console.log(`→ Reward: ${rewardConfig.reward}`);
    } else {
      console.log("⚠️ Tidak ada data setting untuk level ini.");
    }

    startCountdown();
  });
}

function startCountdown() {
  let countdownInterval = setInterval(() => {
    countdownNumber--;
    if (countdownText) {
      if (countdownNumber > 0) {
        countdownText.innerText = countdownNumber;
      } else if (countdownNumber === 0) {
        countdownText.innerText = "GO!";
      } else {
        clearInterval(countdownInterval);
        if (countdownOverlay) countdownOverlay.style.display = "none";
        gameStarted = true;

        setTimeout(() => {
          centerObjectToTarget();
          object.style.display = "block";
          target.style.display = "block";
          titleGame.style.display = "flex";
          requestAnimationFrame(() => object.classList.add("show"));
          startGame();
        }, 50);
      }
    }
  }, 1000);
}

function startGame() {
  if (movingIntervalStarted) return;
  movingIntervalStarted = true;
  let duration = 20 + (5 - level) * 2;
  document.getElementById("timeLeft").innerText = duration;
  moveObject();
  gameCountdown = setInterval(() => {
    if (duration <= 0) return endGame(false);
    duration--;
    document.getElementById("timeLeft").innerText = duration;
  }, 1000);
}

function moveObject() {
  if (!isMoving || gameEnded) return;

  console.log("🎯 Object bergerak dengan speed:", speed);

  const targetRect = target.getBoundingClientRect();
  const objectRect = object.getBoundingClientRect();

  const targetCenter = targetRect.left + targetRect.width / 2;
  const objectCenter = objectRect.left + objectRect.width / 2;

  if (Math.abs(targetCenter - objectCenter) < 100) {
    speed = Math.max(5, speed);
  }

  posX += speed;
  if (posX > window.innerWidth) posX = -object.offsetWidth;
  object.style.left = posX + "px";
  gameInterval = requestAnimationFrame(moveObject);
}

document.body.addEventListener("click", () => {
  if (!gameStarted || gameEnded || countdownNumber > 0) return;
  tapSound.play();

  if (isMoving) {
    cancelAnimationFrame(gameInterval);
    isMoving = false;

    const objectRect = object.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const offsetX = Math.abs((objectRect.left + objectRect.width / 2) - (targetRect.left + targetRect.width / 2));
    const offsetY = Math.abs((objectRect.top + objectRect.height / 2) - (targetRect.top + targetRect.height / 2));

    const overlap = objectRect.left <= targetRect.right &&
                    objectRect.right >= targetRect.left &&
                    objectRect.top <= targetRect.bottom &&
                    objectRect.bottom >= targetRect.top;

    console.log("offsetX:", offsetX);
    console.log("offsetY:", offsetY);
    console.log("tolerance:", tolerance);
    console.log("overlap:", overlap);

    if (overlap && offsetX <= tolerance && offsetY <= tolerance) {
      document.body.style.backgroundColor = "#4CAF50";
      endGame(true);
    } else {
      document.body.style.backgroundColor = "#F44336";
    }

    objectCenterRatio = objectRect.left / window.innerWidth;
  } else {
    document.body.style.backgroundColor = "#F44336";
    isMoving = true;
    moveObject();
  }
});

function centerObjectToTarget() {
  const targetRect = target.getBoundingClientRect();
  const objectWidth = object.offsetWidth || 100;
  const targetCenterX = targetRect.left + targetRect.width / 2;
  const objectLeft = targetCenterX - objectWidth / 2;
  object.style.left = `${objectLeft}px`;
}

function endGame(win) {
  cancelAnimationFrame(gameInterval);
  clearInterval(gameCountdown);
  movingIntervalStarted = false;
  gameEnded = true;

  if (win) {
    winSound.play();
    setTimeout(() => animateWin(), 1000);
    setTimeout(() => {
      document.getElementById("winRewardCode").textContent = rewardConfig.reward || "Kupon Hadiah";
      document.getElementById("winRewardIcon").src = rewardConfig.icon || "assets/images/winner.png";
      document.getElementById("winRewardIcon").alt = rewardConfig.reward;
      document.getElementById("winModal").classList.remove("hidden");
      document.getElementById("winModal").classList.add("show");
    }, 2000);
  } else {
    loseSound.play();
    animateLose();
    setTimeout(() => {
      document.getElementById("loseModal").classList.remove("hidden");
      document.getElementById("loseModal").classList.add("show");
    }, 7000);
  }
}

function saveWinner() {
  const nama = document.getElementById("nama").value.trim();
  const ig = document.getElementById("instagram").value.trim();
  const telp = document.getElementById("telepon").value.trim();
  const timestamp = new Date().toISOString();

  if (!nama || !telp) {
    alert("Nama dan Telepon wajib diisi!");
    return;
  }

  const entry = {
    nama, ig, telp, level,
    reward: rewardConfig.reward,
    timestamp
  };

  if (window.db) {
    const newRef = db.ref("winners").push();
    newRef.set(entry).then(() => alert("✅ Data pemenang disimpan ke Firebase!"));
  } else {
    alert("Firebase belum siap.");
  }
}

function animateWin() {
  object.style.transition = "transform 0.5s ease";
  object.style.transform = "scale(1.3) rotate(10deg)";
  setTimeout(() => {
    object.style.transform = "scale(1) rotate(0)";
  }, 1000);
}

function animateLose() {
  object.style.transition = "none";
  object.style.animation = "shake 0.5s ease";
  object.style.transform = "translate(-50%, -50%) rotate(0deg)";
  void object.offsetWidth;
  setTimeout(() => {
    object.style.transition = "transform 2.5s ease-out";
    object.style.transform = `translate(100vw, -50%) rotate(0deg)`;
  }, 500);
  setTimeout(() => {
    object.style.transition = "transform 2.5s ease-in-out";
    object.style.transform = `translate(-100vw, -100vh) rotate(-135deg)`;
  }, 3000);
  setTimeout(() => {
    object.style.transition = "transform 2.5s ease-in";
    object.style.transform = `translate(120vw, 100vh) rotate(45deg)`;
  }, 5500);
}

// Tunggu Firebase siap sebelum mulai
const waitFirebase = setInterval(() => {
  if (window.db) {
    clearInterval(waitFirebase);
    fetchSettingsFromFirebase();
  }
}, 300);