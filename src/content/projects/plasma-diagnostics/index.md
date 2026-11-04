---
projectId: "P11"
title: "Measuring plasma density with microwaves"
shortTitle: "Measuring a plasma without touching it."
description: "A non-invasive microwave transmission experiment on DTU's PACE plasma device: two horn antennas send microwaves through a magnetised argon plasma, and the frequency at which the waves stop getting through gives the electron density, estimated at about 10¹⁶ m⁻³."
period: "2023"
type: "Project Course · Plasma diagnostics"
team: true
course:
  name: Project Course (Fagprojekt, 15 ECTS)
  institution: dtu
tags: ["experiments","numerical"]
technologies: ["Python","GPIB instrument control","Magpylib","Maple","Cold-plasma wave theory","Spectrum analysis"]
order: 12
stage: case-study
visual: "plasma"
cover:
  src: ./pace-glowing-plasma.jpg
  alt: Side view of the PACE device in operation, with the argon plasma glowing pink inside the quartz tube between the magnetic field coils.
  caption: PACE in operation. The argon plasma glows inside the 1 m quartz tube, between the magnetic field coils.
results:
  - label: Peak electron density
    value: ≈ 1.2 × 10¹⁶ m⁻³
    context: Estimated from a 1 GHz O-mode cutoff with the RF source at 50–200 W, without inserting anything into the plasma.
  - label: Grade
    value: 12 / 12
    context: The top grade on the Danish 7-point scale, for the Project Course (Fagprojekt, 15 ECTS) at DTU.
galleryLabel: From the lab
galleryTitle: Setup and results.
gallery:
  - src: ./pace-device.jpg
    alt: The PACE linear plasma device at DTU, a quartz tube surrounded by five magnetic field coils in an aluminium frame.
    caption: The PACE linear plasma device at DTU, with the quartz tube running through the magnetic field coils.
  - src: ./pace-horn-antennas.jpg
    alt: View along the PACE device, showing the glowing quartz tube through a magnetic coil, with a horn antenna mounted beside it.
    caption: The plasma tube seen through one of the magnetic coils, with the horn antennas mounted on either side.
  - src: ./setup-schematic.png
    alt: Schematic of the experiment, with the gas fill, vacuum system, RF source, magnetic coils, horn antennas, signal generator and spectrum analyser.
    caption: The experiment. A signal generator drives one horn antenna, and a spectrum analyser reads the other, both controlled from Python.
  - src: ./magnetic-field-simulation.jpg
    alt: Two colour maps of the simulated magnetic field of the PACE coils, in side view with field lines and in cross-section.
    caption: Simulated magnetic field of the five coils, in side view and in cross-section, used for the X-mode analysis.
  - src: ./measurement-200w.png
    alt: Received signal around 1 GHz with and without plasma, and the relative difference between them, at 200 W RF power.
    caption: Received signal at 1 GHz with and without plasma (left), and the relative difference (right), with the RF source at 200 W.
  - src: ./signal-reduction-vs-rf-power.png
    alt: Relative signal reduction at 1 GHz plotted against RF power, rising from about 0.1% at 50 W to 1% at 200 W.
    caption: Signal reduction caused by the plasma rises with RF power, as the electron density and its cutoff frequency increase.
---

## The idea

A probe pushed into a plasma disturbs the very thing it is meant to measure. Microwaves offer a way around this. An electromagnetic wave can only travel through a plasma if its frequency is above the **plasma frequency**, and that frequency depends only on the electron density:

n<sub>e</sub> = ε<sub>0</sub> m<sub>e</sub> ω<sub>p</sub>² / e²

Find the frequency at which the waves stop getting through, and you have the density, **without touching the plasma**. This project designed and carried out such a cutoff measurement on PACE (Plasma wAve Cavity Experiment), a linear plasma device at DTU. It was carried out in the Project Course (*Fagprojekt*, 15 ECTS), a BSc course in which DTU students choose and define their own project.

## My involvement

Responsible for the cold-plasma wave theory, the Magpylib simulations of the magnetic field, the design of the antenna mounting brackets, the Python control of the signal generator and spectrum analyser, and the measurements, density modelling and analysis.

## The setup

PACE is a 1 m quartz tube, 10 cm in diameter, filled with low-pressure argon. An RF source ionises the gas, and five coils supply the magnetic field that confines the plasma. Two horn antennas were placed on opposite sides of the tube, on mounting brackets designed so that the antennas could be turned to select the wave's polarisation. A signal generator drove one horn and a spectrum analyser read the other, both controlled from Python over GPIB.

## Modelling before measuring

- **Wave theory:** with the electric field parallel to the magnetic field (O-mode), the cutoff equals the plasma frequency. With it perpendicular (X-mode), the cutoffs also depend on the magnetic field.
- **Magnetic field:** the coils were simulated in Magpylib with four models, from full 6 × 6 windings down to a single loop per coil. All gave about 40 mT at the measurement point, within 0.07% of each other, so the simplest model was sufficient.
- **Beam spreading:** Gaussian beam optics showed that only about 5% of the transmitted intensity reaches the receiving horn at 1 GHz. Microwave absorber (Eccosorb) was placed around the setup to suppress reflections, and the 4G and Wi-Fi bands, which showed up clearly in the background noise, were avoided.

## Measurements

A sweep from 3 to 10 GHz showed no difference with and without plasma, so the plasma frequency had to be below 3 GHz. Measurements were then made at 1 GHz, comparing plasma and vacuum while increasing the power of the RF source:

| RF power | Signal reduction at 1 GHz |
|---|---|
| ≈ 50 W | ≈ 0.1% |
| 77.3 W | ≈ 0.5% |
| 200 W | ≈ 1.0% |

Reduction of the received signal with plasma relative to vacuum, read from the report's Figure 19.

The growing reduction shows the electron density rising with RF power, pushing the cutoff frequency towards 1 GHz.

## Result

Taking the cutoff as about 1 GHz gives a peak electron density of **≈ 1.2 × 10¹⁶ m⁻³**, fitted to single and double Gaussian density profiles across the tube. The trend with RF power agrees with published results for similar devices, while the density itself is about an order of magnitude lower than expected. The clearest improvements would be antennas designed for frequencies near the plasma frequency and absorber tuned to the measurement band.
