/***** Slide & Audio Data *****/
const slides = [
  {
    title: "❤️Songs That Remind Me Of My Laily❤️",
    body: "hi!, you can click the floating stars for some little messages",
    body2: "that I wrote for you",
    petals: ["pics/lotus.png", "pics/peony.png"],
    audioFile: "audio/howls_moving_castle.mp3",
    start: 49
  },
  {
    title: "🤍Boyfriend – Ariana Grande & Social House🤍",
    body: "Because what even were we before we got together 😭😭",
    body2: "This song is literally a dictionary definition of us...",
    image: "pics/boyfriend.png",
    petals: ["pics/rose.png", "pics/petal.png"],
    audioFile: "audio/boyfriend.mp3",
    start: 5
  },
  {
    title: "💜I Wanna Be Yours – Arctic Monkeys💜",
    body: "Because I just wanna be everything for you, your man, your bestfriend,",
    body2: "someone who just gets you, I wanna be the reason you feel better everyday.",
    image: "pics/i_wanna_be_yours.png",
    petals: ["pics/rose.png", "pics/petal.png"],
    audioFile: "audio/i_wanna_be_yours.mp3",
    start: 5
  },
  {
    title: "🖤505 – Arctic Monkeys🖤",
    body: "You don't just feel like home, you feel like the only place I wanna be.",
    body2: "Nothing has ever felt quite right without you by my side.",
    image: "pics/back_to_505.png",
    petals: ["pics/tulip.png", "pics/peony.png"],
    audioFile: "audio/505.mp3",
    start: 5
  },
  {
    title: "💙Die With A Smile – Bruno Mars💙",
    body: "Because I'd rather die by your side than be with anyone else.",
    body2: "Loving you makes even the end sound beautiful my love.",
    image: "pics/die_with_a_smile.png",
    petals: ["pics/peony.png", "pics/rose.png"],
    audioFile: "audio/die_with_a_smile.mp3",
    start: 5
  },
  {
    title: "💛Glue Song – beabadoobee💛",
    body: "I'll always stick to you like glue babe.",
    body2: "(we should use gorilla glue tho)",
    image: "pics/glue_song.png",
    petals: ["pics/cherry_blossom.png", "pics/tulip.png"],
    audioFile: "audio/glue_song.mp3",
    start: 5
  },
  {
    title: "💚Until I Found You – Stephen Sanchez💚",
    body: "Because Laila, before you came, love was just a word to me.",
    body2: "Now I can't even imagine life without you being a part of it.",
    image: "pics/until_i_found_you.png",
    petals: ["pics/petal.png", "pics/rose.png"],
    audioFile: "audio/until_i_found_you.mp3",
    start: 5
  },
  {
    title: "🧡Golden Hour – JVKE🧡",
    body: "This song is how I envision you, you light up everything around you",
    body2: "I can't help but stare at you a little longer every time we meet",
    image: "pics/golden_hour.png",
    petals: ["pics/tulip.png", "pics/peony.png"],
    audioFile: "audio/golden_hour.mp3",
    start: 5
  },
  {
    title: "💫 But my favourite song is your voice 💫",
    body: "I Love You Laila",
    body2: "Click the heart...",
    image: "pics/last_slide.png",
    petals: ["pics/lotus.png", "pics/peony.png"],
    audioFile: "audio/howls_moving_castle.mp3",
    start: 49
  }
];

/***** Floating Love Notes Data *****/
const loveNotes = [
  "I love your smile more than anything.",
  "You are my sunshine on a cloudy day.",
  "I still get butterflies whenever I see you.",
  "Your laughter is the sweetest melody.",
  "Every moment with you feels like a dream.",
  "I cherish every second by your side.",
  "You make my heart skip a beat.",
];

/***** Variables & DOM References *****/
let current = 0;
let petalInterval = null;
let audioFadeInterval = null;
let firstSlideAudioStarted = false;

