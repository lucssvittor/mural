let highestZ = 1;

class Paper {
  constructor(element) {
    this.element = element;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.init();
  }

  init() {
    const startDrag = (e) => {
      this.isDragging = true;
      this.startX = (e.touches ? e.touches[0].clientX : e.clientX) - this.offsetX;
      this.startY = (e.touches ? e.touches[0].clientY : e.clientY) - this.offsetY;
      this.element.style.zIndex = ++highestZ;
    };

    const drag = (e) => {
      if (!this.isDragging) return;
      this.currentX = (e.touches ? e.touches[0].clientX : e.clientX) - this.startX;
      this.currentY = (e.touches ? e.touches[0].clientY : e.clientY) - this.startY;
      this.offsetX = this.currentX;
      this.offsetY = this.currentY;
      this.updatePosition();
    };

    const endDrag = () => {
      this.isDragging = false;
    };

    this.element.addEventListener('mousedown', startDrag);
    this.element.addEventListener('touchstart', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
  }

  updatePosition() {
    this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(calc(var(--rotation, 0) * 1deg))`;
  }
}

const papers = document.querySelectorAll('.paper');
papers.forEach((paper) => new Paper(paper));

const heartsContainer = document.getElementById('hearts-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤️';

  const randomLeft = Math.random() * 100;      
  heart.style.left = `${randomLeft}%`;
  const randomSize = Math.random() * 1.5 + 0.5;       
  heart.style.fontSize = `${randomSize}rem`;


  heartsContainer.appendChild(heart);


  setTimeout(() => {
    heart.remove();
  }, 5000);
}


setInterval(createHeart, 500);