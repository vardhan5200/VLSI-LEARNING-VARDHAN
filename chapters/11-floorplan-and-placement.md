# Chapter 11 — Floorplanning and placement

[Course home](../README.md) · [Course/source mapping](../resources/COURSE-MAP.md)

> Original course companion. Chapter numbering follows this guide, not individual video numbering.

## 1. Prerequisites

Read Chapters 08 and 10. A **macro** is a larger predesigned block, often memory. The **core** is the area used for internal implementation; the **die** includes the broader chip boundary. **Utilization** is an occupied-area ratio whose exact definition depends on the tool and flow.

## 2. Concept and purpose

Partitioning divides a design into manageable blocks while considering connectivity, timing, and ownership. Floorplanning chooses core dimensions, macro locations, pin locations, channels, and blockages. Power planning distributes supply and ground through a power delivery network (PDN). These decisions establish the space available for cells and wires.

Placement locates standard cells. Global placement seeks a useful overall distribution, often allowing intermediate overlap. Legalization removes overlaps and enforces rows/sites and other placement rules. Detailed placement refines local positions while preserving legality. Timing-driven placement gives important paths additional attention; routability-driven decisions seek to prevent wiring bottlenecks.

Half-perimeter wirelength (HPWL) estimates a net's span by adding the width and height of its pin bounding box. It is quick but is not the actual routed length and does not capture all obstructions or congestion. **Congestion** occurs when routing demand exceeds available resources in a region. A design with free placement area can still be difficult to route.

The PDN must manage voltage drop and current density. **IR drop** is supply loss through resistance; **electromigration (EM)** concerns material transport under current stress. The local voltage seen by cells can differ from the nominal source, affecting timing and reliability.

## 3. Worked example

Suppose standard-cell area is 0.60 mm² and a simplified planning target is 60% utilization, defined here as cell area/core area, with no macros.

Core area = 0.60/0.60 = 1.00 mm². A square core would have side 1.00 mm. At 75% utilization, the estimate becomes 0.80 mm² and side √0.80≈0.894 mm. The smaller core reduces available room for routing and later inserted cells; it is not automatically the better result.

For a net with pins at (0,0), (10,2), and (4,8) μm, bounding-box width=10 μm and height=8 μm, giving HPWL=18 μm. A routed tree may be longer because of legal tracks and obstacles.

## 4. Your turn

1. **Guided:** Estimate core area for 0.80 mm² of cells at 50% utilization under the same simplified definition. Hint: divide, do not multiply.
2. **Independent:** Compute HPWL for pins (2,3), (9,5), and (4,12) μm. Hint: subtract coordinate minima from maxima.
3. **Design:** A congested channel lies between two large memories. Propose three changes and describe what to recheck. Hint: macro orientation and pin access matter.

Write your answers before opening [the separate solutions](../solutions/11.md).

## 5. Interview reasoning

**Why leave whitespace?** Routing access, buffering, clock cells, hold fixes, and optimization need room. The right amount depends on the design and process.

**Does minimum wirelength guarantee timing closure?** No. Timing also depends on cell delays, specific critical nets, electrical load, clock distribution, and constraints.

## 6. Go deeper

Scan-cell reordering can shorten scan wiring after placement while preserving the intended test-chain behavior through updated test information. Spare cells reserve logic for later ECOs. Both need coordination with verification and test deliverables, not just a placement improvement.

## 7. Readiness check

- [ ] Explain floorplanning, global placement, and legalization.
- [ ] Calculate utilization and HPWL with stated definitions.
- [ ] Propose a congestion fix with a trade-off.
- [ ] Describe IR drop and electromigration.

Move on when you can explain your method without copying the worked example. Record remaining gaps in [your progress log](../PROGRESS.md).
