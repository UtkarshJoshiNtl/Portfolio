#pragma once

#include <cctype>
#include <cstdio>
#include <string>
#include <vector>

namespace gallery {

// HTML-escape. Everything interpolated into a page goes through this.
inline std::string esc(const std::string& s) {
  std::string out;
  out.reserve(s.size() + 16);
  for (char c : s) {
    switch (c) {
      case '&':  out += "&amp;";  break;
      case '<':  out += "&lt;";   break;
      case '>':  out += "&gt;";   break;
      case '"':  out += "&quot;"; break;
      case '\'': out += "&#39;";  break;
      default:   out += c;        break;
    }
  }
  return out;
}

// A fixed-width byte formatter, so that swapping the real number in later
// cannot change the length of the page it is printed on.
inline std::string kb(unsigned long bytes) {
  double v = static_cast<double>(bytes) / 1024.0;
  char buf[32];
  std::snprintf(buf, sizeof(buf), "%6.1f KB", v);
  return std::string(buf);
}

inline std::string join(const std::vector<std::string>& items,
                        const std::string& sep = " · ") {
  std::string out;
  for (size_t i = 0; i < items.size(); ++i) {
    if (i) out += sep;
    out += items[i];
  }
  return out;
}

inline std::string two_digits(int n) {
  char buf[8];
  std::snprintf(buf, sizeof(buf), "%02d", n);
  return std::string(buf);
}

inline std::string no_number(int n) {
  char buf[16];
  std::snprintf(buf, sizeof(buf), "%d", n);
  return std::string(buf);
}

}  // namespace gallery
