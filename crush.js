const canvas = document.getElementById("fallingCanvas");
const ctx = canvas.getContext("2d");
let flowers = [];
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFlower() {
  return {
    x: Math.random() * width,
    y: -20,
    radius: Math.random() * 10 + 5,
    speed: Math.random() * 0.5 + 0.2,
    drift: Math.random() * 0.6 - 0.3
  };
}

function drawFlowers() {
  ctx.clearRect(0, 0, width, height);
  for (let f of flowers) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,182,193,0.6)";
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.speed;
    f.x += f.drift;
    if (f.y > height) {
      f.y = -20;
      f.x = Math.random() * width;
    }
  }
}

setInterval(() => {
  if (flowers.length < 150) flowers.push(createFlower());
}, 150);

function animateFlowers() {
  drawFlowers();
  requestAnimationFrame(animateFlowers);
}
animateFlowers();

const overlay = document.getElementById("overlay");
const lyricDiv = document.getElementById("lyric");
const bgMusic = document.getElementById("bgMusic");
const background = document.getElementById("background");

const lines = [
  [
    "Tui biết Bạn đang bước vào một kỳ thi quan trọng...",
    "Có thể đôi lúc Bạn cảm thấy mệt mỏi và áp lực...",
    "Nhưng hãy nhớ rằng Bạn không đơn độc.",
    "Tui luôn ở đây, tui làm điều này để tiếp thêm động lực cho Bạn",
    "Tui chỉ muốn nói... Tui tin ở Bạn 💖 Bạn làm được ấy. Cố lên !!"
  ],
  [
    "Kể cả khi Bạn cảm thấy mình không đủ giỏi...",
    "Hãy nhớ rằng mỗi bước nhỏ Bạn đi đều có giá trị.",
    "Tui biết Bạn có thể vượt qua kỳ thi này....",
    "Hãy cứ giữ tinh thần tự tin, lạc quan nhé!",
    "Cố lên nhé, Bạn ơi!"
  ],
  [
    "Sau tất cả những dòng này...",
    "Điều cuối cùng tui muốn nói là...",
    "Giữ sức khỏe thật tốt nhé!",
    "Cố lên nè, còn vài nggày nữa thôi 🥹",
    "Và điều cuối cùng... Bạn có khó khăn gì, tui sẵn sàng giúp đỡ💗"
  ],
  [
    "Cố lên, Bạn làm được, tui tin ở Bạn! 💪",
  ]
];

let currentBlock = 0;

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  background.classList.remove("hidden");
  bgMusic.play();
  showLines();
});

// ... phần đầu giữ nguyên ...

async function showLines() {
  lyricDiv.innerHTML = "";
  while (true) {
    for (const line of lines[currentBlock]) {
      const div = document.createElement("div");
      div.className = "line";
      div.textContent = line;
      lyricDiv.appendChild(div);

      if (lyricDiv.children.length > 5) {
        const firstLine = lyricDiv.children[0];
        firstLine.classList.add("line-slide-up");
        await new Promise(r => setTimeout(r, 500));
        lyricDiv.removeChild(firstLine);
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    currentBlock = (currentBlock + 1) % lines.length;

    // Ẩn toàn bộ dòng cùng lúc
    const children = Array.from(lyricDiv.children);
    children.forEach(child => {
      child.classList.add("line-slide-up");
    });

    await new Promise(r => setTimeout(r, 800));
    lyricDiv.innerHTML = "";
  }
}

