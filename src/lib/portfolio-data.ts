export const links = {
  github: "https://github.com/UtkarshJoshiNtl",
  githubUser: "UtkarshJoshiNtl",
  linkedin: "https://linkedin.com/in/utkarsh-joshi-3037a6377",
  email: "joshiutkarshntl@gmail.com",
  codeforces: "https://codeforces.com/profile/BakedRajma",
  codeforcesHandle: "BakedRajma",
  resume: "/resume.pdf",
};

export const timeline = [
  { year: "2025", text: "Entered Graphic Era Hill University (CS)" },
  { year: "Jan 2026", text: "Began quip — Unix shell in C99 from scratch" },
  { year: "Mar 2026", text: "Built Astrosis prototype at NSH hackathon (IIT Delhi) — top 10" },
  { year: "Apr 2026", text: "Started cjit — version control system in C" },
  { year: "May 2026", text: "Started S-Stream — Lattice Boltzmann fluid simulation workbench" },
  { year: "Jun 2026", text: "Built CTorrent — educational BitTorrent client in C" },
  { year: "Jun 2026", text: "Started Current — concurrent TTL-backed hash map study" },
  { year: "Jun 2026", text: "Built Visage — terminal system performance dashboard" },
  { year: "Jun 2026", text: "Created justLanded — Godot 4 local co-op physics game" },
];

export const techStack = [
  "C",
  "C++",
  "Python",
  "CUDA",
  "OpenMP",
  "OpenGL",
  "NumPy",
  "Godot",
  "CMake",
  "Git",
  "Bash",
  "Linux",
];

export const astrosisDesc =
  "83× conjunction detection speedup (CUDA vs Python) · GPU-accelerated orbital mechanics engine";

export const quipCycle = [
  "Quip — Unix Shell in C99",
  "Raw terminal mode from scratch",
  "Pipelines · redirection · job control",
  "Signal handling · tab completion · Python plugins",
];

export const sStreamCycle = [
  "S-Stream — Lattice Boltzmann Fluid",
  "D2Q9 method with PySide6 GUI",
  "CuPy GPU engine · Shan-Chen multiphase",
  "9 presets · probes · parameter sweeps",
];

export const benchmarks = [
  ["Operation", "Python", "C++", "CUDA"],
  ["Single propagation (50k steps)", "395ms", "21.9ms (18×)", "—"],
  ["Batch (1k sats × 24h)", "7034ms", "13.9ms (507×)", "46.9ms (150×)"],
  ["Conjunction (400×400 pairs)", "46718ms", "5159ms (9×)", "564ms (83×)"],
];

export const astrosisHighlights = [
  "SoA memory layout for 100% cache utilisation vs 17% for AoS",
  "alignas(64) StateVector to eliminate false sharing between OpenMP threads",
  "Brent's method for TCA refinement to sub-second accuracy",
  "Chan's method probability of collision",
  "Validated: energy conservation < 1e-7 relative drift over 24h, RK4 4th-order convergence verified",
];

