# VLSI LEARNING VARDHAN

An independent, practice-first companion to **VLSI Design Flow: RTL to GDS**, the NPTEL course by **Prof. Sneh Saurabh, IIIT Delhi**.

**Repository name:** `VLSI-LEARNING-VARDHAN`  
**Track:** shared VLSI fundamentals → RTL → verification → implementation → interview reasoning.

[Watch the supplied playlist](https://www.youtube.com/playlist?list=PL4PtpyzWn6WbpzsiququkQV8Wqa_LzaqR) · [Official course](https://nptel.ac.in/courses/108106191) · [Official syllabus](https://archive.nptel.ac.in/content/syllabus_pdf/108106191.pdf)

## Scope and source status

This edition contains 13 original study chapters, including a prerequisite bridge, organized around the official 12-week syllabus. These are **course-aligned explanations, not verified lecture transcripts**. The playlist title and official syllabus were checked on 9 September 2026; individual video order, timestamps, and spoken content were not retrieved. Chapter numbers are this guide's learning sequence, not YouTube lecture numbers. See [source map](resources/COURSE-MAP.md).

Every chapter contains prerequisites, concept and purpose, a worked example, graded exercises with hints, interview reasoning, an advanced extension, and a readiness check. Solutions live in separate files so you can attempt the problems first. The explanations and numerical examples are original educational material; course videos and instructor materials remain with their respective owners. No affiliation or endorsement is implied.

This is a foundation-to-interview study companion. Production sign-off and mastery require further practice with real tool reports, libraries, and reviewed projects.

## Start here

1. Work through Chapter 00 without looking at its solutions.
2. Watch the relevant course section, then read the corresponding chapter.
3. Reproduce the worked example on paper or in a simulator.
4. Solve all three exercises and write down your assumptions.
5. Check the separate solution, explain discrepancies, and update [progress](PROGRESS.md).
6. Submit your reasoning using the [review template](templates/EXERCISE-REVIEW.md).

Plan approximately 3–6 focused sessions per chapter; revisit prerequisites when needed. Do not equate completing a checkbox with being able to design independently.

## Chapters

| Chapter | Read | Practice answers |
|---|---|---|
| 00 | [Digital foundations](chapters/00-digital-foundations.md) | [Solutions](solutions/00.md) |
| 01 | [ICs, economics, and architecture](chapters/01-ics-and-architecture.md) | [Solutions](solutions/01.md) |
| 02 | [The RTL-to-silicon flow](chapters/02-design-flow.md) | [Solutions](solutions/02.md) |
| 03 | [Verilog and simulation](chapters/03-verilog-and-simulation.md) | [Solutions](solutions/03.md) |
| 04 | [Synthesis and Boolean optimization](chapters/04-synthesis.md) | [Solutions](solutions/04.md) |
| 05 | [FSMs and formal foundations](chapters/05-fsm-and-formal.md) | [Solutions](solutions/05.md) |
| 06 | [Equivalence and cell libraries](chapters/06-equivalence-and-libraries.md) | [Solutions](solutions/06.md) |
| 07 | [Static timing analysis](chapters/07-static-timing.md) | [Solutions](solutions/07.md) |
| 08 | [Constraints and technology mapping](chapters/08-constraints-and-mapping.md) | [Solutions](solutions/08.md) |
| 09 | [Power and scan testing](chapters/09-power-and-scan.md) | [Solutions](solutions/09.md) |
| 10 | [ATPG, fabrication, and interconnect](chapters/10-test-and-interconnect.md) | [Solutions](solutions/10.md) |
| 11 | [Floorplanning and placement](chapters/11-floorplan-and-placement.md) | [Solutions](solutions/11.md) |
| 12 | [Clocks, routing, and sign-off](chapters/12-clocks-routing-signoff.md) | [Solutions](solutions/12.md) |

## Build evidence of learning

- [RTL lab](labs/README.md): a parameterized counter, self-checking testbench, and generic synthesis exercise.
- [Capstones](projects/README.md): ALU, FIFO, and an RTL-to-layout evidence portfolio.
- [Free tool references](resources/TOOLS.md) and [glossary](resources/GLOSSARY.md).
- [Repository workflow](PUBLISH.md): clone the project, practice locally, and contribute corrections.

## Verification status

Relative document links and chapter structure have been checked. HDL simulation, Yosys synthesis, and physical implementation were **not run in the authoring environment**, which has no Icarus Verilog or Yosys installed. The lab includes commands and explicit expected behavior for your local verification. No fabricated timing, area, power, or sign-off results are included.
