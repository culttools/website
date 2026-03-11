/* ═══════════════════════════════════════════════
   cult.tools — vibes management
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── CONFIG ─────────────────────────────────── */

  const BOOT_LINES = [
    { text: '', delay: 200 },
    { text: 'CULT.OS v0.1.0', delay: 60 },
    { text: '════════════════════════════════', delay: 30 },
    { text: '', delay: 150 },
    { text: '[■■■■■■■■■■] loading kernel...', delay: 50 },
    { text: '[■■■■■■■■■■] initializing vibes engine...', delay: 40 },
    { text: '[■■■■■■■■■■] mounting cultural protocols...', delay: 45 },
    { text: '[■■■■■■■■■■] syncing community nodes...', delay: 35 },
    { text: '[■■■■■■■■■■] starting window manager...', delay: 50 },
    { text: '', delay: 100 },
    { text: '> all systems nominal.', delay: 80 },
    { text: '> welcome to cult.tools', delay: 60 },
    { text: '', delay: 400 },
  ];

  const TERMINAL_COMMANDS = {
    help: () => [
      'available commands:',
      '',
      '  help        — show this message',
      '  about       — about cult.tools',
      '  projects    — list active projects',
      '  vibes       — check the vibes',
      '  whoami      — identity check',
      '  neofetch    — system info',
      '  fortune     — random wisdom',
      '  ls          — list directory',
      '  cat <file>  — read a file',
      '  ping        — test connection',
      '  date        — current date',
      '  matrix      — see the matrix',
      '  clear       — clear terminal',
      '  exit        — attempt exit',
      '',
    ],
    about: () => [
      'cult.tools — vibes management',
      '',
      'cultural tooling company building tech + community',
      'products. we design infrastructure for collective',
      'intelligence and community empowerment.',
      '',
      'areas: B2C, B2B',
      'visual identity by moood.cc',
      '',
    ],
    projects: () => [
      '┌─────────────────────────────────────┐',
      '│ # │ PROJECT           │ STATUS      │',
      '├─────────────────────────────────────┤',
      '│ 1 │ demofm.org        │ ● LIVE      │',
      '│ 2 │ upintheair.life   │ ● LIVE      │',
      '│ 3 │ ???               │ ○ PENDING   │',
      '└─────────────────────────────────────┘',
      '',
    ],
    vibes: () => {
      const vibes = [
        'vibes: ████████████████████ 100% — immaculate.',
        'vibes: ████████████████░░░░  80% — pretty good.',
        'vibes: █████████████████████ OVERFLOW — off the charts.',
        'vibes: ████████████████████ 100% — music is political infrastructure.',
        'vibes: ████████████████████ 100% — joy as resistance.',
        'vibes: ████████████████████ 100% — local signal over global noise.',
      ];
      return [vibes[Math.floor(Math.random() * vibes.length)], ''];
    },
    whoami: () => ['you are a cultural worker.', ''],
    ls: () => [
      'manifest.txt   projects/   readme.md',
      'signal         .vibes      .culture',
      '',
    ],
    cat: (args) => {
      const file = args[0];
      if (!file) return ['usage: cat <filename>', ''];
      const files = {
        'manifest.txt': [
          'cult.tools',
          '==========',
          'vibes management.',
          '',
          'tools built to adapt to your unique needs and goals.',
          'unlocking hidden synergies and fuelling collective intelligence.',
          '',
        ],
        'readme.md': [
          '# cult.tools',
          'cultural tooling for community infrastructure.',
          'visual identity by moood.cc',
          '',
        ],
        '.vibes': ['████████████████████ 100%', ''],
        '.culture': [
          'music is political infrastructure.',
          'local signal over global noise.',
          'joy as resistance.',
          'the airwaves belong to everyone.',
          '',
        ],
      };
      return files[file] || [`cat: ${file}: No such file or directory`, ''];
    },
    ping: () => [
      'PING cult.tools (127.0.0.1): 56 data bytes',
      '64 bytes: icmp_seq=0 ttl=64 time=0.042ms',
      '64 bytes: icmp_seq=1 ttl=64 time=vibes',
      '64 bytes: icmp_seq=2 ttl=64 time=immaculate',
      '',
      '--- cult.tools ping statistics ---',
      '3 packets transmitted, 3 vibes received, 0% loss',
      '',
    ],
    date: () => [new Date().toString(), ''],
    clear: () => '__CLEAR__',
    exit: () => ['there is no exit. only vibes.', ''],
    sudo: () => ['nice try.', ''],
    matrix: () => {
      const lines = [];
      for (let i = 0; i < 8; i++) {
        let line = '';
        for (let j = 0; j < 40; j++) {
          line += Math.random() > 0.5 ? String.fromCharCode(0x30A0 + Math.random() * 96) : ' ';
        }
        lines.push(line);
      }
      lines.push('');
      return lines;
    },
    fortune: () => {
      const fortunes = [
        '"the medium is the message" — marshall mcluhan',
        '"music is political infrastructure" — cult.tools',
        '"the airwaves belong to everyone" — demofm manifesto',
        '"joy as resistance" — the culture',
        '"tools shape the things they build" — unknown',
        '"community is technology" — cult.tools',
        '"local signal over global noise" — the philosophy',
      ];
      return [fortunes[Math.floor(Math.random() * fortunes.length)], ''];
    },
    neofetch: () => [
      '   ╭──────────╮',
      '   │  Cult     │       visitor@cult.tools',
      '   │  TOOLS    │       ──────────────────',
      '   ╰──────────╯       OS: CultOS v0.1.0',
      '                       Kernel: vibes-engine',
      '                       Shell: cult-sh 0.1',
      '                       Theme: dark [terminal]',
      '                       Resolution: ' + window.innerWidth + 'x' + window.innerHeight,
      '                       Uptime: since day one',
      '                       Packages: vibes, culture, joy',
      '',
    ],
  };

  /* ─── STATE ──────────────────────────────────── */

  let topZ = 100;
  let dragState = null;
  let commandHistory = [];
  let historyIndex = -1;

  /* ─── BOOT SEQUENCE ─────────────────────────── */

  async function runBoot() {
    const bootEl = document.getElementById('boot');
    const bootText = document.getElementById('boot-text');
    const bootCursor = document.getElementById('boot-cursor');

    for (const line of BOOT_LINES) {
      for (const char of line.text) {
        bootText.textContent += char;
        await sleep(line.delay / line.text.length);
      }
      bootText.textContent += '\n';
      await sleep(80);
    }

    bootCursor.style.display = 'none';
    await sleep(300);
    bootEl.classList.add('fade-out');

    await sleep(400);
    revealDesktop();

    await sleep(800);
    bootEl.remove();
  }

  function revealDesktop() {
    document.getElementById('desktop').classList.add('visible');
    document.getElementById('ticker').classList.add('visible');
    document.getElementById('dock').classList.add('visible');
    document.getElementById('crt-overlay').classList.add('active');

    document.querySelectorAll('.window:not(.hidden)').forEach((win, i) => {
      win.style.animationDelay = `${i * 0.15}s`;
    });
  }

  /* ─── PARTICLE SYSTEM ───────────────────────── */

  function initParticles() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    const PARTICLE_COUNT = 80;
    const CONNECT_DIST = 120;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const distMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const mouseFactor = Math.max(0, 1 - distMouse / 200);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + mouseFactor * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 77, 0, ${0.15 + mouseFactor * 0.4})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 77, 0, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    const mouseGlow = document.getElementById('mouse-glow');

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (mouseGlow) {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
      }
    }, { passive: true });
  }

  /* ─── WINDOW MANAGEMENT ─────────────────────── */

  function initWindowManager() {
    document.querySelectorAll('.window').forEach(initWindow);
  }

  function initWindow(win) {
    const titlebar = win.querySelector('.window-titlebar');
    const closeBtn = win.querySelector('.dot-close');
    const minBtn = win.querySelector('.dot-min');
    const maxBtn = win.querySelector('.dot-max');

    win.addEventListener('mousedown', () => bringToFront(win));

    if (titlebar) {
      titlebar.addEventListener('mousedown', (e) => startDrag(e, win));
      titlebar.addEventListener('touchstart', (e) => startDrag(e, win), { passive: false });
    }

    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeWindow(win); });
    if (minBtn) minBtn.addEventListener('click', (e) => { e.stopPropagation(); closeWindow(win); });
    if (maxBtn) maxBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMaximize(win); });

    titlebar.addEventListener('dblclick', () => toggleMaximize(win));
  }

  function bringToFront(win) {
    topZ++;
    win.style.zIndex = topZ;
  }

  function startDrag(e, win) {
    if (window.innerWidth <= 768) return;
    if (win.classList.contains('maximized')) return;

    e.preventDefault();
    const isTouch = e.type === 'touchstart';
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    const startY = isTouch ? e.touches[0].clientY : e.clientY;
    const rect = win.getBoundingClientRect();

    if (win.style.right && !win.style.left) {
      win.style.left = rect.left + 'px';
      win.style.right = 'auto';
    }

    dragState = {
      win,
      offsetX: startX - rect.left,
      offsetY: startY - rect.top,
    };

    bringToFront(win);
    document.body.classList.add('dragging');
  }

  function onDragMove(e) {
    if (!dragState) return;
    const isTouch = e.type === 'touchmove';
    const x = isTouch ? e.touches[0].clientX : e.clientX;
    const y = isTouch ? e.touches[0].clientY : e.clientY;

    dragState.win.style.left = (x - dragState.offsetX) + 'px';
    dragState.win.style.top = (y - dragState.offsetY) + 'px';
    dragState.win.style.right = 'auto';
    dragState.win.style.transform = 'none';
  }

  function onDragEnd() {
    if (!dragState) return;
    dragState = null;
    document.body.classList.remove('dragging');
  }

  document.addEventListener('mousemove', onDragMove, { passive: true });
  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd);

  function closeWindow(win) {
    const name = win.dataset.window;
    win.classList.add('closing');
    const dockItem = document.querySelector(`.dock-item[data-target="${name}"]`);
    if (dockItem) dockItem.classList.remove('active');

    setTimeout(() => {
      win.classList.add('hidden');
      win.classList.remove('closing');
    }, 250);
  }

  function openWindow(name) {
    const win = document.getElementById(`win-${name}`);
    if (!win) return;

    win.classList.remove('hidden', 'closing');
    win.style.animation = 'none';
    win.offsetHeight; // force reflow
    win.style.animation = '';

    bringToFront(win);

    const dockItem = document.querySelector(`.dock-item[data-target="${name}"]`);
    if (dockItem) dockItem.classList.add('active');

    if (name === 'terminal') {
      setTimeout(() => {
        document.getElementById('terminal-input').focus();
      }, 100);
    }
  }

  function toggleMaximize(win) {
    win.classList.toggle('maximized');
  }

  /* ─── DOCK ──────────────────────────────────── */

  function initDock() {
    document.querySelectorAll('.dock-item[data-target]').forEach((item) => {
      item.addEventListener('click', () => {
        const target = item.dataset.target;
        const win = document.getElementById(`win-${target}`);
        if (!win) return;

        if (win.classList.contains('hidden')) {
          openWindow(target);
        } else {
          bringToFront(win);
          win.classList.add('glitch');
          setTimeout(() => win.classList.remove('glitch'), 300);
        }
      });
    });

    const crtToggle = document.getElementById('crt-toggle');
    crtToggle.addEventListener('click', () => {
      crtToggle.classList.toggle('active');
      document.getElementById('crt-overlay').classList.toggle('active');
    });
  }

  /* ─── TERMINAL ──────────────────────────────── */

  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        input.value = '';

        if (cmd) {
          commandHistory.unshift(cmd);
          historyIndex = -1;
        }

        appendTermLine(`visitor@cult.tools ~ % ${cmd}`, 'dim');
        processCommand(cmd);
        output.scrollTop = output.scrollHeight;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = -1;
          input.value = '';
        }
      }
    });
  }

  function processCommand(input) {
    if (!input) return;

    const parts = input.toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    const handler = TERMINAL_COMMANDS[cmd];
    if (!handler) {
      appendTermLine(`command not found: ${cmd}. type 'help' for commands.`, 'accent');
      appendTermLine('');
      return;
    }

    const result = handler(args);

    if (result === '__CLEAR__') {
      document.getElementById('terminal-output').innerHTML = '';
      return;
    }

    if (Array.isArray(result)) {
      result.forEach((line) => appendTermLine(line));
    }
  }

  function appendTermLine(text, className) {
    const div = document.createElement('div');
    div.className = 'term-line' + (className ? ` ${className}` : '');
    div.textContent = text;
    document.getElementById('terminal-output').appendChild(div);
  }

  /* ─── CLOCK ─────────────────────────────────── */

  function initClock() {
    function update() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      document.getElementById('dock-clock').textContent = `${h}:${m}`;
    }
    update();
    setInterval(update, 10000);
  }

  /* ─── KEYBOARD SHORTCUTS ────────────────────── */

  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case '1': e.preventDefault(); toggleWindow('manifest'); break;
          case '2': e.preventDefault(); toggleWindow('projects'); break;
          case '3': e.preventDefault(); toggleWindow('terminal'); break;
          case '4': e.preventDefault(); toggleWindow('signal'); break;
          case '5': e.preventDefault(); toggleWindow('readme'); break;
        }
      }
    });
  }

  function toggleWindow(name) {
    const win = document.getElementById(`win-${name}`);
    if (!win) return;
    if (win.classList.contains('hidden')) {
      openWindow(name);
    } else {
      closeWindow(win);
    }
  }

  /* ─── UTILS ─────────────────────────────────── */

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  /* ─── INIT ──────────────────────────────────── */

  async function init() {
    initParticles();
    initClock();
    initDock();
    initTerminal();
    initWindowManager();
    initKeyboard();
    await runBoot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