const audio = document.getElementById("audio");
const finalMsg = document.getElementById("final-message");
const secretMsg = document.getElementById("secret-message");
const glowingHeart = document.getElementById("glowing-heart");
const nextBtn = document.getElementById("nextBtn");
const slidesDiv = document.getElementById("slides");
const backBtn = document.getElementById("backBtn");

/***** Volume Slider *****/
const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

/***** Audio Fade Functions *****/
function fadeOutAudio(audioEl, callback) {
  if (audioFadeInterval) clearInterval(audioFadeInterval);
  audioFadeInterval = setInterval(() => {
    if (audioEl.volume > 0.1) {
      audioEl.volume -= 0.1;
    } else {
      audioEl.volume = 0;
      clearInterval(audioFadeInterval);
      audioEl.pause();
      if (callback) callback();
    }
  }, 200);
}

function fadeInAudio(audioEl) {
  audioEl.volume = 0;
  audioEl.play();
  if (audioFadeInterval) clearInterval(audioFadeInterval);
  audioFadeInterval = setInterval(() => {
    if (audioEl.volume < 1) {
      audioEl.volume += 0.1;
    } else {
      audioEl.volume = 1;
      clearInterval(audioFadeInterval);
    }
  }, 200);
}

/***** Typewriter Text Effect *****/
function typeText(element, text, speed = 50) {
  element.innerHTML = "";
  let index = 0;
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      element.innerHTML = '<span class="typed-text">' + text.slice(0, index) + "</span>";
      index++;
      if (index > text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

/***** Petals Generation *****/
function startPetals() {
  const s = slides[current];
  const intervalRate = (current === 0 || current === slides.length - 1) ? 50 : 100;
  petalInterval = setInterval(() => {
    const p = document.createElement("div");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "vw";
    p.style.backgroundImage = `url(${s.petals[Math.floor(Math.random() * s.petals.length)]})`;
    const animDuration = 6 + Math.random() * 2;
    p.style.animationDuration = animDuration + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), animDuration * 1000 + 200);
  }, intervalRate);
}

/***** Sparkles/Fireworks after each slide transition *****/
function spawnSparkles() {
  // A simple burst near the container's center
  const container = document.querySelector(".container");
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 20; i++) {
    const spark = document.createElement("div");
    spark.className = "spark";
    spark.style.left = centerX + "px";
    spark.style.top = centerY + "px";
    document.body.appendChild(spark);

    const angle = Math.random() * 2 * Math.PI;
    const speed = 3 + Math.random() * 3;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    let x = centerX;
    let y = centerY;

    const anim = setInterval(() => {
      x += vx;
      y += vy;
      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.opacity -= 0.02;
      if (spark.style.opacity <= 0) {
        clearInterval(anim);
        spark.remove();
      }
    }, 20);
  }
}

