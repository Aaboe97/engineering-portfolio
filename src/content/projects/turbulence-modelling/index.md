---
projectId: "P08"
title: "Turbulence modelling and numerical solvers"
shortTitle: "Resolving the behaviour of turbulent flow."
description: "A self-written mixing-length solver for turbulent channel flow, validated against DNS, and OpenFOAM simulations of flow past a cylinder with k–ε, k–ω SST and DDES, including a 12-mesh sensitivity study."
period: "2024"
type: "Course project · Turbulence modelling"
team: true
course:
  code: "46115"
  name: Turbulence Modelling
  institution: dtu
tags: ["aerodynamics","numerical"]
technologies: ["Python","NumPy","OpenFOAM","blockMesh","ParaView","RANS (k–ε, k–ω SST)","DDES and LES","Mesh sensitivity"]
order: 8
stage: case-study
visual: "numerical"
cover:
  src: ./ddes-velocity-fig22.png
  alt: Velocity magnitude around a half cylinder from the DDES simulation, with an unsteady, wavy wake trailing downstream.
  caption: Velocity magnitude after 100 s of the DDES simulation of flow past a cylinder at Re = 3900 (report, Figure 22; half domain with a symmetry plane). The wake shows the unsteady vortex shedding that RANS averages out.
results:
  - label: Turbulence models
    value: "4"
    context: A Prandtl mixing-length model with van Driest damping in a self-written Python solver, and k–ε, k–ω SST and DDES in OpenFOAM.
  - label: Meshes tested
    value: "12"
    context: Three near-wall resolutions times four outer refinements. The chosen 15,200-cell mesh beat one with twice as many cells through a better near-wall resolution.
---

## The goal

Turbulence models decide how a simulation represents everything it cannot resolve. This course project worked through the hierarchy: from an algebraic model in a self-written solver for the simplest wall-bounded flow, to two-equation RANS models and a hybrid RANS/LES approach in OpenFOAM for unsteady flow past a cylinder. The results were validated against DNS and experimental data.

## My involvement

Derived and implemented the channel-flow solver in Python, built and refined the OpenFOAM meshes, set up and ran the RANS, LES and DDES simulations, and post-processed and validated the results against DNS and experimental data.

## Part 1: Turbulent channel flow

### A mixing-length solver

For fully developed channel flow, the Reynolds-averaged momentum equation reduces to a balance between the pressure gradient, viscous stress and Reynolds stress. Closing the Reynolds stress with the Boussinesq approximation and **Prandtl's mixing length**, with and without **van Driest damping** near the wall, gives an equation for the velocity gradient. This was discretised with finite differences and solved in Python from the wall (no slip) to the centreline (symmetry). It was run at friction Reynolds numbers of 180, 395 and 590 and compared with the DNS data of Moser, Kim and Moin.

![Velocity profile U+ against y+ for channel flow at Re_tau 180, comparing damped and undamped mixing-length models with DNS and wall functions.](./channel-velocity-profile.png)

Velocity profile at Re<sub>τ</sub> = 180. The damped model follows the DNS closely, while the undamped model underestimates the velocity across the channel.

### Why the damping matters

Without damping, the mixing length gives turbulent stress right down to the wall, so the viscous stress decays too early and the Reynolds stress takes over too soon. The van Driest function suppresses the eddy viscosity in the viscous sublayer and delays this transition, in close agreement with DNS:

![Fractions of viscous and Reynolds stress in the total stress against y+ for the damped, undamped and DNS results at Re_tau 180.](./channel-stress-fractions.png)

Viscous and Reynolds stress as fractions of the total stress at Re<sub>τ</sub> = 180.

Higher Reynolds numbers needed finer grids to resolve the thinner near-wall region: 10,000 points at Re<sub>τ</sub> = 590, against 1,000 at Re<sub>τ</sub> = 180.

## Part 2: Flow past a cylinder in OpenFOAM

### Mesh study

The cylinder flow at Re = 3900 was simulated with pimpleFoam on a half domain with a symmetry plane. The blockMesh layout was modified with extra blocks to extend the domain to 15 diameters for the wake. Twelve meshes were tested with k–ε against measured surface pressure (Norberg, 1987):

| Near-wall mesh | Mesh 0 | Mesh 1 | Mesh 2 | Mesh 3 |
|---|---|---|---|---|
| n40 | 3,600 | 11,200 | 22,800 | 31,680 |
| n65 | 4,600 | 13,200 | 25,800 | 35,280 |
| n90 | 5,600 | **15,200** | 28,800 | 38,880 |

Number of cells for the three near-wall resolutions (rows) and four outer refinements (columns). The chosen mesh is in bold.

![Mean deviation of the pressure coefficient from the experiment against the number of cells for the n40, n65 and n90 mesh families.](./mesh-study-deviation.png)

Deviation of the computed pressure coefficient from experiment for the three mesh families.

All mesh families converged above about 10,000 cells. The **n90 mesh with 15,200 cells** reached a mean deviation of 14.8%, while an n40 mesh with 31,680 cells, twice as many, gave 15.5%. Placing cells near the wall, for a y+ of about 2, mattered more than the total cell count.

![The chosen n90 Mesh 1 around the half cylinder, with fine radial cells near the wall and a coarser wake region.](./cylinder-mesh-n90.png)

The chosen n90 mesh with 15,200 cells.

### RANS: k–ε and k–ω SST

Both models captured the stagnation point, the acceleration around the sides, separation and the wake. k–ω SST predicted earlier separation and a shorter, wider wake:

![Velocity magnitude around the cylinder from the k-epsilon model.](./kepsilon-velocity.png)

Velocity magnitude with k–ε.

![Velocity magnitude around the cylinder from the k-omega SST model, with a shorter and wider wake.](./komega-sst-velocity.png)

Velocity magnitude with k–ω SST.

The skin friction confirmed the difference: k–ω SST separates earlier, which gives a larger wake and a higher drag.

![Skin friction coefficient around the cylinder for the k-epsilon and k-omega SST models.](./skin-friction-rans.png)

Skin friction coefficient around the cylinder. The earlier drop with k–ω SST marks its earlier separation.

### LES and DDES

For scale-resolving simulations, the mesh was extruded to 3D, with the spanwise cell count chosen for a z+ of about 40. LES with the Smagorinsky and kEqn subgrid models only showed the onset of vortex shedding and never developed full alternating shedding. A **delayed detached-eddy simulation (DDES)** was run instead, which resolved the unsteady wake shown in the cover image.

| Model | Drag coefficient | Deviation from C<sub>d</sub> ≈ 1.0 |
|---|---|---|
| k–ε | 1.11 | +11.5% |
| k–ω SST | 1.25 | +25.5% |
| DDES | 1.48 | +48.5% |

Drag coefficient on the n90 mesh, against a reference value of about 1.0 at Re = 3900.

![Surface pressure coefficient around the cylinder from k-epsilon, k-omega SST and DDES, compared with Norberg's measurements.](./cp-rans-ddes.png)

Surface pressure coefficient from all three models against the measurements of Norberg (1987).

## Result

The mixing-length solver showed how much a near-wall correction matters: with van Driest damping, a simple algebraic model reproduces the DNS profile of a turbulent channel. On the cylinder, the mesh study showed that near-wall resolution matters more than the total cell count. k–ε gave the closest drag, 11.5% above the reference, while k–ω SST and DDES matched the measured surface pressure more closely. The main limitations were also clear: the half-domain symmetry suppresses the asymmetric vortex shedding, and the mesh lacked radial grading, so a full domain with a graded mesh is the clear next step.
