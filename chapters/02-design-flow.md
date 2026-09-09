# Chapter 02 — The RTL-to-silicon flow

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 00–01. A **specification** states required behavior and limits. **RTL (register-transfer level)** describes stored state and the operations between registers. A **netlist** lists circuit instances and their connections. **GDSII** stores layout geometry and hierarchy.

## 2. Concept and purpose

The flow progressively adds implementation detail. Requirements lead to architecture, which leads to RTL. Functional verification checks RTL behavior against the specification. Synthesis transforms RTL into logic and maps it to library cells under constraints. Physical design places those cells and creates their wires. Extraction models electrical effects of the wires. Sign-off checks whether the resulting implementation satisfies functional, timing, power, and physical requirements.

| Stage | Main input | Main output | Question answered |
|---|---|---|---|
| Architecture | Requirements | Blocks, interfaces, timing contract | What hardware is needed? |
| RTL and simulation | Architecture | HDL and verification evidence | Does modeled behavior meet the spec? |
| Synthesis | RTL, library, constraints | Gate netlist and reports | Which cells implement it? |
| Physical implementation | Netlist, physical library, PDK | Placed and routed design | Where are cells and wires? |
| Extraction and sign-off | Routed design and rules | Parasitics and checked reports | Does implementation meet its limits? |
| Manufacturing and test | Released layout, test plan | Fabricated, tested parts | Which physical parts work? |

Verification and manufacturing testing answer different questions. Verification asks whether the design is correct; manufacturing test seeks defects in fabricated parts. **Design for test (DFT)** adds structures that make internal states controllable and observable.

This is an iterative process. A routed timing failure may require buffering, placement changes, a new pipeline stage, or a revised architecture. Each change has a different cost and may require repeating verification. Layout release, often called tape-out, is a controlled handoff; producing a GDS file alone is not evidence of sign-off.

## 3. Worked example

Specify a four-bit counter: synchronous active-high reset, increment when enable=1, hold otherwise, modulo-16 wraparound.

1. Architecture: a four-bit state register plus increment and selection logic.
2. RTL: describe reset priority and the next-state calculation.
3. Verification: check reset, increment, hold, and 15→0 behavior; reset must win when reset and enable are both high.
4. Synthesis: expect storage plus combinational logic. The exact cells depend on the library and optimization.
5. Physical design: distribute clock and power, place logic, and route connections.
6. Sign-off: inspect constraints, setup/hold, physical rules, connectivity, and other required analyses.

Notice that a simulation trace proves only the tested scenarios. A clean physical-rule report does not prove that reset priority is functionally correct.

## 4. Your turn

1. **Guided:** Which flow artifact represents cell connectivity, and which stores final layout geometry? Hint: representation changes down the flow.
2. **Independent:** Your RTL simulation passes, but post-route timing fails. Give three plausible causes. Hint: simulation may omit physical delays.
3. **Design:** Create a counter acceptance checklist with four functional tests and two implementation checks. Hint: define evidence, not just tool names.

Write your answers before opening [the separate solutions](../solutions/02.md).

## 5. Interview reasoning

**Why does synthesis need constraints?** Many equivalent circuits exist. Timing goals, loading assumptions, and other limits influence which implementation is useful.

**Can DRC prove a chip works?** No. Design-rule checking checks geometric manufacturing rules; functional verification, connectivity checks, and timing/power analysis address other requirements.

## 6. Go deeper

An engineering change order (ECO) is a controlled modification late in the flow. Even a small ECO can alter parasitics, timing, logic equivalence, and physical-rule compliance. Track the exact source revision, constraints, library versions, and tool versions with every result so it can be reproduced.

## 7. Readiness check

- [ ] Name the input and output of each major stage.
- [ ] Explain verification versus manufacturing testing.
- [ ] Trace one counter requirement to a test and an implementation check.
- [ ] Explain why timing failure can require iteration.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
