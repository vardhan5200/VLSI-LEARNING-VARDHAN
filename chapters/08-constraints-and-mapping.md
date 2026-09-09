# Chapter 08 — Constraints and technology mapping

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 06–07. A **constraint** communicates a timing or implementation requirement. **SDC** is a Tcl-based constraint format used by many tools. A **clock domain** groups logic with a related clock. **Fanout** counts driven loads; capacitance and wiring determine the actual electrical burden.

## 2. Concept and purpose

Constraints describe the operating environment. A clock definition establishes period and waveform. Input delays describe external arrival timing relative to a reference clock; output delays describe external capture requirements. Minimum and maximum constraints serve different analyses. Input slew and output load describe electrical conditions.

A **false path** is intentionally excluded from a particular timing analysis because that timing relationship is not functionally required. A **multicycle path** has a valid architectural reason for a different launch/capture relationship. Neither exception repairs faulty hardware. Every exception needs justification and a check that the selected objects are exactly the intended ones.

Technology mapping covers logic with available library functions and sizes. Optimizations may resize cells, buffer high-fanout nets, duplicate logic, or restructure a cone. Larger drivers may reduce a heavily loaded net's delay while increasing their own input loading and power. Physical context decides whether the change is beneficial.

A generated clock describes a derived clock relationship. Asynchronous domains need suitable CDC structures and a reviewed timing policy. Declaring domains asynchronous does not create a synchronizer or make data transfer correct.

## 3. Worked example

Suppose the receiving chip samples data every 10 ns. An external sender can present input data as late as 2 ns after the shared reference edge, and this chip's output must satisfy a hypothetical external requirement represented by a 3 ns maximum output delay.

Illustrative SDC, with time units explicitly assumed to be nanoseconds and port names matched to the counter lab:

```tcl
create_clock -name core_clk -period 10.0 [get_ports clk]
set_input_delay -clock core_clk -max 2.0 [get_ports {en rst}]
set_input_delay -clock core_clk -min 0.5 [get_ports {en rst}]
set_output_delay -clock core_clk -max 3.0 [get_ports {q[*]}]
set_output_delay -clock core_clk -min -0.2 [get_ports {q[*]}]
```

The numbers are invented interface budgets, not values to copy into a real design. Output-delay minimum can be negative when modeling an external hold requirement. Real budgets must be derived from external device timing and board delays. Clock uncertainty, input transition, and output load also need appropriate values for a physical run.

## 4. Your turn

1. **Guided:** A 10 ns cycle has a 2 ns input arrival budget and a 1 ns capture setup requirement. Ignoring other terms, what internal combinational budget remains? Hint: subtract consumed time.
2. **Independent:** Why must input delay normally have both min and max values? Hint: consider earliest and latest data.
3. **Design:** A colleague proposes a false-path exception for a failing active data path. Explain what evidence would justify the exception and what to do if it is required every cycle. Hint: start from the protocol.

Write your answers before opening [the separate solutions](../solutions/08.md).

## 5. Interview reasoning

**Can positive slack with incomplete constraints be trusted?** It only describes analyzed paths. Missing clocks or I/O constraints may leave relevant behavior unchecked.

**Does upsizing always speed up the whole path?** No. It changes input loading, slew, placement, and wiring. Recompute the affected path and check power/area and hold.

## 6. Go deeper

Multicycle setup exceptions often require a corresponding hold relationship adjustment, but the exact commands depend on start/end semantics and clock relationships. Derive the intended launch and capture edges on a timeline and inspect the tool report; do not paste a universal pair of commands without understanding it.

## 7. Readiness check

- [ ] Explain clock, I/O delay, input slew, and output load.
- [ ] Identify which constraints are invented in the example.
- [ ] Justify timing exceptions from the architecture.
- [ ] Explain one mapping optimization and its side effects.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
