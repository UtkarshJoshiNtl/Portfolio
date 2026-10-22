// The collection.
//
// A gallery, not a list. Every work hangs in one or more rooms; the rooms are
// named after intent, not after subject matter. The tags are subject matter.
//
// The internal labels for each room are the blunt ones. They live here, in the
// source, where nobody but me has to read them:
//
//   Deadweight   — "cool shit"
//   Exhibits     — "simulations"
//   Tools        — "things people can actually run"
//   Research     — "pretentious"
//   Coursework   — "college assignments"
//   Learning     — "built to learn the thing"
//
// Overlap is deliberate. A work can sit in two rooms; it is still one work.

#pragma once

#include <string>
#include <vector>

namespace gallery {

enum class Room {
  Deadweight,
  Exhibits,
  Tools,
  Research,
  Coursework,
  Learning,
};

enum class Status {
  Verified,   // runs, and its claims are checked
  Building,   // code exists, in progress
  Declared,   // concept only
  Fork,       // tracks someone else's tree
  Team,       // built with other people
};

struct RoomInfo {
  Room room;
  std::string slug;
  std::string name;
  std::string wall_text;   // the paragraph on the wall beside the door
};

struct Metric {
  std::string label;
  std::string value;
};

struct Work {
  std::string id;          // slug, used for /work/<id>/
  std::string title;
  std::string year;
  std::string medium;      // the tech stack, as a medium
  std::string note;        // the wall label: two or three sentences
  std::vector<std::string> body;   // longer text on the work's own page
  std::vector<Room> rooms;
  std::vector<std::string> tags;
  std::vector<std::string> stack;
  Status status;

  std::string repo_label;
  std::string repo_url;

  std::string upstream_label;  // optional second link
  std::string upstream_url;

  std::vector<Metric> metrics;

