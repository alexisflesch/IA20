const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('degree');
const degVal = document.getElementById('deg-val');
const statsDiv = document.getElementById('stats');

let trainPoints = [];
let testPoints = [];
let trueFunction = null;

// --- Matrix Math Helpers ---
function multiply(A, B) {
    const m = A.length, n = A[0].length, p = B[0].length;
    const C = Array(m).fill(0).map(() => Array(p).fill(0));
    for (let i = 0; i < m; i++)
        for (let j = 0; j < p; j++)
            for (let k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}

function transpose(A) {
    return A[0].map((_, i) => A.map(row => row[i]));
}

function gaussianElimination(A, b) {
    const n = A.length;
    // Augment A with b
    const M = A.map((row, i) => [...row, b[i][0]]);

    for (let i = 0; i < n; i++) {
        // Pivot
        let maxRow = i;
        for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
        [M[i], M[maxRow]] = [M[maxRow], M[i]];

        // Normalize
        const pivot = M[i][i];
        for (let j = i; j <= n; j++) M[i][j] /= pivot;

        // Eliminate
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = M[k][i];
                for (let j = i; j <= n; j++) M[k][j] -= factor * M[i][j];
            }
        }
    }
    return M.map(row => [row[n]]);
}

function solvePolynomialRegression(points, degree) {
    // X matrix: [1, x, x^2, ...]
    const X = points.map(p => {
        const row = [];
        for (let d = 0; d <= degree; d++) row.push(Math.pow(p.x, d));
        return row;
    });
    const Y = points.map(p => [p.y]);

    // Normal Equation: theta = (X^T * X)^-1 * X^T * Y
    // We solve (X^T * X) * theta = X^T * Y

    const XT = transpose(X);
    const XTX = multiply(XT, X);
    const XTY = multiply(XT, Y);

    // Add tiny regularization (Ridge) to avoid singular matrix if points are few
    // We use a very small value to allow "true" overfitting (passing through all points)
    for (let i = 0; i < XTX.length; i++) XTX[i][i] += 1e-12;

    try {
        const theta = gaussianElimination(XTX, XTY);
        return theta.map(row => row[0]); // Flatten
    } catch (e) {
        console.error("Matrix singular?", e);
        return Array(degree + 1).fill(0);
    }
}

function predict(x, coeffs) {
    let y = 0;
    for (let i = 0; i < coeffs.length; i++) {
        y += coeffs[i] * Math.pow(x, i);
    }
    return y;
}

// --- App Logic ---

function generateData() {
    trainPoints = [];
    testPoints = [];

    // True function: sin wave + linear trend
    trueFunction = (x) => Math.sin(x * 2 * Math.PI) * 0.8; // x in [0, 1]

    // Generate Train
    for (let i = 0; i < 15; i++) {
        const x = Math.random();
        const y = trueFunction(x) + (Math.random() - 0.5) * 0.3; // Noise
        trainPoints.push({ x, y });
    }

    // Generate Test
    for (let i = 0; i < 15; i++) {
        const x = Math.random();
        const y = trueFunction(x) + (Math.random() - 0.5) * 0.3;
        testPoints.push({ x, y });
    }

    draw();
}

function draw() {
    const degree = parseInt(slider.value);
    degVal.textContent = degree;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const padding = 50;

    // Coordinate transform: x[0,1] -> canvas, y[-1.5, 1.5] -> canvas
    const toCanvasX = (x) => padding + x * (w - 2 * padding);
    const toCanvasY = (y) => h / 2 - y * (h / 3); // Scale y

    // Draw Axes
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(padding, h / 2); ctx.lineTo(w - padding, h / 2); // X axis
    ctx.stroke();

    // Draw True Function (Green)
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (let px = 0; px <= 1; px += 0.01) {
        const cx = toCanvasX(px);
        const cy = toCanvasY(trueFunction(px));
        if (px === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Fit Model
    const coeffs = solvePolynomialRegression(trainPoints, degree);

    // Draw Model (Red)
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let isPenDown = false;

    for (let px = 0; px <= 1; px += 0.005) {
        const py = predict(px, coeffs);
        const cx = toCanvasX(px);
        const cy = toCanvasY(py);

        // Check if point is within vertical bounds (with slight margin for clipping)
        const inBounds = (cy >= -10 && cy <= h + 10);

        if (inBounds) {
            if (!isPenDown) {
                ctx.moveTo(cx, cy);
                isPenDown = true;
            } else {
                ctx.lineTo(cx, cy);
            }
        } else {
            isPenDown = false;
        }
    }
    ctx.stroke();

    // Draw Points
    function drawPts(pts, color, radius) {
        ctx.fillStyle = color;
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(toCanvasX(p.x), toCanvasY(p.y), radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    drawPts(testPoints, '#93c5fd', 4); // Test (Light Blue)
    drawPts(trainPoints, '#2563eb', 6); // Train (Blue)

    // Calculate Errors (MSE)
    const trainMSE = trainPoints.reduce((sum, p) => sum + Math.pow(p.y - predict(p.x, coeffs), 2), 0) / trainPoints.length;
    const testMSE = testPoints.reduce((sum, p) => sum + Math.pow(p.y - predict(p.x, coeffs), 2), 0) / testPoints.length;

    statsDiv.innerHTML = `
        <span style="color:#2563eb">Train MSE: ${trainMSE.toFixed(4)}</span> | 
        <span style="color:#dc2626">Test MSE: ${testMSE.toFixed(4)}</span>
        ${trainMSE < 0.01 && testMSE > 0.1 ? '<br>⚠️ <b>OVERFITTING DETECTÉ !</b>' : ''}
    `;
}

slider.addEventListener('input', draw);
generateData();
