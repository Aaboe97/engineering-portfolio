---
projectId: "P005"
title: "Motor selection and testing for DTU RoadRunners Solar Car"
shortTitle: "From power requirement to test stand."
description: "Selection of the drive motors for the DTU RoadRunners solar car: power and acceleration modelling in Python, a dual-motor configuration, a CNC-machined motor test stand, and virtual dyno efficiency maps of the candidate motors."
period: "2024"
type: "Special course · DTU RoadRunners Solar Car"
team: false
course:
  name: Special course (10 ECTS)
  institution: dtu
tags: ["mechanical","energy","numerical"]
technologies: ["Python","MATLAB","VESC Tool","CAD","CNC machining","Motor efficiency mapping"]
order: 7
stage: case-study
visual: "motor"
cover:
  src: ./test-stand-cover.jpg
  alt: The motor test stand, with a Torqstar motor and a Bioboard motor mounted on aluminium plates on either side of a machined aluminium shield cylinder.
  caption: The finished test stand, with a Torqstar motor (left) and a Bioboard motor (right) coupled through the aluminium shield cylinder.
results:
  - label: Simulated 0–80 km/h
    value: 23.1 s
    context: With the selected Torqstar 7040-16 and 7050-11 pair, against a requirement of 30 s.
  - label: Grade
    value: 12 / 12
    context: The top grade on the Danish 7-point scale, for a 10 ECTS special course at DTU.
---

## The goal

The motor sets the efficiency, reliability and power-to-weight ratio of a solar car. This special course set out to select the drive motors for the DTU RoadRunners solar car, and to build a test stand to compare candidate motors under load before they go into the car.

<div class="figure-pair">

![The dark composite body of the DTU RoadRunners solar car on foam blocks in the workshop, seen from the front left.](./solar-car-body-left.jpg)

The body of the DTU RoadRunners solar car in the workshop.

![The DTU RoadRunners solar car body seen from the front, with sponsor stickers on the nose.](./solar-car-body-front.jpg)

The same car from the front.

</div>

## My involvement

Carried out the project individually: the power and acceleration modelling in Python, the motor selection and procurement, the CAD design and CNC manufacturing of the test stand, the VESC controller setup, and the virtual dyno tests and analysis in MATLAB.

## Requirements

A vehicle model with the car's drag coefficient from CFD (0.117), frontal area from CAD (1.5 m²), a mass of 550 kg, rolling resistance and an 8:1 gear ratio gave the requirements: about **2000 W and 25 Nm to cruise at 80 km/h**, and acceleration from 0 to 80 km/h within **30 seconds**.

## Choosing the motors

To save the weight of a rear axle and differential, the design uses two motors, one on each rear wheel. One motor is optimised for cruising, and the other only engages when accelerating.

The motors are semi-custom Torqstar units from the German manufacturer Lehner Motortechnik, so the motor specification was driven by the calculations. Fewer windings per coil suit acceleration, more windings suit efficient cruising, and a larger chassis with bigger magnets adds torque. Four variants were specified from these trade-offs: the 7040 chassis with 14, 16 or 21 windings per coil, and the larger 7050 chassis with 11 windings. Each was modelled from Lehner's data, alone and in pairs, at the car's 88.8 V:

| Motor setup | 0–80 km/h | Distance |
|---|---|---|
| 7040-16 alone | 55.3 s | 615 m |
| 7050-11 alone | 41.2 s | 458 m |
| 7040-16 + 7040-16 | 28.2 s | 313 m |
| 7040-21 + 7050-11 | 25.1 s | 279 m |
| **7040-16 + 7050-11** | **23.1 s** | **257 m** |

Simulated acceleration with air and rolling resistance, at full throttle. Selected rows from ten configurations.

<div class="figure-pair">

![Simulated vehicle speed against time for single motors and motor pairs, accelerating towards 80 km/h.](./acceleration-simulation.png)

Simulated acceleration with air and rolling resistance for every single motor and motor pair at 88.8 V.

![Efficiency and RPM against current for the four Torqstar motors at 88.8 volts.](./efficiency-rpm.png)

Efficiency (red) and speed (blue) against current at 88.8 V. The 7040-16 sustains close to 10,000 rpm, which the 7040-21 does not.

</div>

No single motor met the 30-second requirement. The **7040-16 for cruising and the 7050-11 for acceleration** gave the fastest pair, and the 7040-16 was also the only cruising motor to reach the roughly 10,000 rpm needed at highway speed. Both were ordered water-cooled, so they can share the battery cooling circuit. A low-cost Bioboard 5400 W motor was added as a wildcard cruising candidate, but it has little documentation and could only be judged by testing.

## The test stand

The stand couples two motors shaft to shaft: one drives, and the other acts as a generator whose load can be varied to map the driving motor's torque and efficiency. Each side is controlled by a 100 V / 250 A VESC controller. Interchangeable aluminium mounting plates fit both motor types, and they locate on a machined aluminium cylinder with an **H7/h7 fit** that keeps the shafts aligned and also contains any debris if a part fails at high speed. All parts were CNC-machined in the workshop.

<div class="figure-pair">

![CAD model of the test stand, with the mounting plates on either side of the shield cylinder and a black spacer for the Torqstar motors.](./test-stand-cad-spacer.png)

CAD model of the test stand. The spacer for the Torqstar motors (black) leaves room for the water-cooling fittings.

![CAD side view of the test stand, with a Torqstar motor on the left and a Bioboard motor on the right, joined by an axle coupling inside the shield cylinder.](./test-stand-cad-side.png)

Side view of the test stand. The Torqstar motor (left) and Bioboard motor (right) are joined by an axle coupling inside the cylinder.

</div>

## Virtual dyno

The shaft couplings for the stand were delayed, so the loaded tests could not be run within the course. Instead, each motor was characterised without load in VESC Tool's detection mode at about 50 V, from three LiPo packs. An open-source MATLAB virtual dyno then turned the measured parameters into efficiency and torque maps.

![Workbench with a laptop running VESC Tool, a VESC controller, LiPo batteries and a Torqstar motor clamped in a vice.](./virtual-dyno-setup.jpg)

Virtual dyno test of a Torqstar motor. VESC Tool on the laptop reads the motor parameters through the VESC controller, supplied at about 50 V from three LiPo packs.

## Result

The Bioboard motor, at about a tenth of the price, delivered torque similar to the Torqstar 7040-16, but its efficiency was clearly lower. For long solar-powered runs, efficiency matters most, so the **Torqstar 7040-16 was confirmed as the cruising motor**. The virtual dyno maps are estimates from no-load measurements, not loaded dynamometer data. Loaded tests on the stand, once the couplings arrive, are the next step to validate them.

<div class="figure-pair">

![Efficiency map of the Bioboard motor over speed and torque, with mostly orange and yellow regions.](./efficiency-map-bioboard.jpg)

Efficiency map of the low-cost Bioboard motor from the virtual dyno.

![Efficiency map of the Torqstar 7040-16 motor over speed and torque, with a large dark-red high-efficiency region.](./efficiency-map-7040-16.jpg)

Efficiency map of the Torqstar 7040-16, with a much larger high-efficiency region.

</div>
