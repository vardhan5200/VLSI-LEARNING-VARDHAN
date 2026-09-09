# Chapter 12 — Clocks, routing, and sign-off

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 07, 10, and 11. **Clock-tree synthesis (CTS)** builds clock distribution to sinks. **Insertion delay** is source-to-sink clock latency. **Skew** is a difference in clock arrival times. **DRC**, **LVS**, and **ERC** check physical design rules, layout/netlist correspondence, and electrical rules respectively.

## 2. Concept and purpose

Before CTS, clocks may be modeled as ideal. After CTS, buffers and wires distribute the clock and introduce latency, skew, and power. The network must satisfy transition, capacitance, fanout, and timing goals. Tree and mesh architectures offer different robustness, wiring, and power trade-offs. Useful skew deliberately changes clock arrival relationships to help selected timing paths, with checks on all affected paths.

Global routing allocates coarse paths and estimates resource demand. Detailed routing chooses exact wires and vias subject to physical rules. Post-route extraction produces parasitics for timing and other analyses. Repairing a routing violation can change wire length and capacitance, so the resulting timing needs rechecking.

Sign-off integrates several independent kinds of evidence. DRC checks geometry against process rules. LVS checks extracted connectivity/devices against the intended circuit. ERC checks applicable electrical conditions. STA checks setup/hold and other timing requirements across modes/corners. Power integrity and reliability checks address supply and current concerns. Formal equivalence can check that implementation changes preserved intended logic under its model.

A report should identify design revision, tool version, libraries/PDK, constraints, scenario, errors, waivers, and remaining assumptions. Passing one report never substitutes for another. A learning project should publish actual results and limitations rather than claiming production readiness because it generated a layout file.

## 3. Worked example

A design has a path with setup slack −30 ps and hold slack +80 ps under a simplified timing scenario. Increase capture-clock latency by 40 ps while leaving launch latency and data delay unchanged.

With s defined as capture minus launch arrival, setup slack improves to +10 ps, while hold slack falls to +40 ps. This seems beneficial locally. But the same capture register may launch data on another path; delaying its clock can worsen that next path's setup. Other corners can also have smaller hold margin.

Now suppose a routing fix adds 25 ps of maximum data delay to the original path. Its setup slack becomes −15 ps. The previously passing check must be repeated after the physical change.

## 4. Your turn

1. **Guided:** In the original path above, what happens if capture latency increases by 90 ps instead of 40 ps? Hint: setup and hold respond with opposite signs.
2. **Independent:** DRC passes but LVS fails. Give two plausible causes and explain whether tape-out readiness is established. Hint: geometry and connectivity are distinct.
3. **Design:** Assemble a sign-off evidence index for the counter capstone. Name at least six artifacts and record unavailable checks honestly. Hint: include inputs as well as reports.

Write your answers before opening [the separate solutions](../solutions/12.md).

## 5. Interview reasoning

**Why can CTS create hold failures?** Real clock arrival differences can reduce hold margin compared with ideal clocks. Short data paths may need repair.

**Why recheck after an ECO?** Changed cells or wires affect function, delay, loading, and rule compliance. Evidence belongs to a specific revision, not the project name.

## 6. Go deeper

Clock-domain crossing is a protocol problem as well as a timing problem. A two-flop synchronizer can reduce the chance that a metastable single-bit control propagates, but it does not guarantee zero failure probability or coherent multi-bit transfer. Use suitable handshakes or asynchronous FIFO structures for the actual crossing requirement.

## 7. Readiness check

- [ ] Explain insertion delay versus skew.
- [ ] Predict setup/hold effects of useful skew.
- [ ] Distinguish global routing, detailed routing, and extraction.
- [ ] Explain what each sign-off report proves and does not prove.
- [ ] Present a reproducible project with explicit limitations.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
