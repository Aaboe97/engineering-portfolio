---
projectId: P03
title: ICE tuning and optimisation for DTU RoadRunners EcoCar
shortTitle: Making every drop go further.
description: Testing and tuning of the Legacy single-cylinder engine for the DTU RoadRunners EcoCar, through engine and chassis dynamometer testing, ECU calibration of injection and ignition, and competition preparation for the Shell Eco-marathon.
period: '2023–2026'
type: Course project · DTU RoadRunners EcoCar
team: true
course:
  code: "41342"
  name: DTU RoadRunners
  institution: dtu
tags: [mechanical, experiments, electronics, energy]
technologies: [Engine dynamometer, Chassis dynamometer, ECU calibration, Injection & ignition tuning, Data analysis, MATLAB / Simulink, Mechanical assembly]
featureOrder: 2
order: 2
stage: case-study
visual: engine
cover:
  src: ./ecocar-on-track.jpg
  alt: The red DTU RoadRunners EcoCar, number 501, driving on the track at the Shell Eco-marathon.
  caption: The DTU RoadRunners EcoCar on track at the Shell Eco-marathon 2024.
results:
  - label: Shell Eco-marathon, EU Urban Concept ICE
    value: 1st place · 2024 & 2025
    context: DTU RoadRunners won the category with 413.83 km/l in 2024 and 517.5 km/l in 2025.
  - label: Mileage on the dynamic test stand
    value: ≈ 370 → 585 km/l
    context: Mileage improved through ECU tuning and dynamometer testing, which also found the optimal operating window for the engine temperatures (values read from the test plots).
galleryLabel: Shell Eco-marathon 2024
galleryTitle: On track.
gallery:
  - src: ./ecocar-track-front.jpg
    alt: The red EcoCar, number 501, driving towards the camera on the race track.
    caption: The EcoCar on track during the 2024 competition.
  - src: ./ecocar-start-line.jpg
    alt: The EcoCar at the start line beside a Shell Eco-marathon barrier, with a marshal signalling.
    caption: Car 501 at the start line.
  - src: ./ecocar-driver.jpg
    alt: The driver seated in the EcoCar with the door open, while team members in red jackets prepare the car.
    caption: Preparing the car and driver before a run.
  - src: ./ecocar-checks.jpg
    alt: A team member with ear defenders and a high-visibility vest checking the open EcoCar before a run.
    caption: Final checks on the car before a run.
  - src: ./paddock-from-above.jpg
    alt: The paddock seen from above, with the EcoCar on its stand among other teams' vehicles.
    caption: The EcoCar on its stand in the paddock.
  - src: ./team-photo-2024.jpg
    alt: DTU RoadRunners members in red jackets posing around the EcoCar in front of a large crowd at the Shell Eco-marathon.
    caption: DTU RoadRunners with the EcoCar at the Shell Eco-marathon 2024.
---

## The goal

At the Shell Eco-marathon, student teams compete to drive the furthest on the least energy. The DTU RoadRunners EcoCar competes in the Urban Concept ICE category, powered by the Legacy engine, a single-cylinder engine developed at DTU. The engine was already built, so the goal of this work was to get the highest possible mileage out of it through testing, calibration and tuning.

## My involvement

Team lead for engine and combustion efficiency: responsible for engine assembly and servicing, engine and chassis dynamometer testing, ECU calibration of injection and ignition, analysis of the test data, and preparing the engine for competition.

## The Legacy engine

The Legacy engine was designed at DTU specifically for the EcoCar. Its condition, combustion, cooling and control all affect the mileage, so the engine was kept as a measured and maintained system: assembled, serviced and checked before each test campaign.

<div class="figure-pair">

![CAD section view of the Legacy engine, showing the piston, connecting rod, crankshaft and the cylinder head with its valves.](./legacy-engine-cad-section.png)

Section view of the Legacy engine in CAD.

![CAD model of the complete Legacy engine, with the cylinder head, crankcase and mounting bracket.](./legacy-engine-cad.png)

The complete Legacy engine in CAD.

</div>

## Testing on the dynamometers

The engine was tested on a dynamic engine test stand, where a servomotor simulates the car's air and rolling resistance, so each run reproduces a drive at the engine shaft. A PID controller holds the cooling water temperature, and the ECU and data-logging software record each run. Alongside the stand, the complete car was tested on a chassis dynamometer.

![The EcoCar on a mobile stand outdoors, next to a workbench with two laptops.](./ecocar-testing-outdoors.jpg)

The EcoCar on its stand during test work outdoors.

In the autumn 2023 test programme, the mileage was measured against the ECU fuel correction, the fuel consumption, and the oil and water temperatures. The results spread widely, from about 370 km/l to about 585 km/l, which showed how much mileage depends on calibration and operating conditions:

<div class="figure-pair">

![Scatter plot of mileage against fuel consumption per run for the Legacy engine, falling smoothly from about 585 to about 370 km/l as consumption rises.](./test-stand-fuel-consumption.png)

Mileage against fuel used per run, from about 3.05 g (≈ 585 km/l) to about 4.8 g (≈ 370 km/l).

![Scatter plot of mileage against fuel correction for the Legacy engine, with a peak near a fuel correction of 1.10.](./test-stand-fuel-correction.png)

Mileage against ECU fuel correction. The best runs reached about 585 km/l at a correction of 1.10, against 370–425 km/l at 1.00.

</div>

<div class="figure-pair">

![Scatter plot of mileage against oil temperature for the Legacy engine, with points scattered between 500 and 590 km/l and no clear trend.](./test-stand-oil-temperature.png)

Mileage against oil temperature, with no clear trend.

![Scatter plot of mileage against cooling water temperature for the Legacy engine, rising from 75 to 83 degrees Celsius.](./test-stand-water-temperature.png)

Mileage against cooling water temperature. The trend rises from about 520 km/l at 75 °C to about 570 km/l at 82–83 °C.

</div>

The fuel correction had the largest effect: too little fuel cut the mileage sharply, while the trend flattened out at higher corrections. A warmer engine also ran more efficiently, while the oil temperature showed no clear trend. These results set the targets for the ECU calibration of injection and ignition.

## Competition

At the Shell Eco-marathon, the tuned engine had to run reliably in the car through scrutineering and every attempt, with checks and adjustments in the paddock between runs.

<div class="figure-pair">

![A team member in a red DTU jacket and ear defenders working on the EcoCar's engine bay outdoors.](./engine-work-paddock.jpg)

Work on the engine in the paddock at the 2024 competition.

![Top view of the EcoCar's engine bay, with the Legacy engine, wiring, fuel system and exhaust between the rear wheels.](./engine-bay-2024.jpg)

The EcoCar's engine bay at the 2024 competition.

</div>

## Result

DTU RoadRunners won **1st place in the EU Urban Concept ICE category at the Shell Eco-marathon in both 2024 and 2025**, with **413.83 km/l** and **517.5 km/l**. The 2024 event was attended in person. In 2025, during the MSc at TU Delft, the work on the car continued before and after the event, and the engine and calibration work from 2024 carried over into the 2025 car.
