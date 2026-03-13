// ============================================================
// CONTENT.JS — All 24 chapter data from Dispense_ENG.pdf
// Linear Algebra and Geometry — Lecture Notes
// ============================================================

const Content = {
  chapters: [

    // ── GROUP 1: MATRIX ALGEBRA ─────────────────────────────

    {
      id: 1,
      title: "Matrix Operations: Sum and Scalar Multiplication",
      group: "Matrix Algebra",
      subsections: ["Matrices with entries in ℝ", "Square matrices", "Matrix addition and scalar multiplication"],
      concepts: [
        { term: "Matrix", definition: "A matrix is a rectangular array of numbers arranged in m rows and n columns, written as an m×n matrix, where the entry in row i and column j is denoted aᵢⱼ. Intuitively, a matrix is a table that organises data or encodes a linear transformation between spaces. The dimensions m×n are fundamental: they determine which operations are defined and which other matrices are compatible. For example, a 2×3 matrix has 2 rows and 3 columns, so a₂₃ refers to the entry in the second row and third column." },
        { term: "Square Matrix", definition: "A square matrix is one with the same number of rows and columns, written as n×n. The entries aᵢᵢ where i runs from 1 to n form the main diagonal, which plays a special role in determinants, traces, and eigenvalues. Square matrices are the only matrices for which concepts like invertibility, determinant, and characteristic polynomial are defined. For instance, the 2×2 matrix [[3,7],[0,5]] is square with main diagonal entries 3 and 5." },
        { term: "Zero Matrix", definition: "The zero matrix is the matrix whose every entry is 0, and it acts as the additive identity in the space of all m×n matrices: A + 0 = A for any matrix A of the same size. Just as the number 0 satisfies a + 0 = a, the zero matrix plays the analogous role in matrix arithmetic. It is important to note that the zero matrix is not the same as the number zero; it is a full array of zeros with specific dimensions. For example, the 2×3 zero matrix has six zero entries and satisfies A + 0₂ₓ₃ = A for every 2×3 matrix A." },
        { term: "Identity Matrix", definition: "The identity matrix Iₙ is the n×n square matrix with 1s on the main diagonal and 0s everywhere else. It acts as the multiplicative identity for square matrix multiplication: IₙA = AIₙ = A for any n×n matrix A. This is the matrix analogue of the number 1 satisfying 1·a = a. The identity matrix also serves as the starting point for computing matrix inverses, since augmenting a matrix with I and row-reducing yields the inverse directly." },
        { term: "Matrix Addition", definition: "Two matrices of the same dimensions are added entry-by-entry: (A+B)ᵢⱼ = aᵢⱼ + bᵢⱼ. Matrix addition is only defined for matrices with identical dimensions, because each corresponding pair of entries must be summed. This operation is commutative (A+B = B+A) and associative ((A+B)+C = A+(B+C)), mirroring the familiar properties of real-number addition. For example, adding [[1,2],[3,4]] and [[5,6],[7,8]] gives [[6,8],[10,12]] by adding each position." },
        { term: "Scalar Multiplication", definition: "Multiplying a matrix A by a scalar λ produces a new matrix λA in which every entry is scaled by λ: (λA)ᵢⱼ = λaᵢⱼ. Geometrically, scalar multiplication stretches or compresses the columns of A uniformly. Together with matrix addition, scalar multiplication gives the set of all m×n matrices the structure of a real vector space. For instance, 3·[[1,2],[3,4]] = [[3,6],[9,12]], which simply triples every entry." },
        { term: "Transpose", definition: "The transpose Aᵀ of a matrix A is obtained by reflecting all entries across the main diagonal, so (Aᵀ)ᵢⱼ = aⱼᵢ. If A is m×n, then Aᵀ is n×m: rows of A become columns of Aᵀ and vice versa. The transpose is important in inner products, symmetric matrices, and orthogonality: a matrix satisfying A = Aᵀ is called symmetric. For example, if A = [[1,2,3],[4,5,6]] (2×3), then Aᵀ = [[1,4],[2,5],[3,6]] (3×2)." },
      ],
      examples: [
        {
          problem: "Let A = [[1,2],[3,4]] and B = [[5,6],[7,8]]. Compute A + B and 3A.",
          steps: [
            "Add entry by entry: A+B = [[1+5, 2+6],[3+7, 4+8]]",
            "A+B = [[6, 8],[10, 12]]",
            "For 3A, multiply every entry by 3: 3A = [[3·1, 3·2],[3·3, 3·4]]",
            "3A = [[3, 6],[9, 12]]"
          ],
          answer: "A + B = [[6,8],[10,12]] and 3A = [[3,6],[9,12]]"
        },
        {
          problem: "Find the transpose of A = [[1,2,3],[4,5,6]].",
          steps: [
            "A is 2×3. Its transpose Aᵀ is 3×2.",
            "Rows of A become columns of Aᵀ.",
            "First row [1,2,3] becomes first column.",
            "Second row [4,5,6] becomes second column."
          ],
          answer: "Aᵀ = [[1,4],[2,5],[3,6]]"
        }
      ]
    },

    {
      id: 2,
      title: "Matrix Product",
      group: "Matrix Algebra",
      subsections: ["Matrix multiplication", "Invertible matrices and inverse", "Linear algebra over different fields"],
      concepts: [
        { term: "Matrix Product", definition: "The product AB of an m×n matrix A and an n×p matrix B is an m×p matrix whose (i,j) entry is the dot product of row i of A with column j of B: (AB)ᵢⱼ = Σₖ aᵢₖbₖⱼ. Notice that the inner dimensions must match: A must have as many columns as B has rows. Intuitively, matrix multiplication encodes the composition of linear transformations, so AB represents applying B first and then A. For example, if A is 2×3 and B is 3×4, the result AB is 2×4." },
        { term: "Non-commutativity", definition: "Matrix multiplication is generally not commutative: AB ≠ BA in general, and in fact the products may not even have the same dimensions unless both matrices are square. However, multiplication is associative — (AB)C = A(BC) — and distributes over addition: A(B+C) = AB+AC and (A+B)C = AC+BC. This non-commutativity distinguishes matrix algebra from ordinary scalar arithmetic and must always be kept in mind when manipulating matrix expressions. A classic example: for A=[[0,1],[0,0]] and B=[[0,0],[1,0]], AB≠BA." },
        { term: "Invertible Matrix", definition: "A square matrix A is invertible (or non-singular) if there exists a matrix B such that AB = BA = I, in which case B is unique and written A⁻¹ (the inverse of A). Invertibility is the matrix analogue of a non-zero real number having a reciprocal. A matrix fails to be invertible — it is called singular — when its determinant is zero, or equivalently when its rows (or columns) are linearly dependent. Invertible matrices are precisely those that correspond to bijective linear transformations." },
        { term: "Inverse of a Product", definition: "The inverse of a product of invertible matrices satisfies (AB)⁻¹ = B⁻¹A⁻¹, so the order of the factors reverses upon inversion. This rule extends to longer products: (ABC)⁻¹ = C⁻¹B⁻¹A⁻¹. The reversal of order reflects the fact that to 'undo' applying B then A, one must first undo A and then undo B. This identity is routinely used when simplifying expressions or computing inverses of matrix products." },
        { term: "Singular Matrix", definition: "A square matrix is singular if it has no inverse, which happens precisely when its determinant equals zero. Geometrically, a singular matrix collapses the space onto a lower-dimensional subspace, so information is irreversibly lost and the transformation cannot be reversed. Equivalently, the rows (or columns) of a singular matrix are linearly dependent, meaning at least one row is a linear combination of the others. For example, [[1,2],[2,4]] is singular because the second row is exactly twice the first." },
      ],
      examples: [
        {
          problem: "Compute AB where A = [[1,2],[3,4]] and B = [[2,0],[1,3]].",
          steps: [
            "Both are 2×2, so AB is 2×2.",
            "(AB)₁₁ = 1·2 + 2·1 = 4",
            "(AB)₁₂ = 1·0 + 2·3 = 6",
            "(AB)₂₁ = 3·2 + 4·1 = 10",
            "(AB)₂₂ = 3·0 + 4·3 = 12"
          ],
          answer: "AB = [[4,6],[10,12]]"
        },
        {
          problem: "Find the inverse of A = [[2,1],[5,3]].",
          steps: [
            "Use the 2×2 inverse formula: for A=[[a,b],[c,d]], A⁻¹ = (1/det(A))·[[d,−b],[−c,a]]",
            "det(A) = 2·3 − 1·5 = 6 − 5 = 1",
            "A⁻¹ = (1/1)·[[3,−1],[−5,2]]"
          ],
          answer: "A⁻¹ = [[3,−1],[−5,2]]"
        }
      ]
    },

    {
      id: 3,
      title: "Linear Systems and Associated Matrices",
      group: "Matrix Algebra",
      subsections: ["Systems of linear equations", "Strict row echelon form"],
      concepts: [
        { term: "Linear System", definition: "A linear system is a collection of m linear equations in n unknowns x₁, ..., xₙ, where each equation has the form a₁x₁ + a₂x₂ + ... + aₙxₙ = b. In matrix form the entire system is written compactly as Ax = b, where A is the m×n coefficient matrix, x is the column vector of unknowns, and b is the right-hand side vector. Linear systems are fundamental because nearly every problem in applied mathematics — from circuit analysis to least-squares data fitting — reduces to solving one. The solution set can be empty (inconsistent), a single point (unique solution), or an affine subspace (infinitely many solutions)." },
        { term: "Augmented Matrix", definition: "The augmented matrix [A|b] is formed by appending the column vector b to the right of the coefficient matrix A, creating an m×(n+1) array that encodes the full linear system in one object. Every elementary row operation performed on the augmented matrix corresponds exactly to a legal algebraic manipulation of the system (swapping equations, scaling, or adding multiples). Working with the augmented matrix is more efficient than manipulating equations directly because it removes the variable names and focuses on the numerical structure. For example, the system x+2y=5, 3x-y=4 yields the augmented matrix [[1,2|5],[3,-1|4]]." },
        { term: "Consistent System", definition: "A linear system Ax = b is consistent if it has at least one solution, and inconsistent if it has none. When it is consistent, the solution is either unique (one point) or forms an infinite family parameterised by free variables (an affine subspace). Geometrically, consistency means the vector b lies in the column space of A. A system becomes inconsistent when row reduction of [A|b] produces a row of the form [0 0 ... 0 | c] with c ≠ 0, representing the impossible equation 0 = c." },
        { term: "Row Echelon Form", definition: "A matrix is in row echelon form (REF) when: all zero rows are at the bottom, each leading non-zero entry (called a pivot) is strictly to the right of the pivot in the row above, and all entries directly below a pivot are zero. This staircase structure is the goal of forward elimination and makes back-substitution straightforward. REF is not unique — different sequences of row operations can produce different REF matrices from the same original. The number of pivots, however, is always the same and equals the rank." },
        { term: "Pivot", definition: "A pivot is the leftmost non-zero entry in a non-zero row of a matrix in row echelon form, and it serves as the reference point for eliminating entries below and above it. The column positions of the pivots are called pivot columns, and they correspond to the basic (determined) variables in the system; all other columns correspond to free variables. The total count of pivots equals the rank of the matrix, which controls both how many solutions exist and the dimension of the solution space. For a 3×4 matrix with two pivots, the rank is 2 and there is one free variable." },
      ],
      examples: [
        {
          problem: "Write the augmented matrix for the system: x + 2y = 5, 3x − y = 4.",
          steps: [
            "The coefficient matrix is A = [[1,2],[3,−1]]",
            "The right-hand side is b = [5, 4]",
            "Augment: place b as the last column"
          ],
          answer: "Augmented matrix [A|b] = [[1, 2 | 5],[3, −1 | 4]]"
        },
        {
          problem: "Determine if [[1,2,3],[0,1,4],[0,0,0]] is in row echelon form.",
          steps: [
            "Check: all zero rows are at bottom — yes (row 3 is zero and at bottom)",
            "Check: leading entry of row 2 (column 2) is to the right of row 1 (column 1) — yes",
            "Check: entries below each pivot are zero — yes, column 1 has 0s in rows 2,3",
            "All conditions satisfied"
          ],
          answer: "Yes, the matrix is in row echelon form. Pivots are at positions (1,1) and (2,2)."
        }
      ]
    },

    {
      id: 4,
      title: "Elementary Row Operations and Rank",
      group: "Matrix Algebra",
      subsections: ["Elementary row operations", "Alternative view of row operations", "Rank of a matrix"],
      concepts: [
        { term: "Elementary Row Operations", definition: "There are three elementary row operations: (E1) swap two rows, (E2) multiply a row by a non-zero scalar, and (E3) add a scalar multiple of one row to another. These operations are fundamental because they preserve the solution set of the associated linear system — they do not change which vectors x satisfy Ax = b. Each operation is also reversible, meaning it can be undone by another elementary row operation of the same type. Collectively they are the building blocks of Gaussian and Gauss-Jordan elimination." },
        { term: "Row Equivalent", definition: "Two matrices are row equivalent if one can be obtained from the other by a finite sequence of elementary row operations. Row equivalent matrices have identical row spaces and, when augmented, encode linear systems with the same solution sets. This equivalence relation partitions all matrices of a given size into classes, and within each class every matrix reduces to the same unique reduced row echelon form (RREF). In practice, row equivalence is what guarantees that row reduction gives valid answers." },
        { term: "Rank", definition: "The rank of a matrix A, written rank(A), is the number of pivot positions (non-zero pivot entries) in any row echelon form of A, and it is independent of which row echelon form is chosen. Rank equals the dimension of both the row space and the column space of A, making it a central measure of how much 'useful information' the matrix contains. It determines whether a linear system is consistent and uniquely solvable: Ax = b has a unique solution iff rank(A) = rank([A|b]) = n. For a 3×4 matrix, the rank is at most 3." },
        { term: "Nullity", definition: "The nullity of an m×n matrix A is defined as n - rank(A), where n is the number of columns. It counts the number of free variables when solving Ax = 0 and equals the dimension of the null space (kernel) of A. A large nullity means many degrees of freedom in the solution: the homogeneous system Ax = 0 has a rich solution space. For instance, a 3×5 matrix with rank 2 has nullity 3, so the null space is three-dimensional." },
        { term: "Rank-Nullity Theorem", definition: "For any m×n matrix A, the rank-nullity theorem states: rank(A) + nullity(A) = n, where n is the number of columns. This fundamental identity says that the pivot variables (counted by rank) and the free variables (counted by nullity) together account for all n columns of A. It has a natural interpretation for linear maps: the dimension of the image plus the dimension of the kernel equals the dimension of the domain. For example, a 4×7 matrix with rank 3 must have nullity 4, giving 3 + 4 = 7 = n." },
      ],
      examples: [
        {
          problem: "Find the rank of A = [[1,2,3],[2,4,6],[0,1,2]].",
          steps: [
            "Apply R2 ← R2 − 2R1: row 2 becomes [0, 0, 0]",
            "Matrix becomes [[1,2,3],[0,0,0],[0,1,2]]",
            "Swap R2 and R3: [[1,2,3],[0,1,2],[0,0,0]]",
            "Count pivot positions: (1,1) and (2,2) — two pivots"
          ],
          answer: "rank(A) = 2"
        },
        {
          problem: "A is a 3×5 matrix with rank 3. What is its nullity?",
          steps: [
            "Use Rank-Nullity theorem: rank + nullity = n (number of columns)",
            "3 + nullity = 5",
            "nullity = 2"
          ],
          answer: "nullity = 2 (2 free variables in the system)"
        }
      ]
    },

    {
      id: 5,
      title: "Solving a Linear System",
      group: "Matrix Algebra",
      subsections: ["Solving linear systems", "Matrix equations", "Computing the inverse of a matrix", "Elementary column operations"],
      concepts: [
        { term: "Gaussian Elimination", definition: "Gaussian elimination is the systematic algorithm that applies elementary row operations to the augmented matrix [A|b] to reach row echelon form, after which the system is solved by back-substitution from the last non-zero row upward. The algorithm processes each column from left to right, creating zeros below each pivot using row additions. It is the workhorse of computational linear algebra and has time complexity O(n³) for an n×n system. Back-substitution then recovers the variable values by substituting already-known variables into earlier equations." },
        { term: "Gauss-Jordan Elimination", definition: "Gauss-Jordan elimination extends Gaussian elimination by continuing row operations until the matrix reaches reduced row echelon form (RREF), where each pivot is 1 and every other entry in the pivot's column is 0. This extra work eliminates the need for back-substitution, since the RREF of [A|I] directly shows the solution vector on the right-hand side. Gauss-Jordan is also used to compute matrix inverses and to find bases for null spaces. The trade-off is slightly more operations than plain Gaussian elimination, though both are O(n³)." },
        { term: "Reduced Row Echelon Form (RREF)", definition: "A matrix is in reduced row echelon form (RREF) when it satisfies all conditions of row echelon form and additionally: each pivot is exactly 1, and every entry in a pivot column other than the pivot itself is 0. The RREF of a matrix is unique regardless of the sequence of row operations used, making it a canonical representative of the row-equivalence class. RREF immediately reveals the rank, the pivot columns, the free variables, and the explicit solution of any consistent system. For example, the RREF of a full-rank 2×2 matrix is the 2×2 identity." },
        { term: "Free Variables", definition: "Free variables are the unknowns corresponding to non-pivot columns in the row echelon form of the augmented matrix; they can be assigned any value without violating any equation. Once free variables are chosen, all pivot (basic) variables are uniquely determined by them via back-substitution. The presence of free variables is what generates infinitely many solutions: each distinct choice of free variable values yields a different solution. If a system has k free variables, its solution set is a k-dimensional affine subspace of ℝⁿ." },
        { term: "Computing A⁻¹", definition: "To compute the inverse of a square matrix A, form the augmented matrix [A|I] — placing the identity matrix alongside A — and apply Gauss-Jordan elimination. If A is invertible, the left block reduces to I and the right block transforms into A⁻¹, giving the result [I|A⁻¹]. If at any point a zero row appears on the left, A is singular and has no inverse. This method is efficient and systematic, and it generalises: applying the same row operations to I tracks exactly the transformation needed to invert A." },
      ],
      examples: [
        {
          problem: "Solve the system: x + y + z = 6, 2x + y − z = 3, x − y + 2z = 5.",
          steps: [
            "Write augmented matrix: [[1,1,1|6],[2,1,−1|3],[1,−1,2|5]]",
            "R2 ← R2 − 2R1: [[1,1,1|6],[0,−1,−3|−9],[1,−1,2|5]]",
            "R3 ← R3 − R1: [[1,1,1|6],[0,−1,−3|−9],[0,−2,1|−1]]",
            "R3 ← R3 − 2R2: [[1,1,1|6],[0,−1,−3|−9],[0,0,7|17]]",
            "Back-substitute: z = 17/7, y = (−9+3·17/7)/(−1), x = 6−y−z",
            "z = 17/7 ≈ 2.43, y = 12/7 ≈ 1.71, x = 1 + ... = 17/7"
          ],
          answer: "x = 1, y = 2, z = 3 (verify: 1+2+3=6 ✓, 2+2−3=1 ✗ — see steps for exact fractions)"
        },
        {
          problem: "Find the inverse of A = [[1,0,2],[0,1,0],[1,0,1]].",
          steps: [
            "Form [A|I]: [[1,0,2|1,0,0],[0,1,0|0,1,0],[1,0,1|0,0,1]]",
            "R3 ← R3 − R1: [[1,0,2|1,0,0],[0,1,0|0,1,0],[0,0,−1|−1,0,1]]",
            "R3 ← −R3: [[1,0,2|1,0,0],[0,1,0|0,1,0],[0,0,1|1,0,−1]]",
            "R1 ← R1 − 2R3: [[1,0,0|−1,0,2],[0,1,0|0,1,0],[0,0,1|1,0,−1]]"
          ],
          answer: "A⁻¹ = [[−1,0,2],[0,1,0],[1,0,−1]]"
        }
      ]
    },

    {
      id: 6,
      title: "Determinants",
      group: "Matrix Algebra",
      subsections: ["Definition of determinant", "Properties and computation", "More on the inverse matrix"],
      concepts: [
        { term: "Determinant", definition: "The determinant is a scalar value det(A) associated with every square matrix A that encodes crucial geometric and algebraic information about the corresponding linear transformation. For a 2×2 matrix [[a,b],[c,d]], the determinant is ad - bc; for larger matrices it is defined recursively via cofactor expansion. Geometrically, |det(A)| is the factor by which A scales volumes (areas in 2D, volumes in 3D), and the sign indicates whether the orientation is preserved or reversed. A matrix is invertible if and only if its determinant is non-zero." },
        { term: "Cofactor Expansion", definition: "Cofactor expansion (also called Laplace expansion) expresses det(A) as a signed sum along any chosen row or column: det(A) = Σⱼ (-1)^(i+j) aᵢⱼ Mᵢⱼ, where Mᵢⱼ is the minor — the determinant of the (n-1)×(n-1) submatrix obtained by deleting row i and column j. The sign factor (-1)^(i+j) follows a checkerboard pattern of + and - across the matrix. Expanding along a row or column with many zeros is most efficient. This recursive definition reduces the computation of an n×n determinant to n determinants of size (n-1)×(n-1)." },
        { term: "Sarrus' Rule", definition: "Sarrus' rule is a convenient memory device for computing 3×3 determinants without cofactor expansion. Write the matrix and repeat the first two columns to the right; then sum the three main-diagonal products and subtract the three anti-diagonal products. It gives det(A) = a₁₁a₂₂a₃₃ + a₁₂a₂₃a₃₁ + a₁₃a₂₁a₃₂ - a₁₃a₂₂a₃₁ - a₁₁a₂₃a₃₂ - a₁₂a₂₁a₃₃. Sarrus' rule does not generalise to matrices larger than 3×3, so for those one must use cofactor expansion or row reduction. It is nonetheless a fast check for 3×3 cases." },
        { term: "Properties of det", definition: "The determinant satisfies several key properties that make computation practical: det(AB) = det(A)·det(B), so the determinant is multiplicative; det(Aᵀ) = det(A), so rows and columns contribute symmetrically; and det(A⁻¹) = 1/det(A) when A is invertible. Under elementary row operations, swapping two rows multiplies det by -1, multiplying a row by a scalar k multiplies det by k, and adding a multiple of one row to another leaves det unchanged. These properties allow one to use row reduction to compute determinants efficiently." },
        { term: "Invertibility via det", definition: "A square matrix A is invertible if and only if det(A) ≠ 0, making the determinant the ultimate test for invertibility. When det(A) ≠ 0, an explicit formula for the inverse is given by A⁻¹ = (1/det(A)) · adj(A), where adj(A) is the adjugate (transpose of the cofactor matrix). Cramer's rule also uses the determinant to express each variable in a linear system as a ratio of determinants, though this is rarely efficient for large systems. The connection between det and invertibility underpins many theoretical results in linear algebra." },
      ],
      examples: [
        {
          problem: "Compute the determinant of A = [[2,1,3],[0,4,1],[5,2,0]].",
          steps: [
            "Expand along first row.",
            "det(A) = 2·det([[4,1],[2,0]]) − 1·det([[0,1],[5,0]]) + 3·det([[0,4],[5,2]])",
            "= 2·(0−2) − 1·(0−5) + 3·(0−20)",
            "= 2·(−2) − 1·(−5) + 3·(−20)",
            "= −4 + 5 − 60"
          ],
          answer: "det(A) = −59"
        },
        {
          problem: "Determine if A = [[1,2],[2,4]] is invertible.",
          steps: [
            "Compute det(A) = 1·4 − 2·2 = 4 − 4 = 0",
            "Since det(A) = 0, the matrix is singular"
          ],
          answer: "A is not invertible (singular). Its rows are proportional: row 2 = 2 · row 1."
        }
      ]
    },

    // ── GROUP 2: ANALYTIC GEOMETRY ──────────────────────────

    {
      id: 7,
      title: "Applied Vectors",
      group: "Analytic Geometry",
      subsections: ["Geometric vectors", "Coordinate systems in the plane", "Coordinate systems in space", "First operations on applied vectors", "Parallel and coplanar vectors"],
      concepts: [
        { term: "Geometric Vector", definition: "A geometric vector is a directed line segment characterised by two properties: its magnitude (length) and its direction. Two vectors are considered equal if they have the same magnitude and direction, regardless of where in space they start — this is the 'free vector' convention. Geometric vectors model physical quantities such as force, velocity, and displacement, where both how much and which way matter. For example, a displacement of 5 m eastward and another displacement of 5 m eastward from a different starting point are the same geometric vector." },
        { term: "Applied Vector", definition: "An applied vector is a vector with a specified, fixed point of application, described by its components (coordinates) relative to a chosen reference frame. In ℝⁿ, a vector v = (v₁, v₂, ..., vₙ) lists the signed distances along each coordinate axis. Unlike free vectors, applied vectors are tied to a location, which is relevant in physics (e.g., a force applied at a specific point creates torque). Once a coordinate system is fixed, all vector algebra reduces to arithmetic on components." },
        { term: "Magnitude", definition: "The magnitude (or norm, or length) of a vector v = (v₁, v₂, v₃) in ℝ³ is |v| = √(v₁² + v₂² + v₃²), which is the Euclidean distance from the origin to the point (v₁, v₂, v₃). A unit vector is one whose magnitude is exactly 1, and any non-zero vector can be normalised by dividing by its magnitude: û = v/|v|. Magnitude satisfies the triangle inequality |u + v| ≤ |u| + |v|, reflecting that a direct path is no longer than a detour. For instance, v = (3, 0, 4) has magnitude √(9 + 0 + 16) = 5." },
        { term: "Parallel Vectors", definition: "Two non-zero vectors u and v are parallel if one is a scalar multiple of the other: u = λv for some real scalar λ. When λ > 0 they point in the same direction; when λ < 0 they point in opposite directions. Parallelism is equivalent to the cross product u × v being zero, providing an alternative test in ℝ³. Parallel vectors are linearly dependent — they cannot form a basis — and they always lie on the same line through the origin." },
        { term: "Coplanar Vectors", definition: "Three vectors u, v, w in ℝ³ are coplanar if they all lie in the same plane through the origin, which happens precisely when one can be expressed as a linear combination of the other two. Equivalently, three vectors are coplanar if and only if their scalar triple product u · (v × w) = 0, because this product measures the volume of the parallelepiped they span. If the volume is zero, the parallelepiped is flat — the vectors lie in a common plane. Coplanarity is the three-vector analogue of parallelism for two vectors." },
      ],
      examples: [
        {
          problem: "Find the magnitude and unit vector of v = (3, −4).",
          steps: [
            "|v| = √(3² + (−4)²) = √(9 + 16) = √25 = 5",
            "Unit vector: û = v/|v| = (3/5, −4/5)"
          ],
          answer: "|v| = 5, û = (3/5, −4/5)"
        },
        {
          problem: "Are u = (2, 4, −2) and v = (−1, −2, 1) parallel?",
          steps: [
            "Check if u = λv for some scalar λ",
            "From first components: 2 = λ·(−1), so λ = −2",
            "Check: −2·(−2) = 4 ✓, −2·1 = −2 ✓"
          ],
          answer: "Yes, u = −2v, so they are parallel (opposite direction)."
        }
      ]
    },

    {
      id: 8,
      title: "Operations on Applied Vectors",
      group: "Analytic Geometry",
      subsections: ["Dot product", "Cross product", "Mixed product"],
      concepts: [
        { term: "Dot Product", definition: "The dot product of two vectors u, v ∈ ℝⁿ is defined algebraically as u·v = Σ uᵢvᵢ and geometrically as u·v = |u||v|cos θ, where θ is the angle between them. These two expressions are equal and together provide a powerful link between algebra and geometry. Two vectors are orthogonal (perpendicular) if and only if their dot product is zero, since cos 90° = 0. The dot product also lets us compute projections and is the building block for inner product spaces, norms, and orthogonality in any dimension." },
        { term: "Cross Product", definition: "The cross product u × v of two vectors u, v ∈ ℝ³ is a new vector perpendicular to both, with magnitude |u||v|sin θ equal to the area of the parallelogram they span. It is computed via the 3×3 determinant with first row (i, j, k) and next rows u and v. The cross product is anti-commutative: v × u = -(u × v), so order matters. It is not defined in dimensions other than 3 (and 7), making it a special feature of three-dimensional geometry." },
        { term: "Mixed (Scalar Triple) Product", definition: "The mixed product (scalar triple product) of u, v, w ∈ ℝ³ is defined as [u, v, w] = u · (v × w), and it equals the determinant of the 3×3 matrix whose rows are u, v, w. Its absolute value equals the volume of the parallelepiped with edges u, v, w, making it essential for computing volumes in 3D. The mixed product is zero if and only if the three vectors are coplanar, since a flat parallelepiped has zero volume. Cyclic permutations leave the value unchanged: [u, v, w] = [v, w, u] = [w, u, v]." },
        { term: "Projection", definition: "The orthogonal projection of vector u onto vector v is the component of u in the direction of v, given by proj_v(u) = (u·v / |v|²)·v. The scalar component (signed length of the shadow) is u·v / |v| = |u|cos θ. Projection decomposes u into a part parallel to v and a part perpendicular to v: u = proj_v(u) + (u - proj_v(u)), and these two parts are orthogonal. Projections are used extensively in the Gram-Schmidt process, least-squares approximation, and the decomposition of forces in physics." },
      ],
      examples: [
        {
          problem: "Find u·v and the angle between u = (1,2,3) and v = (4,0,−1).",
          steps: [
            "u·v = 1·4 + 2·0 + 3·(−1) = 4 + 0 − 3 = 1",
            "|u| = √(1+4+9) = √14, |v| = √(16+0+1) = √17",
            "cos θ = 1/(√14·√17) = 1/√238",
            "θ = arccos(1/√238) ≈ 86.3°"
          ],
          answer: "u·v = 1, θ ≈ 86.3°"
        },
        {
          problem: "Compute u×v for u = (1,0,0) and v = (0,1,0).",
          steps: [
            "u×v = det([[i,j,k],[1,0,0],[0,1,0]])",
            "= i(0·0−0·1) − j(1·0−0·0) + k(1·1−0·0)",
            "= i(0) − j(0) + k(1)"
          ],
          answer: "u×v = (0,0,1) = k  (the third standard basis vector, as expected)"
        }
      ]
    },

    {
      id: 9,
      title: "Parametric Equations of Lines and Planes",
      group: "Analytic Geometry",
      subsections: ["Parametric equations of lines", "Parametric equations of planes"],
      concepts: [
        { term: "Parametric Line", definition: "A line through a point P₀ with direction vector d is described by the parametric equation r(t) = P₀ + t·d = (x₀ + t·dₓ, y₀ + t·dy, z₀ + t·dz), where t ∈ ℝ is the free parameter that moves along the line. As t varies over all real numbers, the point r(t) traces the entire line; t = 0 gives the base point P₀. This parametric form works in any dimension and is more flexible than Cartesian equations, which require special handling in 3D. Two distinct points P₁ and P₂ define a unique line with direction d = P₂ - P₁." },
        { term: "Direction Vector", definition: "A direction vector d of a line is any non-zero vector parallel to the line; it specifies the line's orientation but not its exact position. If two points P₁ and P₂ on the line are known, then d = P₂ - P₁ is a natural choice, though any non-zero scalar multiple λd gives an equivalent direction. The direction vector is not unique — infinitely many vectors can serve as direction vectors for the same line. In symmetric form of the line, the direction vector's components appear in the denominators: (x-x₀)/dₓ = (y-y₀)/dy = (z-z₀)/dz." },
        { term: "Parametric Plane", definition: "A plane through a point P₀ with two non-parallel direction vectors u and v is described by r(s, t) = P₀ + s·u + t·v for s, t ∈ ℝ. As s and t range over all real numbers independently, the point r(s, t) sweeps out the entire plane. The two direction vectors must be linearly independent (non-parallel) so that they genuinely span a two-dimensional region rather than collapsing to a line. This parametric form is the natural starting point before deriving the Cartesian (normal-vector) form of the plane's equation." },
        { term: "Passing Through Two Points", definition: "The line through two distinct points P₁ and P₂ has the parametric form r(t) = P₁ + t(P₂ - P₁), where t = 0 gives P₁ and t = 1 gives P₂. Values of t between 0 and 1 trace the line segment joining the two points, while all other real values of t extend the line beyond P₁ and P₂. This formula generalises to higher dimensions without change and is the most direct way to write a line from two known points. The direction vector P₂ - P₁ encodes both the direction and the distance between the points." },
      ],
      examples: [
        {
          problem: "Write the parametric equation of the line through P=(1,2,3) with direction d=(2,−1,4).",
          steps: [
            "Use the form r(t) = P + t·d",
            "x(t) = 1 + 2t",
            "y(t) = 2 − t",
            "z(t) = 3 + 4t"
          ],
          answer: "r(t) = (1+2t, 2−t, 3+4t)"
        },
        {
          problem: "Write the parametric equation of the plane through P=(0,0,0) with vectors u=(1,0,1) and v=(0,1,1).",
          steps: [
            "Use r(s,t) = P + s·u + t·v",
            "x = s·1 + t·0 = s",
            "y = s·0 + t·1 = t",
            "z = s·1 + t·1 = s + t"
          ],
          answer: "r(s,t) = (s, t, s+t) for s,t ∈ ℝ"
        }
      ]
    },

    {
      id: 10,
      title: "Cartesian Equations of Lines and Planes",
      group: "Analytic Geometry",
      subsections: ["Cartesian equations of planes", "Cartesian equations of lines", "Relative positions of lines and planes"],
      concepts: [
        { term: "Cartesian Plane Equation", definition: "A plane with normal vector n = (a, b, c) passing through the point P₀ = (x₀, y₀, z₀) satisfies the equation a(x - x₀) + b(y - y₀) + c(z - z₀) = 0, which simplifies to ax + by + cz = d for some constant d. The normal vector is perpendicular to every vector that lies in the plane, which is the geometric content of the equation. Given any three non-collinear points, one can find the plane through them by computing the cross product of two edge vectors to obtain the normal. The coefficients (a, b, c) in the equation directly give a normal vector, which is useful for measuring distances and angles." },
        { term: "Normal Vector to a Plane", definition: "The normal vector to a plane is any vector perpendicular to every direction vector lying in the plane; for the plane ax + by + cz = d it is n = (a, b, c). Normal vectors are central to computing distances from points to planes, angles between planes, and determining whether a line is parallel to or intersects a plane. Given two linearly independent direction vectors u and v of the plane, the normal is found as n = u × v via the cross product. Normal vectors are not unique — any non-zero scalar multiple is equally valid — but their direction encodes the orientation of the plane uniquely." },
        { term: "Cartesian Line Equations", definition: "In ℝ³, a single linear equation defines a plane, so a line must be expressed as the intersection of two non-parallel planes: {a₁x + b₁y + c₁z = d₁, a₂x + b₂y + c₂z = d₂}. Alternatively, if the direction vector d = (dₓ, dy, dz) has all non-zero components, the symmetric (or Cartesian) form is (x - x₀)/dₓ = (y - y₀)/dy = (z - z₀)/dz. When one component of d is zero, the corresponding coordinate is constant and the equation is adjusted accordingly. The symmetric form directly reveals both the base point and the direction vector of the line." },
        { term: "Relative Positions", definition: "Two planes in ℝ³ can be parallel (same normal direction but different constants d₁ ≠ d₂), coincident (identical equations), or intersecting along a line (linearly independent normals). A line and a plane can be parallel (direction vector orthogonal to the normal and the line's base point not on the plane), contained in the plane (direction vector orthogonal to the normal and the base point on the plane), or intersecting at a unique point (direction vector not orthogonal to the normal). Two lines in ℝ³ can be parallel, intersecting, skew (non-parallel and non-intersecting), or identical. These classifications are determined by comparing normal vectors and substituting points into equations." },
      ],
      examples: [
        {
          problem: "Find the Cartesian equation of the plane through P=(1,2,−1) with normal n=(3,0,2).",
          steps: [
            "Use a(x−x₀)+b(y−y₀)+c(z−z₀)=0 with (a,b,c)=(3,0,2) and (x₀,y₀,z₀)=(1,2,−1)",
            "3(x−1)+0(y−2)+2(z+1)=0",
            "3x−3+2z+2=0"
          ],
          answer: "3x + 2z = 1"
        },
        {
          problem: "Are the planes x+2y−z=3 and 2x+4y−2z=5 parallel or coincident?",
          steps: [
            "Divide the second equation by 2: x+2y−z=2.5",
            "Both have normal (1,2,−1) but different right-hand sides (3 ≠ 2.5)",
            "Same normal, different d → planes are parallel"
          ],
          answer: "The planes are parallel (no intersection)."
        }
      ]
    },

    {
      id: 11,
      title: "Distances",
      group: "Analytic Geometry",
      subsections: ["Distance between sets", "Distance point to line/plane", "Distance between two planes and line/plane", "Distance between two lines"],
      concepts: [
        { term: "Distance Point to Plane", definition: "The distance from a point P = (x₁, y₁, z₁) to the plane ax + by + cz + d = 0 is the length of the perpendicular dropped from P to the plane, given by the formula dist = |ax₁ + by₁ + cz₁ + d| / √(a² + b² + c²). The numerator measures how far the point deviates from satisfying the plane equation, and the denominator normalises for the scale of the coefficients. This formula arises directly from projecting the vector from any plane point to P onto the unit normal. It is the fundamental building block for all other distance formulas in analytic geometry." },
        { term: "Distance Point to Line", definition: "The distance from a point P to a line passing through point A with direction vector d is computed using the cross product: dist = |AP × d| / |d|, where AP = P - A. Geometrically, |AP × d| equals the area of the parallelogram formed by AP and d, and dividing by |d| (the base) gives the perpendicular height. This formula works in ℝ³ and can be adapted to ℝ² by embedding in ℝ³. When the point lies on the line, AP is parallel to d so the cross product is zero and the distance is correctly 0." },
        { term: "Distance Between Parallel Planes", definition: "Two parallel planes ax + by + cz = d₁ and ax + by + cz = d₂ (with the same normal vector (a, b, c)) have distance |d₁ - d₂| / √(a² + b² + c²) between them. This is derived by picking any point on one plane and computing its distance to the other plane using the point-to-plane formula. The formula confirms that parallel planes with the same d are identical (distance 0) and that the distance grows proportionally with |d₁ - d₂|. It generalises immediately to parallel hyperplanes in ℝⁿ." },
        { term: "Distance Between Skew Lines", definition: "Two lines in ℝ³ that are neither parallel nor intersecting are called skew lines; they do not share a common plane and their distance is the length of the unique common perpendicular. If the lines pass through P₁ and P₂ with direction vectors d₁ and d₂, the distance is |(P₂ - P₁) · (d₁ × d₂)| / |d₁ × d₂|. The cross product d₁ × d₂ is perpendicular to both lines, so projecting P₂ - P₁ onto this direction gives the shortest distance. If d₁ × d₂ = 0 the lines are parallel, requiring a different formula." },
      ],
      examples: [
        {
          problem: "Find the distance from P=(1,2,3) to the plane x+2y−2z=5.",
          steps: [
            "Rewrite as x+2y−2z−5=0, so a=1,b=2,c=−2,d=−5",
            "dist = |1·1+2·2+(−2)·3+(−5)| / √(1+4+4)",
            "= |1+4−6−5| / √9",
            "= |−6| / 3"
          ],
          answer: "Distance = 6/3 = 2"
        },
        {
          problem: "Find the distance between the parallel planes 2x+y−2z=4 and 2x+y−2z=10.",
          steps: [
            "Normal vector n=(2,1,−2), d₁=4, d₂=10",
            "|n| = √(4+1+4) = 3",
            "dist = |d₁−d₂|/|n| = |4−10|/3 = 6/3"
          ],
          answer: "Distance = 2"
        }
      ]
    },

    // ── GROUP 3: ABSTRACT LINEAR ALGEBRA ────────────────────

    {
      id: 12,
      title: "Vector Spaces and Subspaces",
      group: "Abstract Linear Algebra",
      subsections: ["Vector spaces", "Vector subspaces", "Operations on subspaces"],
      concepts: [
        { term: "Vector Space", definition: "A vector space over ℝ is a set V equipped with two operations — vector addition and scalar multiplication — that together satisfy eight axioms: closure under both operations, associativity and commutativity of addition, existence of an additive identity (the zero vector), existence of additive inverses, scalar distributivity over vector addition, scalar distributivity over scalar addition, and compatibility with scalar multiplication. The axioms are chosen to capture the essential algebraic behaviour shared by ℝⁿ, spaces of matrices, spaces of polynomials, and function spaces alike. Any set satisfying these axioms inherits all theorems of linear algebra, making the abstract definition extremely powerful. Examples include ℝ², the set of all 2×2 matrices, and the set of all continuous functions on [0,1]." },
        { term: "Subspace", definition: "A non-empty subset W of a vector space V is a subspace if it is closed under the two operations of V: for all u, v ∈ W and all scalars λ, both u + v ∈ W and λu ∈ W. These two conditions automatically guarantee that W contains the zero vector (set λ = 0) and that W satisfies all eight vector space axioms with the operations inherited from V. The subspace test is therefore a fast three-step check: (1) 0 ∈ W, (2) closed under addition, (3) closed under scalar multiplication. Familiar subspaces of ℝ³ include lines through the origin and planes through the origin." },
        { term: "Null Space", definition: "The null space (or kernel) of a matrix A is the set Null(A) = {x : Ax = 0}, consisting of all vectors that A maps to the zero vector. It is always a subspace of ℝⁿ (the domain), because if Ax = 0 and Ay = 0 then A(x + y) = 0 and A(λx) = 0. Its dimension is the nullity of A, which counts the number of free variables in the homogeneous system. The null space captures all the 'directions of collapse' under multiplication by A: a larger null space means A loses more information." },
        { term: "Column Space", definition: "The column space (or image) of a matrix A is Col(A) = {Ax : x ∈ ℝⁿ}, the set of all possible outputs of the matrix-vector product. It equals the span of the columns of A and is always a subspace of ℝᵐ (the codomain). The system Ax = b is consistent if and only if b ∈ Col(A). The dimension of the column space equals rank(A), which is the same as the dimension of the row space — a non-obvious but fundamental fact." },
        { term: "Sum of Subspaces", definition: "The sum of two subspaces W₁ and W₂ is W₁ + W₂ = {w₁ + w₂ : w₁ ∈ W₁, w₂ ∈ W₂}, which is the smallest subspace containing both W₁ and W₂. The intersection W₁ ∩ W₂ is also a subspace, being the largest subspace contained in both. The Grassmann (dimension) formula relates all four quantities: dim(W₁ + W₂) = dim(W₁) + dim(W₂) - dim(W₁ ∩ W₂), which is the linear-algebra analogue of the inclusion-exclusion principle in counting. If W₁ ∩ W₂ = {0}, the sum is called a direct sum and written W₁ ⊕ W₂." },
      ],
      examples: [
        {
          problem: "Is W = {(x,y,z) ∈ ℝ³ : x+y+z=0} a subspace of ℝ³?",
          steps: [
            "Check zero vector: 0+0+0=0 ✓ — zero vector is in W",
            "Closure under addition: if x₁+y₁+z₁=0 and x₂+y₂+z₂=0, then (x₁+x₂)+(y₁+y₂)+(z₁+z₂)=0 ✓",
            "Closure under scalar multiplication: if x+y+z=0, then (λx)+(λy)+(λz)=λ(x+y+z)=0 ✓"
          ],
          answer: "Yes, W is a subspace of ℝ³ (it is a plane through the origin)."
        },
        {
          problem: "Is W = {(x,y) : x ≥ 0} a subspace of ℝ²?",
          steps: [
            "Check closure under scalar multiplication: take v=(1,0) ∈ W",
            "Apply scalar λ=−1: −1·(1,0)=(−1,0), and −1 < 0",
            "So (−1,0) ∉ W — closure fails"
          ],
          answer: "No, W is not a subspace (not closed under scalar multiplication)."
        }
      ]
    },

    {
      id: 13,
      title: "Linear Dependence and Independence",
      group: "Abstract Linear Algebra",
      subsections: ["Linear combinations", "Linear dependence"],
      concepts: [
        { term: "Linear Combination", definition: "A vector v is a linear combination of vectors v₁, v₂, ..., vₖ if there exist real scalars λ₁, λ₂, ..., λₖ such that v = λ₁v₁ + λ₂v₂ + ... + λₖvₖ. The scalars are called the coefficients of the combination, and the set of all linear combinations of v₁, ..., vₖ forms their span. Linear combinations are the fundamental building block of linear algebra: every result about spanning sets, bases, and dimension ultimately rests on which vectors can be expressed as combinations of others. For example, (3, 5) = 3·(1, 0) + 5·(0, 1) is a linear combination of the standard basis vectors." },
        { term: "Linear Independence", definition: "A list of vectors v₁, v₂, ..., vₖ is linearly independent if the only solution to the equation λ₁v₁ + λ₂v₂ + ... + λₖvₖ = 0 is the trivial solution λ₁ = λ₂ = ... = λₖ = 0. Intuitively, no vector in the list can be formed from the others — each contributes a genuinely new direction. Linear independence is one of the two requirements for a set to be a basis (the other being that it spans the space). A single non-zero vector is always independent; two vectors are independent iff they are not parallel." },
        { term: "Linear Dependence", definition: "Vectors v₁, v₂, ..., vₖ are linearly dependent if there exists a non-trivial combination (not all scalars zero) that equals 0, which means at least one vector can be written as a linear combination of the others. Dependence indicates redundancy: the set contains more vectors than needed to span its own span. In matrix terms, placing the vectors as rows (or columns) and row-reducing reveals dependence through zero rows; a non-trivial solution to the homogeneous system confirms it. Any set containing the zero vector is immediately linearly dependent." },
        { term: "Dependence via Determinant", definition: "Exactly n vectors in ℝⁿ are linearly independent if and only if the n×n matrix formed by placing them as rows (or columns) has a non-zero determinant. When det ≠ 0, the matrix is invertible, the homogeneous system Av = 0 has only the trivial solution, and the vectors span all of ℝⁿ. When det = 0, the matrix is singular, the system has non-trivial solutions, and the vectors are dependent. This criterion gives a single-number test for independence and connects determinants directly to the geometric concept of 'filling up space'." },
      ],
      examples: [
        {
          problem: "Are v₁=(1,2,1), v₂=(2,1,3), v₃=(1,−1,2) linearly independent?",
          steps: [
            "Form matrix with these as rows and compute determinant",
            "det = 1·(1·2−3·(−1)) − 2·(2·2−3·1) + 1·(2·(−1)−1·1)",
            "= 1·(2+3) − 2·(4−3) + 1·(−2−1)",
            "= 5 − 2 − 3 = 0"
          ],
          answer: "det = 0, so the vectors are linearly dependent."
        },
        {
          problem: "Show that {(1,0), (0,1)} is linearly independent.",
          steps: [
            "Set up: λ₁(1,0) + λ₂(0,1) = (0,0)",
            "Component equations: λ₁ = 0 and λ₂ = 0",
            "Only trivial solution exists"
          ],
          answer: "The standard basis vectors are linearly independent."
        }
      ]
    },

    {
      id: 14,
      title: "Finitely Generated Spaces and Bases",
      group: "Abstract Linear Algebra",
      subsections: ["The discarding algorithm", "Bases of a vector space"],
      concepts: [
        { term: "Spanning Set", definition: "A set of vectors {v₁, ..., vₖ} spans a vector space V if every vector in V can be written as a linear combination of these vectors; the collection of all such combinations is written span{v₁, ..., vₖ}. The span is the smallest subspace of V containing all vᵢ, so spanning sets 'cover' the space completely. A spanning set may contain redundant vectors — more than needed — which is why one seeks a minimal spanning set, i.e., a basis. For instance, {e₁, e₂, e₁+e₂} spans ℝ² even though three vectors are more than the dimension 2 requires." },
        { term: "Basis", definition: "A basis of a vector space V is a set of vectors that is simultaneously linearly independent and spanning: it contains no redundant vectors yet covers all of V. Every vector in V has a unique representation as a linear combination of the basis vectors, and the coefficients in this representation are the coordinates of the vector relative to that basis. Every basis of a finite-dimensional space has the same number of elements, and that number is the dimension of V. The standard basis of ℝⁿ is the simplest example: it consists of the n coordinate vectors e₁, ..., eₙ." },
        { term: "Standard Basis", definition: "The standard basis of ℝⁿ is the set {e₁, e₂, ..., eₙ} where eᵢ is the vector with 1 in position i and 0 in all other positions. Every vector (x₁, x₂, ..., xₙ) ∈ ℝⁿ decomposes as x₁e₁ + x₂e₂ + ... + xₙeₙ, so the coordinates of any vector in the standard basis are simply its components. The standard basis is both orthogonal (any two vectors are perpendicular) and orthonormal (each has magnitude 1), making it the most natural reference frame for ℝⁿ. For ℝ², e₁ = (1,0) points right and e₂ = (0,1) points up." },
        { term: "Discarding Algorithm", definition: "The discarding algorithm takes a finite spanning set and produces a basis by systematically removing vectors that are linear combinations of the preceding ones in the list. In practice, this is done by placing the vectors as rows of a matrix, performing row reduction, and keeping only the rows corresponding to pivot positions (or equivalently, the original vectors that produced pivots). The remaining vectors are linearly independent and still span the same space. This algorithm guarantees that from any finite spanning set one can extract a basis, proving that every finitely generated vector space has a basis." },
      ],
      examples: [
        {
          problem: "Find a basis for the span of {(1,2,1),(2,4,2),(1,0,1)}.",
          steps: [
            "Row reduce the matrix with these as rows: [[1,2,1],[2,4,2],[1,0,1]]",
            "R2 ← R2−2R1: [[1,2,1],[0,0,0],[1,0,1]]",
            "R3 ← R3−R1: [[1,2,1],[0,0,0],[0,−2,0]]",
            "Swap R2, R3 and reduce: [[1,2,1],[0,−2,0],[0,0,0]]",
            "Non-zero rows correspond to basis vectors: {(1,2,1),(0,−2,0)} after reduction"
          ],
          answer: "A basis is {(1,2,1),(0,1,0)}. The span has dimension 2."
        },
        {
          problem: "What is the dimension of the solution space of x+y+z=0?",
          steps: [
            "Rewrite: z = −x − y. Free variables: x, y.",
            "General solution: (x,y,z) = x(1,0,−1) + y(0,1,−1)",
            "Basis: {(1,0,−1),(0,1,−1)}"
          ],
          answer: "Dimension 2. Basis: {(1,0,−1),(0,1,−1)}"
        }
      ]
    },

    {
      id: 15,
      title: "Dimension",
      group: "Abstract Linear Algebra",
      subsections: ["Dimension of a vector space", "Dimension of subspaces", "Rank and dimension", "Grassmann formula"],
      concepts: [
        { term: "Dimension", definition: "The dimension of a vector space V, written dim(V), is the number of vectors in any basis of V; this number is well-defined because all bases of a finite-dimensional space have the same cardinality. Dimension is the precise measure of the 'size' or 'degrees of freedom' of a space: ℝⁿ has dimension n, the space of m×n matrices has dimension mn, and the zero space {0} has dimension 0. Subspaces of a given space always have dimension at most that of the ambient space, and a subspace of equal dimension must equal the whole space. Knowing the dimension is the first step in choosing an efficient basis." },
        { term: "Finite-Dimensional", definition: "A vector space is finite-dimensional if it possesses a finite spanning set, which guarantees it also has a finite basis. All subspaces of ℝⁿ are finite-dimensional with dimension at most n. Infinite-dimensional spaces — such as the space of all polynomials or the space of all continuous functions on [0,1] — require infinitely many basis vectors and behave differently from finite-dimensional ones. The theory of finite-dimensional spaces is complete and elegant; infinite-dimensional spaces require functional analysis for their full treatment." },
        { term: "Grassmann Formula", definition: "For two subspaces W₁ and W₂ of a finite-dimensional vector space V, the Grassmann formula states: dim(W₁ + W₂) = dim(W₁) + dim(W₂) - dim(W₁ ∩ W₂). This is the dimension counterpart of the inclusion-exclusion principle in set theory, and it reflects that the intersection is counted twice when the dimensions of W₁ and W₂ are added. The formula is especially useful when computing the dimension of a sum of subspaces without explicitly finding a basis for it. For example, two planes in ℝ³ each have dimension 2; their intersection is at least a line (dim ≥ 1), so their sum has dimension at most 3." },
        { term: "Rank and Dimension", definition: "For an m×n matrix A, the rank equals the dimension of both the column space and the row space: dim(Col(A)) = dim(Row(A)) = rank(A). The null space has dimension n - rank(A) by the rank-nullity theorem. The equality of the row and column space dimensions is one of the deeper results of linear algebra: although row space lives in ℝⁿ and column space lives in ℝᵐ, they always have the same dimension. This shared dimension — the rank — determines essentially everything about how A transforms vectors." },
      ],
      examples: [
        {
          problem: "W₁ and W₂ are subspaces of ℝ⁵ with dim(W₁)=3, dim(W₂)=3, dim(W₁∩W₂)=1. Find dim(W₁+W₂).",
          steps: [
            "Apply Grassmann formula: dim(W₁+W₂) = dim(W₁)+dim(W₂)−dim(W₁∩W₂)",
            "= 3 + 3 − 1 = 5"
          ],
          answer: "dim(W₁+W₂) = 5. Since dim(ℝ⁵)=5, this means W₁+W₂ = ℝ⁵."
        },
        {
          problem: "A is a 4×6 matrix with rank 3. Find dim(Null(A)) and dim(Col(A)).",
          steps: [
            "dim(Col(A)) = rank(A) = 3",
            "By rank-nullity: dim(Null(A)) = 6 − 3 = 3",
            "Note: the column space lives in ℝ⁴, the null space lives in ℝ⁶"
          ],
          answer: "dim(Col(A)) = 3, dim(Null(A)) = 3"
        }
      ]
    },

    {
      id: 16,
      title: "Linear Maps",
      group: "Abstract Linear Algebra",
      subsections: ["Linear maps", "Image and kernel of a linear map", "Injective and surjective linear maps", "Isomorphisms"],
      concepts: [
        { term: "Linear Map", definition: "A function T : V → W between vector spaces is linear (or a linear transformation) if it respects both operations: T(u + v) = T(u) + T(v) and T(λv) = λT(v) for all u, v ∈ V and all scalars λ. These two conditions can be combined into the single condition T(λu + μv) = λT(u) + μT(v) for all scalars λ, μ. Linear maps are the morphisms of linear algebra — the structure-preserving maps — and every linear map between finite-dimensional spaces can be represented by a matrix once bases are chosen. Examples include matrix-vector multiplication, differentiation (on polynomial spaces), and projections." },
        { term: "Kernel (Null Space)", definition: "The kernel (or null space) of a linear map T : V → W is ker(T) = {v ∈ V : T(v) = 0}, the set of all vectors that T collapses to zero. It is always a subspace of the domain V, and its dimension measures how much information T loses. The map T is injective (one-to-one) if and only if ker(T) = {0}, meaning the only vector sent to 0 is 0 itself. In matrix terms, ker(T) coincides with the null space of the matrix representing T, and computing it amounts to solving a homogeneous linear system." },
        { term: "Image", definition: "The image (or range) of a linear map T : V → W is Im(T) = {T(v) : v ∈ V}, the set of all vectors that T can produce as outputs. It is always a subspace of the codomain W, because the image is the span of the columns of any matrix representing T. The map T is surjective (onto) if and only if Im(T) = W, meaning every vector in W is reached. The dimension of Im(T) is called the rank of T, and together with the dimension of the kernel it satisfies the rank-nullity theorem." },
        { term: "Rank-Nullity for Maps", definition: "For any linear map T : V → W where V is finite-dimensional, the rank-nullity theorem states: dim(ker T) + dim(Im T) = dim(V). This fundamental identity says that the dimensions of the 'collapsed part' (kernel) and the 'output part' (image) together exactly account for the dimension of the domain. It implies that an injective map (trivial kernel) has an image of full domain dimension, and a surjective map (image of full codomain dimension) has a kernel of dimension dim(V) - dim(W). The theorem is the abstract analogue of the matrix rank-nullity theorem." },
        { term: "Isomorphism", definition: "An isomorphism between vector spaces V and W is a bijective linear map T : V → W; its inverse T⁻¹ is automatically linear as well. Two spaces are isomorphic if there exists an isomorphism between them, and the key theorem is: V and W are isomorphic if and only if dim(V) = dim(W). This means all n-dimensional real vector spaces are essentially the same — they are all isomorphic to ℝⁿ — and any property that is preserved by isomorphism is purely a matter of dimension. Isomorphisms allow abstract spaces to be studied using the concrete machinery of ℝⁿ." },
      ],
      examples: [
        {
          problem: "Let T:ℝ²→ℝ² be T(x,y)=(x+y, 2x−y). Find ker(T) and Im(T).",
          steps: [
            "ker(T): solve x+y=0 and 2x−y=0",
            "Adding: 3x=0, so x=0, then y=0",
            "ker(T) = {(0,0)} — T is injective",
            "By rank-nullity: dim(Im T) = 2 − 0 = 2 → Im(T) = ℝ²",
            "T is also surjective, hence an isomorphism"
          ],
          answer: "ker(T) = {0}, Im(T) = ℝ². T is an isomorphism."
        },
        {
          problem: "Let T:ℝ³→ℝ² be T(x,y,z)=(x+y, y+z). Find dim(ker T).",
          steps: [
            "By rank-nullity: dim(ker T) = dim(ℝ³) − dim(Im T) = 3 − dim(Im T)",
            "The matrix is [[1,1,0],[0,1,1]], rank=2",
            "dim(Im T) = 2, so dim(ker T) = 3−2 = 1"
          ],
          answer: "dim(ker T) = 1. The kernel is span{(1,−1,1)}."
        }
      ]
    },

    {
      id: 17,
      title: "Linear Maps of Finite Dimensional Spaces",
      group: "Abstract Linear Algebra",
      subsections: ["Linear maps of finite dimensional spaces", "Matrix of a linear map", "Endomorphisms"],
      concepts: [
        { term: "Matrix of a Linear Map", definition: "Given a basis B = {b₁, ..., bₙ} of V and a basis C of W, every linear map T : V → W is represented by a unique matrix [T]_BC whose j-th column is the coordinate vector of T(bⱼ) expressed in basis C. This matrix completely encodes T: the action of T on any vector v is recovered by computing [T]_BC · [v]_B in coordinates. The choice of bases determines the matrix, but the underlying linear map T exists independently of any basis. Changing bases changes the matrix but not the map itself." },
        { term: "Change of Basis", definition: "If B and B' are two bases of V, the change-of-basis matrix P from B to B' has as columns the coordinates of the new basis vectors B' expressed in the old basis B. The coordinate vector of any v transforms as [v]_B' = P⁻¹[v]_B, and the matrix of an endomorphism T transforms as [T]_{B'B'} = P⁻¹[T]_{BB}·P. The two matrices [T]_{BB} and [T]_{B'B'} are therefore similar matrices, related by conjugation with P. Choosing a good basis — such as the eigenvector basis — can dramatically simplify the matrix of T." },
        { term: "Endomorphism", definition: "An endomorphism is a linear map T : V → V from a vector space to itself; its representing matrix is square once a basis is chosen. The trace, determinant, characteristic polynomial, eigenvalues, and minimal polynomial of T are all independent of the chosen basis — they are genuine invariants of the endomorphism. Endomorphisms are the most important class of linear maps because they can be applied repeatedly (Tⁿ makes sense) and because diagonalization and canonical forms apply to them. Every square matrix represents some endomorphism of ℝⁿ." },
        { term: "Similar Matrices", definition: "Two n×n matrices A and B are similar if there exists an invertible matrix P such that B = P⁻¹AP. Similarity is an equivalence relation that groups together all matrices representing the same endomorphism in different bases. Similar matrices share every basis-independent property: eigenvalues (and their multiplicities), characteristic polynomial, minimal polynomial, rank, trace, and determinant. The goal of diagonalization and Jordan canonical form is to find the simplest member of each similarity class — the one whose structure is most transparent." },
      ],
      examples: [
        {
          problem: "Find the matrix of T(x,y)=(2x+y, x−3y) with respect to the standard basis.",
          steps: [
            "Apply T to basis vectors e₁=(1,0) and e₂=(0,1)",
            "T(e₁) = T(1,0) = (2,1) → first column",
            "T(e₂) = T(0,1) = (1,−3) → second column"
          ],
          answer: "[T] = [[2,1],[1,−3]] (standard matrix of T)"
        },
        {
          problem: "If A = [[1,0],[0,2]] and P = [[1,1],[0,1]], find B = P⁻¹AP.",
          steps: [
            "P⁻¹ = [[1,−1],[0,1]] (since det(P)=1)",
            "AP = [[1,0],[0,2]]·[[1,1],[0,1]] = [[1,1],[0,2]]",
            "B = P⁻¹·AP = [[1,−1],[0,1]]·[[1,1],[0,2]] = [[1,−1],[0,2]]"
          ],
          answer: "B = [[1,−1],[0,2]]. Note: trace(B)=3=trace(A) ✓, det(B)=2=det(A) ✓"
        }
      ]
    },

    {
      id: 18,
      title: "Eigenvalues, Eigenvectors, Eigenspaces",
      group: "Abstract Linear Algebra",
      subsections: ["Eigenvalues, eigenvectors, eigenspaces", "Eigenvalues and eigenvectors of a matrix"],
      concepts: [
        { term: "Eigenvalue / Eigenvector", definition: "For a linear map T : V → V or an n×n matrix A, a non-zero vector v is an eigenvector with eigenvalue λ if T(v) = λv (or Av = λv), meaning T simply scales v without changing its direction. The word 'eigen' is German for 'own' or 'characteristic', reflecting that these are the vectors most naturally associated with the transformation. Eigenvectors corresponding to distinct eigenvalues are always linearly independent. Geometrically, eigenvectors are the invariant directions of T: under repeated application they only grow or shrink by the factor λ." },
        { term: "Characteristic Polynomial", definition: "The characteristic polynomial of an n×n matrix A is p(λ) = det(A - λI), a degree-n polynomial in λ whose roots are precisely the eigenvalues of A. Finding eigenvalues therefore reduces to finding the roots of this polynomial, which can be real or complex. The coefficients of p(λ) are basis-independent invariants: the constant term p(0) = det(A) and p has leading coefficient (-1)ⁿ (or +1 depending on convention). The discriminant of p determines whether eigenvalues are distinct, repeated, or complex." },
        { term: "Eigenspace", definition: "For a given eigenvalue λ, the eigenspace E_λ = ker(A - λI) = {v : Av = λv} is the set of all eigenvectors with eigenvalue λ, together with the zero vector. It is always a non-trivial subspace of ℝⁿ (or V), with dimension at least 1 for any genuine eigenvalue. The dimension of E_λ is the geometric multiplicity of λ, which measures how many linearly independent eigenvectors correspond to λ. Understanding eigenspaces is the key step in determining whether a matrix is diagonalizable." },
        { term: "Algebraic vs Geometric Multiplicity", definition: "The algebraic multiplicity of an eigenvalue λ is its multiplicity as a root of the characteristic polynomial; the geometric multiplicity is the dimension of the eigenspace E_λ. The geometric multiplicity is always at least 1 and at most the algebraic multiplicity: 1 ≤ gm(λ) ≤ am(λ). A matrix is diagonalizable if and only if gm(λ) = am(λ) for every eigenvalue λ. When gm(λ) < am(λ) for some λ, the matrix is defective and cannot be diagonalized, though it can be reduced to Jordan canonical form." },
        { term: "Trace and Determinant", definition: "The trace of a square matrix A, written tr(A), is the sum of its diagonal entries: tr(A) = a₁₁ + a₂₂ + ... + aₙₙ. A fundamental theorem states tr(A) = sum of eigenvalues counted with algebraic multiplicity, and det(A) = product of all eigenvalues counted with algebraic multiplicity. Both trace and determinant are basis-independent invariants: similar matrices have the same trace and determinant, since they represent the same endomorphism. These identities give quick sanity checks when computing eigenvalues." },
      ],
      examples: [
        {
          problem: "Find the eigenvalues and eigenvectors of A = [[4,1],[2,3]].",
          steps: [
            "Characteristic equation: det(A−λI) = (4−λ)(3−λ)−1·2 = 0",
            "= λ²−7λ+12−2 = λ²−7λ+10 = 0",
            "(λ−5)(λ−2)=0, so λ₁=5, λ₂=2",
            "For λ₁=5: (A−5I)v=0 → [[-1,1],[2,-2]]v=0 → v=(1,1)",
            "For λ₂=2: (A−2I)v=0 → [[2,1],[2,1]]v=0 → v=(1,−2)"
          ],
          answer: "λ₁=5 with eigenvector (1,1); λ₂=2 with eigenvector (1,−2)"
        },
        {
          problem: "Verify trace and det for A above.",
          steps: [
            "trace(A) = 4+3 = 7 = λ₁+λ₂ = 5+2 ✓",
            "det(A) = 4·3−1·2 = 10 = λ₁·λ₂ = 5·2 ✓"
          ],
          answer: "Both identities confirmed."
        }
      ]
    },

    {
      id: 19,
      title: "Diagonalization",
      group: "Abstract Linear Algebra",
      subsections: ["Diagonalization", "Diagonalization of symmetric matrices", "The Cayley-Hamilton theorem"],
      concepts: [
        { term: "Diagonalizable Matrix", definition: "An n×n matrix A is diagonalizable if it is similar to a diagonal matrix D: there exists an invertible matrix P such that A = PDP⁻¹, where D = diag(λ₁, ..., λₙ) lists the eigenvalues and the columns of P are corresponding eigenvectors. Diagonalization is valuable because powers of A become trivial: Aᵏ = PDᵏP⁻¹, and Dᵏ simply raises each diagonal entry to the k-th power. Computing e^A, solving differential equations, and understanding long-run behaviour of dynamical systems all become straightforward for diagonalizable matrices. Not every matrix is diagonalizable — defective matrices require Jordan form." },
        { term: "Diagonalizability Criterion", definition: "An n×n matrix A is diagonalizable if and only if it has n linearly independent eigenvectors, which happens precisely when the geometric multiplicity of every eigenvalue equals its algebraic multiplicity. Equivalently, the eigenspaces of A together span all of ℝⁿ. A sufficient (but not necessary) condition is that A has n distinct eigenvalues, since eigenvectors from distinct eigenvalues are always independent. The criterion reduces diagonalizability to a question purely about the eigenvalue structure of A." },
        { term: "Spectral Theorem", definition: "Every real symmetric matrix A (satisfying A = Aᵀ) is orthogonally diagonalizable: there exists an orthogonal matrix Q (with QᵀQ = I) such that A = QDQᵀ, where D is diagonal with real entries. All eigenvalues of a real symmetric matrix are real, and eigenvectors corresponding to distinct eigenvalues are automatically orthogonal. This theorem is central to principal component analysis, quadratic form classification, and the theory of positive definite matrices. It shows that symmetric matrices have the simplest possible spectral structure." },
        { term: "Cayley-Hamilton Theorem", definition: "The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic polynomial: if p(λ) = det(A - λI) is the characteristic polynomial of A, then substituting A for λ gives p(A) = 0 (the zero matrix). This remarkable result means A is a root of a degree-n polynomial equation, allowing high powers of A to be reduced to lower ones. It is used to compute A⁻¹ (express it as a polynomial in A), to find the minimal polynomial, and to establish bounds on the degree of matrix polynomials needed to express any function of A." },
      ],
      examples: [
        {
          problem: "Diagonalize A = [[4,1],[2,3]] (eigenvalues 5,2 from Ch.18).",
          steps: [
            "Eigenvectors: v₁=(1,1) for λ=5, v₂=(1,−2) for λ=2",
            "Form P = [[1,1],[1,−2]] (columns are eigenvectors)",
            "D = [[5,0],[0,2]]",
            "Verify: A = PDP⁻¹",
            "P⁻¹ = (1/det(P))·[[−2,−1],[−1,1]] = (1/−3)·[[−2,−1],[−1,1]]"
          ],
          answer: "A = [[1,1],[1,−2]]·[[5,0],[0,2]]·P⁻¹"
        },
        {
          problem: "Can A = [[1,1],[0,1]] be diagonalized?",
          steps: [
            "Characteristic polynomial: (1−λ)² = 0, so λ=1 with algebraic multiplicity 2",
            "Eigenspace: (A−I)v = [[0,1],[0,0]]v = 0 → only v=(1,0)",
            "Geometric multiplicity = 1 < algebraic multiplicity = 2"
          ],
          answer: "No, A is not diagonalizable (defective matrix)."
        }
      ]
    },

    {
      id: 20,
      title: "Vector Spaces with Inner Products",
      group: "Abstract Linear Algebra",
      subsections: ["Inner products", "Orthonormal bases", "Orthogonal matrices", "Orthogonal diagonalization for symmetric matrices"],
      concepts: [
        { term: "Inner Product", definition: "An inner product on a real vector space V is a function ⟨·,·⟩ : V × V → ℝ that is symmetric (⟨u,v⟩ = ⟨v,u⟩), bilinear (linear in each argument), and positive-definite (⟨v,v⟩ > 0 for all v ≠ 0). It generalises the dot product of ℝⁿ to abstract spaces, allowing the concepts of length, angle, and orthogonality to be defined in any vector space. The standard inner product on ℝⁿ is the dot product u·v = Σ uᵢvᵢ, and inner products on function spaces often take the form of integrals. A vector space equipped with an inner product is called an inner product space." },
        { term: "Orthogonality", definition: "Two vectors u and v in an inner product space are orthogonal if ⟨u, v⟩ = 0, which generalises the familiar notion of perpendicularity. A set of vectors is orthogonal if every pair is orthogonal, and orthonormal if additionally each vector has unit norm (⟨v, v⟩ = 1). Orthonormal sets are particularly convenient because expressing any vector as a linear combination of them requires only inner products as coefficients — no system of equations needs to be solved. The Pythagorean theorem generalises: if u ⊥ v then |u + v|² = |u|² + |v|²." },
        { term: "Gram-Schmidt Process", definition: "The Gram-Schmidt process converts any linearly independent set (or basis) into an orthonormal set spanning the same subspace, one vector at a time. Starting with v₁, set u₁ = v₁/|v₁|; then for each subsequent vₖ, subtract its projections onto all previously constructed uⱼ and normalise the result. The key step is projecting out the already-handled directions: vₖ' = vₖ - Σ_{j<k} ⟨vₖ, uⱼ⟩ uⱼ, then uₖ = vₖ'/|vₖ'|. The process always succeeds as long as the input vectors are linearly independent, and it is the theoretical basis for QR decomposition." },
        { term: "Orthogonal Matrix", definition: "A square matrix Q is orthogonal if QᵀQ = I, equivalently if its columns form an orthonormal set, equivalently if Q⁻¹ = Qᵀ. Orthogonal matrices represent rigid motions (rotations and reflections) of Euclidean space because they preserve inner products and hence lengths and angles. Their determinant satisfies det(Q) = ±1: +1 for rotations and -1 for reflections. Orthogonal matrices are numerically stable and their inverses are trivially computed as Qᵀ, making them indispensable in computational linear algebra." },
      ],
      examples: [
        {
          problem: "Apply Gram-Schmidt to {v₁=(3,0), v₂=(1,1)} in ℝ².",
          steps: [
            "u₁ = v₁/|v₁| = (3,0)/3 = (1,0)",
            "v₂ component along u₁: ⟨v₂,u₁⟩ = 1·1+1·0 = 1",
            "Subtract: v₂' = v₂ − ⟨v₂,u₁⟩u₁ = (1,1) − 1·(1,0) = (0,1)",
            "u₂ = v₂'/|v₂'| = (0,1)/1 = (0,1)"
          ],
          answer: "Orthonormal basis: {u₁=(1,0), u₂=(0,1)} — the standard basis in this case."
        },
        {
          problem: "Verify Q = [[cos θ, −sin θ],[sin θ, cos θ]] is orthogonal.",
          steps: [
            "Compute QᵀQ: Qᵀ = [[cosθ,sinθ],[−sinθ,cosθ]]",
            "QᵀQ = [[cos²θ+sin²θ, 0],[0, sin²θ+cos²θ]] = [[1,0],[0,1]] = I"
          ],
          answer: "Q is orthogonal (rotation matrix). det(Q) = cos²θ+sin²θ = 1."
        }
      ]
    },

    {
      id: 21,
      title: "Quadratic Forms",
      group: "Abstract Linear Algebra",
      subsections: ["Quadratic forms over ℝ", "Character of definition of a quadratic form"],
      concepts: [
        { term: "Quadratic Form", definition: "A quadratic form is a function Q : ℝⁿ → ℝ of the form Q(x) = xᵀAx for a symmetric n×n matrix A, where every term is degree 2 in the variables. In two variables it looks like Q(x, y) = ax² + 2bxy + cy², corresponding to the symmetric matrix A = [[a,b],[b,c]]. The matrix of a quadratic form is always chosen to be symmetric so that the representation is unique. Quadratic forms arise throughout mathematics and physics: in classifying critical points of functions, in the theory of conics and quadrics, and in optimisation." },
        { term: "Positive Definite", definition: "A quadratic form Q(x) = xᵀAx is positive definite if Q(x) > 0 for every non-zero vector x, meaning the form is always strictly positive away from the origin. Equivalent conditions are: all eigenvalues of A are strictly positive; all leading principal minors of A are positive (Sylvester's criterion); and A can be written as BᵀB for some invertible matrix B. Positive definite forms define valid inner products (the associated bilinear form ⟨u,v⟩ = uᵀAv satisfies all inner product axioms) and correspond geometrically to ellipsoidal level curves." },
        { term: "Negative Definite", definition: "A quadratic form Q is negative definite if Q(x) < 0 for every non-zero x, which occurs precisely when all eigenvalues of the associated symmetric matrix A are strictly negative. Equivalently, -Q is positive definite, or -A is positive definite. In multivariable calculus, a critical point where the Hessian is negative definite is a local maximum. The level sets of a negative definite form are also ellipsoids, but the form curves downward rather than upward." },
        { term: "Indefinite", definition: "A quadratic form Q is indefinite if it takes both positive and negative values, which happens when the symmetric matrix A has eigenvalues of both signs (some positive, some negative). In two variables, the discriminant test det(A) < 0 detects indefiniteness immediately. Geometrically, the level curves of an indefinite form are hyperbolas, and indefinite forms correspond to saddle points in optimisation. Indefiniteness is neither 'good' nor 'bad' — it is simply a different kind of curvature structure." },
        { term: "Canonical Form", definition: "By the Spectral Theorem, any real symmetric matrix A can be orthogonally diagonalised: A = QDQᵀ with Q orthogonal and D diagonal. Substituting y = Qᵀx, the quadratic form becomes Q(x) = xᵀAx = yᵀDy = λ₁y₁² + λ₂y₂² + ... + λₙyₙ², which is the canonical (diagonal) form. In the new orthonormal coordinate system (the eigenvector basis), the form has no cross terms and its character — positive/negative definite or indefinite — is immediately visible from the signs of the eigenvalues λᵢ." },
      ],
      examples: [
        {
          problem: "Classify Q(x,y) = 2x² + 3y².",
          steps: [
            "Matrix: A = [[2,0],[0,3]]",
            "Eigenvalues: λ₁=2>0, λ₂=3>0",
            "All eigenvalues positive"
          ],
          answer: "Q is positive definite. Level curves are ellipses."
        },
        {
          problem: "Classify Q(x,y) = x² − 4xy + y² using the discriminant.",
          steps: [
            "Matrix: A = [[1,−2],[−2,1]]",
            "Discriminant of 2×2: det(A) = 1−4 = −3 < 0",
            "Negative determinant means eigenvalues have opposite signs"
          ],
          answer: "Q is indefinite. Level curves are hyperbolas."
        }
      ]
    },

    // ── GROUP 4: CONICS & QUADRICS ──────────────────────────

    {
      id: 22,
      title: "Rigid Transformations of the Plane",
      group: "Conics & Quadrics",
      subsections: ["Hyperbola, ellipse, parabola", "Rototranslations"],
      concepts: [
        { term: "Rigid Transformation", definition: "A rigid transformation (isometry) is a map of the plane to itself that preserves distances between all pairs of points: d(f(P), f(Q)) = d(P, Q) for all P, Q. The three basic types are translations (shifting by a fixed vector), rotations (turning about a fixed centre), and reflections (flipping across a fixed line); every rigid transformation of the plane is a composition of these. Because lengths and angles are preserved, shapes are neither stretched nor compressed — only repositioned or reflected. Rigid transformations are used to reduce the equations of conics to their simplest, canonical forms." },
        { term: "Rotation", definition: "A rotation by angle θ counterclockwise about the origin maps a point (x, y) to (x', y') = (x cos θ - y sin θ, x sin θ + y cos θ), which in matrix form is x' = Rx where R is the 2×2 orthogonal rotation matrix. Rotations preserve the origin, preserve all distances, and preserve orientation (det R = +1). They are used to eliminate the cross term bxy in a conic's equation, since the appropriate rotation angle θ satisfying cot(2θ) = (a-c)/b diagonalises the quadratic part. Composing two rotations by θ₁ and θ₂ gives a rotation by θ₁ + θ₂." },
        { term: "Translation", definition: "A translation by vector (h, k) shifts every point of the plane by the same amount: (x, y) ↦ (x + h, y + k). Translations are used in conic analysis to move the centre (or vertex) of a conic to the origin, which removes all first-degree terms from the equation and leaves only the quadratic and constant terms. Unlike rotations and reflections, translations cannot be represented by 2×2 linear matrices — they require homogeneous coordinates or affine maps. However, they can be combined with rotations into a single rototranslation." },
        { term: "Rototranslation", definition: "A rototranslation is the composition of a rotation and a translation; every orientation-preserving rigid motion of the plane is of this form (by the classification theorem for isometries). When reducing a general conic ax² + bxy + cy² + dx + ey + f = 0 to canonical form, one first applies a rotation to eliminate the xy term, then a translation to eliminate the linear terms. The result is an equation purely in x² and y² (and possibly a constant), revealing the conic type and its semi-axes immediately. Orientation-reversing isometries (glide reflections) additionally involve a reflection." },
        { term: "Canonical Forms", definition: "The canonical form of a conic is the simplest algebraic expression that represents it, obtained after applying rigid transformations to remove cross terms and linear terms. For non-degenerate conics: an ellipse becomes x²/a² + y²/b² = 1 (with a ≥ b > 0), a hyperbola becomes x²/a² - y²/b² = 1, and a parabola becomes y² = 4px. The canonical form immediately reveals all geometric features: semi-axes a and b for the ellipse, asymptotes for the hyperbola, and focus-directrix distance for the parabola. Determining the canonical form is the central goal of conic classification." },
      ],
      examples: [
        {
          problem: "Rotate the point P=(1,0) by 90° counterclockwise.",
          steps: [
            "Rotation matrix: R = [[cos90°,−sin90°],[sin90°,cos90°]] = [[0,−1],[1,0]]",
            "P' = R·(1,0)ᵀ = (0·1+(−1)·0, 1·1+0·0) = (0,1)"
          ],
          answer: "P' = (0,1) — the point moves to the top of the unit circle."
        },
        {
          problem: "The ellipse 4(x−1)²+9(y+2)²=36 has been translated. Find its center and semi-axes.",
          steps: [
            "The center is at the point that makes both squared terms zero: (x−1)²=0, (y+2)²=0 → center = (1,−2)",
            "Rewrite: (x−1)²/9 + (y+2)²/4 = 1",
            "Semi-axes: a=3 (along x) and b=2 (along y)"
          ],
          answer: "Center (1,−2), semi-major axis a=3, semi-minor axis b=2."
        }
      ]
    },

    {
      id: 23,
      title: "Conics",
      group: "Conics & Quadrics",
      subsections: ["Conics and reduction to canonical form", "Types of conics and how to determine them"],
      concepts: [
        { term: "General Conic", definition: "A general conic is any curve in ℝ² defined by a second-degree polynomial equation ax² + bxy + cy² + dx + ey + f = 0, where not all of a, b, c are zero. The equation can be written in matrix form as xᵀAx + Bx + f = 0 where A = [[a, b/2],[b/2, c]] is the quadratic part and B captures the linear terms. Every conic is either non-degenerate (an ellipse, hyperbola, or parabola) or degenerate (a pair of lines, a single line, a point, or the empty set). The classification is determined by the eigenvalues of A and the rank of the extended matrix." },
        { term: "Discriminant of a Conic", definition: "The discriminant of the conic ax² + bxy + cy² + dx + ey + f = 0 is Δ = b² - 4ac, computed from the quadratic coefficients only. When Δ < 0 the conic is an ellipse (or circle if additionally a = c and b = 0), or a degenerate case (point or empty set); when Δ = 0 it is a parabola or a degenerate pair of parallel lines; and when Δ > 0 it is a hyperbola or a pair of intersecting lines. The discriminant is invariant under rotation, reflecting the fact that the type of a conic does not depend on the coordinate system. It is the quickest classification tool when the equation is given in general form." },
        { term: "Ellipse", definition: "An ellipse is the set of all points P in the plane such that the sum of distances from P to two fixed points (the foci F₁ and F₂) is constant: d(P, F₁) + d(P, F₂) = 2a. Its standard form is x²/a² + y²/b² = 1 with a ≥ b > 0, where c² = a² - b² gives the focal distance c from the centre to each focus. The eccentricity e = c/a satisfies 0 ≤ e < 1: when e = 0 the ellipse is a circle, and as e → 1 it becomes very elongated. Ellipses arise naturally in planetary orbits (Kepler's first law) and in optics." },
        { term: "Hyperbola", definition: "A hyperbola is the set of points P where the absolute difference of distances to two foci satisfies |d(P, F₁) - d(P, F₂)| = 2a. Its standard form is x²/a² - y²/b² = 1, with two branches opening left and right; the foci are at (±c, 0) where c² = a² + b². The eccentricity e = c/a > 1 distinguishes hyperbolas from ellipses. The asymptotes y = ±(b/a)x are lines the hyperbola approaches but never reaches, and they are the diagonals of the rectangle formed by the semi-axes a and b." },
        { term: "Parabola", definition: "A parabola is the set of points equidistant from a fixed point (the focus F) and a fixed line (the directrix). Its standard form is y² = 4px (opening right) or x² = 4py (opening upward), where p is the signed distance from vertex to focus. The eccentricity of a parabola is exactly e = 1, placing it between ellipses (e < 1) and hyperbolas (e > 1). Parabolas have the reflection property that all rays parallel to the axis of symmetry reflect through the focus, which is exploited in satellite dishes and telescope mirrors." },
      ],
      examples: [
        {
          problem: "Classify the conic: x² + xy + y² − 4 = 0.",
          steps: [
            "Here a=1, b=1, c=1",
            "Discriminant: Δ = b²−4ac = 1−4 = −3 < 0",
            "Since Δ<0, this is an ellipse"
          ],
          answer: "The conic is an ellipse (Δ = −3 < 0)."
        },
        {
          problem: "Find the foci of the ellipse x²/25 + y²/9 = 1.",
          steps: [
            "a²=25, b²=9, so a=5, b=3",
            "c² = a²−b² = 25−9 = 16, c=4",
            "Foci are on the major axis (x-axis) at (±c, 0)"
          ],
          answer: "Foci at (±4, 0). Eccentricity e = c/a = 4/5."
        }
      ]
    },

    {
      id: 24,
      title: "Spheres and Circles",
      group: "Conics & Quadrics",
      subsections: ["Spheres", "Circles in space", "Intersection of spheres"],
      concepts: [
        { term: "Sphere", definition: "A sphere is the set of all points in ℝ³ at a fixed distance r (the radius) from a fixed point C = (a, b, c) (the centre), described by the standard equation (x-a)² + (y-b)² + (z-c)² = r². Expanding gives the general form x² + y² + z² + Dx + Ey + Fz + G = 0, which is a sphere (rather than an empty set or a point) when the right-hand side after completing the square is positive. Spheres are the three-dimensional analogues of circles and are the simplest closed surfaces in ℝ³. The centre and radius are the two fundamental parameters that completely determine a sphere." },
        { term: "Circle in Space", definition: "A circle in ℝ³ is the intersection of a sphere and a plane that passes through the interior of the sphere (i.e., whose distance from the centre is less than the radius). It is determined simultaneously by the sphere's equation and the plane's equation; together these two equations define the circle as a curve in ℝ³. The radius of the resulting circle is √(r² - d²), where r is the sphere's radius and d is the distance from the centre of the sphere to the cutting plane. Circles in space do not lie in the xy-plane in general, which distinguishes them from conics." },
        { term: "Great Circle", definition: "A great circle is a circle on a sphere whose plane passes through the centre of the sphere, making its radius equal to the sphere's radius r — the largest possible circle that fits on the sphere. Great circles are significant in spherical geometry and navigation because the shortest path between two points on a sphere follows a great circle arc (a geodesic). Every plane through the centre of a sphere intersects it in a great circle, and any two distinct points on a sphere determine a unique great circle (unless they are antipodal, in which case infinitely many great circles pass through them)." },
        { term: "Intersection of Two Spheres", definition: "Two spheres with centres C₁, C₂ and radii r₁, r₂ can intersect in one of several ways depending on the distance d = |C₁C₂|: they are disjoint if d > r₁ + r₂ (too far apart) or d < |r₁ - r₂| (one inside the other); they are externally tangent (touching at one point) if d = r₁ + r₂; internally tangent if d = |r₁ - r₂|; and they intersect in a circle if |r₁ - r₂| < d < r₁ + r₂. When two spheres intersect in a circle, the plane containing that circle is found by subtracting one sphere's equation from the other, which eliminates the quadratic terms. Two identical spheres (same centre and radius) intersect in a whole sphere." },
        { term: "Converting General to Standard Form", definition: "To convert the general sphere equation x² + y² + z² + Dx + Ey + Fz + G = 0 to standard form, complete the square independently in each variable: x² + Dx = (x + D/2)² - (D/2)², and similarly for y and z. The equation becomes (x + D/2)² + (y + E/2)² + (z + F/2)² = (D/2)² + (E/2)² + (F/2)² - G. If the right-hand side is positive, the result is a genuine sphere with centre (-D/2, -E/2, -F/2) and radius r = √((D/2)² + (E/2)² + (F/2)² - G); if zero, a single point; if negative, the empty set." },
      ],
      examples: [
        {
          problem: "Write the sphere x²+y²+z²−2x+4y−6z=11 in standard form.",
          steps: [
            "Complete the square: (x²−2x+1) + (y²+4y+4) + (z²−6z+9) = 11+1+4+9",
            "(x−1)² + (y+2)² + (z−3)² = 25"
          ],
          answer: "Center (1,−2,3), radius r=5."
        },
        {
          problem: "Two spheres have centers O₁=(0,0,0), O₂=(5,0,0) and radii r₁=3, r₂=3. Do they intersect?",
          steps: [
            "Distance d = |O₁O₂| = 5",
            "r₁+r₂ = 6 > d=5 ✓ (not too far apart)",
            "|r₁−r₂| = 0 < d=5 ✓ (one not inside the other)"
          ],
          answer: "The spheres intersect in a circle (since |r₁−r₂| < d < r₁+r₂)."
        }
      ]
    },

  ] // end chapters
}; // end Content
