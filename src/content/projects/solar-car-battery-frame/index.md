---
projectId: "P04"
title: "Battery frame and cooling for DTU RoadRunners Solar Car"
shortTitle: "Packaging energy into a vehicle."
description: "A welded aluminium battery frame for the DTU RoadRunners solar car, designed to hold six battery modules with their cooling plates, to survive the 20 G crash load required by the Bridgestone World Solar Challenge, and to keep the centre of gravity low."
period: "2023–2024"
type: "Course project · DTU RoadRunners Solar Car"
team: false
course:
  code: "41342"
  name: DTU RoadRunners
  institution: dtu
tags: ["mechanical","energy"]
technologies: ["Onshape","CAD","Technical drawings","Aluminium 6061","Structural testing","Liquid cooling"]
featureOrder: 4
order: 4
stage: case-study
visual: "battery"
cover:
  src: ./battery-bank-cad.png
  fit: contain
  alt: CAD render of the battery bank, two aluminium frames each holding three battery modules, with blue cooling plates between the modules.
  caption: The battery bank in Onshape. Two identical frames each hold three battery modules, with cooling plates (blue) between them.
results:
  - label: Peak load in strength test
    value: ≈ 60 kN
    context: About three times the 20 kN required by the 20 G crash rule, read from the load curve of the second displacement test.
  - label: Battery modules carried
    value: 6 × VW ID.3
    context: In two identical frames of three, so the car can also run with half the battery for events that need less capacity.
galleryLabel: From the project
galleryTitle: Design, build, test.
gallery:
  - src: ./battery-frame-cad.png
    alt: CAD render of a single battery frame, a welded rectangular aluminium structure with cross members at each end.
    caption: A single battery frame, 320 × 310 × 667 mm, designed to hold three modules and their cooling plates.
  - src: ./strength-test-plot.png
    alt: Plot of load and displacement against time for two displacement tests of the battery frame, with the load rising to about 60 kN.
    caption: Load (red) and displacement (blue) in the two displacement tests. The second test reached about 60 kN at 50 mm displacement.
  - src: ./frame-after-test-photo.jpg
    alt: Photo of the welded aluminium battery frame on the floor after testing, with visible bending in parts of the frame.
    caption: The manufactured frame after the displacement test, with visible bending in some members.
---

## The goal

The battery frame has to hold the solar car's battery modules securely, protect them in a collision and carry their cooling plates, while keeping the car light and stable. This project developed the frame for the DTU RoadRunners solar car, from requirements to a manufactured and strength-tested part.

<div class="figure-pair">

![The dark composite body of the DTU RoadRunners solar car on foam blocks in the workshop, seen from the front left.](./solar-car-body-left.jpg)

The body of the DTU RoadRunners solar car in the workshop.

![The DTU RoadRunners solar car body seen from the front, with sponsor stickers on the nose.](./solar-car-body-front.jpg)

The same car from the front.

</div>

## My involvement

Responsible for the full development of the battery frame: the structural requirements and material selection, the CAD design and production drawings in Onshape, the integration of the cooling plates and testing of the cooling, and the strength testing of the manufactured frame.

## Requirements

The design was driven by the Bridgestone World Solar Challenge (BWSC) 2023 regulations:

| Requirement | Value |
|---|---|
| Crash load (BWSC 2023, §2.5.13) | 20 G in any direction |
| Mass per frame with modules and cooling plates | 100 kg |
| Required load per frame | 20 kN |
| Battery modules | 6 × VW ID.3 LGX E78 |
| Access | Batteries accessible for scrutineering |

Design requirements for the battery frame. The 20 kN follows from 100 kg at 20 G.

## Design

The main objective was to keep the **centre of gravity as low as possible**, which was given priority over weight distribution. The result is a long, low battery pack, with some modules sitting outside the wheelbase. The pack is split into **two identical frames of three modules**. This makes it modular: one frame can be removed for events such as the iLumen Solar Challenge, which need less battery capacity. Each frame measures 320 × 310 × 667 mm and holds its modules and cooling plates in one structure.

![CAD render of the solar car with a transparent body, showing the long, low battery bank between the rear wheels.](./battery-bank-in-car.png)

The battery bank integrated in the solar car. The long, low layout keeps the centre of gravity down.

## Cooling

Each module is cooled by a liquid cooling plate mounted in the frame, six plates in total. To verify the plates, a test loop with an off-the-shelf pump and hoses was assembled, which confirmed that the cooling system worked for the battery modules.

## Manufacturing and strength testing

The frame was made from **aluminium 6061**, chosen for its cost and its good heat treatment after welding, and was machined and welded in the DTU workshops from the production drawings. A full crash test was not practical, so the frame was instead bolted to a test bench and pulled along the car's driving direction in a displacement test, which simulates a head-on collision as a slow, steady load. The second test reached about **60 kN**, three times the 20 kN requirement, at 50 mm displacement, with visible bending in parts of the frame afterwards.

<div class="figure-pair">

![An orange steel test rig with a steel plate being built on a welding table.](./test-rig-build.jpg)

The test rig being built on the welding table.

![The orange test rig with the frame mounted in a hydraulic test machine, with a pull rod through the middle.](./test-rig-in-machine.jpg)

The frame mounted in the rig in the hydraulic test machine.

</div>

## Outcome

In testing, the frame carried three times the load required by the BWSC 2023 regulations. In June 2024, however, the BWSC 2025 regulations changed the Cruiser class so that the chosen battery modules were no longer allowed. As the frame was sized for these modules, the work was paused until new modules were selected.
