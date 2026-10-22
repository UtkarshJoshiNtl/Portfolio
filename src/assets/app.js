/* --------------------------------------------------------------------------
   The plates.

   Every work has a canvas. The canvas does not loop a decorative animation:
   it shows what the work actually does. S-Stream moves like a fluid, warpx
   pushes its particles with a Boris integrator, CTorrent moves pieces between
   peers, Versus races two spatial-index engines against each other.

   One rAF loop drives every plate on the page. Plates that scroll out of view
   are paused by an IntersectionObserver, and prefers-reduced-motion freezes
   the whole thing on a single frame.

   Behaviour lives in ART. Each entry is a factory:

       ART[name](ctx, w, h, opts) -> { frame(ctx, w, h, dt, t) }

   where opts carries the hue the work was assigned and the seed, so a given
   work always looks like itself.
   -------------------------------------------------------------------------- */

(function () {
  "use strict";

  var REDUCED =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- small helpers ----------------------------------------------------- */

  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hash(x, y, s) {
    var h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + s * 1013904223) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  function noise(x, y, s) {
    var xi = Math.floor(x);
    var yi = Math.floor(y);
    var xf = x - xi;
    var yf = y - yi;
    var u = xf * xf * (3 - 2 * xf);
    var v = yf * yf * (3 - 2 * yf);
    var a = hash(xi, yi, s);
    var b = hash(xi + 1, yi, s);
    var c = hash(xi, yi + 1, s);
    var d = hash(xi + 1, yi + 1, s);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  }

  function palette(hue) {
    var h = ((hue % 360) + 360) % 360;
    return {
      base: "hsl(" + h.toFixed(0) + ", 72%, 61%)",
      mid: "hsl(" + ((h + 28) % 360).toFixed(0) + ", 56%, 46%)",
      deep: "hsl(" + h.toFixed(0) + ", 38%, 22%)",
      hot: "hsl(" + ((h + 46) % 360).toFixed(0) + ", 92%, 71%)",
      ink: "hsl(" + h.toFixed(0) + ", 30%, 92%)"
    };
  }

  function rgba(hexless, alpha) {
    return hexless.replace("hsl(", "hsla(").replace(")", ", " + alpha + ")");
  }

  // HSL to RGB, so a ramp can be built between two colours of one hue.
  function hsl2rgb(h, s, l) {
    s /= 100;
    l /= 100;
    var k = function (n) {
      return (n + h / 30) % 12;
    };
    var a = s * Math.min(l, 1 - l);
    var f = function (n) {
      return l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
    };
    return [f(0), f(8), f(4)];
  }

  function mono(size, weight) {
    return (
      (weight || 400) +
      " " +
      size +
      'px ui-monospace, "SF Mono", "DejaVu Sans Mono", "Roboto Mono", monospace'
    );
  }

  /* =========================================================================
     knot — the hero.

     A trefoil, turned in space. The projection is the same one from the
     SVG the profile repo renders: x = sin t + 2 sin 2t, and so on.
     ====================================================================== */

  function knot(ctx, w, h, o) {
    var N = 220;
    var pts = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      var t = (i / N) * Math.PI * 2;
      pts[i * 3] = Math.sin(t) + 2 * Math.sin(2 * t);
      pts[i * 3 + 1] = Math.cos(t) - 2 * Math.cos(2 * t);
      pts[i * 3 + 2] = -Math.sin(3 * t);
    }
    var p = palette(o.hue);
    var S = Math.min(w, h) * 0.19;

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        var ax = 0.42;
        var ay = -0.5 + Math.sin(time * 0.11) * 0.28;
        var ca = Math.cos(ax),
          sa = Math.sin(ax);
        var cb = Math.cos(ay),
          sb = Math.sin(ay);

        var xs = new Float32Array(N);
        var ys = new Float32Array(N);
        var zs = new Float32Array(N);
        for (var i = 0; i < N; i++) {
          var x = pts[i * 3],
            y = pts[i * 3 + 1],
            z = pts[i * 3 + 2];
          // rotate about X, then about Y
          var y1 = y * ca - z * sa;
          var z1 = y * sa + z * ca;
          var x2 = x * cb + z1 * sb;
          var z2 = -x * sb + z1 * cb;
          xs[i] = x2 * S + W / 2;
          ys[i] = y1 * S + H / 2;
          zs[i] = z2;
        }

        c.globalCompositeOperation = "lighter";
        var passes = [
          [15, 0.05, p.deep],
          [6.5, 0.13, p.mid],
          [2.4, 0.85, p.base],
          [1, 1, p.ink]
        ];
        for (var k = 0; k < passes.length; k++) {
          c.beginPath();
          c.lineWidth = passes[k][0];
          c.strokeStyle = rgba(passes[k][2], passes[k][1]);
          c.lineJoin = "round";
          c.lineCap = "round";
          for (var j = 0; j < N; j++) {
            if (j === 0) c.moveTo(xs[0], ys[0]);
            else c.lineTo(xs[j], ys[j]);
          }
          c.closePath();
          c.stroke();
        }

        // Depth: the far half of the knot is dimmer, so it reads as a solid.
        c.globalCompositeOperation = "source-atop";
        var grad = c.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, "rgba(8,8,8,0.42)");
        grad.addColorStop(0.5, "rgba(8,8,8,0)");
        grad.addColorStop(1, "rgba(8,8,8,0.42)");
        c.fillStyle = grad;
        c.fillRect(0, 0, W, H);
        c.globalCompositeOperation = "source-over";
      }
    };
  }

  /* =========================================================================
     flow — S-Stream.

     Particles advected along a divergence-free field, so they swirl past each
     other the way a fluid does and never pile up. The field is the curl of a
     scalar potential, which is what makes it incompressible.
     ====================================================================== */

  function flow(ctx, w, h, o) {
    var rand = rng(o.seed);
    var COUNT = 340;
    var ps = [];
    for (var i = 0; i < COUNT; i++) {
      ps.push({
        x: rand(),
        y: rand(),
        px: 0,
        py: 0,
        life: rand() * 260,
        speed: 0.0009 + rand() * 0.0016
      });
    }
    var p = palette(o.hue);
    var s = o.seed;

    function potential(x, y) {
      return noise(x * 2.2, y * 2.2, s) + 0.55 * noise(x * 5.1, y * 5.1, s + 31);
    }

    function curl(x, y, e) {
      var dpdy = (potential(x, y + e) - potential(x, y - e)) / (2 * e);
      var dpdx = (potential(x + e, y) - potential(x - e, y)) / (2 * e);
      return [dpdy, -dpdx];
    }

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "rgba(8,8,8,0.09)";
        c.fillRect(0, 0, W, H);

        c.globalCompositeOperation = "lighter";
        c.lineCap = "round";
        for (var i = 0; i < COUNT; i++) {
          var q = ps[i];
          q.px = q.x;
          q.py = q.y;
          var v = curl(q.x * 3.4, q.y * 3.4, 0.012);
          q.x += v[0] * q.speed * dt * 60;
          q.y += v[1] * q.speed * dt * 60;
          q.life -= 1;

          if (q.life < 0 || q.x < -0.05 || q.x > 1.05 || q.y < -0.05 || q.y > 1.05) {
            q.x = rand();
            q.y = rand();
            q.px = q.x;
            q.py = q.y;
            q.life = 120 + rand() * 260;
            continue;
          }

          var a = Math.min(1, q.life / 200);
          // A wide, faint pass under a narrow bright one: a streak of fluid.
          c.strokeStyle = rgba(p.base, a * 0.14);
          c.lineWidth = 3.4;
          c.beginPath();
          c.moveTo(q.px * W, q.py * H);
          c.lineTo(q.x * W, q.y * H);
          c.stroke();

          c.strokeStyle = rgba(p.base, a * 0.72);
          c.lineWidth = 1.15;
          c.beginPath();
          c.moveTo(q.px * W, q.py * H);
          c.lineTo(q.x * W, q.y * H);
          c.stroke();
        }
        c.globalCompositeOperation = "source-over";
      }
    };
  }

  /* =========================================================================
     ca — Simulation Zoo.

     Gray-Scott reaction-diffusion on a grid. The coral does not know it is
     being simulated; it is just two chemicals eating each other.
     ====================================================================== */

  function ca(ctx, w, h, o) {
    var COLS = 168;
    var ROWS = Math.max(40, Math.round((COLS * h) / Math.max(1, w)));
    var A = new Float32Array(COLS * ROWS);
    var B = new Float32Array(COLS * ROWS);
    var A2 = new Float32Array(COLS * ROWS);
    var B2 = new Float32Array(COLS * ROWS);

    var rand = rng(o.seed);
    function seed() {
      for (var i = 0; i < COLS * ROWS; i++) {
        A[i] = 1;
        B[i] = 0;
      }
      for (var b = 0; b < 14; b++) {
        var cx = (rand() * COLS) | 0;
        var cy = (rand() * ROWS) | 0;
        for (var dy = -3; dy <= 3; dy++)
          for (var dx = -3; dx <= 3; dx++) {
            var xx = (cx + dx + COLS) % COLS;
            var yy = (cy + dy + ROWS) % ROWS;
            B[yy * COLS + xx] = 0.9;
            A[yy * COLS + xx] = 0.4;
          }
      }
    }
    seed();

    var off = document.createElement("canvas");
    off.width = COLS;
    off.height = ROWS;
    var octx = off.getContext("2d");
    var img = octx.createImageData(COLS, ROWS);

    // The ramp: a near-black ground, through the work's own colour, to the
    // hot end. The plate is a dark room with something growing in it.
    var ground = hsl2rgb(o.hue, 44, 4);
    var mid = hsl2rgb(o.hue + 14, 74, 30);
    var tip = hsl2rgb(o.hue + 46, 92, 62);

    function mix(a, b, t) {
      return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t
      ];
    }

    // Regimes of the reaction, so the coral keeps changing character.
    var regimes = [
      { f: 0.037, k: 0.06 },
      { f: 0.026, k: 0.051 },
      { f: 0.042, k: 0.061 }
    ];
    var reg = 0;
    var timer = 0;

    return {
      frame: function (c, W, H, dt, time) {
        timer += dt;
        if (timer > 11) {
          timer = 0;
          reg = (reg + 1) % regimes.length;
          seed();
        }
        var F = regimes[reg].f;
        var K = regimes[reg].k;

        var steps = 1;
        for (var s = 0; s < steps; s++) {
          for (var y = 0; y < ROWS; y++) {
            var ym = ((y - 1 + ROWS) % ROWS) * COLS;
            var yp = ((y + 1) % ROWS) * COLS;
            var yc = y * COLS;
            for (var x = 0; x < COLS; x++) {
              var xm = (x - 1 + COLS) % COLS;
              var xp = (x + 1) % COLS;
              var i = yc + x;
              var a = A[i];
              var bb = B[i];
              var la =
                A[yc + xm] + A[yc + xp] + A[ym + x] + A[yp + x] - 4 * a;
              var lb =
                B[yc + xm] + B[yc + xp] + B[ym + x] + B[yp + x] - 4 * bb;
              var na = a + (0.16 * la - a * bb * bb + F * (1 - a));
              var nb = bb + (0.08 * lb + a * bb * bb - (K + F) * bb);
              A2[i] = na < 0 ? 0 : na > 1 ? 1 : na;
              B2[i] = nb < 0 ? 0 : nb > 1 ? 1 : nb;
            }
          }
          var tA = A;
          A = A2;
          A2 = tA;
          var tB = B;
          B = B2;
          B2 = tB;
        }

        // Map concentration to the plate.
        var d = img.data;
        for (var j = 0; j < COLS * ROWS; j++) {
          var v = B[j];
          // A threshold, so the pattern reads as separate colonies rather
          // than a wash, and a ramp from the ground up to the hot end.
          var t = v < 0.24 ? 0 : Math.min(1, (v - 0.24) / 0.22);
          var col = t < 0.5 ? mix(ground, mid, t * 2) : mix(mid, tip, (t - 0.5) * 2);
          var idx = j * 4;
          d[idx] = col[0] * 255;
          d[idx + 1] = col[1] * 255;
          d[idx + 2] = col[2] * 255;
          d[idx + 3] = 255;
        }
        octx.putImageData(img, 0, 0);

        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);
        c.imageSmoothingEnabled = true;
        c.imageSmoothingQuality = "high";
        c.drawImage(off, 0, 0, W, H);
      }
    };
  }

  /* =========================================================================
     lattice — BadType.

     A type lattice. A judgement starts at a node and propagates along the
     edges; two of the nodes are wrong, and they glow wrong.
     ====================================================================== */

  function lattice(ctx, w, h, o) {
    var LAYERS = 6;
    var PER = 5;
    var rand = rng(o.seed);
    var p = palette(o.hue);

    var nodes = [];
    for (var L = 0; L < LAYERS; L++) {
      for (var i = 0; i < PER; i++) {
        nodes.push({
          layer: L,
          slot: i,
          x: 0,
          y: 0,
          charge: 0,
          bad: rand() < 0.12,
          children: []
        });
      }
    }
    for (var n = 0; n < nodes.length; n++) {
      var nd = nodes[n];
      if (nd.layer === LAYERS - 1) continue;
      for (var c = 0; c < PER; c++) {
        if (rand() < 0.45) continue;
        var t = (nd.layer + 1) * PER + c;
        if (t < nodes.length) nd.children.push(t);
      }
    }
    var byLayer = [];
    for (var q = 0; q < nodes.length; q++) {
      (byLayer[nodes[q].layer] = byLayer[nodes[q].layer] || []).push(q);
    }

    var source = -1;
    var next = 1.4;

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        var pad = 30;
        for (var i = 0; i < nodes.length; i++) {
          var nd = nodes[i];
          nd.x = pad + (nd.layer / (LAYERS - 1)) * (W - pad * 2);
          var col = byLayer[nd.layer];
          nd.y = H / 2 + (nd.slot - (col.length - 1) / 2) * ((H - pad * 2) / PER);
        }

        next -= dt;
        if (next <= 0) {
          next = 1.5 + rand() * 1.2;
          var l0 = byLayer[0];
          source = l0[(rand() * l0.length) | 0];
          nodes[source].charge = 1;
        }

        for (var k = 0; k < nodes.length; k++) {
          var node = nodes[k];
          node.charge *= 0.965;
          if (node.charge > 0.42) {
            for (var ci = 0; ci < node.children.length; ci++) {
              var ch = nodes[node.children[ci]];
              if (ch.charge < node.charge * 0.85) ch.charge = node.charge * 0.85;
            }
          }
        }

        // The lattice is always there; the judgement is what travels over it.
        c.globalCompositeOperation = "source-over";
        c.strokeStyle = "rgba(236,235,231,0.13)";
        c.lineWidth = 1;
        for (var s = 0; s < nodes.length; s++) {
          var sa = nodes[s];
          for (var sj = 0; sj < sa.children.length; sj++) {
            var sb = nodes[sa.children[sj]];
            c.beginPath();
            c.moveTo(sa.x, sa.y);
            c.lineTo(sb.x, sb.y);
            c.stroke();
          }
        }

        c.globalCompositeOperation = "lighter";
        c.lineCap = "round";
        for (var e = 0; e < nodes.length; e++) {
          var a = nodes[e];
          for (var j = 0; j < a.children.length; j++) {
            var b = nodes[a.children[j]];
            var lit = Math.min(a.charge, b.charge);
            if (lit < 0.05) continue;
            c.strokeStyle = rgba(a.bad || b.bad ? p.hot : p.base, lit * 0.85);
            c.lineWidth = 0.6 + lit * 2;
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
          }
        }

        for (var m = 0; m < nodes.length; m++) {
          var nd2 = nodes[m];
          var lit2 = nd2.charge;
          var col2 = nd2.bad ? p.hot : p.base;
          if (lit2 > 0.05) {
            c.fillStyle = rgba(col2, 0.26 * lit2);
            c.beginPath();
            c.arc(nd2.x, nd2.y, 14, 0, Math.PI * 2);
            c.fill();
          }
          c.fillStyle = rgba(col2, 0.7 + lit2 * 0.3);
          c.fillRect(nd2.x - 2.8, nd2.y - 2.8, 5.6, 5.6);
        }
        c.globalCompositeOperation = "source-over";
      }
    };
  }

  /* =========================================================================
     lissajous — noether.

     Closed orbits in phase space. Harmonics of a base frequency, so every
     curve closes; the phases drift, so the orbits breathe without ever
     opening. The energy stays bounded. That is the whole claim of the paper.
     ====================================================================== */

  function lissajous(ctx, w, h, o) {
    var rand = rng(o.seed);
    var p = palette(o.hue);
    var orbits = [];
    for (var i = 0; i < 3; i++) {
      var harm = [];
      var count = 3 + ((rand() * 2) | 0);
      for (var k = 0; k < count; k++) {
        harm.push({
          k: k + 1,
          a: 0.5 / (k + 1) + rand() * 0.2,
          p: rand() * Math.PI * 2,
          d: (rand() - 0.5) * 0.05
        });
      }
      orbits.push({
        harm: harm,
        w: 0.5 + rand() * 0.7,
        scale: 0.24 + rand() * 0.12,
        marker: rand(),
        hue: rand()
      });
    }

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        var cx = W / 2;
        var cy = H / 2;
        var R = Math.min(W, H) * 0.42;

        // The bounded envelope the orbits live inside.
        c.globalCompositeOperation = "lighter";
        c.strokeStyle = rgba(p.deep, 0.85);
        c.lineWidth = 1;
        c.beginPath();
        c.arc(cx, cy, R, 0, Math.PI * 2);
        c.stroke();
        c.strokeStyle = rgba(p.deep, 0.35);
        c.beginPath();
        c.arc(cx, cy, R * 0.55, 0, Math.PI * 2);
        c.stroke();

        for (var oi = 0; oi < orbits.length; oi++) {
          var ob = orbits[oi];
          ob.marker = (ob.marker + dt * ob.w * 0.11) % 1;
          var col = oi === 0 ? p.base : oi === 1 ? p.mid : p.hot;
          var N = 200;
          var mx = 0;
          var my = 0;
          var mi = -1;
          c.beginPath();
          for (var i = 0; i <= N; i++) {
            var t = (i / N) * Math.PI * 2;
            var x = 0,
              y = 0;
            for (var hi = 0; hi < ob.harm.length; hi++) {
              var hm = ob.harm[hi];
              var ph = hm.p + time * hm.d * ob.w;
              x += hm.a * Math.sin(hm.k * ob.w * t + ph);
              y += hm.a * Math.cos(hm.k * ob.w * t + ph * 1.31);
            }
            var px = cx + x * ob.scale * R * 1.6;
            var py = cy + y * ob.scale * R * 1.6;
            if (i === 0) c.moveTo(px, py);
            else c.lineTo(px, py);
            var d = Math.abs(t / (Math.PI * 2) - ob.marker);
            if (d > 0.5) d = 1 - d;
            if (d < 0.01) {
              mx = px;
              my = py;
              mi = i;
            }
          }
          c.strokeStyle = rgba(col, 0.95);
          c.lineWidth = 1.8;
          c.stroke();

          // A soft pass under the line, so the orbit glows.
          c.strokeStyle = rgba(col, 0.14);
          c.lineWidth = 5;
          c.stroke();

          if (mi >= 0) {
            c.fillStyle = rgba(p.ink, 0.95);
            c.beginPath();
            c.arc(mx, my, 3, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = rgba(col, 0.24);
            c.beginPath();
            c.arc(mx, my, 10, 0, Math.PI * 2);
            c.fill();
          }
        }

        // Energy: a bounded needle, the thing symplectic integrators protect.
        var amp = 0.5 + 0.32 * Math.sin(time * 0.42);
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "rgba(8,8,8,0.85)";
        c.fillRect(cx - R, H - 26, R * 2, 3);
        c.fillStyle = rgba(p.hot, 0.9);
        c.fillRect(cx - R, H - 26, R * 2 * amp, 3);
        c.fillStyle = rgba(p.deep, 0.9);
        c.fillRect(cx - R, H - 27, R * 2, 1);

        c.globalCompositeOperation = "source-over";
      }
    };
  }

  /* =========================================================================
     fault — seams.

     Work moving across a grid, and a band of the grid that is slow. The work
     piles up behind the seam exactly the way a straggler stalls a job.
     ====================================================================== */

  function fault(ctx, w, h, o) {
    var COLS = 46;
    var ROWS = 26;
    var rand = rng(o.seed);
    var p = palette(o.hue);

    var seamAt = 0.58;
    var band = 0.075;

    var workers = [];
    for (var i = 0; i < 46; i++) {
      workers.push({
        x: rand(),
        y: rand(),
        v: 0.00042 + rand() * 0.0003,
        stuck: 0
      });
    }

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        // The seam itself.
        var sx = seamAt * W;
        var sw = band * W;
        var g = c.createLinearGradient(sx - sw, 0, sx + sw, 0);
        g.addColorStop(0, "rgba(150,70,60,0)");
        g.addColorStop(0.5, "rgba(170,80,66,0.16)");
        g.addColorStop(1, "rgba(150,70,60,0)");
        c.fillStyle = g;
        c.fillRect(sx - sw, 0, sw * 2, H);

        c.globalCompositeOperation = "lighter";

        // The lattice of nodes.
        for (var y = 0; y < ROWS; y++) {
          for (var x = 0; x < COLS; x++) {
            var fx = x / (COLS - 1);
            var inSeam = Math.abs(fx - seamAt) < band;
            var tw = 0.5 + 0.5 * Math.sin(time * 1.1 + x * 0.42 + y * 0.77);
            c.fillStyle = inSeam
              ? "rgba(206,102,84," + (0.22 + tw * 0.28).toFixed(3) + ")"
              : rgba(p.mid, 0.3 + tw * 0.42);
            c.fillRect((x / COLS) * W + 1, (y / ROWS) * H + 1, 2, 2);
          }
        }

        for (var k = 0; k < workers.length; k++) {
          var wk = workers[k];
          var inB = Math.abs(wk.x - seamAt) < band;
          if (inB) {
            wk.stuck += dt;
            wk.x += wk.v * dt * 60 * 0.09;
          } else {
            if (wk.stuck > 0) wk.stuck = Math.max(0, wk.stuck - dt * 0.8);
            wk.x += wk.v * dt * 60;
          }
          if (wk.x > 1.05) {
            wk.x = -0.05;
            wk.y = rand();
            wk.stuck = 0;
          }
          var px = wk.x * W;
          var py = wk.y * H;
          var heat = Math.min(1, wk.stuck * 1.8);
          c.fillStyle = rgba(heat > 0.15 ? p.hot : p.base, 0.62 + heat * 0.38);
          c.beginPath();
          c.arc(px, py, 2.3 + heat * 1.8, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = rgba(heat > 0.15 ? p.hot : p.base, 0.1 + heat * 0.12);
          c.beginPath();
          c.arc(px, py, 6 + heat * 6, 0, Math.PI * 2);
          c.fill();
        }
        c.globalCompositeOperation = "source-over";
      }
    };
  }

  /* =========================================================================
     peers — CTorrent.

     A swarm of peers holding pieces of the same file. Pieces move between
     peers that want what others have; when enough peers hold a piece it is
     complete and flashes.
     ====================================================================== */

  function peers(ctx, w, h, o) {
    var rand = rng(o.seed);
    var p = palette(o.hue);
    var N = 15;
    var PIECES = 9;

    var nodes = [];
    for (var i = 0; i < N; i++) {
      nodes.push({
        x: 0.08 + rand() * 0.84,
        y: 0.12 + rand() * 0.76,
        has: {},
        flash: 0
      });
    }
    var packets = [];
    var complete = [];

    for (var q = 0; q < N; q++) {
      var seedPiece = (rand() * PIECES) | 0;
      nodes[q].has[seedPiece] = true;
    }

    var cool = 0;

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        cool -= dt;
        if (cool <= 0) {
          cool = 0.12 + rand() * 0.22;
          // Find a peer that has a piece another peer lacks.
          for (var tries = 0; tries < 12; tries++) {
            var from = (rand() * N) | 0;
            var to = (rand() * N) | 0;
            if (from === to) continue;
            var keys = Object.keys(nodes[from].has);
            if (!keys.length) continue;
            var piece = keys[(rand() * keys.length) | 0];
            if (nodes[to].has[piece]) continue;
            packets.push({
              x0: nodes[from].x,
              y0: nodes[from].y,
              x1: nodes[to].x,
              y1: nodes[to].y,
              t: 0,
              piece: piece,
              from: from,
              to: to
            });
            break;
          }
        }

        for (var pi = packets.length - 1; pi >= 0; pi--) {
          var pk = packets[pi];
          pk.t += dt * 1.5;
          if (pk.t >= 1) {
            nodes[pk.to].has[pk.piece] = true;
            nodes[pk.from].has[pk.piece] = true;
            // Complete?
            var holders = 0;
            for (var i = 0; i < N; i++) if (nodes[i].has[pk.piece]) holders++;
            if (holders >= N - 2) {
              complete.push({ x: pk.x1, y: pk.y1, t: 0 });
              for (var i2 = 0; i2 < N; i2++) delete nodes[i2].has[pk.piece];
            }
            packets.splice(pi, 1);
          }
        }

        c.globalCompositeOperation = "lighter";

        // Who holds what. The links between peers that share a piece are the
        // swarm; the dots alone would say nothing.
        var holders = {};
        for (var hi = 0; hi < N; hi++) {
          var hkeys = Object.keys(nodes[hi].has);
          for (var hj = 0; hj < hkeys.length; hj++) {
            (holders[hkeys[hj]] = holders[hkeys[hj]] || []).push(hi);
          }
        }
        for (var hk in holders) {
          var group = holders[hk];
          for (var g1 = 0; g1 < group.length; g1++) {
            for (var g2 = g1 + 1; g2 < group.length; g2++) {
              var na = nodes[group[g1]];
              var nb = nodes[group[g2]];
              c.strokeStyle = rgba(p.mid, 0.28);
              c.lineWidth = 1;
              c.beginPath();
              c.moveTo(na.x * W, na.y * H);
              c.lineTo(nb.x * W, nb.y * H);
              c.stroke();
            }
          }
        }

        // Peers.
        for (var n = 0; n < N; n++) {
          var nd = nodes[n];
          var px = nd.x * W;
          var py = nd.y * H;
          c.fillStyle = rgba(p.base, 1);
          c.beginPath();
          c.arc(px, py, 4, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = rgba(p.base, 0.18);
          c.beginPath();
          c.arc(px, py, 11, 0, Math.PI * 2);
          c.fill();

          // The pieces it holds, as ticks on the node.
          var keys2 = Object.keys(nd.has);
          for (var k2 = 0; k2 < keys2.length; k2++) {
            var ang = (k2 / Math.max(1, keys2.length)) * Math.PI * 2 - Math.PI / 2;
            c.fillStyle = rgba(p.ink, 0.9);
            c.fillRect(
              px + Math.cos(ang) * 8 - 1.1,
              py + Math.sin(ang) * 8 - 1.1,
              2.2,
              2.2
            );
          }
        }

        // Packets in flight.
        for (var pj = 0; pj < packets.length; pj++) {
          var pk2 = packets[pj];
          var e = pk2.t * pk2.t * (3 - 2 * pk2.t);
          var ax = (pk2.x0 + (pk2.x1 - pk2.x0) * e) * W;
          var ay = (pk2.y0 + (pk2.y1 - pk2.y0) * e) * H;
          c.strokeStyle = rgba(p.hot, 0.75);
          c.lineWidth = 1.1;
          c.beginPath();
          c.moveTo(pk2.x0 * W, pk2.y0 * H);
          c.lineTo(ax, ay);
          c.stroke();
          c.fillStyle = rgba(p.ink, 1);
          c.beginPath();
          c.arc(ax, ay, 2.6, 0, Math.PI * 2);
          c.fill();
        }

        // Completions.
        for (var ci = complete.length - 1; ci >= 0; ci--) {
          complete[ci].t += dt;
          if (complete[ci].t > 0.9) {
            complete.splice(ci, 1);
            continue;
          }
          var tt = complete[ci].t;
          c.strokeStyle = rgba(p.ink, (1 - tt) * 0.7);
          c.lineWidth = 1.4;
          c.beginPath();
          c.arc(complete[ci].x * W, complete[ci].y * H, 4 + tt * 26, 0, Math.PI * 2);
          c.stroke();
        }

        c.globalCompositeOperation = "source-over";
      }
    };
  }

  /* =========================================================================
     spectrum — Visage.

     Traces of what the machine is doing, scrolling right to left, and the
     spectrum underneath them. The numbers are invented; the shape is what a
     live machine actually looks like.
     ====================================================================== */

  function spectrum(ctx, w, h, o) {
    var rand = rng(o.seed);
    var p = palette(o.hue);
    var TRACES = 4;
    var LEN = 220;
    var traces = [];
    for (var i = 0; i < TRACES; i++) {
      var arr = new Float32Array(LEN);
      for (var j = 0; j < LEN; j++) arr[j] = rand();
      traces.push({
        data: arr,
        phase: rand() * 10,
        freq: 0.02 + rand() * 0.06,
        amp: 0.2 + rand() * 0.6,
        color: i === 0 ? p.base : i === 1 ? p.mid : i === 2 ? p.hot : p.deep
      });
    }
    var BARS = 28;

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        for (var t = 0; t < TRACES; t++) {
          var tr = traces[t];
          // Shift and push a new sample.
          var d = tr.data;
          for (var k = LEN - 1; k > 0; k--) d[k] = d[k - 1];
          var v =
            0.5 +
            0.5 *
              (Math.sin(time * tr.freq * 9 + tr.phase) * 0.6 +
                Math.sin(time * tr.freq * 23 + tr.phase * 2) * 0.3 +
                (rand() - 0.5) * 0.35);
          d[0] = v;

          var top = 14 + t * (H * 0.52) / TRACES;
          var hgt = H * 0.42 / TRACES;
          var base = top + hgt;

          c.globalCompositeOperation = "lighter";
          c.strokeStyle = rgba(tr.color, 0.62);
          c.lineWidth = 1;
          c.beginPath();
          for (var x = 0; x < LEN; x++) {
            var px = (x / (LEN - 1)) * W;
            var py = base - d[x] * hgt * tr.amp;
            if (x === 0) c.moveTo(px, py);
            else c.lineTo(px, py);
          }
          c.stroke();

          c.fillStyle = rgba(tr.color, 0.07);
          c.lineTo(W, base);
          c.lineTo(0, base);
          c.closePath();
          c.fill();

          c.strokeStyle = rgba(tr.color, 0.14);
          c.beginPath();
          c.moveTo(0, base);
          c.lineTo(W, base);
          c.stroke();
        }

        // Spectrum.
        c.globalCompositeOperation = "lighter";
        var bw = W / BARS;
        for (var b = 0; b < BARS; b++) {
          var f = b / BARS;
          var n =
            0.55 +
            0.45 * Math.sin(time * 1.7 + b * 0.55) * Math.cos(time * 0.6 + b * 0.2);
          var hh = (0.1 + n * (1 - f * 0.75)) * H * 0.2;
          c.fillStyle = rgba(f < 0.5 ? p.base : p.hot, 0.4);
          c.fillRect(b * bw + 1, H - hh - 6, bw - 2.5, hh);
        }

        c.globalCompositeOperation = "source-over";
        c.fillStyle = rgba(p.deep, 0.9);
        c.fillRect(0, H - 5, W, 1);
      }
    };
  }

  /* =========================================================================
     compress — PressPNG.

     An image being squeezed into a budget. The grid re-tiles into larger
     blocks as the encoder spends its allowance, and the byte counter falls.
     ====================================================================== */

  function compress(ctx, w, h, o) {
    var rand = rng(o.seed);
    var p = palette(o.hue);
    var COLS = 18;
    var ROWS = 12;

    function fresh() {
      var rects = [];
      for (var y = 0; y < ROWS; y++) {
        for (var x = 0; x < COLS; x++) {
          rects.push({
            x: x,
            y: y,
            w: 1,
            h: 1,
            v: noise(x * 0.35, y * 0.35, o.seed)
          });
        }
      }
      return rects;
    }
    var rects = fresh();
    var budget = 1;
    var timer = 0;
    var total = COLS * ROWS;

    return {
      frame: function (c, W, H, dt, time) {
        timer += dt;
        if (timer > 1.25 && rects.length > 8) {
          timer = 0;
          // Merge a batch of adjacent blocks: this is the size/quality trade.
          var merges = Math.max(1, Math.floor(rects.length * 0.14));
          for (var m = 0; m < merges; m++) {
            var bi = (rand() * rects.length) | 0;
            var a = rects[bi];
            // Find a neighbour of the same size.
            var best = -1;
            for (var n = 0; n < rects.length; n++) {
              if (n === bi) continue;
              var b = rects[n];
              if (b.w !== a.w || b.h !== a.h) continue;
              var adjacent =
                (a.x === b.x && Math.abs(a.y - b.y) === a.h) ||
                (a.y === b.y && Math.abs(a.x - b.x) === a.w);
              if (adjacent) {
                best = n;
                break;
              }
            }
            if (best < 0) continue;
            var c2 = rects[best];
            var nx = Math.min(a.x, c2.x);
            var ny = Math.min(a.y, c2.y);
            a.x = nx;
            a.y = ny;
            a.w += c2.w;
            a.h += c2.h;
            a.v = (a.v + c2.v) / 2;
            rects.splice(best, 1);
          }
          budget = rects.length / total;
        } else if (timer > 1.25 && rects.length <= 8) {
          timer = 0;
          rects = fresh();
          budget = 1;
        }

        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        var cw = W / COLS;
        var ch = H / ROWS;

        for (var i = 0; i < rects.length; i++) {
          var r = rects[i];
          var g = Math.max(0, Math.min(1, r.v));
          var l = 6 + g * 30;
          c.fillStyle = "hsl(" + ((o.hue + 200) % 360).toFixed(0) + ", 30%, " + l.toFixed(0) + "%)";
          c.fillRect(r.x * cw, r.y * ch, r.w * cw + 0.5, r.h * ch + 0.5);
        }

        // The block boundaries, so you can see what the encoder did.
        c.strokeStyle = "rgba(8,8,8,0.55)";
        c.lineWidth = 1;
        for (var j = 0; j < rects.length; j++) {
          var rr = rects[j];
          c.strokeRect(rr.x * cw + 0.5, rr.y * ch + 0.5, rr.w * cw, rr.h * ch);
        }

        // The budget bar.
        c.fillStyle = "rgba(8,8,8,0.9)";
        c.fillRect(0, H - 9, W, 9);
        c.fillStyle = rgba(p.hot, 0.85);
        c.fillRect(0, H - 7, W * budget, 3);
        c.fillStyle = rgba(p.deep, 0.8);
        c.fillRect(0, H - 8, W, 1);
      }
    };
  }

  /* =========================================================================
     field — WarpX.

     Particles pushed through an electromagnetic field with the Boris pusher:
     half the electric kick in the middle of the magnetic rotation, half
     outside. That is what keeps the energy bounded, and it is the same
     integrator WarpX uses.
     ====================================================================== */

  function field(ctx, w, h, o) {
    var rand = rng(o.seed);
    var p = palette(o.hue);
    var COUNT = 84;
    var TRAIL = 26;
    var parts = [];
    for (var i = 0; i < COUNT; i++) {
      parts.push({
        x: rand(),
        y: rand(),
        vx: 0,
        vy: 0,
        q: rand() < 0.5 ? -1 : 1,
        tr: []
      });
    }

    // A constant magnetic field and a pulsing electric one. The gyration
    // radius comes out at E/B^2, so the numbers below were chosen to put
    // the orbits at roughly a third of the plate.
    var BZ = 3.2;
    var EX = 1.6;

    function fields(x, y, t) {
      var E = EX * (0.55 + 0.45 * Math.sin(t * 1.7)) * (0.86 + 0.14 * Math.cos(x * 4));
      return [E, 0, BZ];
    }

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "rgba(8,8,8,0.14)";
        c.fillRect(0, 0, W, H);

        var h = Math.min(dt, 0.033);
        for (var i = 0; i < COUNT; i++) {
          var q = parts[i];
          var F = fields(q.x, q.y, time);
          var Ex = F[0];
          var Ey = F[1];
          var Bz = F[2];
          var ch = q.q;

          // The Boris pusher: half an electric kick, the magnetic rotation,
          // then the other half kick. Keeping the kicks outside the rotation
          // is what makes the energy bounded.
          var vmx = q.vx + ch * Ex * h * 0.5;
          var vmy = q.vy + ch * Ey * h * 0.5;
          var tz = ch * Bz * h * 0.5;
          var s = (2 * tz) / (1 + tz * tz);
          var vpx = vmx + vmy * s;
          var vpy = vmy - vmx * s;
          q.vx = vpx + ch * Ex * h * 0.5;
          q.vy = vpy + ch * Ey * h * 0.5;

          q.x += q.vx * h;
          q.y += q.vy * h;

          if (q.x < -0.05 || q.x > 1.05 || q.y < -0.05 || q.y > 1.05) {
            q.x = rand();
            q.y = rand();
            q.vx = 0;
            q.vy = 0;
            q.tr.length = 0;
          }
          q.tr.push(q.x, q.y);
          if (q.tr.length > TRAIL * 2) q.tr.splice(0, 2);
        }

        c.globalCompositeOperation = "lighter";
        c.lineCap = "round";
        c.lineJoin = "round";
        for (var j = 0; j < COUNT; j++) {
          var pp = parts[j];
          var n = pp.tr.length / 2;
          var col = pp.q > 0 ? p.base : p.hot;
          for (var k = 1; k < n; k++) {
            var a = k / n;
            c.strokeStyle = rgba(col, a * a * 0.85);
            c.lineWidth = 0.5 + a * 1.6;
            c.beginPath();
            c.moveTo(pp.tr[(k - 1) * 2] * W, pp.tr[(k - 1) * 2 + 1] * H);
            c.lineTo(pp.tr[k * 2] * W, pp.tr[k * 2 + 1] * H);
            c.stroke();
          }
          // The head of the trail, where the particle is right now.
          if (n > 0) {
            var hx = pp.tr[(n - 1) * 2] * W;
            var hy = pp.tr[(n - 1) * 2 + 1] * H;
            c.fillStyle = rgba(p.ink, 0.85);
            c.beginPath();
            c.arc(hx, hy, 1.5, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = rgba(col, 0.16);
            c.beginPath();
            c.arc(hx, hy, 5.5, 0, Math.PI * 2);
            c.fill();
          }
        }
        c.globalCompositeOperation = "source-over";
      }
    };
  }

  /* =========================================================================
     orbit — Versus.

     Two panels, two engines, the same sky. The faster engine completes more
     steps and finds more conjunctions. That is the argument the project is
     making, so it should be visible.
     ====================================================================== */

  function orbit(ctx, w, h, o) {
    var rand = rng(o.seed);
    var p = palette(o.hue);

    function makePanel(rate, name) {
      var bodies = [];
      for (var i = 0; i < 74; i++) {
        bodies.push({
          a: rand() * Math.PI * 2,
          r: 0.12 + rand() * 0.34,
          sp: (0.25 + rand() * 0.8) / (0.3 + rand() * 0.9),
          inc: (rand() - 0.5) * 0.5,
          x: 0,
          y: 0
        });
      }
      return { bodies: bodies, rate: rate, name: name, found: 0, steps: 0 };
    }

    var left = makePanel(1.0, "kd-tree");
    var right = makePanel(0.52, "uniform grid");
    var flashes = [];

    function advance(panel, cx, cy, R, dt) {
      for (var i = 0; i < panel.bodies.length; i++) {
        var b = panel.bodies[i];
        b.a += b.sp * dt * 0.55 * panel.rate;
        panel.steps += dt * panel.rate;
        b.x = cx + Math.cos(b.a) * b.r * R;
        b.y = cy + Math.sin(b.a) * b.r * R + Math.sin(b.a * 2) * b.inc * R * 0.2;
      }
      // Conjunctions: bodies that pass close to one another.
      for (var i2 = 0; i2 < panel.bodies.length; i2 += 2) {
        var a1 = panel.bodies[i2];
        var b1 = panel.bodies[(i2 + 7) % panel.bodies.length];
        var dx = a1.x - b1.x;
        var dy = a1.y - b1.y;
        if (dx * dx + dy * dy < R * R * 0.0016) {
          panel.found++;
          flashes.push({ x: (a1.x + b1.x) / 2, y: (a1.y + b1.y) / 2, t: 0, side: panel });
        }
      }
    }

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        var half = W / 2;
        var R = Math.min(half, H) * 0.36;

        // The dividing rule.
        c.strokeStyle = "rgba(236,235,231,0.12)";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(half, 8);
        c.lineTo(half, H - 22);
        c.stroke();

        advance(left, half / 2, H / 2, R, dt);
        advance(right, half + half / 2, H / 2, R, dt);

        c.globalCompositeOperation = "lighter";
        for (var pi = 0; pi < 2; pi++) {
          var panel = pi === 0 ? left : right;
          var cx = pi === 0 ? half / 2 : half + half / 2;
          var col = pi === 0 ? p.base : p.mid;

          // The orbits themselves, faint, so each panel reads as a system.
          c.strokeStyle = rgba(p.mid, 0.42);
          c.lineWidth = 1;
          for (var oi = 0; oi < 5; oi++) {
            var rr = R * (0.14 + oi * 0.09);
            c.beginPath();
            c.ellipse(cx, H / 2, rr, rr * 0.62, 0, 0, Math.PI * 2);
            c.stroke();
          }

          c.fillStyle = rgba(p.hot, 0.35);
          c.beginPath();
          c.arc(cx, H / 2, 6, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = rgba(p.ink, 0.9);
          c.beginPath();
          c.arc(cx, H / 2, 2.4, 0, Math.PI * 2);
          c.fill();

          for (var i = 0; i < panel.bodies.length; i++) {
            var b = panel.bodies[i];
            c.fillStyle = rgba(col, 1);
            c.beginPath();
            c.arc(b.x, b.y, 2.7, 0, Math.PI * 2);
            c.fill();
          }
        }

        for (var fi = flashes.length - 1; fi >= 0; fi--) {
          var fl = flashes[fi];
          fl.t += dt;
          if (fl.t > 0.7) {
            flashes.splice(fi, 1);
            continue;
          }
          var col2 = fl.side === left ? p.base : p.mid;
          c.strokeStyle = rgba(p.hot, (1 - fl.t / 0.7) * 0.85);
          c.lineWidth = 1.3;
          c.beginPath();
          c.arc(fl.x, fl.y, 3 + fl.t * 16, 0, Math.PI * 2);
          c.stroke();
          c.fillStyle = rgba(col2, 0.8);
          c.beginPath();
          c.arc(fl.x, fl.y, 1.8, 0, Math.PI * 2);
          c.fill();
        }

        c.globalCompositeOperation = "source-over";
        c.font = mono(10, 500);
        c.textBaseline = "alphabetic";
        c.fillStyle = rgba(p.ink, 0.6);
        c.fillText(left.name + "  " + left.found + " found", 10, H - 8);
        c.fillStyle = rgba(p.ink, 0.6);
        c.fillText(right.name + "  " + right.found + " found", half + 10, H - 8);
      }
    };
  }

  /* =========================================================================
     shell — quip.

     A shell, doing what a shell does: taking a line, running it, printing
     what came back, asking again.
     ====================================================================== */

  function shell(ctx, w, h, o) {
    var p = palette(o.hue);
    var SCRIPT = [
      { cmd: "ls", out: ["src  include  build  Makefile  README.md"] },
      { cmd: "cd src", out: [] },
      { cmd: "make -j8", out: ["cc -std=c99 -O2 -o quip *.c", "linking 14 objects"] },
      { cmd: "./quip --version", out: ["quip 0.3.1 (c99, posix)"] },
      { cmd: "git log --oneline -2", out: ["a4c1d9 tab completion", "7f20e3 signal handling"] },
      { cmd: "cat README.md", out: ["a unix shell, written from scratch."] }
    ];

    var lines = [];
    var step = 0;
    var typed = 0;
    var prompt = "utkarsh@box:~$ ";

    function push(line) {
      lines.push(line);
    }

    return {
      frame: function (c, W, H, dt, time) {
        c.globalCompositeOperation = "source-over";
        c.fillStyle = "#080808";
        c.fillRect(0, 0, W, H);

        var fs = Math.max(9, Math.min(11, Math.round(W / 62)));
        c.font = mono(fs, 400);
        c.textBaseline = "top";

        var lh = fs * 1.55;
        // Keep the prompt on screen: the scroll is the tail, not the history.
        var maxLines = Math.max(1, Math.floor((H - lh * 2.2) / lh));
        if (lines.length > maxLines) lines.splice(0, lines.length - maxLines);
        var y = H - lh * (lines.length + 2);

        for (var i = 0; i < lines.length; i++) {
          var ln = lines[i];
          c.fillStyle = ln.dim ? "rgba(236,235,231,0.32)" : rgba(p.ink, 0.72);
          c.fillText(ln.text, 14, y + i * lh);
        }

        var idx = SCRIPT[step % SCRIPT.length];
        var shown = idx.cmd.slice(0, Math.max(0, Math.floor(typed)));
        var py = y + lines.length * lh;
        c.fillStyle = rgba(p.base, 0.85);
        c.fillText(prompt, 14, py);
        c.fillStyle = rgba(p.ink, 0.88);
        c.fillText(shown, 14 + c.measureText(prompt).width, py);

        // Caret.
        var cw = c.measureText(prompt + shown).width;
        if (Math.floor(time * 1.8) % 2 === 0) {
          c.fillStyle = rgba(p.base, 0.9);
          c.fillRect(14 + cw, py, fs * 0.58, fs * 1.1);
        }

        typed += dt * 9;
        if (typed >= idx.cmd.length + 0.55) {
          push({ text: prompt + idx.cmd, dim: false });
          for (var oi = 0; oi < idx.out.length; oi++)
            push({ text: idx.out[oi], dim: true });
          typed = 0;
          step++;
        }
      }
    };
  }

  /* =========================================================================
     The registry.
     ====================================================================== */

  var ART = {
    knot: knot,
    flow: flow,
    ca: ca,
    lattice: lattice,
    lissajous: lissajous,
    fault: fault,
    peers: peers,
    spectrum: spectrum,
    compress: compress,
    field: field,
    orbit: orbit,
    shell: shell
  };

  /* =========================================================================
     The runtime.
     ====================================================================== */

  var plates = [];

  // A handle on the mounted plates. It costs nothing and it is the only way
  // to inspect a canvas from the outside, which is how the art gets checked.
  window.__plates = plates;

  function size(canvas) {
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var r = canvas.getBoundingClientRect();
    var cw = Math.max(1, Math.round(r.width));
    var ch = Math.max(1, Math.round(r.height));
    var pw = Math.round(cw * dpr);
    var ph = Math.round(ch * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
    return { w: cw, h: ch, dpr: dpr };
  }

  function mount(canvas) {
    var name = canvas.getAttribute("data-art");
    var factory = ART[name];
    if (!factory) return;

    var plate = {
      canvas: canvas,
      ctx: canvas.getContext("2d", { alpha: false }),
      hue: parseFloat(canvas.getAttribute("data-hue") || "210"),
      seed: parseInt(canvas.getAttribute("data-seed") || "1", 10),
      behaviour: null,
      visible: true,
      w: 0,
      h: 0
    };
    // Measure before building. Some behaviours bake their scale into the
    // factory — the knot and the reaction grid both do — so a plate sized
    // after the fact would come out wrong.
    var s = size(canvas);
    plate.w = s.w;
    plate.h = s.h;
    plate.behaviour = factory(plate.ctx, s.w, s.h, {
      hue: plate.hue,
      seed: plate.seed
    });
    plates.push(plate);
  }

  function rebuild(plate) {
    var factory = ART[plate.canvas.getAttribute("data-art")];
    if (!factory) return;
    plate.behaviour = factory(plate.ctx, plate.w, plate.h, {
      hue: plate.hue,
      seed: plate.seed
    });
  }

  function draw(plate, dt, time) {
    var s = size(plate.canvas);
    if (s.w !== plate.w || s.h !== plate.h) {
      plate.w = s.w;
      plate.h = s.h;
      rebuild(plate);
    }
    plate.ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    plate.ctx.globalCompositeOperation = "source-over";
    plate.ctx.globalAlpha = 1;
    plate.behaviour.frame(plate.ctx, s.w, s.h, dt, time);
  }

  var last = 0;
  function loop(now) {
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    for (var i = 0; i < plates.length; i++) {
      if (!plates[i].visible) continue;
      draw(plates[i], dt, now / 1000);
    }
    requestAnimationFrame(loop);
  }

  function start() {
    var canvases = document.querySelectorAll("canvas[data-art]");
    for (var i = 0; i < canvases.length; i++) mount(canvases[i]);

    if (REDUCED) {
      // One frame, and then it is a still life.
      for (var j = 0; j < plates.length; j++) draw(plates[j], 0.016, 1.4);
      return;
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          for (var k = 0; k < entries.length; k++) {
            var p = null;
            for (var m = 0; m < plates.length; m++)
              if (plates[m].canvas === entries[k].target) p = plates[m];
            if (p) p.visible = entries[k].isIntersecting;
          }
        },
        { rootMargin: "120px" }
      );
      for (var n = 0; n < plates.length; n++) io.observe(plates[n].canvas);
    }

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        for (var r = 0; r < plates.length; r++) {
          plates[r].w = 0;
          plates[r].h = 0;
        }
      }, 160);
    });

    requestAnimationFrame(loop);
  }

  /* --- the filter chips --------------------------------------------------- */

  function filters() {
    var chips = document.querySelectorAll(".chip");
    if (!chips.length) return;

    function apply(tag) {
      var works = document.querySelectorAll(".work");
      var shown = 0;
      for (var i = 0; i < works.length; i++) {
        var tags = (works[i].getAttribute("data-tags") || "").split(/\s+/);
        var hit = !tag || tags.indexOf(tag) !== -1;
        if (hit) shown++;
        works[i].hidden = !hit;
      }
      var empty = document.querySelector(".empty");
      if (empty) empty.hidden = shown !== 0;
      for (var c = 0; c < chips.length; c++)
        chips[c].classList.toggle("is-on", chips[c].getAttribute("data-tag") === tag);
    }

    for (var i = 0; i < chips.length; i++) {
      (function (chip) {
        chip.addEventListener("click", function () {
          apply(chip.getAttribute("data-tag") || "");
        });
      })(chips[i]);
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", function () {
      start();
      filters();
    });
  else {
    start();
    filters();
  }
})();
