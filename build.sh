#!/usr/bin/env bash
#
# The whole build. A C++ compiler and a shell.
#
#   bash build.sh
#
# Writes dist/. Vercel runs this; so can you.

set -euo pipefail

cd "$(dirname "$0")"

CXX="${CXX:-g++}"
mkdir -p build

"$CXX" -std=c++20 -O2 -Wall -Wextra -o build/portfolio src/*.cpp
./build/portfolio
