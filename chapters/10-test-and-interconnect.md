# Chapter 10 — ATPG, fabrication, and interconnect

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 01 and 09. **ATPG** is automatic test-pattern generation. **BIST** is built-in self-test. **Resistance** opposes current flow; a wire's resistance and capacitance introduce delay. **FEOL** forms transistor structures; **BEOL** builds the interconnect stack above them.

## 2. Concept and purpose

A fault test must activate the fault and propagate its effect to an observable point. A stuck-at-0 node must be driven to 1 in the fault-free circuit; otherwise the fault cannot cause a difference. Side inputs on the propagation path must allow the difference to pass.

ATPG searches for patterns meeting these requirements. Fault coverage depends on the chosen fault model, exclusions, and denominator; it is not a universal probability that a chip has no defects. BIST supplies on-chip stimulus and response analysis. A linear-feedback shift register can produce pseudorandom sequences, while a signature register compresses responses. Compression can alias different responses to the same signature; it is not a perfect one-to-one record.

At physical scale, a wire is not an ideal zero-delay connection. Resistance increases roughly with length and decreases with cross-sectional area; capacitance depends on geometry and neighboring conductors. **Extraction** derives an RC model from layout. Coupling capacitance links nearby nets and can create noise or timing changes. The switching neighbor is an aggressor; the affected net is a victim.

Manufacturing-related concerns include antenna effects, where charge collected during processing can damage gate oxide, and geometric spacing/width rules. Mitigations are process-specific. LEF abstracts cells and routing resources so physical tools can reason about placement and routing without always loading every transistor polygon.

## 3. Worked example

Detect input A stuck-at-0 on Y=A AND B.

1. Set A=1 to activate a difference between healthy A and faulty A.
2. Set B=1 so the AND gate propagates A to Y.
3. Healthy Y=1; faulty Y=0, so observing Y detects the modeled fault.
4. If B=0, both outputs are 0 and the fault is masked.

For an illustrative lumped wire model R=200 Ω and C=50 fF, RC=10 ps. A first-order step response reaches 50% after approximately 0.69RC=6.9 ps. This toy result excludes driver resistance, distributed wire effects, coupling, and receiver load.

## 4. Your turn

1. **Guided:** Find a test for A stuck-at-1 on Y=A AND B. Hint: activate the opposite value on A.
2. **Independent:** If wire length doubles with the same cross section and approximately constant per-unit-length R and C, how does wire RC scale? Hint: both R and C change.
3. **Design:** A BIST signature matches the expected value. State what this establishes and two limitations. Hint: consider tested faults and response compression.

Write your answers before opening [the separate solutions](../solutions/10.md).

## 5. Interview reasoning

**Why does a fault need both activation and propagation?** A difference must first exist and then reach an observed point. Either step can fail.

**Why can logical neighbors be physically far apart?** Placement must satisfy many nets, density, macros, and timing objectives simultaneously. Boolean connectivity alone does not determine geometry.

## 6. Go deeper

A transition-fault test targets slow-to-rise or slow-to-fall behavior, typically requiring a launch and a timed capture. It addresses a different fault abstraction from static stuck-at testing. Interconnect coupling delay depends on relative switching direction and timing windows, which is why a single fixed wire capacitance may be inadequate for sign-off.

## 7. Readiness check

- [ ] Construct activation and propagation conditions.
- [ ] Explain scan versus ATPG versus BIST.
- [ ] Predict length scaling in a simple RC model.
- [ ] Explain parasitics, coupling, antenna effects, and LEF.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
