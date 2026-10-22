// The renderer.
//
// A gallery, not a feed. Every page is the same shell: a rail of signage on the
// left, one wall of works on the right. Rooms filter the collection; a work
// gets its own page with a bigger plate.
//
// Nothing here decides anything about layout — that is the stylesheet's job.
// This file decides what a museum wall label contains.

#pragma once

#include <string>
#include <vector>

#include "projects.hpp"
#include "util.hpp"

namespace gallery {

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------

inline std::string plate(const Work& w, int index, const std::string& cls = "") {
  std::string out = "<a class=\"plate " + cls + "\" href=\"/work/" + w.id + "/\" ";
  out += "aria-label=\"" + esc(w.title) + "\">";
  out += "<canvas data-art=\"" + esc(w.art) + "\" data-hue=\"" +
         no_number(static_cast<int>(w.hue)) + "\" data-seed=\"" +
         no_number(index * 7 + 3) + "\"></canvas>";
  out += "<span class=\"plate__veil\"></span>";
  out += "</a>";
  return out;
}

// The label.
inline std::string wall_label(const Work& w, int index) {
  std::string out;
  out += "<div class=\"label\">";
  out += "<p class=\"label__no\">№ " + two_digits(index) + "</p>";
  out += "<h3 class=\"label__title\">" + esc(w.title) + "</h3>";
  out += "<p class=\"label__medium\"><span class=\"label__year\">" + esc(w.year) +
         "</span>" + esc(w.medium) + "</p>";
  out += "<p class=\"label__note\">" + esc(w.note) + "</p>";

  if (!status_label(w.status) || std::string(status_label(w.status)) != "") {
    out += "<p class=\"label__status\"><span class=\"status status--" +
           std::string(w.status == Status::WIP ? "wip" : "done") +
           "\">" + esc(status_label(w.status)) + "</span></p>";
  }
  out += "</div>";
  return out;
}

inline std::string work_article(const Work& w, int index, const std::string& cls = "") {
  std::vector<std::string> room_slugs;
  for (Room r : w.rooms) room_slugs.push_back(room_info(r).slug);

  std::string out = "<li class=\"work " + cls + "\" data-tags=\"" +
                    esc(join(w.tags, " ")) + "\" data-rooms=\"" +
                    esc(join(room_slugs, " ")) + "\">";
  out += plate(w, index);
  out += wall_label(w, index);
  out += "</li>";
  return out;
}

inline std::string rail(const std::string& active_room) {
  std::string out = "<aside class=\"rail\">";
  out += "<a class=\"rail__mark\" href=\"/\" aria-label=\"" + esc(site_name()) + "\">";
  out += "<span class=\"rail__initials\">UJ</span></a>";

  out += "<div class=\"rail__id\">";
  out += "<a class=\"rail__name\" href=\"/\">" + esc(site_name()) + "</a>";
  if (std::string(site_role()) != "") {
    out += "<p class=\"rail__role\">" + esc(site_role()) + "</p>";
  }
  out += "</div>";

  out += "<nav class=\"rail__nav\" aria-label=\"Sections\">";
  out += "<a class=\"rail__link rail__link--head" +
         std::string(active_room.empty() ? " is-active" : "") + "\" href=\"/\">Projects</a>";
  out += "</nav>";

  out += "<div class=\"rail__foot\">";
  out += "<a href=\"https://github.com/UtkarshJoshiNtl\">GitHub</a>";
  out += "<a href=\"https://www.linkedin.com/in/utkarsh-joshi-ntl/\">LinkedIn</a>";
  out += "<a href=\"mailto:joshiutkarshntl@gmail.com\">Email</a>";
  out += "<a href=\"/resume.pdf\">Resume</a>";
  out += "<a href=\"https://codeforces.com/profile/BakedRajma\">Codeforces</a>";
  out += "</div>";
  out += "</aside>";
  return out;
}

inline std::string shell(const std::string& title, const std::string& description,
                         const std::string& active_room, const std::string& body,
                         const std::string& extra_head = "") {
  std::string out;
  out += "<!doctype html>\n<html lang=\"en\">\n<head>\n";
  out += "<meta charset=\"utf-8\">\n";
  out += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n";
  out += "<title>" + esc(title) + "</title>\n";
  out += "<meta name=\"description\" content=\"" + esc(description) + "\">\n";
  out += "<meta name=\"color-scheme\" content=\"dark\">\n";
  out += "<meta property=\"og:type\" content=\"website\">\n";
  out += "<meta property=\"og:title\" content=\"" + esc(title) + "\">\n";
  out += "<meta property=\"og:description\" content=\"" + esc(description) + "\">\n";
  out += "<meta property=\"og:image\" content=\"/og.png\">\n";
  out += "<link rel=\"icon\" href=\"/favicon.svg\" type=\"image/svg+xml\">\n";
  out += "<link rel=\"preload\" href=\"/fonts/recursive.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n";
  out += "<link rel=\"preload\" href=\"/fonts/fraunces.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n";
  out += "<link rel=\"stylesheet\" href=\"/style.css\">\n";
  out += extra_head;
  out += "</head>\n<body>\n";
  out += "<a class=\"skip\" href=\"#main\">Skip to the work</a>\n";
  out += "<div class=\"shell\">\n";
  out += rail(active_room);
  out += "<main class=\"main\" id=\"main\">\n";
  out += body;
  out += "</main>\n</div>\n";
  out += "<script src=\"/app.js\" defer></script>\n";
  out += "</body>\n</html>\n";
  return out;
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

inline std::string render_home() {
  std::string body;

  body += "<section class=\"hero\">\n";
  body += "<div class=\"hero__text\">\n";
  body += "<h1 class=\"hero__name\">" + esc(site_name()) + "</h1>\n";
  body += "<p class=\"hero__status\">currently working / self employed with badtype</p>\n";
  body += "<div class=\"hero__about\"></div>\n";
  body += "</div>\n";
  body += "</section>\n";

  body += "<section class=\"catalogue\" id=\"collection\">\n";
  body += "<header class=\"catalogue__head\">\n";
  body += "<h2 class=\"section-title\">Projects</h2>\n";
  body += "</header>\n";

  body += "<ol class=\"works\">\n";
  const auto& ws = works();
  for (size_t i = 0; i < ws.size(); ++i)
    body += work_article(ws[i], static_cast<int>(i) + 1);
  body += "</ol>\n";
  body += "</section>\n";

  body += "{{COLOPHON}}";
  return shell(site_name(), "Projects by " + site_name(), "", body);
}

inline std::string render_room(const RoomInfo& r) {
  std::string body;

  body += "<section class=\"room\">\n";
  body += "<header class=\"room__head\">\n";
  body += "<p class=\"eyebrow\">Room</p>\n";
  body += "<h1 class=\"section-title\">" + esc(r.name) + "</h1>\n";
  body += "<p class=\"room__wall\">" + esc(r.wall_text) + "</p>\n";
  body += "</header>\n";

  body += "<ol class=\"works works--room\">\n";
  const auto& ws = works();
  for (size_t i = 0; i < ws.size(); ++i) {
    bool in_room = false;
    for (Room x : ws[i].rooms)
      if (x == r.room) in_room = true;
    if (!in_room) continue;
    body += work_article(ws[i], static_cast<int>(i) + 1);
  }
  body += "</ol>\n";
  body += "</section>\n";

  body += "{{COLOPHON}}";
  return shell(r.name + " — " + site_name(), r.wall_text, r.slug, body);
}

inline std::string render_work(const Work& w, int index) {
  std::string body;

  body += "<article class=\"piece\">\n";

  body += "<header class=\"piece__head\">\n";
  body += "<p class=\"eyebrow\"><a href=\"/\">Projects</a> / № " + two_digits(index) + "</p>\n";
  body += "<h1 class=\"piece__title\">" + esc(w.title) + "</h1>\n";
  body += "<p class=\"piece__medium\">" + esc(w.year) + " &nbsp;·&nbsp; " + esc(w.medium) + "</p>\n";
  if (std::string(status_label(w.status)) != "") {
    body += "<p class=\"label__status\"><span class=\"status status--" +
            std::string(w.status == Status::WIP ? "wip" : "done") +
            "\">" + esc(status_label(w.status)) + "</span></p>\n";
  }
  body += "</header>\n";

  body += "<div class=\"piece__plate\">";
  body += "<canvas data-art=\"" + esc(w.art) + "\" data-hue=\"" +
          no_number(static_cast<int>(w.hue)) + "\" data-seed=\"" +
          no_number(index * 7 + 3) + "\"></canvas>";
  body += "</div>\n";

  body += "<div class=\"piece__body\">\n";
  for (const auto& para : w.body)
    body += "<p>" + esc(para) + "</p>\n";
  body += "</div>\n";

  if (!w.metrics.empty()) {
    body += "<dl class=\"piece__metrics\">\n";
    for (const auto& m : w.metrics) {
      body += "<div class=\"metric\"><dt>" + esc(m.label) + "</dt><dd>" +
              esc(m.value) + "</dd></div>\n";
    }
    body += "</dl>\n";
  }

  body += "<div class=\"piece__meta\">\n";
  body += "<div class=\"piece__block\">\n<p class=\"piece__key\">Rooms</p><p class=\"piece__val\">";
  for (size_t i = 0; i < w.rooms.size(); ++i) {
    if (i) body += " &nbsp;/&nbsp; ";
    body += "<a href=\"/room/" + room_info(w.rooms[i]).slug + "/\">" +
            esc(room_info(w.rooms[i]).name) + "</a>";
  }
  body += "</p></div>\n";

  body += "<div class=\"piece__block\">\n<p class=\"piece__key\">Subjects</p><p class=\"piece__val\">";
  for (size_t i = 0; i < w.tags.size(); ++i) {
    if (i) body += " &nbsp;·&nbsp; ";
    body += esc(w.tags[i]);
  }
  body += "</p></div>\n";

  body += "<div class=\"piece__block\">\n<p class=\"piece__key\">Stack</p><p class=\"piece__val\">";
  body += esc(join(w.stack, " · "));
  body += "</p></div>\n";

  body += "<div class=\"piece__block\">\n<p class=\"piece__key\">Links</p><p class=\"piece__val\">";
  body += "<a href=\"" + esc(w.repo_url) + "\" rel=\"noopener\">" + esc(w.repo_label) + "</a>";
  if (!w.upstream_url.empty())
    body += " &nbsp;·&nbsp; <a href=\"" + esc(w.upstream_url) + "\" rel=\"noopener\">" +
            esc(w.upstream_label) + "</a>";
  body += "</p></div>\n";
  body += "</div>\n";

  body += "</article>\n";

  // The next work in the catalogue, so the collection never dead-ends.
  const auto& ws = works();
  size_t next = (static_cast<size_t>(index)) % ws.size();
  body += "<nav class=\"next\"><a href=\"/work/" + ws[next].id + "/\">Next &nbsp;→&nbsp; " +
          esc(ws[next].title) + "</a></nav>\n";

  body += "{{COLOPHON}}";
  return shell(w.title + " — " + site_name(), w.note, "", body);
}

// ---------------------------------------------------------------------------
// The colophon
//
// Museum wall text, bottom of the page. It states what the page is made of, in
// bytes, because the page knows.
//
// The HTML weight is only known after the page is written, so the number is
// left a placeholder of fixed width and patched in a second pass.
// ---------------------------------------------------------------------------

struct Weights {
  std::string html;    // this page
  std::string fonts;   // all of the type on the page
  std::string css;
  std::string js;
};

inline std::string colophon(const Weights& w) {
  std::string out = "<footer class=\"colophon\">\n";
  out += "<p class=\"colophon__line\"><span class=\"colophon__n\">" + w.html +
         "</span> of HTML &nbsp;·&nbsp; <span class=\"colophon__n\">" + w.fonts +
         "</span> of type, self-hosted &nbsp;·&nbsp; <span class=\"colophon__n\">" +
         w.css + "</span> of CSS &nbsp;·&nbsp; <span class=\"colophon__n\">" + w.js +
         "</span> of script</p>\n";
  out += "<p class=\"colophon__line colophon__line--dim\">0 frameworks &nbsp;·&nbsp; 0 "
         "trackers &nbsp;·&nbsp; generated by a C++ program &nbsp;·&nbsp; "
         "<a href=\"https://github.com/UtkarshJoshiNtl/Portfolio\">source</a></p>\n";
  out += "</footer>\n";
  return out;
}

}  // namespace gallery
