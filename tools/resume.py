#!/usr/bin/env python3
"""Generate public/resume.pdf.

The resume is a build artefact like any other: it is generated from a script
so it can be regenerated when the collection changes, rather than being a
binary nobody can edit.

    pip install --user reportlab
    python3 tools/resume.py

Keeps the same facts as the site, in the same order, with the same
vocabulary. If the collection changes, change this file too.
"""

import os

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "public", "resume.pdf")

INK = colors.HexColor("#141414")
DIM = colors.HexColor("#5c5c5c")
RULE = colors.HexColor("#c9c9c9")

base = ParagraphStyle(
    "base", fontName="Helvetica", fontSize=9.2, leading=12.6, textColor=INK,
    alignment=TA_LEFT, spaceAfter=0,
)
name_style = ParagraphStyle(
    "name", parent=base, fontName="Helvetica-Bold", fontSize=17, leading=20,
    spaceAfter=1,
)
tag_style = ParagraphStyle(
    "tag", parent=base, fontSize=8.6, leading=11.5, textColor=DIM,
    spaceAfter=7,
)
section = ParagraphStyle(
    "section", parent=base, fontName="Helvetica-Bold", fontSize=9.4,
    leading=13, spaceBefore=10, spaceAfter=4, textColor=INK,
)
item_title = ParagraphStyle(
    "item_title", parent=base, fontName="Helvetica-Bold", fontSize=9.6,
    leading=12.4, spaceAfter=1,
)
item_meta = ParagraphStyle(
    "item_meta", parent=base, fontSize=8.4, leading=11, textColor=DIM,
    spaceAfter=2,
)
bullet = ParagraphStyle(
    "bullet", parent=base, fontSize=8.9, leading=11.9, spaceAfter=1.5,
)
bullet_left = 11


def P(text, style=base):
    return Paragraph(text, style)


def rule(width):
    """A hairline, the way the site draws them."""
    from reportlab.platypus import Flowable

    class Hairline(Flowable):
        def __init__(self, w):
            Flowable.__init__(self)
            self.width = w
            self.height = 0.5

        def draw(self):
            self.canv.setStrokeColor(RULE)
            self.canv.setLineWidth(0.5)
            self.canv.line(0, 0.25, self.width, 0.25)

    return Hairline(width)


def project(title, meta, bullets=()):
    """One work. The title, the stack as a medium, and the point of it."""
    out = [P(f"<b>{title}</b> &nbsp;<font color='#5c5c5c'>{meta}</font>", item_title)]
    if bullets:
        out.append(ListFlowable(
            [ListItem(P(b, bullet), leftIndent=bullet_left) for b in bullets],
            bulletType="bullet", start="•", leftIndent=bullet_left,
            bulletFontSize=7, bulletOffsetY=0,
        ))
    out.append(Spacer(1, 4))
    return out


story = []
W = A4[0] - 34 * mm

story += [
    P("UTKARSH JOSHI", name_style),
    P(
        "Nainital, Uttarakhand &nbsp;·&nbsp; "
        "<a href='tel:+917302728952'>+91 73027 28952</a> &nbsp;·&nbsp; "
        "<a href='mailto:joshiutkarshntl@gmail.com'>joshiutkarshntl@gmail.com</a> "
        "&nbsp;·&nbsp; "
        "<a href='https://linkedin.com/in/utkarsh-joshi-3037a6377'>"
        "linkedin.com/in/utkarsh-joshi-3037a6377</a> &nbsp;·&nbsp; "
        "<a href='https://github.com/UtkarshJoshiNtl'>github.com/UtkarshJoshiNtl</a>",
        tag_style,
    ),
    rule(W),
]

story.append(P("OBJECTIVE", section))
story.append(P(
    "Systems programmer working on simulation, numerical computing and the "
    "machine code underneath both. Started with Linux to fix a hardware "
    "problem in school, which led to C, C++, CUDA and OpenGL. Interested in "
    "software engineering internships where the work is measured."
))

story.append(P("SKILLS", section))
story.append(P(
    "<b>Languages</b> &nbsp; C, C++, Python, Bash &nbsp;&nbsp; "
    "<b>Systems</b> &nbsp; Linux/WSL2, Git, CMake, Docker, OpenMP, MPI, "
    "cgroups, perf_event_open &nbsp;&nbsp; "
    "<b>Libraries</b> &nbsp; CUDA, CuPy, NumPy, SciPy, PySide6, Textual, "
    "FastAPI, pybind11, ctypes"
))

story.append(P("SELECTED WORK", section))

story += project(
    "S-Stream",
    "lattice Boltzmann fluid workbench — Python, CuPy, PySide6 · on PyPI",
    [
        "D2Q9 BGK solver with bounce-back boundaries and Shan-Chen multiphase; "
        "the whole lattice runs on the GPU through a CuPy path.",
        "Obstacles are drawn interactively, probes are dropped into the flow and "
        "read live, and parameter sweeps run in batch.",
        "Every running simulation carries a confidence score, and capabilities "
        "are labelled Verified, Experimental or Hidden in TRUST.md. Validated "
        "against Poiseuille flow, a lid-driven cavity and measured cylinder "
        "drag coefficients — the tests are in the repository.",
    ],
)

