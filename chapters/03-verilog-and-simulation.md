# Chapter 03 — Verilog and simulation

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 00–02. A **module** is an HDL block with input/output ports. A **testbench** supplies stimuli and checks behavior. A **simulator** evaluates an executable model of the HDL. In traditional Verilog, `wire` represents a driven net; `reg` is a procedural variable and does not by itself imply a physical register.

## 2. Concept and purpose

HDL describes concurrent hardware. A continuous assignment such as `assign y = s ? b : a;` represents a mux; it is not a line that a processor executes once. An `always @*` block describes combinational behavior if every output is assigned on every path. Incomplete assignments can imply retained state and infer a latch.

A clocked block such as `always @(posedge clk)` describes edge-triggered state updates. Use nonblocking assignments (`<=`) for ordinary sequential state updates. Right-hand sides are evaluated using the old state and updates are scheduled for later in the simulation time step. Blocking assignments (`=`) are useful for ordered combinational calculations. This convention helps avoid simulation-order dependence.

Verilog models 0, 1, unknown `x`, and high-impedance `z`. Unknowns can expose uninitialized state or conflicting drivers. The testbench should reject an unknown output instead of accidentally treating it as a match. Case inequality (`!==`) is useful for that purpose.

Verification starts from the spec: determine reset behavior, legal operations, boundary values, and simultaneous conditions. A **reference model** computes expected results; a **scoreboard** compares expected and observed outputs. **Coverage** measures what scenarios or structures were exercised. High coverage does not prove correctness if checks or requirements are missing.

## 3. Worked example

Consider two registers initially `a=1`, `b=0`:

```verilog
always @(posedge clk) begin
  a <= b;
  b <= a;
end
```

At the rising edge, the first right-hand side sees old b=0; the second sees old a=1. After nonblocking updates, a=0 and b=1: the registers swap. If both lines used blocking assignments in this block, a would become 0 before the second line read it, leaving both values 0 in simulation.

The [counter lab](../labs/README.md) uses synchronous reset: asserting reset between edges does not immediately change Q. A testbench drives control signals on falling edges and checks outputs shortly after rising edges, avoiding a race with the design's state updates.

## 4. Your turn

1. **Guided:** Predict `a,b` after a second edge in the swap example. Hint: both expressions read the prior state.
2. **Independent:** Explain what hardware `always @* if (en) q = d;` requests. Rewrite it as a combinational mux with a separate input `fallback`. Hint: assign q when en=0 too.
3. **Design:** Run or manually trace the counter lab. Add a directed test for reset and enable asserted together. Explain expected priority before examining the code. Hint: begin from nonzero Q.

Write your answers before opening [the separate solutions](../solutions/03.md).

## 5. Interview reasoning

**Does `reg` always create a flip-flop?** No. The assignment context and completeness determine hardware. A reg assigned completely in combinational logic need not become storage.

**Why can a testbench pass while the design is wrong?** It may omit corner cases, use the same incorrect assumption as the RTL, or check at the wrong simulation time. Derive checks from the specification.

## 6. Go deeper

Simulation has event scheduling regions; a clock edge and its nonblocking updates occur at the same simulated time but different processing stages. A `#1` sampling delay in the small lab is a pedagogical way to wait for updates, not an RTL timing requirement or a complete professional verification methodology.

## 7. Readiness check

- [ ] Explain concurrent HDL execution.
- [ ] Predict nonblocking assignment results.
- [ ] Recognize incomplete combinational assignments.
- [ ] Explain what each counter test checks and what remains untested.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
