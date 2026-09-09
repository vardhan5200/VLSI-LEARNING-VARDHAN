# Capstone progression

[Home](../README.md)

Each project needs a specification, implementation, verification evidence, and an explanation of trade-offs. Suggested projects below are briefs, not already completed implementations.

## Project 1 — Four-bit ALU

**Begin after:** Chapters 00–04.

Implement four-bit ADD, SUB, AND, OR, and XOR selected by an opcode. Define behavior for unused opcodes. Explicitly distinguish an unsigned carry/borrow indicator from signed overflow; define whether each flag is meaningful for non-arithmetic operations.

Start by writing the truth/reference behavior. Exhaustively test all 16×16 operand pairs for every defined opcode. For ADD, compare a five-bit arithmetic reference; for signed overflow, check the range of the mathematical signed result. For SUB, state whether your flag means borrow or no-borrow. Never infer the convention from a signal name alone.

**Deliver:** specification, RTL, independent testbench/reference, complete run log, and generic synthesis comparison. Explain 7+3, 15+1 unsigned, 0−1 unsigned, and −8−1 signed. Generic gate counts are not foundry area.

**Extension:** register the output and update the testbench for added latency. Compare combinational versus pipelined interfaces.

## Project 2 — Synchronous FIFO

**Begin after:** Chapters 05–09.

Implement an eight-entry, eight-bit FIFO in a single clock domain. Define accepted operations when full/empty, simultaneous push/pop behavior, output-valid timing, reset, and whether the output is registered or first-word-fall-through. Decide explicitly whether a simultaneous pop permits accepting a push while full.

Create a software queue reference from this contract. Exercise fill, drain, pointer wrap, rejected accesses, reset with data present, and simultaneous requests at empty/full/intermediate occupancy. Check order preservation: accepted data must emerge once, in order, with no loss or duplication.

**Deliver:** architecture diagram, operation table, RTL, reference model, directed and reproducible randomized tests, occupancy assertions, and synthesis evidence. Prove or explain the invariant 0≤occupancy≤8 under your acceptance rules.

**Extension:** compare memory implementation choices. Do not turn it into an asynchronous FIFO merely by giving read and write separate clocks; that requires a new CDC architecture and verification plan.

## Project 3 — Counter or FIFO from RTL to layout

**Begin after:** Chapters 10–12, and only after functional verification.

First run an unmodified supported OpenROAD flow example with its supported platform. Record tool/PDK/library versions and resource needs. Then adapt a small verified design. Define clock period, I/O timing, input transition, and output load using a stated interface model. Review all unconstrained paths.

Collect synthesis, floorplan, placement, CTS, routing, extraction, timing, and available physical verification outputs. For each stage, record its exact input revision, warnings, output artifact, and unresolved issues. Compare at least two justified clock/area planning choices under the same conditions.

| Evidence | Acceptance reasoning |
|---|---|
| Functional tests | Required scenarios checked, with failures investigated |
| Synthesis | Intended storage/logic, no unexplained inference issues |
| Constraint review | Relevant paths covered; exceptions justified |
| Timing | Setup/hold assessed for explicitly listed scenarios |
| Physical checks | Actual DRC/LVS results or an explicit not-run status |
| Reproducibility | Tool versions, platform, commands, and source revision retained |

An educational flow result is not automatically production tape-out sign-off. Explain which analyses were unavailable. Do not fabricate power/area numbers or mark a missing report clean.

## Interview presentation

Prepare a five-minute explanation: requirement → architecture → hardest bug → evidence of the fix → measured trade-off → remaining limitation. Be ready to alter a requirement and predict which stages need rework.