  std::string art;    // which behaviour the plate runs
  float hue;          // base hue for the plate
};

// ---------------------------------------------------------------------------
// Rooms
// ---------------------------------------------------------------------------

inline const std::vector<RoomInfo>& rooms() {
  static const std::vector<RoomInfo> r = {
      {Room::Deadweight, "deadweight", "Deadweight",
       "Projects with a straight face. The joke lives in the artifact — the type "
       "rules, the diagnostics, the behaviour — and the README stays deadpan."},
      {Room::Exhibits, "exhibits", "Exhibits",
       "Deterministic, seeded, watchable. The visual is the point; the frame "
       "pipeline exists to make it."},
      {Room::Tools, "tools", "Tools",
       "Things that run and do a job. Install them, point them at something, get "
       "output."},
      {Room::Research, "research", "Research",
       "Studies, benchmarks, and one actual paper. The failure modes get "
       "catalogued before anybody tries to fix them."},
      {Room::Coursework, "coursework", "Coursework",
       "Built for a grade, then kept anyway."},
      {Room::Learning, "learning", "Learning",
       "Built to understand the thing, not to ship it. The code is the argument."},
  };
  return r;
}

inline const RoomInfo& room_info(Room r) {
  for (const auto& ri : rooms())
    if (ri.room == r) return ri;
  return rooms().front();
}

inline const char* status_label(Status s) {
  switch (s) {
    case Status::Verified: return "Verified";
    case Status::Building: return "Building";
    case Status::Declared: return "Declared";
    case Status::Fork:     return "Fork";
    case Status::Team:     return "Team";
  }
  return "";
}

// ---------------------------------------------------------------------------
// The works
// ---------------------------------------------------------------------------

inline const std::vector<Work>& works() {
  static const std::vector<Work> w = {
      {
          "badtype",
          "BadType",
          "2026",
          "C99 · type checker · REPL",
          "A very very horrid language, worse than jellied eel and the french "
          "(people). The type rules are perfectly internally consistent and "
          "completely unreasonable: the compiler is always right, the language is "
          "always wrong. Programs type-check and mean nonsense.",
          {
              "Seven rules. None of them are about values — they are about "
              "structure, order, scope and time. Addition returns a Mood, which "
              "then behaves perfectly legally everywhere a Mood is accepted. The "
              "comedy is never randomness; it is coherence. A broken rule would "
              "just be a bug.",
              "The other half of the joke is the failure direction. A perfectly "
              "ordinary program gets rejected by a compiler that is technically "
              "right and completely insane, with diagnostics rewritten until they "
              "are deadpan-funny. Every error message is hand-written.",
              "Building it is how the type system gets learned for real: lexing, "
              "recursive descent, Pratt parsing, tagged-union ASTs, an arena "
              "allocator, bidirectional type checking, and a property test that "
              "generates well-typed programs and asserts none of them get stuck. "
              "One command builds it. No dependencies, no CI, no badges.",
          },
          {Room::Deadweight, Room::Learning},
          {"compiler", "learning", "c", "generative"},
          {"C", "C99", "arena allocator", "recursive descent", "Pratt parser",
           "bidirectional typing", "REPL"},
          Status::Building,
          "Repository", "https://github.com/UtkarshJoshiNtl/badtype",
          "", "",
          {{"Type rules", "7"}, {"Build", "one cc command"}, {"Dependencies", "none"}},
          "lattice", 340.0f,
      },
      {
          "s-stream",
          "S-Stream",
          "May 2026",
          "Python · CuPy · PySide6 · OpenGL",
          "A lattice Boltzmann fluid workbench. Watch vortices shed behind a "
          "cylinder, see pressure drop across a channel, understand Reynolds "
          "number by changing it. It ships on PyPI.",
          {
              "The engine is D2Q9 BGK with bounce-back boundaries, Shan-Chen "
              "multiphase, and a CuPy path that runs the whole lattice on the GPU. "
              "Obstacles are drawn interactively; probes can be dropped into the "
              "flow and read live; parameter sweeps run in batch.",
              "The part that matters is that it tells you when to distrust it. "
              "Every running simulation carries a confidence score, and the "
              "capabilities are labelled Verified, Experimental or Hidden in "
              "TRUST.md. Validation runs against Poiseuille flow, a lid-driven "
              "cavity and measured cylinder drag coefficients — the tests are in "
              "the repo and you can run them.",
              "It is a learning and intuition-building tool, not a production "
              "solver. It will not replace OpenFOAM or Fluent, and it says so in "
              "the README before you install it.",
          },
          {Room::Tools, Room::Exhibits},
          {"simulation", "gpu", "python"},
          {"Python", "CuPy", "PySide6", "NumPy", "D2Q9 LBM", "OpenGL", "REST API",
           "Jupyter"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/S-Stream",
          "PyPI", "https://pypi.org/project/s-stream/",
          {{"Solver", "D2Q9 BGK"}, {"Phases", "Shan-Chen"},
           {"Validation", "Poiseuille · cavity · cylinder Cd"},
           {"Backend", "CuPy GPU"}},
          "flow", 200.0f,
      },
      {
          "simulation-zoo",
          "Simulation Zoo",
          "2026",
          "C++20 · headless renderer · seeded RNG",
          "Thirteen deterministic simulations — a self-gravitating galaxy, "
          "Gray-Scott coral, Lenia blooms, Nagel-Schreckenberg traffic, an "
          "Abelian sandpile. Each has exactly one signature visual.",
          {
              "Every exhibit is a self-contained slice of physics: a particle "
              "system, a scalar field, a flock. The core is fixed-timestep, "
              "seeded and reproducible, so the same run always produces the same "
              "frames. Headless by default — it renders on a machine with no "
              "display and no GPU.",
              "It is a zoo, not an engine. Adding an animal is a small, boring, "
              "well-documented task: one file, one simulation struct, one "
              "registration. The framebuffer accumulates float RGB, the colormap "
              "is a lookup table, and the image writer is a PPM.",
              "The gallery you see elsewhere on this site is the same renderer, "
              "running live.",
          },
          {Room::Exhibits},
          {"simulation", "generative", "cpp"},
          {"C++20", "CMake", "xoshiro256**", "PPM", "GIF"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/SimulationZoo",
          "", "",
          {{"Exhibits", "13"}, {"Timestep", "fixed"},
           {"Randomness", "seeded, reproducible"}, {"Dependencies", "none"}},
          "ca", 150.0f,
      },
      {
          "visage",
          "Visage",
          "July 2026",
          "Python · Textual · perf_event_open · eBPF",
          "A live terminal dashboard for what your machine is actually doing. "
          "CPU, memory, disk, network, GPU, processes — and a benchmark mode "
          "that isolates the hardware before it measures anything.",
          {
              "Live sampling comes from psutil and /proc, with GPU numbers from "
              "NVML. The interesting part is the benchmark path: cores are "
              "pinned with taskset, CPU frequency is locked, and PMU counters are "
              "read straight out of perf_event_open through ctypes. Every result "
              "carries the full system context that produced it.",
              "Remote monitoring runs on FastAPI, so another machine can watch "
              "this one. Results export as JSON or CSV, and eBPF tracing hooks "
              "into the syscall path when you need to know where the time went "
              "rather than guessing.",
          },
          {Room::Tools},
          {"systems", "tui", "python"},
          {"Python", "Textual", "psutil", "FastAPI", "eBPF", "ctypes",
           "perf_event_open"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/Visage",
          "", "",
          {{"Frontend", "Textual TUI"}, {"Remote", "FastAPI"},
           {"Counters", "raw PMU"}, {"Isolation", "taskset + freq lock"}},
          "spectrum", 45.0f,
      },
      {
          "quip",
          "quip",
          "Jan 2026",
          "C99 · termios · POSIX · Python plugins",
          "A Unix shell written from scratch. Raw terminal mode by hand, "
          "pipelines, redirection, job control, signal handling, tab completion. "
          "Drop a .py file in the plugins folder and it grows a command.",
          {
              "The point of a shell you write yourself is that you finally see "
              "what the terminal actually is. Raw mode through termios, the "
              "process group games behind Ctrl-Z and fg, the signal semantics of "
              "SIGCHLD, the readline-style line editing and completion — all of "
              "it ordinary C once you stop treating it as magic.",
              "It runs interactively and non-interactively, keeps history on "
              "disk, survives unmatched quotes and trailing backslashes, and "
              "tracks background jobs properly. Plugins are Python files in "
              "~/.config/quip/plugins, loaded at startup and called as commands.",
          },
          {Room::Tools, Room::Learning},
          {"learning", "c", "systems"},
          {"C99", "termios", "POSIX", "signals", "Python plugins"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/quip",
          "", "",
          {{"Language", "C99"}, {"Terminal", "raw mode, hand-rolled"},
           {"Builtins", "cd · pwd · history · help · clear"},
           {"Plugins", "Python"}},
          "shell", 95.0f,
      },
      {
          "ctorrent",
          "CTorrent",
          "2026",
          "C11 · POSIX sockets · bencode · SHA-1",
          "An educational BitTorrent client. Bencoded metainfo, the info hash, "
          "the wire messages, rarest-first selection and piece verification — "
          "ordinary code you can read top to bottom. No third-party libraries.",
          {
              "Most educational clients reach for a networking framework and a "
              "crypto library. This one answers a different question: how small "
              "can a working client be when the only dependencies are the C "
              "standard library and POSIX sockets? The answer is about 2,500 "
              "lines.",
              "That constraint is the point. HTTP and HTTPS trackers with compact "
              "and dictionary peer responses; the full handshake, bitfield, have, "
              "choke, request and piece messages; 16 KiB blocks with 16 in flight "
              "per peer; rarest-first selection across up to four active pieces; "
              "SHA-1 verification of every piece against the torrent's digests.",
              "It is not fast. It is legible.",
          },
          {Room::Tools, Room::Learning},
          {"learning", "c", "network"},
          {"C11", "POSIX sockets", "BitTorrent", "bencode", "SHA-1"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/CTorrent",
          "", "",
          {{"Lines", "~2,500"}, {"Dependencies", "libc + POSIX sockets"},
           {"Block size", "16 KiB"}, {"Pieces", "SHA-1 verified"}},
          "peers", 15.0f,
      },
      {
          "presspng",
          "PressPNG",
          "2026",
          "C++17 · Win32 · CMake",
          "Compress an image to a required target file size. Five hundred "
          "kilobytes, make it so. A native desktop app and a CLI over the same "
          "engine, with no runtime dependencies.",
          {
              "The interesting constraint is that the target is a size, not a "
              "quality knob. You say how many kilobytes you are allowed and the "
              "encoder gives you the best image it can inside that budget, which "
              "means choosing the resolution, then the quantisation, then the "
              "colour depth, in an order that actually converges.",
              "The GUI is native Win32 — no Qt, no runtime, a portable build you "
              "unzip and run. The CLI is the same engine for scripts and tests, "
              "so the interesting cases are reproducible from a shell.",
          },
          {Room::Tools, Room::Coursework},
          {"coursework", "cpp", "systems"},
          {"C++17", "Win32", "CMake", "Google Test"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/PressPNG",
          "Windows build", "https://github.com/UtkarshJoshiNtl/PressPNG/releases/latest",
          {{"Interface", "Win32 GUI + CLI"}, {"Runtime deps", "none"},
           {"Constraint", "target file size"}, {"Tests", "Google Test"}},
          "compress", 270.0f,
      },
      {
          "noether",
          "noether",
          "2026",
          "C++20 · CUDA · FP64 / FP32-Kahan · paper",
          "A research engine for Hamiltonian symmetry preservation on parallel "
          "hardware: symplectic integration, deterministic parallel reductions, "
          "and mixed-precision acceleration on consumer GPUs. Backed by a paper.",
          {
              "Symplectic integrators keep a Hamiltonian system's energy bounded "
              "instead of letting it drift. On a GPU that guarantee is hard to "
              "keep, because a reduction tree reorders the floating-point "
              "associativity and the last bits change every run. The engine "
              "measures both things separately: the drift, and the "
              "non-determinism.",
              "The reductions are run a hundred times over n = 2^20 elements for "
              "every mode and precision combination, and the results are compared "
              "bit for bit. Mixed precision runs FP32 with Kahan compensation on "
              "the kick, against an IEEE-conformant FP64 baseline with no "
              "fast-math anywhere in the build.",
              "There is a four-page paper in the repository, with the figures and "
              "the raw result CSVs, because a claim without the data behind it "
              "is just a louder sentence.",
          },
          {Room::Research},
          {"gpu", "hpc", "cpp"},
          {"C++20", "CUDA", "CMake", "ctest", "FP64", "FP32-Kahan"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/noether",
          "Paper (4 pages)", "https://github.com/UtkarshJoshiNtl/noether/blob/main/paper/main.pdf",
          {{"Reduction size", "n = 2^20"}, {"Repeats", "100"},
           {"Precision", "FP64 baseline · FP32-Kahan"}, {"Drift window", "7 days"}},
          "lissajous", 220.0f,
      },
      {
          "seams",
          "seams",
          "2026",
          "Python · CUDA · MPI · cgroups",
          "A catalogue of the boundaries where compute meets memory, node meets "
          "network, compute meets storage, hardware meets software. For each "
          "seam: the theory of why it tears, a plot that exposes it, the "
          "smallest program that provokes it, and the remedy that bypasses it.",
          {
              "HPC performance rarely fails inside the algorithm. It fails at "
              "the seams — the places where two parts of a system meet, where "
              "you can substitute, observe, or cut. Under load that is also "
              "where the performance is lost.",
              "The catalogue is organised by failure mode rather than by "
              "technique, because knowing where the seams are is how you reason "
              "about a machine you have never seen. Ten of them so far: "
              "inter-node network, compute to storage, hardware to software, "
              "synchronisation and coherence, scaling and stragglers, host to "
              "accelerator, numerical reproducibility, energy and thermal, "
              "resiliency and faults, orchestration and topology.",
              "Every seam carries a status — hands-on, emulated, or theory — so "
              "you always know whether the pathology was reproduced on real "
              "hardware or merely argued about. The trigger is the smallest "
              "program that provokes it, and the remedy is the thing that "
              "bypasses it.",
          },
          {Room::Research, Room::Learning},
          {"hpc", "learning", "systems"},
          {"Python", "CUDA", "MPI", "cgroups", "tc netem", "fio"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/seams",
          "", "",
          {{"Seams", "10"}, {"Status", "hands-on · emulated · theory"},
           {"Each seam", "theory · plot · trigger · remedy"}},
          "fault", 175.0f,
      },
      {
          "warpx",
          "WarpX",
          "2026",
          "C++ · AMReX · CUDA · MPI",
          "A fork of WarpX, the Particle-In-Cell code for electromagnetic and "
          "electrostatic simulation, tracked from our own upstream at "
          "BLAST-WarpX. Read it, break it, push patches back.",
          {
              "WarpX pushes macroparticles through electromagnetic fields on a "
              "structured mesh, in parallel, on GPUs, with a dozen physics "
              "packages for the fields themselves. It is a large piece of "
              "scientific infrastructure and reading it properly is a serious "
              "exercise.",
              "This is a fork of our own upstream rather than of the canonical "
              "repository, so the tree is ours to work in. The point is not to "
              "reinvent a PIC code — it is to understand how a production "
              "simulation code is actually put together, and what the machine "
              "code underneath it is doing while it runs.",
          },
          {Room::Research, Room::Learning},
          {"fork", "hpc", "gpu"},
          {"C++", "AMReX", "CUDA", "MPI", "Python"},
          Status::Fork,
          "Repository", "https://github.com/UtkarshJoshiNtl/warpx",
          "Upstream (ours)", "https://github.com/BLAST-WarpX/warpx",
          {{"Method", "Particle-In-Cell"}, {"Upstream", "BLAST-WarpX"},
           {"Parallelism", "MPI + CUDA"}},
          "field", 285.0f,
      },
      {
          "versus",
          "Versus",
          "2026",
          "C11 · KD-tree · uniform grid · loose octree · AABB BVH",
          "Five spatial-indexing engines race on the same scene. One panel "
          "advances faster than the other; the step counts are meant to differ. "
          "A data-structures class project that became an argument about what "
          "\"fast\" means.",
          {
              "Central-gravity orbits, close approaches, collisions — the "
              "simulation is a toy, not a spacecraft model. What it is really "
              "about is the screening: finding nearby pairs of moving objects "
              "without checking every pair against every other.",
              "A KD-tree splits space into regions so distant objects are never "
              "compared. A uniform grid buckets by cell. A loose octree "
              "subdivides into nested volumes. An AABB BVH prunes on bounding "
              "boxes. Brute force checks everything, and is the baseline that "
              "makes the other four look good or bad.",
              "Both panels advance independently, so the faster engine completes "
              "more steps while the slower one is still working. The benchmark "
              "mode pins both to the same fixed step count when you want a fair "
              "measurement instead.",
          },
          {Room::Coursework, Room::Learning},
          {"coursework", "learning", "c", "systems"},
          {"C11", "KD-tree", "uniform grid", "loose octree", "AABB BVH",
           "SDL", "Win32"},
          Status::Verified,
          "Repository", "https://github.com/UtkarshJoshiNtl/Current",
          "", "",
          {{"Engines", "5"}, {"Baseline", "brute force"},
           {"Front ends", "Win32 · SDL"}, {"Language", "C11"}},
          "orbit", 30.0f,
      },
  };
  return w;
}

// ---------------------------------------------------------------------------
// Site-level text
// ---------------------------------------------------------------------------

inline const std::string& site_name() { static const std::string s = "Utkarsh Joshi"; return s; }

inline const std::string& site_role() {
  static const std::string s = "Systems, simulation, and one very bad language";
  return s;
}

inline const std::string& site_lede() {
  static const std::string s =
      "I like things that are fast for a reason, and things that are funny for "
      "the same reason. Most of what follows is the first kind. One of it is "
      "the second kind, and it is the one I would keep.";
  return s;
}

inline const std::string& site_note() {
  static const std::string s =
      "Everything here is either something I use, something I broke to learn "
      "something, or something I am building to be funny. The rooms below are "
      "named after why I made it, not after what it is about.";
  return s;
}

inline const std::string& collection_note() {
  static const std::string s =
      "Eleven works. A work can hang in more than one room, so the rooms "
      "overlap on purpose — a shell you write to learn is still a tool, and a "
      "simulation you validate is still research. Filter by subject to narrow "
      "it down.";
  return s;
}

// The subjects, in the order the filter bar shows them.
inline const std::vector<std::string>& tag_order() {
  static const std::vector<std::string> t = {
      "simulation", "gpu",      "systems",   "learning", "coursework",
      "compiler",  "network",  "hpc",       "generative", "fork",
      "c",          "cpp",      "python",    "tui",
  };
  return t;
}

inline std::vector<std::string> unique_tags() {
  std::vector<std::string> out;
  for (const auto& t : tag_order()) {
    for (const auto& w : works()) {
      bool has = false;
      for (const auto& tag : w.tags)
        if (tag == t) { has = true; break; }
      if (has) {
        out.push_back(t);
        break;
      }
    }
  }
  return out;
}

}  // namespace gallery
