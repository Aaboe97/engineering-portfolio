---
projectId: P01
title: Airfoil flow control using adaptive surface roughness
shortTitle: A surface that adapts to the flow.
description: An MSc thesis on dimpled airfoils, combining wind tunnel campaigns at DTU and TU Delft, PIV, RANS and LES to map how dimple depth and placement change lift, drag and separation, and a pneumatic prototype whose dimple depth can be adjusted on demand.
period: '2025–2026'
type: MSc thesis · DTU & TU Delft
team: false
course:
  - name: MSc thesis, Wind Energy
    institution: dtu
  - name: MSc thesis, Aerospace Engineering
    institution: tudelft
tags: [aerodynamics, experiments, mechanical, electronics]
technologies: [Wind tunnel testing, PIV, Surface pressure taps, Force balance, OpenFOAM, RANS (k–ω SST) & LES, CAD, 3D printing, Arduino, Pneumatics, Structured-light scanning]
featureOrder: 1
order: 1
stage: case-study
visual: airfoil
cover:
  src: ./cover.jpg
  alt: Concept visualisation of a smooth airfoil with a wide turbulent wake above a dimpled airfoil with a narrower wake.
  caption: Thesis cover art. A conceptual visualisation of smooth (top) and dimpled (bottom) airfoil wake behaviour, created with image generation; not measured flow data.
results:
  - label: Best glide-ratio gain over the smooth airfoil
    value: Up to +132%
    context: For dimples at Re = 1 × 10⁵ in the low-incidence range, from reduced drag through delayed separation.
  - label: DANSIS Graduate Award 2026
    value: Best Fluid Mechanics Thesis
    context: Graded 12 / 12 at DTU and 9.0 / 10 at TU Delft.
---

## The goal

Dimples roughly halve the drag of a golf ball by tripping the boundary layer into turbulence, which delays separation and narrows the wake. Whether the same mechanism helps a wing is far less settled: an airfoil in attached flow has little separation to delay, so a dimple that helps a sphere can just as easily add drag. Earlier studies on dimpled airfoils disagree on where along the chord dimples should sit and how deep they should be.

This thesis asked how dimple depth and chordwise placement change the lift, drag and separation of an airfoil across operating conditions, and whether a surface that changes its own dimple depth could get the best of each.

## My involvement

Carried out the thesis individually: the literature study and dimple design, CAD and 3D-printed wind tunnel models, two wind tunnel campaigns at DTU and TU Delft, the RANS and LES simulations in OpenFOAM, and the design, build, calibration and wind tunnel testing of the adaptive prototype.

## The test campaign

A NACA 63-415 airfoil with a 200 mm chord was tested smooth and with three dimple layouts on the suction side: mid-chord (0.33c to 0.59c), aft (0.59c to 0.85c) and full coverage (0.33c to 0.85c), each at three dimple depths of 1.25, 2.50 and 5.00 mm. All models were 3D-printed, so layouts could be swapped quickly between runs.

<div class="figure-pair">

![CAD model of the smooth NACA 63-415 airfoil without dimples.](./layout-smooth.png)

Smooth: the undimpled baseline.

![CAD model of the airfoil with four rows of dimples at mid-chord.](./layout-mid.png)

Mid: dimple rows 1 to 4.

</div>

<div class="figure-pair">

![CAD model of the airfoil with dimple rows on the aft part of the chord.](./layout-aft.png)

Aft: dimple rows 4 to 7.

![CAD model of the airfoil with seven rows of dimples covering mid-chord and aft.](./layout-full.png)

Full: dimple rows 1 to 7.

</div>

Every configuration was measured at Reynolds numbers of 1, 2 and 5 × 10⁵, mostly between 0° and 16° angle of attack, with complementary methods across two wind tunnels:

| Method | Facility | Result |
|---|---|---|
| Wake rake and wall pressures | Red Wind Tunnel, DTU | Lift and drag of every configuration |
| Surface pressure taps | Red Wind Tunnel, DTU | Pressure distribution, smooth and Mid-2.50 |
| Force balance | Low-Turbulence Tunnel, TU Delft | Independent lift and drag, stall |
| Particle image velocimetry (PIV) | Low-Turbulence Tunnel, TU Delft | Velocity field over the suction side |
| Tuft visualisation | Low-Turbulence Tunnel, TU Delft | Attached or separated surface flow |
| RANS (k–ω SST) and LES | OpenFOAM | Numerical comparison of key cases |

Measurement methods and what each contributed.

<div class="figure-pair">

![CAD render of the Red Wind Tunnel setup, with the vertically mounted dimpled airfoil and the horizontal wake rake downstream.](./rwt-setup.png)

Red Wind Tunnel setup, with the airfoil and the wake rake downstream.

![CAD render of the PIV setup, with the camera above the test section and a green laser sheet across the suction side of the airfoil.](./piv-setup.png)

PIV setup in the Low-Turbulence Tunnel, with the laser sheet at mid-span.

</div>

## Results: no single geometry works everywhere

Dimple depth, chordwise location and Reynolds number interact strongly. At Re = 1 × 10⁵, mid and full coverage more than doubled the glide ratio of the smooth airfoil at low angles, up to **+132%**, with drag reductions of nearly 50%. At Re = 5 × 10⁵ this reversed completely: mid coverage became harmful at every angle, and only the aft layout gave any benefit, close to stall.

