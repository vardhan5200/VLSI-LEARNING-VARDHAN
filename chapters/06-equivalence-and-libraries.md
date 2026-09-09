# Chapter 06 — Equivalence and cell libraries

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 04–05. **Equivalence** means two models produce the same specified behavior under stated conditions. A **timing arc** relates a transition or timing requirement at one cell pin to another. **Slew** is the transition time of a signal edge; **load capacitance** represents electrical loading seen by a driver.

## 2. Concept and purpose

Combinational equivalence checks outputs for every allowed input combination. Sequential equivalence additionally deals with state, initialization/reset, and temporal correspondence. An implementation that adds a pipeline stage is not cycle-by-cycle equivalent without a suitable latency-aware relation.

Model checking asks whether properties hold over reachable states and transitions. Bounded model checking searches traces up to a chosen depth. No counterexample up to depth k is not generally an unbounded proof. Induction can establish an invariant by proving it initially and showing that every allowed transition preserves it.

Technology libraries supply the cells to which logic is mapped. A Liberty file commonly describes logical functions, timing arcs, power data, and operating conditions. A physical abstract such as LEF describes dimensions, pins, and obstructions. GDS describes detailed layout geometry. These views must correspond to the same cells and technology context.

Combinational delay depends on input transition and output load. Sequential cells include clock-to-Q delays and requirements such as setup and hold. Library tables represent characterized behavior; interpolation estimates values between characterized points. A single constant gate delay is useful for early intuition but insufficient for implementation analysis.

A **corner** is a selected process, voltage, and temperature condition. Multiple corners and modes are needed because the limiting setup, hold, and power conditions can differ. Avoid assuming that one temperature or one library represents every worst case.

## 3. Worked example

Consider an invented cell-delay table, in picoseconds:

| Input slew | Load 2 fF | Load 6 fF |
|---|---|---|
| 20 ps | 30 | 50 |
| 60 ps | 50 | 90 |

Estimate delay at 40 ps slew and 4 fF load with bilinear interpolation.

1. At 20 ps slew and the midpoint load, delay=(30+50)/2=40 ps.
2. At 60 ps slew and the midpoint load, delay=(50+90)/2=70 ps.
3. At the midpoint slew, delay=(40+70)/2=55 ps.

This assumes interpolation within the table. Do not treat it as permission to extrapolate arbitrarily beyond characterization. Real analysis also distinguishes rise/fall transitions, timing sense, and applicable arcs.

## 4. Your turn

1. **Guided:** Using the table, estimate delay at 20 ps slew and 3 fF load. Hint: 3 fF is one quarter of the way from 2 to 6.
2. **Independent:** A bounded formal check finds no failure for 20 cycles. What exactly can you claim, and what can you not claim? Hint: include the model and assumptions.
3. **Design:** A synthesized netlist differs from RTL after reset. List three inputs to your equivalence investigation. Hint: state initialization and environmental constraints matter.

Write your answers before opening [the separate solutions](../solutions/06.md).

## 5. Interview reasoning

**Why can equivalent Boolean logic have different delays?** Cell choices, drive strengths, input slew, output load, and wires affect delay independently of the steady-state function.

**Is an uninitialized RTL register necessarily equivalent to a register fixed to zero?** No. Reset/initial-state semantics must match the equivalence model. Silently constraining the RTL state to zero can hide a discrepancy.

## 6. Go deeper

Real timing libraries may use waveform/current-source models instead of only simple delay tables. Timing analysis propagates both arrival times and electrical conditions. A change in one driver's strength can change downstream slew and delays, so local gate-delay comparisons alone can be misleading.

## 7. Readiness check

- [ ] Distinguish combinational and sequential equivalence.
- [ ] State the limit of a bounded proof.
- [ ] Explain Liberty versus LEF versus GDS.
- [ ] Interpolate a cell delay and state the assumptions.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
