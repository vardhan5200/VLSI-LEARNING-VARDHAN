# Chapter 01 — ICs, economics, and architecture

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapter 00. A **transistor** is an electrically controlled device; in digital reasoning it is often approximated as a switch. **Silicon** is the semiconductor substrate used in many IC processes. A **die** is one chip cut from a wafer. A **wafer** is the round substrate on which many dies are fabricated.

## 2. Concept and purpose

An integrated circuit combines transistors and interconnections on a common substrate. In complementary MOS (CMOS), nMOS and pMOS devices form complementary pull-down and pull-up networks. In an ideal static CMOS inverter, a high input turns on the pull-down and a low input turns on the pull-up. Real devices leak and take time and energy to switch.

Fabrication builds patterned material layers using repeated deposition, lithography, etching, and other process steps. Designers specify geometry and connectivity using a foundry's **process design kit (PDK)**. The PDK describes manufacturing rules and models; it is not the design itself.

A **standard cell** is a predesigned function such as NAND or a flip-flop, available in a library. Standard-cell ASIC design assembles such cells. Full-custom design permits more transistor/layout tailoring but increases effort. An FPGA uses configurable hardware, trading different performance, cost, and flexibility characteristics against an ASIC.

Architecture chooses how a specification is implemented: number of processing units, data width, memories, pipeline stages, and interfaces. A **system on chip (SoC)** combines multiple subsystems; **IP** is a reusable design block with interface and integration requirements. Hardware/software partitioning asks which tasks justify dedicated circuitry.

Three common objectives are **power, performance, and area (PPA)**. They compete: parallel hardware can improve throughput while increasing area and switching. **Latency** is time per transaction; **throughput** is completed transactions per unit time. Design decisions should begin with a measurable specification, not a preferred circuit.

## 3. Worked example

Compare two hypothetical implementations of an algorithm.

- A uses one arithmetic unit and takes 8 cycles per independent transaction at 200 MHz.
- B uses four units and takes 2 cycles at the same frequency, with no overlap between transactions in either design.

The clock period is 1/(200×10^6) = 5 ns. A has 40 ns latency and 25 million transactions/s maximum throughput. B has 10 ns latency and 100 million transactions/s. B's arithmetic-unit area is approximately four times as large, but total chip area is not necessarily four times as large: control, memory, and interfaces also occupy area.

For an illustrative cost model, if a wafer costs 6,000 units, produces 500 gross dies, and has 80% die yield, fabrication cost per good die is 6000/(500×0.8) = 15 units. Packaging, testing, design cost, and overhead are excluded. This is an invented example, not a market quotation.

## 4. Your turn

1. **Guided:** Recompute fabrication cost per good die at 60% yield. Hint: only good dies recover the wafer cost.
2. **Independent:** A pipeline accepts one transaction per cycle at 100 MHz with four-cycle latency. Find latency and peak throughput after filling. Hint: these are different quantities.
3. **Design:** Choose a hardware/software split for a sensor system that filters every sample but changes communication policy often. State assumptions. Hint: compare repetitive throughput demands with ease of updating behavior.

Write your answers before opening [the separate solutions](../solutions/01.md).

## 5. Interview reasoning

**Does a smaller technology node automatically produce a cheaper product?** No. Die area, yield, wafer cost, design effort, masks, packaging, and volume all affect economics. A node label alone is insufficient.

**Why reuse IP rather than design everything?** Reuse can reduce effort, but integration still requires checking protocols, clocks, resets, timing, verification assumptions, and licensing.

## 6. Go deeper

High-level synthesis transforms behavioral descriptions into scheduled hardware. Scheduling assigns operations to cycles; resource allocation decides how many hardware units exist; binding assigns operations to those units. These choices connect the architecture's latency and throughput targets to actual resources.

## 7. Readiness check

- [ ] Explain die, wafer, PDK, cell, ASIC, FPGA, and IP.
- [ ] Calculate latency separately from throughput.
- [ ] State the limitations of a simple cost model.
- [ ] Justify an architectural trade-off using a specification.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
