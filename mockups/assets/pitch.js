/*
 * Synthetic broadcast renderer for concept mockups.
 *
 * Draws a football pitch from a virtual "main camera" (pinhole projection) and
 * places stylised players from synthetic tracking coordinates. No real footage,
 * club marks or player likenesses are used. The same idea, a renderer driven by
 * synthetic tracking data, could become the project's "synthetic broadcast feed".
 *
 * World coordinates (metres):
 *   x in [0, 105] runs along the pitch, left to right on screen
 *   y in [0, 68]  runs across it, 0 = near touchline (closest to camera)
 *   z up
 */
(function (global) {
  const L = 105;
  const W = 68;
  const NS = 'http://www.w3.org/2000/svg';

  // ---------- small helpers ----------
  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const norm = (v) => { const l = Math.hypot(v[0], v[1], v[2]); return v.map((c) => c / l); };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

  // ---------- camera ----------
  function camera(opts) {
    const o = Object.assign({ pos: [60, -40, 24], target: [60, 30, 0], fov: 30, width: 1920, height: 1080 }, opts);
    const f = norm(sub(o.target, o.pos));
    const r = norm(cross(f, [0, 0, 1]));
    const u = cross(r, f);
    const focal = (o.height / 2) / Math.tan((o.fov * Math.PI) / 360);
    function project(x, y, z) {
      const d = sub([x, y, z || 0], o.pos);
      const X = dot(d, r), Y = dot(d, u), Z = dot(d, f);
      return { x: o.width / 2 + (focal * X) / Z, y: o.height / 2 - (focal * Y) / Z, depth: Z, ppm: focal / Z };
    }
    return { project, focal, opts: o };
  }

  function pts(cam, list, z) {
    return list.map((p) => { const q = cam.project(p[0], p[1], p.length > 2 ? p[2] : (z || 0)); return q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' ');
  }
  function arc(cx, cy, r, a0, a1, n) {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return out;
  }

  // ---------- default synthetic scene ----------
  // A line-breaking pass: Harbour City (blue, attacking right) vs Kingsmoor Athletic (red).
  const SCENES = {
    linebreak: {
      ball: [61.2, 32.4, 0.11],
      home: [
        { n: 1, x: 18, y: 34 }, { n: 2, x: 63, y: 7 }, { n: 5, x: 47, y: 25 }, { n: 4, x: 48, y: 44 },
        { n: 3, x: 62, y: 61 }, { n: 6, x: 60.3, y: 32.1 }, { n: 8, x: 69, y: 21 }, { n: 10, x: 75.5, y: 41 },
        { n: 7, x: 83, y: 9 }, { n: 9, x: 87, y: 31 }, { n: 11, x: 84, y: 57 }
      ],
      away: [
        { n: 1, x: 101.5, y: 34 }, { n: 2, x: 90, y: 53 }, { n: 5, x: 91, y: 39.5 }, { n: 6, x: 90.5, y: 27 },
        { n: 3, x: 89, y: 14 }, { n: 7, x: 80, y: 50 }, { n: 8, x: 79, y: 36.5 }, { n: 4, x: 78, y: 24 },
        { n: 11, x: 80, y: 11 }, { n: 9, x: 64.2, y: 29.6 }, { n: 10, x: 64, y: 41 }
      ],
      camera: { pos: [70, -30, 17], target: [71, 33, 0], fov: 24 }
    },
    shot: {
      ball: [90.5, 30.5, 0.4],
      home: [
        { n: 6, x: 66, y: 33 }, { n: 8, x: 78, y: 19 }, { n: 10, x: 84, y: 40 }, { n: 7, x: 93, y: 12 },
        { n: 9, x: 89.6, y: 31 }, { n: 11, x: 92, y: 52 }, { n: 2, x: 72, y: 6 }, { n: 3, x: 74, y: 60 }
      ],
      away: [
        { n: 1, x: 102.8, y: 33 }, { n: 2, x: 96, y: 45 }, { n: 5, x: 95.5, y: 36 }, { n: 6, x: 93, y: 28.5 },
        { n: 3, x: 96, y: 18 }, { n: 7, x: 88, y: 47 }, { n: 8, x: 86, y: 35 }, { n: 4, x: 85, y: 24 },
        { n: 11, x: 86, y: 13 }, { n: 9, x: 72, y: 30 }
      ],
      camera: { pos: [86, -28, 15], target: [89, 33, 0], fov: 24 }
    },
    press: {
      ball: [30.5, 18.2, 0.11],
      home: [
        { n: 1, x: 6, y: 34 }, { n: 5, x: 22, y: 26 }, { n: 4, x: 21, y: 43 }, { n: 2, x: 31, y: 17.6 },
        { n: 3, x: 30, y: 58 }, { n: 6, x: 37, y: 30 }, { n: 8, x: 42, y: 20 }, { n: 10, x: 45, y: 42 }
      ],
      away: [
        { n: 9, x: 28.5, y: 24 }, { n: 10, x: 33.5, y: 13.8 }, { n: 7, x: 34, y: 21.5 }, { n: 11, x: 35, y: 45 },
        { n: 8, x: 44, y: 28 }, { n: 4, x: 47, y: 15 }, { n: 2, x: 55, y: 48 }, { n: 5, x: 58, y: 30 }
      ],
      camera: { pos: [38, -30, 17], target: [39, 31, 0], fov: 24 }
    }
  };

  const KITS = {
    home: { shirt: '#2f6bff', shirt2: '#1d47c4', shorts: '#0e1a3a', socks: '#2f6bff', num: '#ffffff', gk: '#c8ff3d' },
    away: { shirt: '#e8434f', shirt2: '#b52d39', shorts: '#f4f1ea', socks: '#e8434f', num: '#ffffff', gk: '#9c8cff' }
  };
  const SKIN = ['#8d5a3b', '#c58c64', '#e6b48c', '#5b3a29', '#f0c9a5', '#a86f4b'];

  // ---------- broadcast view ----------
  function broadcast(svg, options) {
    const o = Object.assign({ scene: 'linebreak', seed: 7, boards: ['INSIDE THE GAME', 'SYNTHETIC LEAGUE', 'EXPLAINABLE MATCH INTELLIGENCE'], grade: 1 }, options);
    const scene = typeof o.scene === 'string' ? SCENES[o.scene] : o.scene;
    const cam = camera(Object.assign({}, scene.camera, o.camera || {}));
    const rand = rng(o.seed);
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('width', 1920);
    svg.setAttribute('height', 1080);

    const defs = el('defs', {}, svg);
    defs.innerHTML = `
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#05070d"/><stop offset="1" stop-color="#111829"/>
      </linearGradient>
      <linearGradient id="board" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#101a3a"/><stop offset="1" stop-color="#0a1128"/>
      </linearGradient>
      <radialGradient id="vignette" cx="50%" cy="55%" r="75%">
        <stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/>
      </radialGradient>
      <linearGradient id="grassShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000" stop-opacity="0.28"/><stop offset="0.45" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0.04"/>
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>`;

    // stands + crowd
    el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: 'url(#sky)' }, svg);
    const farEdge = cam.project(52.5, W + 7, 0).y;
    const crowd = el('g', { opacity: 0.9 }, svg);
    const crowdCols = ['#2a3352', '#323c5e', '#3d2c3d', '#24304a', '#4a4f66', '#1f2a44', '#3a4466', '#5a3340', '#2d4a73'];
    for (let row = 0; row < 46; row++) {
      const yy = farEdge - 34 - row * 6.2;
      if (yy < -10) break;
      const step = 7.5 - row * 0.03;
      for (let xx = -10 + (row % 2) * 3.5; xx < 1930; xx += step) {
        if (rand() < 0.12) continue;
        el('circle', { cx: (xx + rand() * 2).toFixed(1), cy: (yy + rand() * 2).toFixed(1), r: (2.1 + rand() * 0.9).toFixed(2), fill: crowdCols[Math.floor(rand() * crowdCols.length)] }, crowd);
      }
    }
    // a few tier lines in the stand
    for (let t = 1; t <= 3; t++) {
      const yy = farEdge - 34 - t * 78;
      el('rect', { x: 0, y: yy, width: 1920, height: 6, fill: '#0a0f1e', opacity: 0.85 }, svg);
    }

    // LED boards along the far side
    const b0 = cam.project(-15, W + 5, 0), b1 = cam.project(120, W + 5, 0), b2 = cam.project(120, W + 5, 0.95), b3 = cam.project(-15, W + 5, 0.95);
    el('polygon', { points: [b0, b1, b2, b3].map((p) => p.x + ',' + p.y).join(' '), fill: 'url(#board)' }, svg);
    el('line', { x1: b3.x, y1: b3.y, x2: b2.x, y2: b2.y, stroke: '#c8ff3d', 'stroke-opacity': 0.55, 'stroke-width': 2 }, svg);
    const boardH = b0.y - b3.y;
    const boardsG = el('g', {}, svg);
    let bx = 30, bi = 0;
    while (bx < 1920) {
      const label = o.boards[bi % o.boards.length];
      const t = el('text', { x: bx, y: b0.y - boardH * 0.28, fill: bi % 2 ? '#c8ff3d' : '#e9eefc', 'font-family': 'Barlow Condensed, Arial Narrow, sans-serif', 'font-weight': 700, 'font-size': (boardH * 0.62).toFixed(1), 'letter-spacing': 3 }, boardsG);
      t.textContent = label;
      bx += label.length * boardH * 0.36 + 80;
      bi++;
    }

    // surround (run-off) grass and mown stripes
    el('polygon', { points: pts(cam, [[-12, -8], [117, -8], [117, W + 5], [-12, W + 5]]), fill: '#1f5a2c' }, svg);
    const stripes = el('g', {}, svg);
    const n = 18;
    for (let i = 0; i < n; i++) {
      const x0 = (L / n) * i, x1 = (L / n) * (i + 1);
      el('polygon', { points: pts(cam, [[x0, -2], [x1, -2], [x1, W + 2], [x0, W + 2]]), fill: i % 2 ? '#2f7a3b' : '#357f40' }, stripes);
    }
    // subtle cross-mow
    for (let j = 0; j < 8; j++) {
      const y0 = (W / 8) * j, y1 = (W / 8) * (j + 1);
      if (j % 2) el('polygon', { points: pts(cam, [[-2, y0], [L + 2, y0], [L + 2, y1], [-2, y1]]), fill: '#ffffff', opacity: 0.025 }, stripes);
    }
    el('polygon', { points: pts(cam, [[-12, -8], [117, -8], [117, W + 5], [-12, W + 5]]), fill: 'url(#grassShade)' }, svg);

    // markings
    const lines = el('g', { fill: 'none', stroke: '#eef3ea', 'stroke-opacity': 0.88, 'stroke-width': 2.6, 'stroke-linejoin': 'round' }, svg);
    const poly = (list, closed) => el(closed ? 'polygon' : 'polyline', { points: pts(cam, list) }, lines);
    poly([[0, 0], [L, 0], [L, W], [0, W]], true);
    poly([[L / 2, 0], [L / 2, W]]);
    poly(arc(L / 2, W / 2, 9.15, 0, Math.PI * 2, 96), true);
    for (const side of [0, 1]) {
      const sx = side ? L : 0, d = side ? -1 : 1;
      poly([[sx, W / 2 - 20.16], [sx + d * 16.5, W / 2 - 20.16], [sx + d * 16.5, W / 2 + 20.16], [sx, W / 2 + 20.16]]);
      poly([[sx, W / 2 - 9.16], [sx + d * 5.5, W / 2 - 9.16], [sx + d * 5.5, W / 2 + 9.16], [sx, W / 2 + 9.16]]);
      const px = sx + d * 11;
      const a = Math.acos(5.5 / 9.15);
      poly(side ? arc(px, W / 2, 9.15, Math.PI - a, Math.PI + a, 32) : arc(px, W / 2, 9.15, -a, a, 32));
      const spot = cam.project(px, W / 2, 0);
      el('ellipse', { cx: spot.x, cy: spot.y, rx: 3, ry: 1.6, fill: '#eef3ea', stroke: 'none' }, svg);
      // goal frame
      const gz = 2.44, gy0 = W / 2 - 3.66, gy1 = W / 2 + 3.66, back = sx - d * 1.8;
      const goal = el('g', { fill: 'none', stroke: '#f7f9f5', 'stroke-width': 3.2 }, svg);
      el('polyline', { points: pts(cam, [[sx, gy0, 0], [sx, gy0, gz], [sx, gy1, gz], [sx, gy1, 0]]) }, goal);
      el('polygon', { points: pts(cam, [[sx, gy0, gz], [back, gy0, gz * 0.8], [back, gy1, gz * 0.8], [sx, gy1, gz]]), fill: '#ffffff', 'fill-opacity': 0.08, stroke: '#ffffff', 'stroke-opacity': 0.35, 'stroke-width': 1.2 }, goal);
    }
    const c = cam.project(L / 2, W / 2, 0);
    el('ellipse', { cx: c.x, cy: c.y, rx: 3, ry: 1.6, fill: '#eef3ea' }, svg);

    // layers for overlays drawn on the ground (under players) and players
    const ground = el('g', { class: 'ground' }, svg);
    const actors = el('g', { class: 'actors' }, svg);
    const over = el('g', { class: 'over' }, svg);

    // players
    const all = [];
    (scene.home || []).forEach((p, i) => all.push(Object.assign({ team: 'home', skin: SKIN[(i * 3) % SKIN.length] }, p)));
    (scene.away || []).forEach((p, i) => all.push(Object.assign({ team: 'away', skin: SKIN[(i * 5 + 2) % SKIN.length] }, p)));
    all.forEach((p) => { p.proj = cam.project(p.x, p.y, 0); });
    const ballDepth = cam.project(scene.ball[0], scene.ball[1], 0).depth;
    all.sort((a, b) => b.proj.depth - a.proj.depth);
    let ballDrawn = false;
    for (const p of all) {
      if (!ballDrawn && p.proj.depth < ballDepth) { drawBall(actors, cam, scene.ball); ballDrawn = true; }
      drawPlayer(actors, cam, p, o.dim && !o.dim.includes(p.team + p.n) ? 0.55 : 1);
    }
    if (!ballDrawn) drawBall(actors, cam, scene.ball);

    el('rect', { x: 0, y: 0, width: 1920, height: 1080, fill: 'url(#vignette)' }, svg);

    const api = {
      cam, scene, ground, over,
      player(team, n) { return all.find((p) => p.team === team && p.n === n); },
      head(team, n, extra) {
        const p = api.player(team, n);
        const q = cam.project(p.x, p.y, 2.05 + (extra || 0));
        return { x: q.x, y: q.y };
      },
      at(x, y, z) { const q = cam.project(x, y, z || 0); return { x: q.x, y: q.y }; },
      ring(x, y, r, color, width) {
        const g = el('g', { filter: 'url(#glow)' }, ground);
        el('polygon', { points: pts(cam, arc(x, y, r, 0, Math.PI * 2, 48)), fill: color, 'fill-opacity': 0.18, stroke: color, 'stroke-width': width || 3 }, g);
        return g;
      },
      zone(list, color, opacity, stroke) {
        return el('polygon', { points: pts(cam, list), fill: color, 'fill-opacity': opacity == null ? 0.2 : opacity, stroke: stroke || color, 'stroke-width': 2, 'stroke-dasharray': '10 8' }, ground);
      },
      line(list, color, width, dash) {
        return el('polyline', { points: pts(cam, list), fill: 'none', stroke: color, 'stroke-width': width || 3, 'stroke-dasharray': dash || '', 'stroke-linecap': 'round' }, ground);
      },
      // Curved ribbon arrow painted on the grass, sized in metres so it foreshortens correctly.
      arrow(from, to, opt) {
        const s = Object.assign({ color: '#c8ff3d', width: 0.9, bend: 0.12, head: 2.6, opacity: 0.95, layer: ground, glow: true }, opt);
        const dx = to[0] - from[0], dy = to[1] - from[1];
        const len = Math.hypot(dx, dy);
        const nx = -dy / len, ny = dx / len;
        const mid = [(from[0] + to[0]) / 2 + nx * len * s.bend, (from[1] + to[1]) / 2 + ny * len * s.bend];
        const N = 40, path = [];
        for (let i = 0; i <= N; i++) {
          const t = i / N;
          path.push([
            (1 - t) * (1 - t) * from[0] + 2 * (1 - t) * t * mid[0] + t * t * to[0],
            (1 - t) * (1 - t) * from[1] + 2 * (1 - t) * t * mid[1] + t * t * to[1]
          ]);
        }
        // trim the end for the head
        let acc = 0, cut = path.length - 1;
        for (let i = path.length - 1; i > 0; i--) {
          acc += Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]);
          if (acc >= s.head) { cut = i; break; }
        }
        const body = path.slice(0, cut + 1);
        const left = [], right = [];
        body.forEach((p, i) => {
          const a = body[Math.max(0, i - 1)], b = body[Math.min(body.length - 1, i + 1)];
          const tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.hypot(tx, ty) || 1;
          const w = (s.width / 2) * (0.55 + 0.45 * (i / body.length));
          left.push([p[0] - (ty / tl) * w, p[1] + (tx / tl) * w]);
          right.push([p[0] + (ty / tl) * w, p[1] - (tx / tl) * w]);
        });
        const g = el('g', s.glow ? { filter: 'url(#glow)' } : {}, s.layer);
        el('polygon', { points: pts(cam, left.concat(right.reverse())), fill: s.color, 'fill-opacity': s.opacity }, g);
        const tip = path[path.length - 1], base = path[cut];
        const tx = tip[0] - base[0], ty = tip[1] - base[1], tl = Math.hypot(tx, ty) || 1;
        const hw = s.width * 1.35;
        el('polygon', { points: pts(cam, [[base[0] - (ty / tl) * hw, base[1] + (tx / tl) * hw], tip, [base[0] + (ty / tl) * hw, base[1] - (tx / tl) * hw]]), fill: s.color, 'fill-opacity': s.opacity }, g);
        return g;
      }
    };
    return api;
  }

  function drawBall(parent, cam, b) {
    const g = cam.project(b[0], b[1], 0);
    const p = cam.project(b[0], b[1], b[2] || 0.11);
    const r = Math.max(4, 0.13 * p.ppm);
    el('ellipse', { cx: g.x + 2, cy: g.y + 1, rx: r * 1.1, ry: r * 0.45, fill: '#000', opacity: 0.35 }, parent);
    el('circle', { cx: p.x, cy: p.y - r * 0.2, r: r, fill: '#f8f8f4', stroke: '#1b1b1b', 'stroke-width': 1 }, parent);
    el('circle', { cx: p.x - r * 0.25, cy: p.y - r * 0.45, r: r * 0.35, fill: '#2a2a2a', opacity: 0.55 }, parent);
  }

  function drawPlayer(parent, cam, p, alpha) {
    const kit = KITS[p.team];
    const isGK = p.n === 1;
    const shirt = isGK ? kit.gk : kit.shirt;
    const s = p.proj;
    const H = 1.85 * s.ppm; // pixel height
    const g = el('g', { opacity: alpha }, parent);
    const x = s.x, y = s.y;
    // shadow (sun from top-left)
    el('ellipse', { cx: x + H * 0.16, cy: y + H * 0.015, rx: H * 0.26, ry: H * 0.06, fill: '#04140a', opacity: 0.45 }, g);
    const legW = H * 0.075, gap = H * 0.035;
    // socks + legs
    el('rect', { x: x - gap - legW, y: y - H * 0.30, width: legW, height: H * 0.30, rx: legW / 2, fill: kit.socks }, g);
    el('rect', { x: x + gap, y: y - H * 0.30, width: legW, height: H * 0.30, rx: legW / 2, fill: kit.socks }, g);
    el('rect', { x: x - gap - legW, y: y - H * 0.46, width: legW, height: H * 0.18, fill: p.skin }, g);
    el('rect', { x: x + gap, y: y - H * 0.46, width: legW, height: H * 0.18, fill: p.skin }, g);
    // boots
    el('ellipse', { cx: x - gap - legW / 2, cy: y - H * 0.01, rx: legW * 0.75, ry: legW * 0.38, fill: '#111' }, g);
    el('ellipse', { cx: x + gap + legW / 2, cy: y - H * 0.01, rx: legW * 0.75, ry: legW * 0.38, fill: '#111' }, g);
    // shorts
    el('rect', { x: x - H * 0.15, y: y - H * 0.58, width: H * 0.30, height: H * 0.15, rx: H * 0.03, fill: kit.shorts }, g);
    // arms
    el('rect', { x: x - H * 0.215, y: y - H * 0.84, width: H * 0.06, height: H * 0.30, rx: H * 0.03, fill: p.skin }, g);
    el('rect', { x: x + H * 0.155, y: y - H * 0.84, width: H * 0.06, height: H * 0.30, rx: H * 0.03, fill: p.skin }, g);
    el('rect', { x: x - H * 0.215, y: y - H * 0.86, width: H * 0.065, height: H * 0.12, rx: H * 0.03, fill: shirt }, g);
    el('rect', { x: x + H * 0.15, y: y - H * 0.86, width: H * 0.065, height: H * 0.12, rx: H * 0.03, fill: shirt }, g);
    // torso
    el('rect', { x: x - H * 0.165, y: y - H * 0.87, width: H * 0.33, height: H * 0.32, rx: H * 0.06, fill: shirt }, g);
    el('rect', { x: x - H * 0.165, y: y - H * 0.87, width: H * 0.11, height: H * 0.32, rx: H * 0.05, fill: '#000', opacity: 0.12 }, g);
    // head
    el('circle', { cx: x, cy: y - H * 0.94, r: H * 0.075, fill: p.skin }, g);
    el('path', { d: `M ${x - H * 0.075} ${y - H * 0.95} a ${H * 0.075} ${H * 0.075} 0 0 1 ${H * 0.15} 0 z`, fill: '#1a120c', opacity: 0.85 }, g);
    // number
    if (H > 34) {
      const t = el('text', { x: x, y: y - H * 0.66, 'text-anchor': 'middle', 'font-family': 'Barlow Condensed, Arial Narrow, sans-serif', 'font-weight': 700, 'font-size': (H * 0.16).toFixed(1), fill: isGK ? '#0b1124' : kit.num }, g);
      t.textContent = p.n;
    }
  }

  // ---------- top-down tactical pitch ----------
  function tactical(svg, options) {
    const o = Object.assign({ x: 0, y: 0, w: 840, h: 544, flip: false, lineColor: 'rgba(255,255,255,0.35)', grass: '#0f1d33', stripes: true, pad: 0 }, options);
    const g = el('g', { transform: `translate(${o.x},${o.y})` }, svg);
    const sx = (o.w - o.pad * 2) / L, sy = (o.h - o.pad * 2) / W;
    const P = (x, y) => [o.pad + (o.flip ? L - x : x) * sx, o.pad + (W - y) * sy];
    el('rect', { x: 0, y: 0, width: o.w, height: o.h, rx: 10, fill: o.grass }, g);
    if (o.stripes) for (let i = 0; i < 12; i++) if (i % 2) el('rect', { x: o.pad + (i * (o.w - 2 * o.pad)) / 12, y: o.pad, width: (o.w - 2 * o.pad) / 12, height: o.h - 2 * o.pad, fill: '#fff', opacity: 0.025 }, g);
    const lines = el('g', { fill: 'none', stroke: o.lineColor, 'stroke-width': 2 }, g);
    const path = (list, closed) => el(closed ? 'polygon' : 'polyline', { points: list.map((p) => P(p[0], p[1]).join(',')).join(' ') }, lines);
    path([[0, 0], [L, 0], [L, W], [0, W]], true);
    path([[L / 2, 0], [L / 2, W]]);
    path(arc(L / 2, W / 2, 9.15, 0, Math.PI * 2, 64), true);
    for (const side of [0, 1]) {
      const bx = side ? L : 0, d = side ? -1 : 1;
      path([[bx, W / 2 - 20.16], [bx + d * 16.5, W / 2 - 20.16], [bx + d * 16.5, W / 2 + 20.16], [bx, W / 2 + 20.16]]);
      path([[bx, W / 2 - 9.16], [bx + d * 5.5, W / 2 - 9.16], [bx + d * 5.5, W / 2 + 9.16], [bx, W / 2 + 9.16]]);
      const a = Math.acos(5.5 / 9.15);
      path(side ? arc(bx - 11, W / 2, 9.15, Math.PI - a, Math.PI + a, 24) : arc(11, W / 2, 9.15, -a, a, 24));
      path([[bx, W / 2 - 3.66], [bx - d * 1.5, W / 2 - 3.66], [bx - d * 1.5, W / 2 + 3.66], [bx, W / 2 + 3.66]]);
    }
    const layer = el('g', {}, g);
    const api = {
      g: layer, P, sx, sy,
      dot(x, y, fill, label, r, textFill) {
        const [px, py] = P(x, y);
        const c = el('g', {}, layer);
        el('circle', { cx: px, cy: py, r: r || 13, fill, stroke: 'rgba(0,0,0,0.35)', 'stroke-width': 2 }, c);
        if (label != null) {
          const t = el('text', { x: px, y: py + (r || 13) * 0.36, 'text-anchor': 'middle', 'font-family': 'Barlow Condensed, Arial Narrow, sans-serif', 'font-weight': 700, 'font-size': (r || 13) * 1.05, fill: textFill || '#fff' }, c);
          t.textContent = label;
        }
        return c;
      },
      arrow(from, to, color, width, dash, bend) {
        const [x1, y1] = P(from[0], from[1]), [x2, y2] = P(to[0], to[1]);
        const id = 'ah' + Math.random().toString(36).slice(2, 8);
        const d = el('defs', {}, layer);
        d.innerHTML = `<marker id="${id}" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${color}"/></marker>`;
        const mx = (x1 + x2) / 2 - (y2 - y1) * (bend || 0), my = (y1 + y2) / 2 + (x2 - x1) * (bend || 0);
        return el('path', { d: `M${x1},${y1} Q${mx},${my} ${x2},${y2}`, fill: 'none', stroke: color, 'stroke-width': width || 3, 'stroke-dasharray': dash || '', 'marker-end': `url(#${id})`, 'stroke-linecap': 'round' }, layer);
      },
      zone(list, color, opacity) {
        return el('polygon', { points: list.map((p) => P(p[0], p[1]).join(',')).join(' '), fill: color, 'fill-opacity': opacity == null ? 0.2 : opacity, stroke: color, 'stroke-width': 1.5, 'stroke-dasharray': '6 5' }, layer);
      },
      heat(points, color, seed) {
        const r = rng(seed || 3);
        const hg = el('g', { opacity: 0.85 }, layer);
        const fid = 'hb' + Math.random().toString(36).slice(2, 8);
        const d = el('defs', {}, layer);
        d.innerHTML = `<filter id="${fid}"><feGaussianBlur stdDeviation="${14 * Math.min(sx, sy) / 8}"/></filter>`;
        hg.setAttribute('filter', `url(#${fid})`);
        points.forEach(([x, y, k]) => {
          for (let i = 0; i < (k || 6); i++) {
            const [px, py] = P(x + (r() - 0.5) * 10, y + (r() - 0.5) * 8);
            el('circle', { cx: px, cy: py, r: (4 + r() * 4) * sx, fill: color, opacity: 0.22 }, hg);
          }
        });
        return hg;
      }
    };
    return api;
  }

  global.Pitch = { L, W, SCENES, KITS, camera, broadcast, tactical, el, rng };
})(window);