export const projects = [
  {
    name: "Astrosis",
    repo: "UtkarshJoshiNtl/Astrosis",
    tech: ["C++", "CUDA", "Python", "pybind11", "OpenMP", "RK4"],
    description:
      "GPU-accelerated orbital propagation and conjunction analysis engine. SoA memory layout, RK4 integration, Brent's TCA refinement. 83× conjunction screening speedup over Python reference.",
    github: "https://github.com/UtkarshJoshiNtl/Astrosis",
  },
  {
    name: "cjit",
    repo: "UtkarshJoshiNtl/cjit",
    tech: ["C", "Content-Addressed Storage", "Version Control"],
    description:
      "Version control system implemented in C. Uses content-addressed storage for integrity and deduplication. Supports branch creation, checkout, and commit operations without external dependencies.",
    github: "https://github.com/UtkarshJoshiNtl/cjit",
  },
  {
    name: "Quip",
    repo: "UtkarshJoshiNtl/quip",
    tech: ["C", "Terminal Raw Mode", "Job Control", "Signal Handling", "POSIX"],
    description:
      "Fully-featured Unix shell in C99. Supports command pipelines, I/O redirection, background job management, signal handling (SIGINT, SIGTERM, SIGCHLD), command history with arrow key navigation, tab completion, and ANSI-colored prompts. Implemented raw terminal mode from scratch using termios.",
    github: "https://github.com/UtkarshJoshiNtl/quip",
  },
  {
    name: "S-Stream",
    repo: "UtkarshJoshiNtl/S-Stream",
    tech: ["Python", "PySide6", "CuPy", "NumPy", "D2Q9 LBM", "OpenGL"],
    description:
      "2D Lattice Boltzmann fluid simulation workbench with an interactive PySide6 GUI. Implements D2Q9 + BGK collision on CPU (NumPy/Numba) and GPU (CuPy raw kernel). Features Shan-Chen multiphase liquid model, 9 built-in preset experiments, interactive geometry drawing, live probes with Reynolds/Strouhal analysis, flow regime classification, and export to PNG/MP4/GIF/CSV.",
    github: "https://github.com/UtkarshJoshiNtl/S-Stream",
  },
  {
    name: "EnCrip",
    repo: "UtkarshJoshiNtl/EnCrip",
    tech: ["Python", "HMAC-SHA256", "FastAPI", "Controller-Worker", "Replay Cache"],
    description:
      "Secure distributed execution framework with stateless HMAC-based authentication. Controller-worker architecture dispatches computational tasks across network nodes. Features replay attack protection, time-windowed tokens, and REST API for worker nodes.",
    github: "https://github.com/UtkarshJoshiNtl/EnCrip",
  },
  {
    name: "CTorrent",
    repo: "UtkarshJoshiNtl/CTorrent",
    tech: ["C", "POSIX Sockets", "BitTorrent Protocol", "Bencode", "SHA-1"],
    description:
      "Educational CLI BitTorrent client written in C. Implements bencoded metainfo parsing, peer wire protocol with handshake and block requests, multi-peer pipelined downloading, tracker HTTP/HTTPS communication, and SHA-1 piece integrity verification. Built from scratch to understand P2P protocols at the wire level.",
    github: "https://github.com/UtkarshJoshiNtl/CTorrent",
  },
  {
    name: "Current",
    repo: "UtkarshJoshiNtl/Current",
    tech: ["C++17", "CMake", "Google Test", "Google Benchmark", "Lock-Free"],
    description:
      "Concurrent TTL-backed hash map — a C++17 performance study with three implementations: sharded mutex map, timed eviction via deque, and lock-free slot map using atomic CAS. Includes Google Test suites and Google Benchmarks. Originally born from the replay-cache need in EnCrip.",
    github: "https://github.com/UtkarshJoshiNtl/Current",
  },
  {
    name: "Visage",
    repo: "UtkarshJoshiNtl/Visage",
    tech: ["Python", "Textual", "psutil", "FastAPI", "eBPF", "ctypes"],
    description:
      "Real-time system performance dashboard for the terminal built with Textual. Features live CPU, memory, disk, network, and process monitoring. Includes a benchmark mode with hardware-isolated execution: core isolation via taskset, CPU frequency locking, and PMU counters through raw perf_event_open ctypes. Remote monitoring via FastAPI, with JSON/CSV export and eBPF tracing support.",
    github: "https://github.com/UtkarshJoshiNtl/Visage",
  },
  {
    name: "justLanded",
    repo: "UtkarshJoshiNtl/justLanded",
    tech: ["Godot 4", "GDScript", "3D Physics", "Local Co-op", "Procedural"],
    description:
      "Local co-op 3D physics game built in Godot 4. Stranded astronauts scavenge debris on a tropical island, building janky vehicles from scrounged parts to escape. Randomized control bindings per seed force adaptation. Features per-seed world generation for high replayability.",
    github: "https://github.com/UtkarshJoshiNtl/justLanded",
  },
];
