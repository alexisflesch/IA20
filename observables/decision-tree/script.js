const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('depth');
const depthVal = document.getElementById('depth-val');

let points = [];
const NUM_POINTS = 100;

class Node {
    constructor(x, y, w, h, points, depth) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.points = points;
        this.depth = depth;
        this.left = null;
        this.right = null;
        this.splitVertical = false;
        this.splitPos = 0;
        this.isLeaf = true;
        this.predictedClass = this.getMajorityClass();
    }

    getMajorityClass() {
        if (this.points.length === 0) return 0;
        const counts = { 0: 0, 1: 0 };
        this.points.forEach(p => counts[p.label]++);
        return counts[0] >= counts[1] ? 0 : 1;
    }

    calculateGini(pts) {
        if (pts.length === 0) return 0;
        const counts = { 0: 0, 1: 0 };
        pts.forEach(p => counts[p.label]++);
        const p0 = counts[0] / pts.length;
        const p1 = counts[1] / pts.length;
        return 1 - (p0 * p0 + p1 * p1);
    }

    split(maxDepth) {
        if (this.depth >= maxDepth || this.calculateGini(this.points) === 0) {
            return;
        }

        let bestGini = Infinity;
        let bestSplit = -1;
        let bestVertical = true;

        // Try vertical splits (x-axis)
        // Sample some split positions
        for (let i = 0; i < 20; i++) {
            const splitX = this.x + Math.random() * this.w;
            const leftPts = this.points.filter(p => p.x < splitX);
            const rightPts = this.points.filter(p => p.x >= splitX);

            if (leftPts.length === 0 || rightPts.length === 0) continue;

            const gini = (leftPts.length * this.calculateGini(leftPts) + rightPts.length * this.calculateGini(rightPts)) / this.points.length;

            if (gini < bestGini) {
                bestGini = gini;
                bestSplit = splitX;
                bestVertical = true;
            }
        }

        // Try horizontal splits (y-axis)
        for (let i = 0; i < 20; i++) {
            const splitY = this.y + Math.random() * this.h;
            const topPts = this.points.filter(p => p.y < splitY);
            const bottomPts = this.points.filter(p => p.y >= splitY);

            if (topPts.length === 0 || bottomPts.length === 0) continue;

            const gini = (topPts.length * this.calculateGini(topPts) + bottomPts.length * this.calculateGini(bottomPts)) / this.points.length;

            if (gini < bestGini) {
                bestGini = gini;
                bestSplit = splitY;
                bestVertical = false;
            }
        }

        if (bestSplit !== -1) {
            this.isLeaf = false;
            this.splitVertical = bestVertical;
            this.splitPos = bestSplit;

            if (bestVertical) {
                const leftPts = this.points.filter(p => p.x < bestSplit);
                const rightPts = this.points.filter(p => p.x >= bestSplit);
                this.left = new Node(this.x, this.y, bestSplit - this.x, this.h, leftPts, this.depth + 1);
                this.right = new Node(bestSplit, this.y, this.x + this.w - (bestSplit - this.x), this.h, rightPts, this.depth + 1);
            } else {
                const topPts = this.points.filter(p => p.y < bestSplit);
                const bottomPts = this.points.filter(p => p.y >= bestSplit);
                this.left = new Node(this.x, this.y, this.w, bestSplit - this.y, topPts, this.depth + 1);
                this.right = new Node(this.x, bestSplit, this.w, this.y + this.h - (bestSplit - this.y), bottomPts, this.depth + 1);
            }

            this.left.split(maxDepth);
            this.right.split(maxDepth);
        }
    }

    draw(ctx) {
        if (this.isLeaf) {
            ctx.fillStyle = this.predictedClass === 0 ? 'rgba(37, 99, 235, 0.1)' : 'rgba(220, 38, 38, 0.1)';
            ctx.fillRect(this.x, this.y, this.w, this.h);
        } else {
            this.left.draw(ctx);
            this.right.draw(ctx);

            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            if (this.splitVertical) {
                ctx.moveTo(this.splitPos, this.y);
                ctx.lineTo(this.splitPos, this.y + this.h);
            } else {
                ctx.moveTo(this.x, this.splitPos);
                ctx.lineTo(this.x + this.w, this.splitPos);
            }
            ctx.stroke();
        }
    }
}

function init() {
    points = [];
    // Generate clusters
    const centers = [
        { x: 200, y: 150, label: 0 },
        { x: 600, y: 350, label: 1 },
        { x: 200, y: 350, label: 1 },
        { x: 600, y: 150, label: 0 }
    ];

    for (let i = 0; i < NUM_POINTS; i++) {
        const center = centers[Math.floor(Math.random() * centers.length)];
        points.push({
            x: center.x + (Math.random() - 0.5) * 250,
            y: center.y + (Math.random() - 0.5) * 200,
            label: center.label
        });
    }
    draw();
}

function draw() {
    const maxDepth = parseInt(slider.value);
    depthVal.textContent = maxDepth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Build Tree
    const root = new Node(0, 0, canvas.width, canvas.height, points, 0);
    root.split(maxDepth);

    // Draw Regions
    root.draw(ctx);

    // Draw Points
    points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = p.label === 0 ? '#2563eb' : '#dc2626';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.stroke();
    });
}

slider.addEventListener('input', draw);
init();