/***** Render Slide *****/
async function render() {
  const s = slides[current];
  
  // Show/hide back & next buttons
  backBtn.style.display = (current > 0 && current < slides.length - 1) ? "inline-block" : "none";
  nextBtn.style.display = (current === slides.length - 1) ? "none" : "inline-block";
  
  slidesDiv.classList.add("fade");
  setTimeout(() => {
    slidesDiv.innerHTML = `
      <h2 id="slide-title"></h2>
      <p id="slide-body"></p>
      <p id="slide-body2"></p>
      ${s.image ? `<img src="${s.image}" alt="Slide Image">` : ""}
    `;
    slidesDiv.classList.remove("fade");
  }, 300);

  // Fade out old audio, switch track, fade in if not first slide or user has started audio
  fadeOutAudio(audio, () => {
    audio.src = s.audioFile;
    audio.currentTime = s.start;
    if (current === 0 && !firstSlideAudioStarted) {
      // wait for user to click a star
    } else {
      fadeInAudio(audio);
    }
  });

  // Clear old petals, spawn new
  document.querySelectorAll(".petal").forEach((p) => p.remove());
  if (petalInterval) clearInterval(petalInterval);
  startPetals();

  // Spawn sparkles after slide transition
  setTimeout(() => {
    spawnSparkles();
  }, 700);

  // Type text
  setTimeout(async () => {
    const titleEl = document.getElementById("slide-title");
    const bodyEl = document.getElementById("slide-body");
    const body2El = document.getElementById("slide-body2");
    if (titleEl && bodyEl && body2El) {
      if (current === 0) {
        await typeText(titleEl, s.title, 80);
        let placeholder = s.body || "Anticipation builds...";
        await typeText(bodyEl, placeholder, 80);
        let placeholder2 = s.body2 || "";
        await typeText(body2El, placeholder2, 80);
      } else {
        await typeText(titleEl, s.title, 60);
        await typeText(bodyEl, s.body, 40);
        await typeText(body2El, s.body2 || "", 40);
      }
    }
  }, 400);

  // Last slide => show final message
  if (current === slides.length - 1) {
    glowingHeart.style.fontFamily = "'Playfair Display', serif";
    glowingHeart.style.fontWeight = "700";
    finalMsg.style.display = "block";
  } else {
    finalMsg.style.display = "none";
  }
  secretMsg.style.display = "none";
}

/***** Love Notes Simulation *****/
const noteImages = ["pics/star.png"];
let loveNoteObjs = [];

function createFloatingLoveNotes() {
  loveNoteObjs.forEach((obj) => obj.el.remove());
  loveNoteObjs = [];
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  loveNotes.forEach((noteText) => {
    const noteEl = document.createElement("div");
    noteEl.className = "love-note";
    const randomImg = noteImages[Math.floor(Math.random() * noteImages.length)];
    noteEl.style.background = `url(${randomImg}) no-repeat center / cover`;
    const label = document.createElement("div");
    label.className = "love-note-label";
    label.innerText = "click me";
    noteEl.appendChild(label);
    const msgBubble = document.createElement("div");
    msgBubble.className = "love-note-message";
    msgBubble.innerText = noteText;
    noteEl.appendChild(msgBubble);

    // Start audio if first slide not started yet
    noteEl.addEventListener("click", () => {
      msgBubble.style.display = (msgBubble.style.display === "block") ? "none" : "block";
      if (current === 0 && !firstSlideAudioStarted) {
        firstSlideAudioStarted = true;
        fadeInAudio(audio);
      }
    });

    // Random position outside container
    let x, y, attempts = 0;
    do {
      x = Math.random() * (viewportW - 40);
      y = Math.random() * (viewportH - 40);
      attempts++;
    } while (
      x + 40 > containerRect.left &&
      x < containerRect.right &&
      y + 40 > containerRect.top &&
      y < containerRect.bottom &&
      attempts < 100
    );
    noteEl.style.left = x + "px";
    noteEl.style.top = y + "px";
    document.body.appendChild(noteEl);

    const rect = noteEl.getBoundingClientRect();
    const vx = (Math.random() - 0.5) * 1.5;
    const vy = (Math.random() - 0.5) * 1.5;
    loveNoteObjs.push({
      el: noteEl,
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      width: rect.width,
      height: rect.height,
    });
  });
  requestAnimationFrame(updateLoveNotes);
}

