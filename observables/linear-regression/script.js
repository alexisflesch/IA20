const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const eqDiv = document.getElementById('equation');
const mseDiv = document.getElementById('mse');

let points = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
    for (let i = 0; i < canvas.height; i += 50) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

    // Draw points
    ctx.fillStyle = '#2563eb';
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
    });

    if (points.length >= 2) {
        const { a, b } = calculateRegression();
        drawLine(a, b);
        updateStats(a, b);
    }
}

function calculateRegression() {
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    points.forEach(p => {
        // Invert Y for calculation because canvas Y is top-down
        const x = p.x;
        const y = canvas.height - p.y;

        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    });

    // Avoid division by zero if all x are same
    const denominator = (n * sumXX - sumX * sumX);
    if (Math.abs(denominator) < 0.0001) return { a: 0, b: 0 }; // Vertical line case (simplified)

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;

    return { a: slope, b: intercept };
}

function drawLine(a, b) {
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.beginPath();

    // y = ax + b
    // Canvas Y = height - (a * x + b)

    const x1 = 0;
    const y1 = canvas.height - (a * x1 + b);
    const x2 = canvas.width;
    const y2 = canvas.height - (a * x2 + b);

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function updateStats(a, b) {
    eqDiv.textContent = `y = ${a.toFixed(4)}x + ${b.toFixed(2)}`;

    let errorSum = 0;
    points.forEach(p => {
        const realY = canvas.height - p.y;
        const predY = a * p.x + b;
        errorSum += Math.pow(realY - predY, 2);
    });
    const mse = errorSum / points.length;
    mseDiv.textContent = `MSE (Erreur Quadratique Moyenne) : ${mse.toFixed(2)}`;

    // Draw residuals (lines from point to line)
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
    ctx.lineWidth = 1;
    points.forEach(p => {
        const realY = canvas.height - p.y;
        const predY = a * p.x + b;
        const canvasPredY = canvas.height - predY;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, canvasPredY);
        ctx.stroke();
    });
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    points.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    });
    draw();
});

function reset() {
    points = [];
    eqDiv.textContent = "Ajoutez des points...";
    mseDiv.textContent = "MSE: 0";
    draw();
}

function addRandom() {
    for (let i = 0; i < 5; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        });
    }
    draw();
}

function addLinear() {
    // Add points following a rough line
    const slope = (Math.random() - 0.5) * 2;
    const intercept = Math.random() * 200 + 100;

    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const noise = (Math.random() - 0.5) * 100;
        // y = ax + b + noise
        // Canvas Y = height - y
        const y = canvas.height - (slope * x + intercept + noise);

        if (y > 0 && y < canvas.height) {
            points.push({ x, y });
        }
    }
    draw();
}

draw();