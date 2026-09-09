# Chapter 00 — Digital foundations

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

No circuit background is assumed. A **signal** is a physical quantity carrying information. A **voltage** is an electrical potential difference. Digital circuits interpret ranges of voltage as logic 0 or logic 1; they do not require a signal to equal an exact ideal voltage. A **bit** holds one binary digit. A **bus** groups related bits.

## 2. Concept and purpose

A binary number uses powers of two. The rightmost bit is the least significant bit (LSB), with weight 1; the next has weight 2, then 4, then 8. An unsigned N-bit value ranges from 0 to 2^N−1. In two's complement, the most significant bit has weight −2^(N−1), giving a range of −2^(N−1) through 2^(N−1)−1.

A Boolean variable has value 0 or 1. AND requires both inputs to be 1. OR requires at least one. NOT complements a bit. XOR is 1 when two inputs differ. In Boolean algebra, juxtaposition means AND, `+` means OR, and a prime means NOT. This `+` is different from ordinary arithmetic addition.

| A | B | AND | OR | XOR |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

**Combinational logic** computes from current inputs after propagation delay. A multiplexer selects one of several inputs. For a 2:1 mux, `Y = S' A + S B`. **Sequential logic** remembers previous information. A D flip-flop samples its D input at an active clock edge and stores the result at Q. A clock is a repeated timing signal; a reset establishes a known state.

The distinction matters throughout the flow: synthesis must infer the intended gates and storage, verification must test time-dependent behavior, and timing analysis must check that data reaches a flip-flop in time.

## 3. Worked example

Add unsigned four-bit values 9 and 6.

1. Encode 9 as `1001` and 6 as `0110`.
2. Add each column, including its carry-in: the result is `1111` = 15.
3. There is no fifth-bit carry. The unsigned result fits four bits.
4. Interpret the same inputs as signed two's complement: `1001` is −7 and `0110` is +6. Their sum `1111` is −1, also valid.

Now add 7 + 3 in four-bit signed arithmetic. `0111 + 0011 = 1010`. The mathematical answer +10 lies outside −8…+7. The stored bit pattern represents −6, so signed overflow occurred even though there is no carry-out. Meaning depends on signedness and width, not the bits alone.

## 4. Your turn

1. **Guided:** Convert decimal 13 to binary; interpret `1101` as unsigned and as four-bit signed. Hint: use weights 8,4,2,1, then replace 8 with −8.
2. **Independent:** Derive a 2:1 mux truth table and explain why `S'A + SB` works. Hint: fix S first.
3. **Design:** A three-bit counter resets to zero and increments on each rising edge when enabled. Predict six enabled edges after reset and then two disabled edges. Hint: disabled means retain the previous state.

Write your answers before opening [the separate solutions](../solutions/00.md).

## 5. Interview reasoning

**Why can carry-out differ from signed overflow?** Carry-out detects an unsigned width overflow. Signed overflow detects a result outside the signed range; adding two positive values can produce a negative sign bit without a carry-out.

**Why is a register needed between combinational stages?** It stores a result and defines a cycle boundary. It adds latency and clock load, while allowing logic to be split across shorter timed paths.

## 6. Go deeper

A latch is level-sensitive: while enabled it can pass data through; a flip-flop is edge-triggered. Confusing the two changes timing behavior. Setup and hold describe the window around a sampling edge during which data must remain stable. These are physical constraints, not software scheduling rules.

## 7. Readiness check

- [ ] Convert binary values and explain signedness.
- [ ] Derive a mux from its required behavior.
- [ ] Distinguish a gate, latch, and flip-flop.
- [ ] Draw a counter trace from reset and enable inputs.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
