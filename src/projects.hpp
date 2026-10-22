// The collection.

#pragma once

#include <string>
#include <vector>

namespace gallery {

enum class Room {
  Works,
};

enum class Status {
  Done,
  WIP,
};

struct RoomInfo {
  Room room;
  std::string slug;
  std::string name;
  std::string wall_text;
};

struct Metric {
  std::string label;
  std::string value;
};

struct Work {
  std::string id;
  std::string title;
  std::string year;
  std::string medium;
  std::string note;
  std::vector<std::string> body;
  std::vector<Room> rooms;
  std::vector<std::string> tags;
  std::vector<std::string> stack;
  Status status;

  std::string repo_label;
  std::string repo_url;

  std::string upstream_label;
  std::string upstream_url;

  std::vector<Metric> metrics;

  std::string art;
  float hue;
};

inline const std::vector<RoomInfo>& rooms() {
  static const std::vector<RoomInfo> r = {
      {Room::Works, "works", "Works", ""},
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
    case Status::Done: return "";
    case Status::WIP:  return "WIP";
  }
  return "";
}

inline const std::vector<Work>& works() {
  static const std::vector<Work> w = {
      {
          "badtype",
          "BadType",
          "2026",
          "C99 · type checker · REPL",
          "A very very horrid language, worse than jellied eel and the french (people).",
          {
              "A type checker and REPL for a deliberately awful language.",
          },
          {Room::Works},
          {"compiler", "c"},
          {"C", "C99", "REPL"},
          Status::WIP,
          "Repository", "https://github.com/UtkarshJoshiNtl/badtype",
          "", "",
          {},
          "lattice", 340.0f,
      },
      {
          "s-stream",
          "S-Stream",
          "May 2026",
          "Python · CuPy · PySide6",
          "A lattice Boltzmann fluid workbench. Ships on PyPI.",
          {
              "D2Q9 BGK with bounce-back boundaries.",
          },
          {Room::Works},
          {"simulation", "gpu", "python"},
          {"Python", "CuPy", "PySide6", "OpenGL"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/S-Stream",
          "PyPI", "https://pypi.org/project/s-stream/",
          {},
          "flow", 200.0f,
      },
      {
          "simulation-zoo",
          "Simulation Zoo",
          "2026",
          "C++20",
          "A lattice Boltzmann fluid workbench / Simulation Zoo. Thirteen deterministic simulations: self-gravitating galaxy, Gray-Scott coral, Lenia blooms, Nagel-Schreckenberg traffic, Abelian sandpile, and more.",
          {
              "C++20, headless renderer, seeded RNG.",
          },
          {Room::Works},
          {"simulation", "cpp"},
          {"C++20", "CMake"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/SimulationZoo",
          "", "",
          {},
          "ca", 150.0f,
      },
      {
          "visage",
          "Visage",
          "July 2026",
          "Python · Textual",
          "A live terminal dashboard for CPU, memory, disk, network, GPU, processes, and a benchmark mode.",
          {
              "Live TUI with a benchmark mode.",
          },
          {Room::Works},
          {"tui", "python"},
          {"Python", "Textual"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/Visage",
          "", "",
          {},
          "spectrum", 45.0f,
      },
      {
          "quip",
          "quip",
          "Jan 2026",
          "C99",
          "A Unix shell written from scratch. Has a Python plugin system.",
          {
              "Raw terminal mode, pipelines, redirection, job control, signals, tab completion.",
          },
          {Room::Works},
          {"c"},
          {"C99", "termios", "POSIX"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/quip",
          "", "",
          {},
          "shell", 95.0f,
      },
      {
          "ctorrent",
          "CTorrent",
          "2026",
          "C11 · POSIX sockets",
          "A BitTorrent client to understand metadata, wiring, and messages. No third-party libraries.",
          {
              "Bencoded metainfo, handshake, messages, piece transfer.",
          },
          {Room::Works},
          {"c", "network"},
          {"C11", "POSIX sockets"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/CTorrent",
          "", "",
          {},
          "peers", 15.0f,
      },
      {
          "presspng",
          "PressPNG",
          "2026",
          "C++17 · Win32",
          "A mandatory OOPS project for coursework. C++ with no dependencies.",
          {
              "GUI and CLI over the same engine.",
          },
          {Room::Works},
          {"cpp"},
          {"C++17", "Win32"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/PressPNG",
          "", "",
          {},
          "compress", 270.0f,
      },
      {
          "noether",
          "noether",
          "2026",
          "C++20 · CUDA",
          "An attempt at researching Hamiltonian symmetry preservation on parallel hardware.",
          {
              "Symplectic integration and reductions on GPUs.",
          },
          {Room::Works},
          {"gpu", "cpp"},
          {"C++20", "CUDA"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/noether",
          "", "",
          {},
          "lissajous", 220.0f,
      },
      {
          "seams",
          "seams",
          "2026",
          "Python · CUDA · MPI",
          "A catalogue of boundaries where problems happen in computing.",
          {
              "Compute/memory, network, storage, hardware/software.",
          },
          {Room::Works},
          {"python"},
          {"Python", "CUDA", "MPI"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/seams",
          "", "",
          {},
          "fault", 175.0f,
      },
      {
          "versus",
          "Versus",
          "2026",
          "C11",
          "A mandatory DS project for coursework. Five spatial-indexing engines pitted against each other.",
          {
              "KD-tree, uniform grid, loose octree, AABB BVH, brute force.",
          },
          {Room::Works},
          {"c"},
          {"C11"},
          Status::Done,
          "Repository", "https://github.com/UtkarshJoshiNtl/Current",
          "", "",
          {},
          "orbit", 30.0f,
      },
  };
  return w;
}

inline const std::string& site_name() { static const std::string s = "Utkarsh Joshi"; return s; }

inline const std::string& site_role() { static const std::string s = ""; return s; }

inline const std::string& site_lede() { static const std::string s = ""; return s; }

inline const std::string& site_note() { static const std::string s = ""; return s; }

inline const std::string& collection_note() { static const std::string s = ""; return s; }

inline const std::vector<std::string>& tag_order() {
  static const std::vector<std::string> t = {
      "simulation", "gpu", "systems", "python", "cpp", "c", "network", "tui",
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
