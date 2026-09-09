# Chapter 07 — Static timing analysis

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 00 and 06. **STA** checks timing relationships without enumerating functional simulation vectors. A **launch register** sends data; a **capture register** receives it. **Clock-to-Q (tCQ)** is the delay from the launch clock edge to its output response. **Slack** measures margin; negative slack is a violation.

## 2. Concept and purpose

For a same-clock, single-cycle register path, setup checks whether the latest data arrives early enough before the next capture edge. Hold checks whether the earliest new data arrives too soon after the current capture edge.

Define positive skew s as capture clock arrival minus launch clock arrival. For this simplified model:

- Setup slack = T + s − tsetup − Usetup − tCQ,max − dmax.
- Hold slack = tCQ,min + dmin − s − thold − Uhold.

Here T is period, d is combinational-plus-wire delay, and U is the relevant uncertainty margin. The sign convention is explicit: positive skew helps setup and hurts hold for this relationship. Real tools model early/late clock paths and other details separately.

STA represents pins/events and timing arcs as a graph. Maximum arrival times propagate for setup analysis; minimum arrival times matter for hold. A **critical path** has the worst slack in the analyzed group/scenario. An unconstrained path may escape the expected check, so checking coverage of constraints is as important as reading worst slack.

Graph-based analysis can combine pessimistic conditions from different paths. Path-based analysis refines specific paths with more consistent conditions. Variation analysis addresses differences in process, voltage, temperature, and within-chip behavior; reports are meaningful only with their analysis scenario.

## 3. Worked example

Use T=1.00 ns, s=0.05 ns, tsetup=0.10 ns, Usetup=0.05 ns, tCQ,max=0.08 ns, and dmax=0.70 ns.

Latest data arrival relative to the launch edge is 0.08+0.70=0.78 ns. Required arrival is 1.00+0.05−0.10−0.05=0.90 ns. Setup slack=+0.12 ns.

For hold, use tCQ,min=0.03 ns, dmin=0.04 ns, thold=0.04 ns, and Uhold=0.02 ns. Earliest arrival=0.07 ns; required minimum arrival=0.05+0.04+0.02=0.11 ns. Hold slack=−0.04 ns.

The same path can pass setup and fail hold. Adding at least 0.04 ns minimum data delay removes the modeled hold deficit at the zero-margin boundary; an actual fix requires margin and rechecking all scenarios. Increasing period alone does not change this same-edge hold inequality.

## 4. Your turn

1. **Guided:** What is setup slack if dmax rises to 0.85 ns and all other values stay unchanged? Hint: required arrival is unchanged.
2. **Independent:** Find the minimum period for zero setup slack using the original values. Convert it to frequency. Hint: solve the setup inequality for T.
3. **Design:** Suggest two hold fixes and explain their setup risks. Hint: consider the data path and the clock path.

Write your answers before opening [the separate solutions](../solutions/07.md).

## 5. Interview reasoning

**Why does lowering frequency usually not fix hold?** Ordinary hold checks relate to the same edge, so the next-cycle period does not appear in the simplified requirement.

**Why not add delay cells everywhere?** They consume area/power and can worsen setup. Fix identified paths with multi-corner checks rather than hiding the root cause.

## 6. Go deeper

Clock reconvergence pessimism removal can avoid counting incompatible early/late variation on a shared clock segment. Latch timing introduces transparency and time borrowing, so the flip-flop equations here must not be blindly reused for latch-based designs. CDC paths require separate crossing protocols and analysis.

## 7. Readiness check

- [ ] Calculate setup and hold slack with units.
- [ ] State your skew sign convention.
- [ ] Explain why one path can pass setup and fail hold.
- [ ] Check whether a path is constrained before interpreting its slack.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
