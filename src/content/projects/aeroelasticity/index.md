---
projectId: "P14"
title: "Aeroelastic modelling & flutter prediction"
shortTitle: "When structure and flow move together."
description: "An individual model of a three-degree-of-freedom airfoil section with a control surface, built from first principles in Python to predict divergence, control reversal and flutter. The predicted flutter speed agrees with a NASA reference to within 1%."
period: "2025"
type: "Course assignment · Aeroelasticity"
tags: ["aerodynamics","mechanical","numerical"]
technologies: ["Python","NumPy / SciPy","Theodorsen theory","Wagner function","State-space modelling","Eigenvalue analysis"]
order: 15
stage: case-study
visual: "aeroelastic"
course:
  code: AE4ASM506
  name: Fundamentals of Aeroelasticity
  institution: tudelft
cover:
  src: ./degrees-of-freedom.png
  fit: contain
  alt: Airfoil section with a trailing-edge flap, showing heave, pitch and flap degrees of freedom restrained by springs.
  caption: The typical section, with heave (h), pitch (θ) and flap (β) degrees of freedom restrained by the springs K_h, K_θ and K_β.
results:
  - label: Predicted flutter speed
    value: 299 m/s
    context: Within 1% of the NASA reference value of 302 m/s for the same typical section.
  - label: Assignment grade
    value: 9.0 / 10
    context: Individual take-home assignment, TU Delft.
galleryLabel: From the report
galleryTitle: Model and results.
gallery:
  - src: ./section-geometry.png
    alt: Airfoil section with flap, showing the half-chord b and the distances a, c, x_θ and x_β between reference points.
    caption: Geometry of the typical section, with the reference points and distances that define the model.
  - src: ./aerodynamic-loads.png
    alt: Airfoil section with flap showing the lift force L, the pitching moment M_θ and the flap hinge moment M_β.
    caption: The aerodynamic loads acting on the section, lift L, pitching moment M_θ and flap hinge moment M_β.
  - src: ./vibration-modes.png
    alt: Six small plots of the three uncoupled and three coupled vibration mode shapes of the section.
    caption: Uncoupled (top) and coupled (bottom) vibration modes. Inertial coupling mixes heave, pitch and flap motion.
  - src: ./root-locus.png
    alt: Root-locus plot of the heave, pitch and flap eigenvalues in the complex plane as speed increases.
    caption: The eigenvalues in the complex plane as speed increases. The pitch-dominated branch (green) crosses into the right half-plane.
  - src: ./eigenvalues-vs-speed.png
    alt: Real and imaginary parts of the system eigenvalues plotted against wind speed from 50 to 400 m/s.
    caption: Eigenvalues of the aeroelastic state matrix against speed. The pitch-dominated mode's real part crosses zero at 299 m/s, which marks flutter.
  - src: ./flutter-mode.png
    alt: Shape of the flutter mode, showing the airfoil heaving and pitching with a small flap deflection.
    caption: The flutter mode at 299 m/s, a coupled bending–torsion motion with only a minor flap contribution.
---

## The problem

When a wing deforms under aerodynamic load, the deformation changes the load in turn. At high enough speed this feedback becomes unstable: the wing can twist until it fails (**divergence**), a control surface can start acting in the wrong direction (**control reversal**), or the structure can enter a self-excited oscillation that grows with every cycle (**flutter**).

This individual take-home assignment for TU Delft's Fundamentals of Aeroelasticity course (AE4ASM506) asked for all three to be predicted for a classic test case: a two-dimensional airfoil section that can heave, pitch and deflect a trailing-edge flap, with structural parameters from a NASA reference study. I derived the model and implemented it in Python.

## Structural model

Each degree of freedom is restrained by a spring, and the derivation gives a coupled mass matrix and a diagonal stiffness matrix. Solving the resulting eigenvalue problem shows how inertial coupling changes the natural frequencies:

| Mode | Uncoupled | Coupled |
|---|---|---|
| 1 · Heave | 7.96 Hz (50 rad/s) | 7.75 Hz (48.7 rad/s) |
| 2 · Pitch | 15.92 Hz (100 rad/s) | 17.64 Hz (110.8 rad/s) |
| 3 · Flap | 47.75 Hz (300 rad/s) | 55.51 Hz (348.8 rad/s) |

Natural frequencies of the typical section with and without inertial coupling.

Coupling softens the heave mode slightly and stiffens the pitch and flap modes, and the mode shapes no longer belong to a single degree of freedom.

## From steady to unsteady aerodynamics

For the static problems, Theodorsen's theory reduced to steady flow gives an aerodynamic stiffness matrix and an external force vector, and from them closed-form divergence and control-reversal speeds.

Flutter needs the unsteady aerodynamics. Using the indicial-function method, the lag in lift build-up after a change in motion is described by a two-term exponential approximation of the Wagner function. This adds six aerodynamic lag states, giving a linear **12-state model**: three velocities, three displacements and six lag states. The same structure can take gust loads by adding lag states based on the Küssner function, which the assignment discussed but did not implement.

### The derivation

Every matrix in the model was derived by hand before being implemented. First, substituting the effective angle of attack and the Wagner approximation into the convolution integral gives the circulatory lift in terms of the lag states:

![Derivation of the unsteady circulatory lift expressed with six aerodynamic lag states, Equation 52 of the report.](./derivation-lift-lag-states.png)

Unsteady lift with lag states (report, Eq. 52). Click any equation block to enlarge it.

The lift and moments are then assembled into the aeroelastic equations of motion and rewritten as a first-order state-space system:

![Assembly of the unsteady aeroelastic equations of motion and the 12-state state-space model, Equations 56 to 62 of the report.](./derivation-state-space.png)

Assembly into the state-space model ż = Az (report, Eqs. 56–62).

Finally, the aerodynamic mass, damping and stiffness matrices, the lag-state coupling matrices and the lag dynamics that make up the state matrix **A**:

![All matrices of the state-space model: aerodynamic mass, circulatory and non-circulatory damping and stiffness, lag-state coupling, lag dynamics and input matrices, Equations 63 to 73 of the report.](./derivation-matrices.png)

The matrices of the state-space model (report, Eqs. 63–73).

## Finding flutter

The eigenvalues of the state matrix were computed across a range of speeds. Flutter begins where a complex pair crosses into the right half-plane, so that an oscillation grows instead of decaying. Here, the pitch-dominated mode crosses at **299 m/s**, against **302 m/s** in the NASA reference, a deviation of less than 1%. The flutter mode is a coupled heave–pitch (bending–torsion) motion, with only a small flap contribution.

| Instability | Critical speed |
|---|---|
| Flutter | **299.0 m/s** |
| Control reversal | 367.3 m/s |
| Divergence | 707.1 m/s |

Critical aeroelastic speeds of the typical section.

Flutter occurs first and is therefore the design driver for this section. The assignment closed by identifying which single parameter would make each of the other instabilities critical instead: the position of the elastic axis relative to the aerodynamic centre for divergence, and the aerodynamic effectiveness of the flap for control reversal.
