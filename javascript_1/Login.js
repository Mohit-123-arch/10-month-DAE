// ── EmailJS Init ──
emailjs.init("NG0_nwcaKrYNZBb7Q");

let generatedOTP = null;
let pendingUser = {};

// ── Tab Switcher ──
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'signup' && i === 1));
  });
  document.getElementById('section-login').classList.toggle('active', tab === 'login');
  document.getElementById('section-signup').classList.toggle('active', tab === 'signup');
}

// ── Show Message ──
function showMsg(id, text, type) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = 'msg ' + type;
}

// ── Silo Games Intro Animation → Redirect ──
function playIntroThenRedirect() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: #050914;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Orbitron', sans-serif;
  `;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position: absolute; inset: 0;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const label = document.createElement('div');
  label.textContent = 'SILO GAMES';
  label.style.cssText = `
    position: relative; z-index: 2;
    font-size: clamp(2rem, 8vw, 5rem);
    font-weight: 900;
    color: #07e98f;
    letter-spacing: 0.18em;
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 0.6s ease, transform 0.6s ease;
    text-shadow: 0 0 40px #00FF00, 0 0 80px rgba(7,233,143,0.4);
  `;

  overlay.appendChild(canvas);
  overlay.appendChild(label);
  document.body.appendChild(overlay);

  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Phase 1: particles converge to center
  const PARTICLE_COUNT = 180;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 300 + Math.random() * 600;
    return {
      x: W / 2 + Math.cos(angle) * dist,
      y: H / 2 + Math.sin(angle) * dist,
      tx: W / 2 + (Math.random() - 0.5) * 120,
      ty: H / 2 + (Math.random() - 0.5) * 60,
      size: 1.5 + Math.random() * 3,
      speed: 0.04 + Math.random() * 0.04,
      color: Math.random() > 0.5 ? '#07e98f' : `rgba(7,233,143,${0.3 + Math.random() * 0.5})`,
      alpha: 0,
    };
  });

  let phase = 'converge';
  let phaseTimer = 0;
  let animId;
  let shatterParts = [];

  function spawnShatter() {
    const COLS = 20, ROWS = 14;
    const pw = W / COLS, ph = H / ROWS;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cx = c * pw + pw / 2, cy = r * ph + ph / 2;
        const angle = Math.atan2(cy - H / 2, cx - W / 2) + (Math.random() - 0.5) * 1.2;
        const speed = 3 + Math.random() * 6;
        shatterParts.push({
          x: cx, y: cy,
          w: pw - 1, h: ph - 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: 0, rotV: (Math.random() - 0.5) * 0.2,
          alpha: 0.7 + Math.random() * 0.3,
          color: `hsl(${145 + Math.random() * 20}, ${60 + Math.random() * 20}%, ${6 + Math.random() * 8}%)`
        });
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    phaseTimer++;

    if (phase === 'converge') {
      let allArrived = true;
      for (const p of particles) {
        p.alpha = Math.min(1, p.alpha + 0.04);
        p.x += (p.tx - p.x) * p.speed;
        p.y += (p.ty - p.y) * p.speed;
        const dx = p.x - p.tx, dy = p.y - p.ty;
        if (Math.sqrt(dx * dx + dy * dy) > 4) allArrived = false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (allArrived || phaseTimer > 90) {
        phase = 'reveal';
        phaseTimer = 0;
        label.style.opacity = '1';
        label.style.transform = 'scale(1)';
      }

    } else if (phase === 'reveal') {
      for (const p of particles) {
        p.alpha = Math.max(0, p.alpha - 0.015);
        p.x += (Math.random() - 0.5) * 1.5;
        p.y += (Math.random() - 0.5) * 1.5;
        if (p.alpha > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      if (phaseTimer > 90) {
        phase = 'shatter';
        phaseTimer = 0;
        label.style.opacity = '0';
        label.style.transform = 'scale(1.1)';
        spawnShatter();
      }

    } else if (phase === 'shatter') {
      let anyVisible = false;
      for (const p of shatterParts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.rot += p.rotV;
        p.alpha -= 0.025;
        if (p.alpha <= 0) continue;
        anyVisible = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (!anyVisible) {
        cancelAnimationFrame(animId);
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        setTimeout(() => { window.location.href = 'landingpage.html'; }, 300);
        return;
      }
    }

    animId = requestAnimationFrame(animate);
  }

  animate();
}

// ── Email Login ──
async function handleEmailLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) return showMsg('login-msg', 'Please fill in all fields', 'error');

  try {
    const cred = await window._signInWithEmailAndPassword(window._auth, email, password);
    localStorage.setItem('loggedInUser', JSON.stringify({
      email: cred.user.email,
      uid: cred.user.uid
    }));
    playIntroThenRedirect();
  } catch (e) {
    const msgs = {
      'auth/user-not-found': 'No account found with that email.',
      'auth/wrong-password': 'Wrong password.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/invalid-credential': 'Incorrect email or password.'
    };
    showMsg('login-msg', msgs[e.code] || 'Login failed. Please try again.', 'error');
  }
}

// ── Google Login / Signup ──
async function handleGoogleLogin() {
  try {
    const result = await window._signInWithPopup(window._auth, window._googleProvider);
    localStorage.setItem('loggedInUser', JSON.stringify({
      email: result.user.email,
      uid: result.user.uid,
      name: result.user.displayName
    }));
    playIntroThenRedirect();
  } catch (e) {
    showMsg('login-msg', 'Google sign-in failed. Please try again.', 'error');
  }
}

// ── Apple Login (placeholder) ──
function handleAppleLogin() {
  showMsg('login-msg', 'Apple sign-in coming soon!', 'error');
}

// ── Send OTP ──
async function handleSendOTP() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  if (!name || !email || !password) return showMsg('signup-msg', 'Please fill in all fields', 'error');
  if (password.length < 6) return showMsg('signup-msg', 'Password must be at least 6 characters', 'error');

  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  pendingUser = { name, email, password };

  try {
    await emailjs.send("service_sae8alu", "template_ytmsc9u", {
      to_name: name,
      to_email: email,
      code: generatedOTP
    });
    document.getElementById('otp-email-display').textContent = email;
    document.getElementById('signup-step1').style.display = 'none';
    document.getElementById('signup-step2').style.display = 'block';
  } catch (e) {
    showMsg('signup-msg', 'Failed to send verification email. Please try again.', 'error');
  }
}

// ── Verify OTP & Create Account ──
async function handleVerifyOTP() {
  const entered = document.getElementById('otp-input').value.trim();

  if (entered !== generatedOTP) return showMsg('otp-msg', 'Incorrect code. Please check your email.', 'error');

  try {
    const cred = await window._createUserWithEmailAndPassword(window._auth, pendingUser.email, pendingUser.password);
    localStorage.setItem('loggedInUser', JSON.stringify({
      email: cred.user.email,
      uid: cred.user.uid,
      name: pendingUser.name
    }));
    playIntroThenRedirect();
  } catch (e) {
    const msgs = {
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/invalid-email': 'Invalid email address.'
    };
    showMsg('otp-msg', msgs[e.code] || 'Account creation failed. Please try again.', 'error');
  }
}

// ── Back to Step 1 ──
function backToStep1(e) {
  if (e) e.preventDefault();
  document.getElementById('signup-step1').style.display = 'block';
  document.getElementById('signup-step2').style.display = 'none';
}