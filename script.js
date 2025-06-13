    const intro = document.getElementById('intro');
    const main = document.getElementById('main');
    const bgm = document.getElementById('bgm');
    const lineList = document.getElementById('line-list');

const paragraphs = [
  [
    "Bạn à, kỳ thi TOEIC này quan trọng lắm...",
    "Tui biết Bạn đã cố gắng rất nhiều.",
    "😌 Có thể đôi lúc Bạn cảm thấy mệt mỏi và áp lực...",
    "Mỗi ngày thức dậy học từ sớm,",
    "Dù mệt nhưng vẫn kiên trì."
  ],
  [
    "TOEIC không dễ, nhưng Bạn còn mạnh mẽ hơn nhiều!",
    "Tui tin Bạn sẽ làm được!",
    "Mọi nỗ lực đều xứng đáng.",
    "Chỉ cần cố thêm chút nữa thôi!",
    "Bạn sẽ chinh phục nó!"
  ],
  [
    "Tui sẽ luôn ở đây, cổ vũ cho Bạn.",
    "Cố lên nha!",
    "Thật có nhiều lời nhắn nhủ!",
    "Giữ sức khỏe, tự tin, lạc quan!",
    "Và tui biết Bạn sẽ làm được!"
  ],
  [
    "🫶 Tui ở đây, tui làm điều này tiếp động lực cho Bạn.",
    "💌 Tui chỉ muốn nói... Tui tin ở Bạn ",
     "Bạn làm được ấy. Cố lên!!💖"
  ]
];


    let paragraphIndex = 0;
    let currentLine = 0;
    let interval;
    const linesOnScreen = [];
    const maxLines = 5;
    const lineHeight = 40;

    function showNextLine() {
      const lines = paragraphs[paragraphIndex];
      const line = document.createElement('div');
      line.className = 'line';
      line.textContent = lines[currentLine];
      line.style.bottom = '0px';
      lineList.appendChild(line);
      requestAnimationFrame(() => {
        line.classList.add('show');
      });

      linesOnScreen.forEach(el => {
        const currentBottom = parseFloat(el.style.bottom);
        el.style.bottom = (currentBottom + lineHeight) + 'px';
      });

      linesOnScreen.push(line);
      if (linesOnScreen.length > maxLines) {
        const removed = linesOnScreen.shift();
        removed.remove();
      }

      currentLine++;
      if (currentLine >= lines.length) {
        clearInterval(interval);
        setTimeout(() => {
          currentLine = 0;
          paragraphIndex = (paragraphIndex + 1) % paragraphs.length;
          linesOnScreen.forEach(line => line.remove());
          linesOnScreen.length = 0;
          showNextParagraph();
        }, 3000);
      }
    }

    function showNextParagraph() {
      interval = setInterval(showNextLine, 1900);
    }

    intro.addEventListener('click', () => {
      intro.style.display = 'none';
      main.style.display = 'block';
      bgm.play();
      showNextParagraph();
      createFallingElements();
    });




function createFallingElements() {
  const types = ['circle', 'heart', 'text600', 'textCoLen'];
  let counter = 0;

  setInterval(() => {
    // Giới hạn số lượng chữ rơi
    const isText = Math.random() < 0.5 && counter % 5 === 0;
    const type = isText ? (Math.random() < 0.5 ? 'text600' : 'textCoLen') : (Math.random() < 0.5 ? 'circle' : 'heart');

    const el = document.createElement('div');
    el.className = 'falling';
    el.style.top = '-50px';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (4 + Math.random() * 3) + 's';
    el.style.opacity = 0.6 + Math.random() * 0.4;

    if (type === 'circle') {
      const size = 10 + Math.random() * 15;
      el.style.width = el.style.height = size + 'px';
      el.style.backgroundColor = '#ffc0cb';
      el.style.borderRadius = '50%';
    } else if (type === 'heart') {
      el.style.width = el.style.height = '20px';
      el.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 32 29.6\\\"><path fill=\\\"%23ff6699\\\" d=\\\"M23.6,0c-2.9,0-5.4,1.7-6.6,4.1C15.8,1.7,13.3,0,10.4,0C4.7,0,0,4.7,0,10.4c0,7.5,10.4,13.9,16,19.2c5.6-5.3,16-11.7,16-19.2C32,4.7,27.3,0,21.6,0H23.6z\\\"/></svg>')";
      el.style.backgroundSize = 'cover';
      el.style.backgroundColor = 'transparent';
    } else if (type === 'text600') {
      el.textContent = '600 +';
      el.style.fontSize = (16 + Math.random() * 6) + 'px';
    } else if (type === 'textCoLen') {
      el.textContent = 'Cố lên nhé !';
      el.style.fontSize = (16 + Math.random() * 6) + 'px';
    }

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 8000);
    counter++;
  }, 300);
}

createFallingElements();



