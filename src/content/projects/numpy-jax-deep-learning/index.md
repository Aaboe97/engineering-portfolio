---
projectId: "P013"
title: "Neural networks in NumPy & JAX"
shortTitle: "Building the learning machinery."
description: "A fully connected neural network written from scratch in NumPy, ported to JAX for up to 4.2× faster training, and tuned through hyperparameter sweeps to 86.86% test accuracy on the 47-class EMNIST Balanced dataset."
period: "2025"
type: "Exam project · Deep learning"
team: true
tags: ["numerical"]
technologies: ["Python","NumPy","JAX","Weights & Biases","Google Colab","MNIST / EMNIST"]
order: 14
stage: case-study
visual: "network"
course:
  code: "02456"
  name: Deep Learning
  institution: dtu
cover:
  src: ./cover.jpg
  fit: contain
  alt: First page of the project report, "Implementing a neural network from scratch with NumPy and JAX", DTU course 02456, autumn 2025.
  caption: First page of the project report (DTU 02456 Deep Learning, autumn 2025).
results:
  - label: Final test accuracy
    value: 86.86%
    context: EMNIST Balanced, 47 classes of handwritten digits and letters, with a fully connected network.
  - label: NumPy → JAX
    value: Up to 4.2× faster
    context: Per sweep run, from 19–23 minutes with NumPy on CPU to about 5.5 minutes with JAX on a GPU.
galleryLabel: From the report
galleryTitle: Supplementary figures.
gallery:
  - src: ./training-pipeline.png
    alt: Flowchart of the training pipeline, from dataset and hyperparameters through the sweep agent, training loop, logging and evaluation to the outputs.
    caption: The training pipeline shared by the NumPy and JAX networks, driven by Weights & Biases sweep agents.
  - src: ./regularisation-mnist.png
    alt: Training and validation accuracy and loss on MNIST for plain SGD, Adam, and Adam with dropout over 100 epochs.
    caption: Regularisation on MNIST. Adam trains fastest but overfits; 30% dropout keeps validation accuracy around 97.5% without overfitting.
  - src: ./activation-validation-accuracy.png
    alt: Validation accuracy over epochs for ReLU, tanh and sigmoid activations.
    caption: Validation accuracy on EMNIST by activation function. ReLU converges first and reaches the highest accuracy.
  - src: ./confusion-matrix.png
    alt: Full 47-class confusion matrix of the final network on the EMNIST Balanced test set.
    caption: Confusion matrix of the final network. The remaining errors cluster in visually similar pairs such as F/f, L/1/I, 0/O and q/9.
documents:
  - title: Source code on GitHub
    href: https://github.com/Aaboe97/02456-Project-Group-101
---

## The goal

The aim of this DTU Deep Learning group project (course 02456, autumn 2025) was to develop a fully connected neural network **without frameworks such as PyTorch or TensorFlow**, with the forward pass, gradients and optimisers implemented by hand, and to push its performance as far as possible on handwritten digits (MNIST) and the harder 47-class EMNIST Balanced dataset of digits and letters.

## My involvement

Contributed to the development of the original NumPy network, carried out the port to JAX, built the Weights & Biases sweep setup that drove the hyperparameter search, and carried out the search and optimisation of the final network.

## From NumPy to JAX

The NumPy network supports configurable depth and width, three activation functions, three weight initialisations, SGD and Adam, weight decay and dropout. It was too slow for systematic sweeps, so it was rewritten in **JAX**, which keeps a NumPy-like interface but compiles the computation just-in-time and runs it on a GPU. The same sweep, run with both versions:

| Activation | Initialisation | NumPy · runtime | NumPy · val. acc. | JAX · runtime | JAX · val. acc. |
|---|---|---|---|---|---|
| ReLU | Normal | 19 m 6 s | 97.40% | 5 m 39 s | 93.82% |
| ReLU | Xavier | 18 m 53 s | 97.62% | 5 m 32 s | 95.75% |
| ReLU | He | 18 m 48 s | 97.55% | 5 m 29 s | 95.90% |
| Sigmoid | Normal | 21 m 2 s | 94.10% | 5 m 40 s | 87.08% |
| Sigmoid | Xavier | 21 m 7 s | 94.80% | 5 m 39 s | 90.98% |
| Sigmoid | He | 20 m 57 s | 94.83% | 5 m 49 s | 90.63% |
| Tanh | Normal | 23 m 22 s | 94.75% | 5 m 33 s | 94.63% |
| Tanh | Xavier | 23 m 6 s | 95.20% | 5 m 30 s | 94.40% |
| Tanh | He | 23 m 5 s | 95.33% | 5 m 51 s | 94.38% |

MNIST, 2 × 128 hidden units, 100 epochs. NumPy on Google Colab Intel Xeon CPUs (batch 32); JAX on an NVIDIA T4 GPU (batch 512).

Each run became **3.4–4.2 times faster**. The slightly lower JAX accuracies, most visible for sigmoid, come mainly from the larger GPU batches, which give 16 times fewer parameter updates per epoch.

| Processor | Architecture | Compute (FP32) | Memory | Used for |
|---|---|---|---|---|
| Intel Xeon (CPU) | Skylake / Cascade Lake | 60–120 GFLOPS | 12–13 GB RAM | NumPy sweeps |
| NVIDIA T4 (GPU) | Turing (TU104) | 8.1 TFLOPS | 16 GB GDDR6 | JAX grid and first Bayesian sweeps |
| NVIDIA A100 (GPU) | Ampere (GA100) | 19.5 TFLOPS | 40 GB HBM2e | Final Bayesian sweep |

Google Colab hardware used for training. Specifications from NVIDIA and Google Cloud documentation.

## Finding the best network

Every design choice was tested in sweeps rather than assumed:

- **Regularisation:** Adam beat plain SGD but overfitted; 30% dropout removed the overfitting.
- **Activation and initialisation:** ReLU clearly outperformed tanh and sigmoid on EMNIST (up to 77% against 70% and 62% for a small network), whose gradients saturate. He and Xavier initialisation performed almost identically.
- **Architecture:** a Bayesian sweep of 36 runs on an NVIDIA A100 found the best results with about 1000–1500 hidden units in total and 30–40% dropout.

## Result

The final network has three hidden layers of 512 ReLU units with 36% dropout, trained with Adam. It reached **86.86% test accuracy on EMNIST Balanced** (87.16% validation) in a training time of 10.5 minutes.

Most remaining errors are characters that are genuinely ambiguous as isolated 28 × 28 images: F is read as f in 44% of test cases, L as 1 in 39% and q as 9 in 33%. A convolutional network, which keeps the image's spatial structure, would be expected to do better; for a fully connected network, the result is close to the best achievable configuration.
