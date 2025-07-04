const leftBear = document.getElementById("leftBear");
const rightBear = document.getElementById("rightBear");
const message = document.getElementById("message");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hugAnim = document.getElementById("hugAnim");

// Pupil (gözbebeği) elementlerini oluştur ve bears container'a ekle
const bearsContainer = document.querySelector(".bears");

const leftPupil = document.createElement("div");
leftPupil.classList.add("pupil");
bearsContainer.appendChild(leftPupil);

const rightPupil = document.createElement("div");
rightPupil.classList.add("pupil");
bearsContainer.appendChild(rightPupil);

// Pupil CSS ayarlarını JS ile optimize edelim (boyut, renk, vs CSS’de olabilir)
// Ama pozisyonu JS ayarlayacak

document.addEventListener("mousemove", (e) => {
  movePupil(leftBear, leftPupil, e.clientX, e.clientY);
  movePupil(rightBear, rightPupil, e.clientX, e.clientY);
});

function movePupil(bearImg, pupil, mouseX, mouseY) {
  const rect = bearImg.getBoundingClientRect();
  // Tahmini göz merkezi, senin ayıya göre ayarladım
  const eyeCenterX = rect.left + rect.width * 0.6;
  const eyeCenterY = rect.top + rect.height * 0.45;

  const dx = mouseX - eyeCenterX;
  const dy = mouseY - eyeCenterY;

  const maxDist = 7;
  const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
  const angle = Math.atan2(dy, dx);

  const pupilX = dist * Math.cos(angle);
  const pupilY = dist * Math.sin(angle);

  // Pupil position is fixed relative to viewport:
  pupil.style.position = "fixed";
  pupil.style.width = "15px";
  pupil.style.height = "15px";
  pupil.style.background = "black";
  pupil.style.borderRadius = "50%";
  pupil.style.pointerEvents = "none";

  // Gözbebeğini ayıya göre konumlandır
  pupil.style.left = `${eyeCenterX + pupilX - 7}px`; // 7: pupil yarıçapı için offset
  pupil.style.top = `${eyeCenterY + pupilY - 7}px`;
  pupil.style.zIndex = 20;
}

// "Evet" butonuna tıklayınca sarılma efekti
yesBtn.addEventListener("click", () => {
  // Ayıları yakınlaştırıp döndür
  leftBear.style.transform = "translateX(50px) rotate(15deg)";
  rightBear.style.transform = "translateX(-50px) rotate(-15deg) scaleX(-1)"; // sağ ayı zaten aynalanmış, scaleX(-1) ile koru
  // Gözbebeklerini küçült
  leftPupil.style.transform = "scale(0.6)";
  rightPupil.style.transform = "scale(0.6)";
  leftPupil.style.transition = "transform 0.5s ease";
  rightPupil.style.transition = "transform 0.5s ease";

  // Mesaj göster
  message.innerText = "Ben de seni seviyorum 💖";
  message.classList.add("show");

  // Lottie animasyonunu göster
  hugAnim.style.display = "block";

  // Butonları devre dışı bırak
  yesBtn.disabled = true;
  noBtn.disabled = true;
});

// "Hayır" butonu hareket ettirme kodu (seninkiyle aynı, CSS ile uyumlu)
noBtn.addEventListener("mousemove", () => {
  const container = document.querySelector(".buttons");
  const rect = container.getBoundingClientRect();
  const maxX = rect.width - noBtn.offsetWidth;
  const maxY = rect.height - noBtn.offsetHeight;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
});
