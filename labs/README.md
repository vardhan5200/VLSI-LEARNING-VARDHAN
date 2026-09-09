# Lab 01 — A counter you can explain

[Home](../README.md) · [RTL](rtl/counter.v) · [Testbench](tb/counter_tb.v) · [Synthesis script](synth.ys)

## Specification

A W-bit unsigned counter, W≥1. On a rising clock edge: reset=1 sets q=0; otherwise enable=1 increments modulo 2^W; otherwise q holds. Reset is synchronous and has priority over enable. Power-up state before the first sampled reset is unspecified. Inputs must meet physical sampling requirements in a real implementation.

## Before running

Draw a four-bit register, incrementer, and the selection behavior. Predict reset, hold, and 15→0. Read Chapters 00, 03, and 04. Install tools using the [official references](../resources/TOOLS.md). On Windows, a Linux environment such as WSL can be used; the commands below assume a shell with the tools on PATH.

## Simulate

From the repository root:

```bash
mkdir -p build
iverilog -g2012 -s counter_tb -o build/counter_sim labs/rtl/counter.v labs/tb/counter_tb.v
vvp build/counter_sim
```

Expected successful terminal result: `PASS: 25 directed checks`. The waveform is `build/counter.vcd`. Inspect clk, rst, en, and q in a VCD viewer. The first reset initializes q; unknown values before that are allowed by the specification.

The testbench checks reset, zero hold, every count value, wraparound, nonzero hold, reset-over-enable priority, and synchronous reset timing. It drives inputs on falling edges and samples after rising-edge state updates. Testbench delays model stimulus/sampling, not hardware delays.

## Synthesize

```bash
mkdir -p build
yosys -l build/synthesis.log labs/synth.ys
```

Read the log and `build/counter_netlist.v`. Identify storage, increment logic, and enable/reset selection. Explain why holding q in an edge-triggered block is intentional storage, whereas missing combinational assignments can infer a latch.

This is **generic synthesis**, not mapping to a chosen foundry library. It does not produce meaningful foundry area, timing, power, or GDS. Physical implementation additionally needs compatible technology libraries, PDK data, constraints, and a configured flow. Record the installed tool versions with your result.

## Strengthen the evidence

1. Break reset priority intentionally and confirm the directed test fails; then restore it.
2. Change the increment to two, confirm failure, and restore it.
3. Add parameter tests for W=1 and W=8 using matching expected-value widths.
4. Add pseudorandom enable/reset stimuli with an independently written reference model; record a reproducible seed.
5. Explain which bugs directed simulation cannot rule out.

## Submission

Use the [review template](../templates/EXERCISE-REVIEW.md). Include the specification interpretation, tool version, exact command, complete log, a short waveform explanation, and one discovered mistake. Do not mark a tool stage passed if it was not run.

## Authoring status

The code and expected trace were reviewed, but HDL simulation and synthesis were not executed in the authoring environment. Your local run is the next verification step.