story += project(
    "noether",
    "symplectic integration on GPUs — C++20, CUDA · with a paper",
    [
        "Measures Hamiltonian energy drift and reduction non-determinism "
        "separately, because they are different failures and a GPU makes both.",
        "Reductions are run a hundred times over n = 2^20 elements for every "
        "mode and precision combination, then compared bit for bit. Mixed "
        "precision runs FP32 with Kahan compensation on the kick against an "
        "IEEE-conformant FP64 baseline with no fast-math anywhere in the build.",
        "Four-page paper with the figures and the raw result CSVs are in the "
        "repository.",
    ],
)

story += project(
    "Visage",
    "live machine dashboard — Python, Textual, perf_event_open, eBPF",
    [
        "CPU, memory, disk, network, GPU and processes, sampled from psutil and "
        "/proc with GPU numbers from NVML.",
        "The benchmark path is the interesting one: cores pinned with taskset, "
        "CPU frequency locked, and PMU counters read straight out of "
        "perf_event_open through ctypes. Every result carries the system "
        "context that produced it.",
        "Remote monitoring over FastAPI; results export as JSON or CSV.",
    ],
)

story += project(
    "CTorrent",
    "BitTorrent client — C11, POSIX sockets · no third-party libraries",
    [
        "The constraint is the point: how small can a working client be when the "
        "only dependencies are the C standard library and POSIX sockets? "
        "About 2,500 lines.",
        "Bencoded metainfo, the info hash, the wire messages, rarest-first "
        "selection and piece verification — HTTP and HTTPS trackers, the full "
        "handshake, bitfield, have, choke, request and piece messages, 16 KiB "
        "blocks with 16 in flight per peer, SHA-1 verification of every piece.",
        "Not fast. Legible.",
    ],
)

story += project(
    "quip",
    "Unix shell written from scratch — C99, termios, POSIX",
    [
        "Raw terminal mode by hand, pipelines, redirection, job control, signal "
        "handling, tab completion, history on disk.",
        "Runs interactively and non-interactively, survives unmatched quotes and "
        "trailing backslashes, and tracks background jobs properly. Plugins are "
        "Python files loaded at startup and called as commands.",
    ],
)

story += project(
    "Simulation Zoo",
    "thirteen deterministic simulations — C++20, headless renderer",
    [
        "A self-gravitating galaxy, Gray-Scott coral, Lenia blooms, "
        "Nagel-Schreckenberg traffic, an Abelian sandpile — each with exactly "
        "one signature visual.",
        "Fixed-timestep, seeded and reproducible: the same run always produces "
        "the same frames, headless, with no display and no GPU.",
    ],
)

story += project(
    "BadType",
    "a very very horrid language — C99 type checker and REPL",
    [
        "Seven type rules, none of them about values — they are about "
        "structure, order, scope and time. Addition returns a Mood, which then "
        "behaves perfectly legally everywhere a Mood is accepted.",
        "The compiler is technically right and completely insane. Every "
        "diagnostic is hand-written. No dependencies, no CI, no badges.",
    ],
)

story += project(
    "Versus",
    "five spatial-indexing engines race — C11, KD-tree, grid, octree, BVH",
    [
        "Central-gravity orbits and close approaches, to compare how fast each "
        "index finds nearby pairs of moving objects without checking every "
        "pair against every other.",
        "Both panels advance independently, so the faster engine completes more "
        "steps while the slower one is still working; benchmark mode pins both "
        "to the same fixed step count when a fair measurement is wanted.",
    ],
)

story += project(
    "seams",
    "catalogue of where compute meets memory — Python, CUDA, MPI",
    [
        "Ten failure seams, each with the theory of why it tears, a plot that "
        "exposes it, the smallest program that provokes it, and the remedy.",
        "Organised by failure mode rather than technique, and every seam is "
        "labelled hands-on, emulated or theory, so it is always clear whether "
        "the pathology was reproduced on real hardware or merely argued about.",
    ],
)

story += project(
    "WarpX",
    "Particle-In-Cell simulation — C++, AMReX, CUDA, MPI · fork",
    [
        "A fork of our own upstream rather than of the canonical repository, so "
        "the tree is ours to work in: read it, break it, push patches back.",
    ],
)

story += project(
    "PressPNG",
    "compress an image to a required target size — C++17, Win32, CMake",
    [
        "The target is a size, not a quality knob: choose the resolution, then "
        "the quantisation, then the colour depth, in an order that converges.",
        "Native Win32 GUI and a CLI over the same engine, no runtime "
        "dependencies, Google Test for the cases that matter.",
    ],
)

story.append(P("EDUCATION", section))
story.append(P(
    "<b>Graphic Era Hill University</b>, Bhimtal, Uttarakhand<br/>"
    "B.Tech, Computer Science and Engineering &nbsp;·&nbsp; SGPA 8.71 "
    "&nbsp;·&nbsp; expected May 2029"
))

story.append(P("ACHIEVEMENTS", section))
story.append(ListFlowable(
    [
        ListItem(P("Top 10 Finalist, National Space Hackathon 2026, organised "
                   "by IIT Delhi.", bullet), leftIndent=bullet_left),
        ListItem(P("Self-study: MIT <i>Missing Semester of Computer Science</i> "
                   "completed; currently reading CS:APP.", bullet),
                 leftIndent=bullet_left),
    ],
    bulletType="bullet", start="•", leftIndent=bullet_left,
    bulletFontSize=7, bulletOffsetY=0,
))

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=17 * mm, rightMargin=17 * mm,
    topMargin=15 * mm, bottomMargin=14 * mm,
    title="Utkarsh Joshi — Resume",
    author="Utkarsh Joshi",
    subject="Systems, simulation, and one very bad language",
)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
doc.build(story)
print("wrote", OUT, os.path.getsize(OUT), "bytes")