<div class="figure-pair">

![Heatmap of the percentage change in glide ratio over the smooth airfoil at Re 1e5, mostly green with values up to 132 percent at 4 degrees.](./heatmap-glide-re100k.png)

Change in glide ratio over the smooth airfoil at Re = 1 × 10⁵, by layout, depth and angle of attack.

![Heatmap of the percentage change in glide ratio over the smooth airfoil at Re 5e5, mostly red, with green only for aft layouts near stall.](./heatmap-glide-re500k.png)

The same map at Re = 5 × 10⁵: mostly penalties, with gains only for the aft layouts near stall.

</div>

Depth behaved the same way. The depth that reduced drag the most at the lowest Reynolds number was the most harmful at the highest, and near stall the trend was not even monotonic: at 14° only the 2.50 mm depth reduced drag, while both 1.25 and 5.00 mm did not. Since no fixed depth is best across the envelope, this is the central argument for making dimple depth adjustable.

## The mechanism

PIV on the standout configuration, Mid-2.50 at Re = 1 × 10⁵, shows the dimples energising the flow near the wall and suppressing the separation present on the smooth airfoil. Surface pressures and the wake rake confirm it: stronger suction over the forward chord, a fuller pressure recovery, and a wake roughly half as wide as the smooth baseline. At Re = 2 × 10⁵, force balance, surface pressures and tufts showed the same configuration delaying stall.

<div class="figure-pair">

![PIV velocity field over the smooth airfoil at 6 degrees, with a low-velocity separated region near the trailing edge.](./piv-smooth-6deg.png)

PIV, smooth airfoil at 6° and Re = 1 × 10⁵. Separation near the trailing edge.

![PIV velocity field over the Mid-2.50 dimpled airfoil at 6 degrees, with faster flow close to the surface and a smaller separated region.](./piv-mid-2-50-6deg.png)

PIV, Mid-2.50 at the same condition. Faster near-wall flow and less separation.

</div>

RANS and LES reproduced the direction of the drag trends but not the mechanism itself: neither resolved the change in the near-wall boundary layer, consistent with the RANS model's lack of a transition formulation. The simulations were therefore used as a check on trends rather than as independent confirmation.

## The adaptive prototype

Because the best depth changes with the flow, the final part of the thesis built an airfoil whose dimple depth can be set on demand. Each dimple is a 0.30 mm latex membrane over a shared cavity inside the airfoil. A vacuum pump draws the membranes inward to form the dimples, one solenoid valve seals the vacuum to hold the depth without running the pump, and a second vents the cavity to return the surface flush. A pressure transducer, read through a voltage divider, feeds the cavity pressure to an Arduino Uno, which controls the pump and valves.

<div class="figure-pair">

![Diagram of the prototype system: the airfoil connected by a tube to a pressure transducer, two solenoid valves and a vacuum pump, all controlled by an Arduino.](./prototype-system.png)

The actuation system: vacuum pump, solenoid valves, pressure transducer and Arduino.

![The prototype airfoil with yellow latex membrane dimples mounted vertically in the Red Wind Tunnel.](./prototype-in-tunnel.jpg)

The prototype in the DTU Red Wind Tunnel.

</div>

<div class="figure-pair">

![Close-up of the yellow latex dimples lying flush with the airfoil surface.](./dimple-unactuated.jpg)

Unactuated: the membranes lie flush (0 mm).

![Close-up of the same yellow latex dimples pulled inward into shallow recesses.](./dimple-actuated.jpg)

Actuated: the membranes form dimples about 1.5 mm deep.

</div>

To link cavity pressure to physical depth, the actuated membranes were measured with an ATOS III structured-light 3D scanner at each pressure setpoint.

<div class="figure-pair">

![The ATOS III structured-light scanner projecting blue light onto the prototype airfoil lying on a turntable.](./prototype-scan.jpg)

Structured-light scanning of the actuated dimples.

![Plot of measured dimple depth against chamber vacuum, rising from 0 to about 1.5 mm with a quadratic fit.](./dimple-depth-calibration.png)

Measured dimple depth against cavity vacuum.

</div>

In the wind tunnel at Re = 1 × 10⁵, 56 runs covered three actuated depths and the unactuated state. Between 0° and 8° every actuated depth reduced drag relative to the same airfoil at rest, peaking at about **22%** at 6°, and the wake narrowed on the suction side just as for the static dimpled models. As in the static campaign, the effect reversed into a drag penalty near stall, and no lift benefit was measured.

![Plot of percentage change in drag coefficient against angle of attack for three actuated depths, with reductions down to about 22 percent at 6 degrees and penalties beyond 10 degrees.](./prototype-drag-change.png)

Change in drag relative to the unactuated prototype, for the three actuated depths.

## Result

The thesis showed that no single, fixed dimple geometry is optimal across a realistic operating envelope. Dimples help where the boundary layer is close to separating and hurt where the flow is comfortably attached, so their best depth and position depend on the operating condition. The prototype showed that one airfoil can switch pneumatically between aerodynamic states that resemble different static geometries, establishing the feasibility of an adaptive dimpled surface. Closed-loop control based on flow measurements is the next step.

The thesis received the **DANSIS Graduate Award 2026 for Best Fluid Mechanics Thesis**, and was graded 12 / 12 at DTU and 9.0 / 10 at TU Delft. The experimental work and the prototype were supported by Siemens Fonden.
