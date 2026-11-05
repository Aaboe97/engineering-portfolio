---
projectId: "P012"
title: "Classifying breast tumours with machine learning"
shortTitle: "Comparing models with validation."
description: "Exploration, regression and classification of the Wisconsin Breast Cancer dataset, comparing a neural network, regularised linear and logistic regression and a baseline through two-level cross-validation and statistical tests. The neural network classified tumours as benign or malignant with 97.4% average test accuracy."
period: "2023"
type: "Exam project · Machine learning"
team: true
tags: ["numerical"]
technologies: ["Python","PyTorch","PCA","Linear & logistic regression","Two-level cross-validation","McNemar's test"]
order: 13
stage: case-study
visual: "network"
course:
  code: "02450"
  name: Introduction to Machine Learning and Data Mining
  institution: dtu
cover:
  src: ./pca-projection.png
  fit: contain
  alt: Scatter plot of all tumour samples projected onto the first two principal components, with benign samples in blue and malignant in orange.
  caption: All 569 samples projected onto the first two principal components. Benign (B) and malignant (M) tumours separate almost linearly.
results:
  - label: Neural-network accuracy
    value: 97.4%
    context: Average test accuracy over ten outer cross-validation folds, against 92.6% for logistic regression and 62.7% for a majority-class baseline.
  - label: Variance in two components
    value: 65%
    context: Share of the variance in the 30 features captured by the first two principal components; ten components capture 95%.
galleryLabel: From the reports
galleryTitle: Supplementary figures.
gallery:
  - src: ./correlation-heatmap.png
    alt: Correlation heatmap of the 30 features, with strong positive correlation between radius, perimeter and area.
    caption: Correlation between the 30 features. Radius, perimeter and area are almost perfectly correlated, as expected for the geometry of a cell nucleus.
  - src: ./explained-variance.png
    alt: Individual and cumulative variance explained by each of the 30 principal components, with a 95% threshold line.
    caption: Variance explained by the principal components. The first two capture about 65%, and ten reach the 95% threshold.
  - src: ./distribution-compactness.png
    alt: Histograms of the mean, standard error and worst value of compactness, each with a fitted normal distribution.
    caption: Distributions of compactness (mean, standard error and worst value). Several features are right-skewed, and their scales differ widely, so the data were standardised.
  - src: ./regularisation.png
    alt: Linear-regression weights and training and validation error plotted against the regularisation parameter λ from 10⁻⁵ to 10⁹.
    caption: Regularised linear regression of the nucleus radius. Perimeter carries most of the weight, and the validation error is lowest for the smallest λ.
---

## The goal

This DTU course project (02450, 2023) applied the full machine-learning workflow to the **Breast Cancer Wisconsin (Diagnostic)** dataset: 569 tumour samples, each described by 30 measurements of the cell nuclei in a biopsy image. The main question was whether a tumour can be classified as **benign or malignant** from these measurements, and which model does it best. It was an academic analysis of a public dataset, not a clinical diagnostic tool.

## My involvement

The work covered the data visualisation and principal component analysis, the regularised linear regression of the nucleus radius, the neural-network and logistic-regression classifiers in Python and PyTorch, and the two-level cross-validation and statistical tests used to compare the models.

## Exploring the data

The features span very different scales, from smoothness values around 0.1 to areas around 500, so all data were standardised. A correlation analysis showed groups of strongly related features, and a **Principal Component Analysis** showed that two components already capture about 65% of the variance. Projected onto those two, benign and malignant samples separate almost linearly, a strong sign that classification would work.

## Regression: predicting the nucleus radius

As a regression task, the radius of the nucleus was predicted from seven other features, with the regularisation strength λ selected by 10-fold cross-validation. The model relies mostly on the perimeter, and regularisation had almost no effect. In a **two-level cross-validation** (10 outer × 10 inner folds), both the linear model and a neural network reached squared errors around 0.008–0.009, against about 12 for a baseline that predicts the mean. The difference between the neural network and the linear model was significant in only one of the ten folds.

## Classification: benign or malignant

The same two-level cross-validation compared three classifiers, with each model's complexity (network size, or the regularisation λ) selected in the inner loop:

| Model | Mean test error | Mean accuracy |
|---|---|---|
| Neural network | **2.6%** | **97.4%** |
| Logistic regression | 7.4% | 92.6% |
| Baseline (majority class) | 37.3% | 62.7% |

Averages over the ten outer folds. Per-fold accuracies ranged from 91–100% for the neural network and 83–98% for logistic regression.

Pairwise **McNemar's tests** confirmed that both models clearly beat the baseline. Between the neural network and logistic regression, however, the difference was significant in only one of the ten folds. The network had the lowest error, but the statistics did not show it to be reliably better.

## Result

The neural network classified tumours with **97.4% average accuracy**, in line with the 97% reported by the dataset's original authors. The most useful lesson was methodological: a lower error rate is not the same as a better model until a statistical test supports it.
