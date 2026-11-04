---
projectId: P01
title: Adaptive airfoil flow control
shortTitle: A surface that adapts to the flow.
description: Investigating separation control through adjustable surface roughness, combining CFD, wind tunnel measurements and a pneumatically actuated airfoil prototype.
period: '2026'
type: MSc thesis · Research
tags: [aerodynamics, experiments, mechanical, electronics]
technologies: [OpenFOAM, RANS & LES, PIV, CAD, Arduino, Pneumatics]
featureOrder: 1
order: 1
stage: case-study
visual: airfoil
cover:
  src: ./cover.jpg
  alt: Concept visualisation of a smooth airfoil with a wide turbulent wake above a dimpled airfoil with a narrower wake.
  caption: Thesis cover art. A conceptual visualisation of smooth (top) and dimpled (bottom) airfoil wake behaviour, created with image generation; not measured flow data.
results:
  - label: Recognition
    value: DANSIS 2026
    context: Graduate Award for Best Fluid Mechanics Thesis.
  - label: Thesis assessment
    value: 12 / 12 · 9.0 / 10
    context: DTU and TU Delft, respectively.
---

## Can a surface respond to a changing boundary layer?

A dimple's aerodynamic effect depends on where it interacts with the local boundary layer. As the operating conditions change, a fixed surface geometry can become less well matched to the flow. My MSc thesis investigated adaptive surface roughness as a way to control separation and improve airfoil performance.

The project connected numerical analysis, experimental flow measurements and the development of a surface whose dimple depth could be adjusted mechanically.

## From a flow-physics question to a working prototype

I investigated dimpled airfoil configurations using computational fluid dynamics and wind tunnel experiments at DTU and TU Delft. Force measurements established changes in aerodynamic performance; Particle Image Velocimetry (PIV) helped reveal the associated flow and separation behaviour.

Alongside this work, I designed and manufactured dimpled airfoil surfaces and developed a pneumatically actuated adaptive prototype. Membranes, a pump, valves, pressure sensing and microcontroller control connected the aerodynamic concept to a physical system.

### Numerical investigation

RANS and LES simulations supported the investigation of separated flows and the effect of surface configurations. Numerical analysis and experimental measurements provided complementary ways to examine the underlying mechanisms.

### Experimental investigation

Wind tunnel testing combined aerodynamic force measurements with PIV. The comparison between smooth and modified surfaces connected performance changes to the behaviour of the boundary layer and separated flow.

### Adaptive hardware

The prototype used pneumatic actuation to vary surface depth. Its development brought together CAD, manufacturing, flexible membranes, fluid connections, sensors and Arduino-based control.

## Results and their scope

Selected **static dimple configurations** produced drag reductions exceeding **50% at selected operating conditions** and lift-to-drag improvements exceeding **100% in several investigated regions**. These are condition-dependent results; they do not describe a general improvement across the operating envelope.

The adaptive prototype demonstrated mechanically variable dimple depth as a proof of concept. This mechanical result is distinct from the aerodynamic performance obtained with selected static configurations.

The research received the **DANSIS Graduate Award for Best Fluid Mechanics Thesis 2026**. I also presented the work at the DANSIS Drone Seminar at Hans Christian Andersen Airport.

## Engineering perspective

The project links a local flow mechanism to a broader design question: how can an aerodynamic surface remain useful as the boundary layer changes? It demonstrates the complete path from modelling and measurement to the construction and control of an adjustable surface.

The thesis was completed within the dual MSc programme in Aerospace Engineering at TU Delft and Wind Energy at DTU, with thesis grades of 9.0/10 and 12/12.
