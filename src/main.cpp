// The generator.
//
//   g++ -std=c++20 -O2 -o build/portfolio src/*.cpp && ./build/portfolio
//
// Reads nothing, depends on nothing, writes dist/. The project list is a C++
// header because a typo in a project id should be a compile error, not a 404
// discovered by a visitor.

#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

#include "projects.hpp"
#include "render.hpp"
#include "util.hpp"

namespace fs = std::filesystem;
using namespace gallery;

namespace {

void write_file(const fs::path& p, const std::string& data) {
  fs::create_directories(p.parent_path());
  std::ofstream out(p, std::ios::binary);
  out << data;
}

unsigned long size_of(const fs::path& p) {
  std::error_code ec;
  auto n = fs::file_size(p, ec);
  return ec ? 0 : static_cast<unsigned long>(n);
}

// The colophon quotes the weight of the page it sits on. The page cannot know
// its own size until it has been written, so the number is written at a fixed
// width and patched in a second pass — the patch cannot change the length.
std::string patch_colophon(std::string html, const fs::path& path, Weights w) {
  const std::string token = "{{COLOPHON}}";
  const auto at = html.find(token);
  if (at == std::string::npos) {
    write_file(path, html);
    return html;
  }

  // First pass: a placeholder of the same width, so the page length is stable.
  w.html = kb(0);
  std::string probe = html.substr(0, at) + colophon(w) + html.substr(at + token.size());

  // Second pass: the real number, same width.
  w.html = kb(probe.size());
  std::string out = html.substr(0, at) + colophon(w) + html.substr(at + token.size());
  write_file(path, out);
  return out;
}

// Copy the static side of things: stylesheet, script, fonts, the images and
// the PDF that were always in public/.
void copy_assets(const fs::path& from, const fs::path& to) {
  if (!fs::exists(from)) return;
  for (const auto& entry : fs::recursive_directory_iterator(from)) {
    const auto rel = fs::relative(entry.path(), from);
    const auto dest = to / rel;
    if (entry.is_directory()) {
      fs::create_directories(dest);
    } else {
      fs::create_directories(dest.parent_path());
      fs::copy_file(entry.path(), dest, fs::copy_options::overwrite_existing);
    }
  }
}

}  // namespace

int main(int argc, char** argv) {
  const fs::path root = (argc > 1) ? fs::path(argv[1]) : fs::path(".");
  const fs::path src = root / "src";
  const fs::path assets = src / "assets";
  const fs::path dist = root / "dist";

  fs::remove_all(dist);
  fs::create_directories(dist);

  // Static assets first, so the colophon can quote their weight.
  copy_assets(assets, dist);
  copy_assets(root / "public", dist);

  Weights weights;
  {
    unsigned long fonts = 0;
    if (fs::exists(dist / "fonts"))
      for (const auto& e : fs::directory_iterator(dist / "fonts"))
        if (e.is_regular_file()) fonts += size_of(e.path());
    weights.fonts = kb(fonts);
    weights.css = kb(size_of(dist / "style.css"));
    weights.js = kb(size_of(dist / "app.js"));
  }

  // Pages.
  patch_colophon(render_home(), dist / "index.html", weights);

  for (const auto& r : rooms()) {
    patch_colophon(render_room(r), dist / "room" / r.slug / "index.html", weights);
  }

  const auto& ws = works();
  for (size_t i = 0; i < ws.size(); ++i) {
    patch_colophon(render_work(ws[i], static_cast<int>(i) + 1),
                   dist / "work" / ws[i].id / "index.html", weights);
  }

  // A small hand-written favicon: the same trefoil, as a single stroke.
  write_file(dist / "favicon.svg",
             "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\">"
             "<rect width=\"64\" height=\"64\" fill=\"#080808\"/>"
             "<circle cx=\"32\" cy=\"32\" r=\"19\" fill=\"none\" stroke=\"#8fb6ff\" "
             "stroke-width=\"2.5\" stroke-linecap=\"round\"/>"
             "<circle cx=\"32\" cy=\"32\" r=\"7\" fill=\"none\" stroke=\"#8fb6ff\" "
             "stroke-width=\"2.5\"/></svg>\n");

  // Report.
  unsigned long total = 0;
  for (const auto& entry : fs::recursive_directory_iterator(dist))
    if (entry.is_regular_file()) total += size_of(entry.path());

  std::cout << "dist/ written — " << ws.size() << " works, " << rooms().size()
            << " rooms, " << total / 1024 << " KB total\n";
  for (const auto& entry : fs::recursive_directory_iterator(dist))
    if (entry.is_regular_file())
      std::cout << "  " << std::setw(7) << size_of(entry.path()) / 1024 << " KB  "
                << fs::relative(entry.path(), dist).string() << "\n";
  return 0;
}
