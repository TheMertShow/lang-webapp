# Linear Algebra — Interactive Study Guide

An interactive web application for learning Linear Algebra and Geometry, based on university-level lecture notes covering 24 chapters.

**Live site:** `https://<your-username>.github.io/<your-repo-name>`

---

## What's Inside

**24 chapters across 4 thematic groups:**

| Group | Chapters | Topics |
|-------|----------|--------|
| Matrix Algebra | 1 – 6 | Matrices, products, linear systems, Gaussian elimination, determinants |
| Analytic Geometry | 7 – 11 | Vectors, dot/cross products, lines, planes, distances |
| Abstract Linear Algebra | 12 – 21 | Vector spaces, bases, linear maps, eigenvalues, diagonalization, inner products |
| Conics & Quadrics | 22 – 24 | Rigid transformations, conics, spheres |

**Features:**
- Concept cards with detailed definitions for every topic
- Interactive canvas visuals with labeled Cartesian axes (x/y)
- Manual number inputs on all visuals — type any value and see results live
- Step-by-step worked examples (expandable)
- Progress tracking saved in your browser
- Previous / Next chapter navigation

---

## Visuals

Every chapter has a dedicated interactive visual:

- **Matrix Grid** — edit matrix entries, switch between addition and multiplication, step through row × column
- **Gaussian Elimination** — edit the full system, step through each elimination stage
- **Determinant** — edit the matrix, switch between cofactor expansion columns
- **Vector Operations** — drag vectors via number inputs, see dot product and resultant
- **Parametric Line & Plane** — edit P₀ and direction, animate with parameter t
- **Distance Visualizer** — move point P and change line equation, see perpendicular distance
- **Span / Independence** — edit vectors, toggle span shading, see det = 0 detection
- **Linear Transformation** — choose a preset or type a custom matrix, animate the unit square
- **Eigenvalue Visualizer** — edit matrix, spin a test vector to find eigenvectors
- **Gram-Schmidt** — step through orthonormalization with editable inputs
- **Quadratic Form** — change coefficients, see level curve classification
- **Conic Sections** — switch ellipse/hyperbola/parabola with parameter inputs and foci shown
- **Sphere Intersection** — adjust radii and distance, see intersection circle computed live

---

## How to Deploy (GitHub Pages)

1. Create a new repository on [github.com](https://github.com)
2. Upload all files from this folder (keeping the same structure)
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch`
5. Choose branch `main`, folder `/ (root)`
6. Click **Save** — your site will be live at `https://<username>.github.io/<repo-name>` within a minute

---

## Tech Stack

Pure HTML + CSS + JavaScript — no frameworks, no build tools, no dependencies.
Runs entirely in the browser. Works offline after first load (except Google Fonts).

---

## Source

Content based on *Linear Algebra and Geometry* lecture notes (217 pages, 24 chapters).
