---
projectId: "P017"
title: "PIV setup calculator"
shortTitle: "From chord length to pulse separation."
description: "An interactive calculator that derives the optical setup of a planar PIV experiment, from field of view and magnification to lens distances, aperture, particle image diameter and pulse separation, with every equation shown with live numbers. Built to plan the PIV campaign of the MSc thesis, and free to use for anyone planning a similar experiment."
period: "2026"
type: "Personal project · PIV optics"
collaboration: individual
tags: ["experiments", "aerodynamics"]
technologies: ["Particle image velocimetry", "Geometrical optics", "Experiment design", "JavaScript", "HTML / CSS"]
order: 17
stage: case-study
visual: "experiment"
tool: piv-calculator
cover:
  src: ./calculator-cover-dark.png
  fit: contain
  alt: The PIV setup calculator, with the setup summary and the first step, field of view, loaded with the MSc thesis setup.
  caption: The calculator with the MSc thesis setup loaded. The summary updates live as the inputs below it change.
results:
  - label: Setup derived in six steps
    value: FOV → Δt
    context: Field of view, magnification, lens distances, aperture, particle image diameter and pulse separation, each building on the one before.
  - label: Built on the underlying theory
    value: First principles
    context: Derived from the physics itself, the thin lens equation, diffraction-limited particle imaging and the one-quarter rule, with no black boxes.
---

## The goal

Planning a PIV experiment is a chain of optical decisions. The field of view sets the magnification, the magnification and the lens set where the camera stands, the aperture sets how large the particles appear on the sensor, and the magnification and flow speed set the time between the two laser pulses. Change one input and everything after it moves. The goal was a tool that walks through the whole derivation, shows every equation with the actual numbers, and updates the full chain the moment any input changes, so setup options can be compared in minutes instead of by hand.

## My involvement

Built the calculator from scratch: the derivation of the optical relations, the step-by-step structure, the implementation in HTML and JavaScript, and its use to plan the PIV campaign of the MSc thesis. It was first published online alongside the thesis for others planning similar campaigns, and now lives on this page.

## The calculator

Every input can be changed, and the summary at the top always shows the current setup.

<div data-tool-slot></div>

## How it was used in the MSc thesis

In the thesis, planar PIV measured the flow over the suction side of a 200 mm chord airfoil in the Small Low-Turbulence Tunnel at TU Delft, at 7.5 and 15 m/s. The calculator set up the optics for that campaign:

| Step | Value in the thesis | How it was found |
|---|---|---|
| Field of view | 300 mm | 1.5 × the 200 mm chord, to keep the near wake in the image |
| Magnification | 0.0555 | 2560 px × 6.5 µm sensor over the 300 mm field of view |
| Lens distances | ≈ 1141 mm and ≈ 63.3 mm | 60 mm Micro-Nikkor lens, thin lens equation |
| Aperture | f/8 | f/9.5 needed for 2 px particle images; f/8 chosen for more light |
| Particle image | ≈ 1.69 px | Above the 1.5 px peak-locking limit |
| Pulse separation | 124 µs and 62 µs | One-quarter rule with 32 px windows, at 7.5 and 15 m/s |

PIV setup of the MSc thesis. The 124 µs and 62 µs used in practice sit just below the calculated 125 µs and 62.5 µs.

The aperture shows why the tool shows every step rather than only a final answer. A 2 px target asks for f/9.5, so the next stop up, f/11, is the recommended choice. In the experiment, however, the laser energy and the faint scattering of the 1 µm seeding droplets at more than a metre from the lens set the real limit, so f/8 was chosen: about twice the light, for particle images of about 1.69 px, still above the 1.5 px limit where peak-locking bias sets in. The calculator shows the same trade-off when f/8 is selected.

<div class="figure-pair">

![CAD render of the PIV setup, with the camera above the test section and a green laser sheet across the suction side of the airfoil.](./piv-setup-cad.png)

CAD of the thesis PIV setup: the green laser sheet across the suction side at mid-span, and the camera (blue) above the test section, about 1.1 m from the measurement plane.

![Photo of the PIV setup at TU Delft, with the camera mounted above the test section, the airfoil inside and the laser beside the tunnel, labelled.](./piv-camera-laser.jpg)

The setup in the tunnel: the sCMOS camera with the 60 mm lens above the test section, and the Nd:YAG laser beside it.

</div>

<div class="figure-pair">

![Photo of the Small Low-Turbulence Tunnel test section from the front, with the camera above, and the laser sheet and airfoil inside, labelled.](./piv-test-section.jpg)

The airfoil in the test section, with the laser sheet at mid-span and the camera looking down from above.

![PIV velocity field over a dimpled airfoil at 4 degrees, showing the flow speeding up over the suction side.](./piv-velocity-field.png)

One of the resulting velocity fields: a dimpled airfoil at 4° and 7.5 m/s. See the [MSc thesis](/projects/adaptive-airfoil-flow-control/) for the results.

</div>
