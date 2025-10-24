document.addEventListener('DOMContentLoaded', () => {
  const front = document.getElementById('front-page');
  const main = document.getElementById('main-content');
  const envelope = document.getElementById('envelope');
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popupLetter');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const bigEnvelope = document.getElementById('big-envelope');

  // floating hearts
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-shape';
    heart.innerHTML = '💚';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (6 + Math.random() * 5) + 's';
    heart.style.fontSize = (14 + Math.random() * 28) + 'px';
    document.body.appendChild(heart);
  }

  // Typewriter effect for front page headline
  const frontText = document.querySelector('#front-page h1');
  const frontContent = frontText.textContent;
  frontText.textContent = '';
  let idx = 0;
  const frontInterval = setInterval(() => {
    frontText.textContent += frontContent.charAt(idx);
    idx++;
    if (idx >= frontContent.length) clearInterval(frontInterval);
  }, 50);

  // Random floating mini hearts in main content
  setInterval(() => {
    const miniHeart = document.createElement('div');
    miniHeart.className = 'mini-heart';
    miniHeart.innerHTML = '💚';
    miniHeart.style.left = Math.random() * 100 + 'vw';
    miniHeart.style.fontSize = (10 + Math.random() * 15) + 'px';
    miniHeart.style.animationDuration = (5 + Math.random() * 5) + 's';
    document.body.appendChild(miniHeart);
    setTimeout(() => miniHeart.remove(), 8000);
  }, 800);

  // Buttons
  yesBtn.addEventListener('click', () => {
    front.style.opacity = '0';
    setTimeout(() => {
      front.style.display = 'none';
      main.classList.add('show');
      document.body.style.overflow = 'auto'; // enable scrolling for main page
    }, 700);
  });

  noBtn.addEventListener('click', () => {
    alert("Awww... okay maybe later 😢");
  });

// Big envelope click → reveal contents in place
const burstContents = [
  ...document.querySelectorAll('.photo-gallery img'),
  document.querySelector('#main-content h1'),
  envelope
];

// initially hide elements
burstContents.forEach(el => {
  el.style.opacity = 0;  // hide
  el.style.transition = 'opacity 0.8s ease, transform 0.6s ease'; // smooth fade
  el.style.transform = 'scale(0.8)'; // optional tiny pop effect
});

bigEnvelope.addEventListener('click', () => {
  bigEnvelope.querySelector('.flap').classList.add('open');

  // wait for flap animation to finish
  setTimeout(() => {
    burstContents.forEach(el => {
      el.style.opacity = 1; // fade in
      el.style.transform = 'scale(1)'; // restore scale
    });

    // remove big envelope after reveal
    setTimeout(() => {
      bigEnvelope.remove();
    }, 600); // slightly after elements appear
  }, 1200); // matches flap open duration
});


  // Envelope click flap + popup
  envelope.addEventListener('click', () => {
    envelope.querySelector('.flap').classList.add('open');
    overlay.classList.add('show');
    popup.classList.add('show');

    document.body.style.overflow = 'hidden';

    const paragraphs = popup.querySelectorAll('.popup-para');
    paragraphs.forEach(p => p.textContent = '');

    let delay = 0;
    paragraphs.forEach((p) => {
      const fullText = p.dataset.text;
      let i = 0;
      const interval = () => {
        if (i < fullText.length) {
          p.textContent += fullText.charAt(i);
          i++;
          setTimeout(interval, 15);
        }
      };
      setTimeout(interval, delay);
      delay += fullText.length * 15 + 300;
    });

    spawnConfetti(80);
  });

  // Close popup
  overlay.addEventListener('click', () => {
    envelope.querySelector('.flap').classList.remove('open');
    overlay.classList.remove('show');
    popup.classList.remove('show');
    document.body.style.overflow = 'auto';
  });

  // Confetti
  function spawnConfetti(count) {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      document.body.appendChild(confetti);

      let falling = setInterval(() => {
        const top = parseFloat(confetti.style.top);
        confetti.style.top = (top + Math.random() * 5 + 2) + 'px';
        confetti.style.left = (parseFloat(confetti.style.left) + Math.random() * 4 - 2) + 'px';
        if (top > window.innerHeight) {
          confetti.remove();
          clearInterval(falling);
        }
      }, 16);
    }
  }

  // Sparkle particles
  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDelay = Math.random() * 6 + 's';
    document.body.appendChild(sparkle);
  }

  // Floating birthday messages
  const messages = ['💚', '💚', '💚', '💚'];
  messages.forEach((msg, i) => {
    const span = document.createElement('div');
    span.className = 'floating-msg';
    span.textContent = msg;
    span.style.left = (10 + i * 20) + 'vw';
    span.style.animationDelay = (i * 2) + 's';
    document.body.appendChild(span);
  });
});
