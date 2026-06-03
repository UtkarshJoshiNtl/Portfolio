export const links = {
  github: "https://github.com/UtkarshJoshiNtl",
  githubUser: "UtkarshJoshiNtl",
  linkedin: "https://linkedin.com/in/utkarsh-joshi",
  email: "joshiutkarshntl@gmail.com",
  codeforces: "https://codeforces.com/profile/BakedRajma",
  codeforcesHandle: "BakedRajma",
  resume: "/resume.pdf",
};

export const timeline = [
  { year: "2025", text: "entered college" },
  { year: "2026", text: "contributing to open source" },
];

export const techStack = [
  "C",
  "C++",
  "Python",
  "Git",
  "CMake",
  "CUDA",
  "OpenMP",
  "OpenGL",
  "NumPy",
  "PyGame",
  "POSIX",
  "Bash",
  "Linux",
];

export const astrosisCycle = [
  "Astrosis — Orbital Mechanics Engine",
  "507× batch propagation speedup (C++ vs Python)",
  "83× conjunction detection speedup (CUDA vs Python)",
  "RK4 + J2/J3/J4 harmonics + atmospheric drag",
];

export const quipCycle = [
  "Quip — Unix Shell in C99",
  "Raw terminal mode from scratch",
  "Pipelines · redirection · job control",
  "Signal handling · tab completion",
];

export const cuflodaCycle = [
  "CuFloda — Lattice Boltzmann Fluid",
  "D2Q9 method with real-time viz",
  "Complex boundaries · obstacle drawing",
  "CUDA acceleration planned",
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
    name: "cjit",
    repo: "UtkarshJoshiNtl/cjit",
    tech: ["C", "Content-Addressed Storage", "Version Control"],
    description:
      "Version control system implemented in C. Uses content-addressed storage for integrity and deduplication. Supports branch creation, checkout, and commit operations without external dependencies. Honest systems code — no wrappers, no shortcuts.",
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
    name: "CuFloda",
    repo: "UtkarshJoshiNtl/CuFloda",
    tech: ["Python", "NumPy", "PyGame", "CUDA (planned)", "Lattice Boltzmann Method"],
    description:
      "Fluid dynamics simulation using the D2Q9 Lattice Boltzmann Method. CPU prototype with real-time PyGame visualization, complex boundary conditions (inflow, outflow, walls, obstacles), and interactive obstacle drawing. CUDA acceleration planned as the next phase.",
    github: "https://github.com/UtkarshJoshiNtl/CuFloda",
  },
  {
    name: "OwlEchoSense",
    repo: "UtkarshJoshiNtl/OwlEchoSense",
    tech: ["ESP32", "AODV Mesh", "BirdNET ML", "LoRa"],
    description:
      "Field ecology monitoring system for bird species identification. ESP32 microcontrollers with AODV mesh networking for decentralized communication, BirdNET machine learning for species identification, and LoRa for long-range data transmission in areas without connectivity.",
    github: "https://github.com/UtkarshJoshiNtl/OwlEchoSense",
  },
  {
    name: "LANParty",
    repo: "UtkarshJoshiNtl/LANParty",
    tech: ["Flutter", "WebSocket", "Dart", "Real-time Multiplayer"],
    description:
      "Cross-platform LAN gaming application. Real-time multiplayer using WebSocket communication with automatic game discovery and lobby management. Supports chess, ludo, and monopoly with no internet dependency.",
    github: "https://github.com/UtkarshJoshiNtl/LANParty",
  },
];