function updateLoveNotes() {
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  for (let i = 0; i < loveNoteObjs.length; i++) {
    let obj = loveNoteObjs[i];
    obj.x += obj.vx;
    obj.y += obj.vy;

    // Bounce off edges
    if (obj.x < 0) { obj.x = 0; obj.vx = -obj.vx; }
    if (obj.y < 0) { obj.y = 0; obj.vy = -obj.vy; }
    if (obj.x + obj.width > viewportW) {
      obj.x = viewportW - obj.width;
      obj.vx = -obj.vx;
    }
    if (obj.y + obj.height > viewportH) {
      obj.y = viewportH - obj.height;
      obj.vy = -obj.vy;
    }

    // Bounce off container
    let noteRect = {
      left: obj.x,
      top: obj.y,
      right: obj.x + obj.width,
      bottom: obj.y + obj.height,
    };
    if (
      !(noteRect.right < containerRect.left ||
        noteRect.left > containerRect.right ||
        noteRect.bottom < containerRect.top ||
        noteRect.top > containerRect.bottom)
    ) {
      obj.vx = -obj.vx;
      obj.vy = -obj.vy;
    }

    // Bounce off other notes
    for (let j = i + 1; j < loveNoteObjs.length; j++) {
      let other = loveNoteObjs[j];
      let otherRect = {
        left: other.x,
        top: other.y,
        right: other.x + other.width,
        bottom: other.y + other.height,
      };
      if (
        !(noteRect.right < otherRect.left ||
          noteRect.left > otherRect.right ||
          noteRect.bottom < otherRect.top ||
          noteRect.top > otherRect.bottom)
      ) {
        obj.vx = -obj.vx;
        obj.vy = -obj.vy;
        other.vx = -other.vx;
        other.vy = -other.vy;
      }
    }

    obj.el.style.left = obj.x + "px";
    obj.el.style.top = obj.y + "px";
  }
  requestAnimationFrame(updateLoveNotes);
}

/***** Parallax on the Stars Layer *****/
function updateParallax(e) {
  const stars = document.querySelector(".stars-layer");
  if (!stars) return;
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  let offsetX = (e.clientX - centerX) / 70; // smaller factor for subtle movement
  let offsetY = (e.clientY - centerY) / 70;
  stars.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

/***** Custom Cursor & Mouse Trail (Centered) *****/
let lastMousePos = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  lastMousePos.x = e.pageX;
  lastMousePos.y = e.pageY;
  const customCursor = document.getElementById("custom-cursor");
  customCursor.style.left = `${e.pageX}px`;
  customCursor.style.top = `${e.pageY}px`;
  updateParallax(e); // also update parallax
});

function spawnTrailDot() {
  const trail = document.createElement("div");
  trail.className = "trail-dot";
  trail.style.left = `${lastMousePos.x}px`;
  trail.style.top = `${lastMousePos.y}px`;
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 500);
}
function animateTrail() {
  spawnTrailDot();
  requestAnimationFrame(animateTrail);
}
requestAnimationFrame(animateTrail);

/***** Interactive Elements: Add Cursor Active Class *****/
const interactiveElements = document.querySelectorAll(".interactive");
interactiveElements.forEach(elem => {
  elem.addEventListener("mouseover", () => {
    document.getElementById("custom-cursor").classList.add("cursor-active");
  });
  elem.addEventListener("mouseout", () => {
    document.getElementById("custom-cursor").classList.remove("cursor-active");
  });
});

/***** Buttons & Slide Handlers *****/
nextBtn.onclick = () => {
  if (current < slides.length - 1) {
    current++;
    render();
  }
};
backBtn.onclick = () => {
  if (current > 0) {
    current--;
    render();
  }
};
/* Heart link toggles secret message */
glowingHeart.onclick = (e) => {
  e.preventDefault(); // since it's an <a>, prevent default nav
  secretMsg.style.display = (secretMsg.style.display === "block") ? "none" : "block";
};
document.getElementById("playAgainBtn").onclick = () => {
  current = 0;
  render();
};

/***** Audio Visualizer *****/
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 145;
let audioContext, analyser, dataArray, bufferLength;

function setupVisualizer() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 512;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }
}

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gap = 2;
  const barWidth = (canvas.width - gap * (bufferLength - 1)) / bufferLength;
  let barHeight;
  let x = 0;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#ff5f6d");
  gradient.addColorStop(1, "#ffc371");

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 0.4;
    ctx.fillStyle = gradient;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + gap;
  }
}

setupVisualizer();
drawVisualizer();

/***** Initialize *****/
createFloatingLoveNotes();
render();
