# Chapter 09 — Power and scan testing

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 01, 06, and 08. **Energy** is work consumed; **power** is energy per unit time. **Capacitance** stores charge. **Leakage** is current that flows even without useful switching. **Scan** adds a test mode for shifting values through storage elements.

## 2. Concept and purpose

A first-order switching-power model is Pdyn=αCV²f, where α is the average number of 0→1 charging events per clock cycle for the modeled capacitance C, V is supply voltage, and f is clock frequency. Definitions of activity can differ; state yours to avoid a factor-of-two mistake. Short-circuit and internal-cell power may require additional modeling, and leakage contributes separately.

Reducing unnecessary activity, capacitance, voltage, or frequency can reduce switching power, but each has trade-offs. Clock gating stops unnecessary clock transitions using a safe gating structure. A naive `clk & en` can glitch when en changes while clk is high. Power gating switches off a domain's supply and adds isolation, retention, and sequencing requirements. Voltage reduction also changes timing.

Manufacturing faults can be difficult to excite and observe through normal pins. A **stuck-at fault** models a node permanently at zero or one. Scan replaces selected registers with test-capable cells and connects them into chains. Shift mode loads a state; capture mode allows the functional logic response to be sampled; shift-out mode reveals that response.

**Controllability** is the ability to set an internal value; **observability** is the ability to infer it from an observed output. Scan improves both for sequential designs. Test activity can exceed normal activity, making test-mode power and timing important.

## 3. Worked example

For α=0.2, C=20 pF, V=1.0 V, and f=100 MHz:

Pdyn=0.2×20×10^-12×1²×100×10^6=0.0004 W=0.4 mW.

At V=0.8 V with α,C,f unchanged, the result becomes 0.4×0.8²=0.256 mW, a 36% reduction. This arithmetic assumes the design still meets timing at the lower voltage; that needs separate evidence.

For scan, a chain of 100 cells requires 100 shift clocks to load one full state. At a 10 MHz shift clock, loading takes 10 μs. A separate unload also takes 10 μs; in repeated patterns, unloading the previous response can overlap loading the next pattern. Capture and control overhead remain.

## 4. Your turn

1. **Guided:** What happens to the example switching power if activity halves? Hint: α appears linearly.
2. **Independent:** Split 1,000 scan cells into 10 balanced parallel chains. How many shift clocks are required per full load, and what extra resource is needed? Hint: each chain must receive test data.
3. **Design:** Suggest two power changes for an idle-heavy block and list required correctness checks. Hint: distinguish stopping a clock from removing a supply.

Write your answers before opening [the separate solutions](../solutions/09.md).

## 5. Interview reasoning

**Does clock gating remove leakage?** No. It reduces switching associated with gated activity, while powered transistors still leak.

**Does scan prove the design's algorithm is correct?** No. It improves manufacturing test access; functional specification correctness remains a verification responsibility.

## 6. Go deeper

Glitches consume energy even when the final Boolean result is unchanged. Operand isolation prevents unused data-path switching. Power estimates depend on representative activity; a zero-activity assumption or unrepresentative simulation can produce misleading numbers. Report activity source and unannotated coverage with an estimate.

## 7. Readiness check

- [ ] Calculate dynamic power with consistent units.
- [ ] Explain why voltage scaling needs timing checks.
- [ ] Describe scan shift, capture, and observation.
- [ ] Distinguish clock gating from power gating.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
