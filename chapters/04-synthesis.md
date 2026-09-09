# Chapter 04 — Synthesis and Boolean optimization

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 00 and 03. A **literal** is a variable or its complement. A **minterm** is an AND term that identifies one complete input combination. **Sum of products (SOP)** ORs together AND terms; **product of sums (POS)** ANDs together OR terms. A **don't-care** input condition permits either output value only when the specification genuinely allows it.

## 2. Concept and purpose

Synthesis translates synthesizable HDL into an implementable network. Elaboration resolves parameters and hierarchy. Process lowering converts behavioral control into muxes and storage. Optimization simplifies logic while preserving required behavior. Technology mapping chooses available cells.

Not every simulation construct describes synthesizable hardware. Testbench delays, file-driven stimulus, and arbitrary printing are simulation behavior. A fixed-bound loop can describe repeated hardware; it does not necessarily mean a processor will execute one iteration per cycle. Width, signedness, reset type, and assignment completeness all affect the result.

Two-level minimization simplifies SOP or POS expressions. Karnaugh maps arrange input combinations in Gray-code order so adjacent cells differ in exactly one variable. Legal groups contain powers of two cells; edge wrapping is allowed, diagonal grouping is not. A **prime implicant** is a valid group that cannot be enlarged; an **essential prime implicant** uniquely covers at least one required minterm.

Minimal literal count does not guarantee best PPA. A shared expression may reduce gate count while creating high fanout. A deeper network can worsen timing even when it looks algebraically elegant. Logical optimization and physical implementation must therefore be evaluated together.

## 3. Worked example

Simplify F(A,B,C)=Σm(1,3,5,7), using A as the most significant index bit.

| A B \ C | 0 | 1 |
|---|---|---|
| 00 | 0 | 1 |
| 01 | 0 | 1 |
| 11 | 0 | 1 |
| 10 | 0 | 1 |

All four ones share C=1. A and B vary through both values, so they disappear from the product term: F=C. In SOP form, `A'B'C + A'BC + AB'C + ABC = C(A'+A)(B'+B) = C`.

A direct implementation might appear to need four AND terms and an OR. After simplification, the output simply follows C. A synthesis tool may eliminate A and B from this cone. This does not mean every minimization yields a wire; here the truth table makes that reduction exact.

## 4. Your turn

1. **Guided:** Simplify F=AB+AB'. Hint: factor A.
2. **Independent:** Minimize F(A,B,C)=Σm(0,2,4,6). State the variable indexing. Hint: inspect the least significant bit.
3. **Design:** You intend a combinational selector but get a latch warning. Identify a likely RTL cause and fix it. Then explain why blindly suppressing the warning is wrong. Hint: review all control branches.

Write your answers before opening [the separate solutions](../solutions/04.md).

## 5. Interview reasoning

**Can a for-loop synthesize?** A tool-supported loop with statically determined bounds often elaborates to repeated hardware. Dynamic or unbounded behavior may not be synthesizable. Always inspect what hardware was inferred.

**Why may the shortest RTL produce a large circuit?** An arithmetic expression or indexed operation can imply many gates. Source-code length is not a reliable area metric.

## 6. Go deeper

A functional hazard is a transient output change caused by unequal delays through different paths. Boolean equivalence establishes steady-state logic, not identical transient behavior. Hazard reasoning matters in asynchronous or control-sensitive uses; do not use combinational glitches as clocks.

## 7. Readiness check

- [ ] Convert a small truth table to SOP.
- [ ] Explain a K-map grouping and its eliminated variables.
- [ ] Predict mux, latch, and register inference.
- [ ] Distinguish Boolean simplification from PPA optimization.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
