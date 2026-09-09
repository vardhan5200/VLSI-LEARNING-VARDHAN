# Chapter 05 — FSMs and formal foundations

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 03–04. A **finite-state machine (FSM)** has a finite set of states, transition rules, and outputs. A **Moore** output depends on state; a **Mealy** output depends on state and current inputs. A **property** is a precise claim about allowed behavior.

## 2. Concept and purpose

An FSM separates remembered history from current decisions. Write its states and transitions before writing HDL. State minimization combines states only when their observable future behavior is indistinguishable for all allowed input sequences. State encoding assigns bit patterns: binary encoding uses fewer state bits; one-hot encoding uses one bit per state and may simplify decoding. Neither is universally best.

Multi-level optimization factors common expressions. For example, `AB+AC=A(B+C)`. This can save duplicated logic but changes depth and loading. Optimization must preserve the behavior specified for all relevant inputs and states.

Formal verification reasons over a mathematical model rather than only sampled tests. A **SAT solver** asks whether Boolean constraints admit any satisfying assignment. A **BDD** represents a Boolean function as a decision graph; reduced ordered BDDs are canonical for a fixed variable order, but size can depend strongly on that order. These engines support larger verification tasks; they are not by themselves a complete verification plan.

A **counterexample** is a trace that disproves a property. **Assumptions** constrain the environment. Incorrect assumptions can exclude real bugs and make a proof misleading. Before trusting a result, check that the allowed environment includes the intended operation and that the property expresses the actual requirement.

## 3. Worked example

Design a controller that pulses `done` one cycle after accepting `start` in IDLE.

| Current state | Input condition | Next state | done (Moore) |
|---|---|---|---|
| IDLE | start=0 | IDLE | 0 |
| IDLE | start=1 | BUSY | 0 |
| BUSY | any | DONE | 0 |
| DONE | any | IDLE | 1 |

If start is sampled at edge E0 while in IDLE, the state becomes BUSY after E0. It becomes DONE after E1, asserting done for the E1→E2 cycle. Start during BUSY or DONE is ignored by this particular specification; a different interface might require queuing or backpressure.

To test equivalence of `AB+AC` and `A(B+C)`, build `m = (AB+AC) XOR A(B+C)`. Asking SAT whether m=1 can reveal a mismatch. Here distributivity makes m always zero, so no counterexample exists in the Boolean model.

## 4. Your turn

1. **Guided:** How many state bits are needed for five states using binary and one-hot encoding? Hint: find the smallest n with 2^n≥5.
2. **Independent:** Trace the controller for start held high continuously, beginning in IDLE before E0. List states after E0 through E5. Hint: start is ignored outside IDLE.
3. **Design:** Propose a property that catches a stuck-high done signal and explain one assumption that could accidentally hide the bug. Hint: reason about consecutive cycles.

Write your answers before opening [the separate solutions](../solutions/05.md).

## 5. Interview reasoning

**Is formal always better than simulation?** They provide different evidence. Formal can explore all behavior of a bounded model or prove a property under assumptions, but model size, properties, and abstractions limit what is established. Simulation supports rich scenarios and models but explores selected traces.

**Why is one-hot not automatically lower area?** It adds flip-flops but can reduce decode logic. Library, reset, timing, and switching determine the final trade-off.

## 6. Go deeper

Safety properties say something bad never happens; liveness properties say something good eventually happens. Liveness often requires fairness or progress assumptions about the environment. A proof that a request eventually completes is invalid for an interface whose environment may permanently block completion unless that behavior is addressed.

## 7. Readiness check

- [ ] Build a transition table before writing an FSM.
- [ ] Trace state and output timing at edges.
- [ ] Explain SAT, BDD, assumptions, and counterexamples.
- [ ] Distinguish safety from liveness.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
