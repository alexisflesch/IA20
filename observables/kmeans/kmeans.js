const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const kSlider = document.getElementById('k-slider');
const kVal = document.getElementById('k-val');
const btnReset = document.getElementById('btn-reset');
const btnInit = document.getElementById('btn-init');
const btnStep = document.getElementById('btn-step');
const btnRun = document.getElementById('btn-run');
const statusDiv = document.getElementById('status');

let points = [];
let centroids = [];
let K = 3;
let step = 0; // 0: Init needed, 1: Assigned, 2: Updated
let isRunning = false;
let runInterval = null;

// Colors for clusters
const colors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
    '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'
];

// --- Initialization ---

function init() {
    K = parseInt(kSlider.value);
    kVal.textContent = K;
    generateRandomPoints();
    resetAlgorithm();
    draw();
}

function generateRandomPoints() {
    points = [];
    // Generate 3-5 random blobs
    const numBlobs = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numBlobs; i++) {
        const centerX = Math.random() * (canvas.width - 100) + 50;
        const centerY = Math.random() * (canvas.height - 100) + 50;
        const spread = Math.random() * 40 + 20;
        const count = Math.floor(Math.random() * 30) + 20;

        for (let j = 0; j < count; j++) {
            // Box-Muller transform for Gaussian distribution
            const u = 1 - Math.random();
            const v = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
            const z2 = Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * Math.PI * v);

            points.push({
                x: centerX + z * spread,
                y: centerY + z2 * spread,
                cluster: -1 // -1 means unassigned
            });
        }
    }
}

function resetAlgorithm() {
    centroids = [];
    step = 0;
    points.forEach(p => p.cluster = -1);
    stopAutoRun();
    updateButtons();
    statusDiv.textContent = "1. Cliquez sur 'Initialiser' pour placer les centres.";
}

// --- Algorithm Steps ---

function initCentroids() {
    centroids = [];
    // Random initialization (Forgy method)
    // Pick K random points as starting centroids
    const usedIndices = new Set();
    while (centroids.length < K && usedIndices.size < points.length) {
        const idx = Math.floor(Math.random() * points.length);
        if (!usedIndices.has(idx)) {
            usedIndices.add(idx);
            centroids.push({
                x: points[idx].x,
                y: points[idx].y,
                color: colors[centroids.length % colors.length]
            });
        }
    }
    step = 1;
    statusDiv.textContent = "2. Centres placés. Cliquez sur 'Étape +1' pour affecter les points.";
    draw();
    updateButtons();
}

function assignPoints() {
    let changed = false;
    points.forEach(p => {
        let minDist = Infinity;
        let bestCluster = -1;

        centroids.forEach((c, idx) => {
            const dist = Math.hypot(p.x - c.x, p.y - c.y);
            if (dist < minDist) {
                minDist = dist;
                bestCluster = idx;
            }
        });

        if (p.cluster !== bestCluster) {
            p.cluster = bestCluster;
            changed = true;
        }
    });

    step = 2;
    statusDiv.textContent = "3. Points affectés. Cliquez sur 'Étape +1' pour déplacer les centres.";
    draw();
    return changed;
}

function updateCentroids() {
    let maxMove = 0;

    centroids.forEach((c, idx) => {
        const clusterPoints = points.filter(p => p.cluster === idx);
        if (clusterPoints.length > 0) {
            const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
            const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;

            const move = Math.hypot(avgX - c.x, avgY - c.y);
            if (move > maxMove) maxMove = move;

            c.x = avgX;
            c.y = avgY;
        }
    });

    step = 1;
    statusDiv.textContent = "4. Centres déplacés. Cliquez sur 'Étape +1' pour réaffecter.";
    draw();

    if (maxMove < 0.5) {
        statusDiv.textContent = "✅ Convergence atteinte ! L'algorithme a fini.";
        stopAutoRun();
        return true; // Converged
    }
    return false; // Not converged
}

function nextStep() {
    if (step === 0) {
        initCentroids();
    } else if (step === 1) {
        assignPoints();
    } else if (step === 2) {
        const converged = updateCentroids();
        if (converged) step = 3; // Finished
    }
}

// --- Auto Run ---

function toggleAutoRun() {
    if (isRunning) {
        stopAutoRun();
    } else {
        startAutoRun();
    }
}

function startAutoRun() {
    if (step === 3) resetAlgorithm(); // Restart if finished
    if (step === 0) initCentroids();

    isRunning = true;
    btnRun.textContent = "Stop";
    btnRun.style.backgroundColor = "#dc2626"; // Red

    runInterval = setInterval(() => {
        if (step === 1) {
            assignPoints();
        } else if (step === 2) {
            const converged = updateCentroids();
            if (converged) stopAutoRun();
        } else if (step === 3) {
            stopAutoRun();
        }
    }, 600); // Delay between steps
}

function stopAutoRun() {
    isRunning = false;
    btnRun.textContent = "Auto";
    btnRun.style.backgroundColor = ""; // Default
    if (runInterval) clearInterval(runInterval);
}

// --- Drawing ---

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Voronoi regions (optional, maybe too heavy? let's try simple background tint)
    // Skipping for performance/simplicity, just drawing points

    // Draw connections (optional, only when assigning)
    if (step === 1 && centroids.length > 0) {
        // Draw faint lines from points to their current centroid? No, too messy.
    }

    // Draw points
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = p.cluster === -1 ? '#ccc' : colors[p.cluster];
        ctx.fill();
        // ctx.strokeStyle = '#fff';
        // ctx.stroke();
    });

    // Draw centroids
    centroids.forEach((c, idx) => {
        // Draw X or Star
        ctx.beginPath();
        ctx.fillStyle = 'black'; // Shadow
        ctx.arc(c.x + 2, c.y + 2, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(idx + 1, c.x, c.y);
    });
}

function updateButtons() {
    btnInit.disabled = step !== 0;
    btnStep.disabled = step === 3;
}

// --- Event Listeners ---

kSlider.addEventListener('input', () => {
    K = parseInt(kSlider.value);
    kVal.textContent = K;
    resetAlgorithm();
});

btnReset.addEventListener('click', () => {
    generateRandomPoints();
    resetAlgorithm();
    draw();
});

btnInit.addEventListener('click', initCentroids);
btnStep.addEventListener('click', nextStep);
btnRun.addEventListener('click', toggleAutoRun);

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    points.push({
        x: x,
        y: y,
        cluster: -1
    });

    // If algorithm was running, we might need to re-assign
    if (step > 0 && step < 3) {
        // Just draw the new point as grey until next step
        draw();
    } else if (step === 3) {
        // If finished, maybe restart assignment?
        step = 1;
        statusDiv.textContent = "Nouveau point ajouté. Réaffectation nécessaire.";
        draw();
    } else {
        draw();
    }
});

// Start
init();
