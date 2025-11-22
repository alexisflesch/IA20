// --- PART 1: GRID CALCULATION ---

const inputGrid = document.getElementById('input-grid');
const kernelGrid = document.getElementById('kernel-grid');
const outputGrid = document.getElementById('output-grid');
const calcDisplay = document.getElementById('calculation-display');

// Initial Data
let inputData = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

let kernelData = [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0]
]; // Edge detection

function createGrid(element, data, isInput = false) {
    element.innerHTML = '';
    data.forEach((row, r) => {
        row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.r = r;
            cell.dataset.c = c;

            if (isInput) {
                const input = document.createElement('input');
                input.value = val;
                input.type = 'number';
                input.addEventListener('change', (e) => {
                    data[r][c] = parseInt(e.target.value) || 0;
                    updateOutput();
                });
                cell.appendChild(input);
            } else {
                cell.textContent = val;
            }
            element.appendChild(cell);
        });
    });
}

function updateOutput() {
    const outputData = [];
    for (let r = 0; r < 3; r++) {
        const row = [];
        for (let c = 0; c < 3; c++) {
            let sum = 0;
            for (let kr = 0; kr < 3; kr++) {
                for (let kc = 0; kc < 3; kc++) {
                    sum += inputData[r + kr][c + kc] * kernelData[kr][kc];
                }
            }
            row.push(sum);
        }
        outputData.push(row);
    }

    outputGrid.innerHTML = '';
    outputData.forEach((row, r) => {
        row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = val;
            cell.dataset.r = r;
            cell.dataset.c = c;

            cell.addEventListener('mouseenter', () => highlight(r, c));
            cell.addEventListener('mouseleave', clearHighlight);

            outputGrid.appendChild(cell);
        });
    });
}

function highlight(outR, outC) {
    // Highlight Output
    const outIndex = outR * 3 + outC;
    outputGrid.children[outIndex].classList.add('highlight-output');

    // Highlight Input Patch (3x3 starting at outR, outC)
    let calcString = `Pixel(${outR},${outC}) = `;

    for (let kr = 0; kr < 3; kr++) {
        for (let kc = 0; kc < 3; kc++) {
            const inR = outR + kr;
            const inC = outC + kc;
            const inIndex = inR * 5 + inC;
            const kIndex = kr * 3 + kc;

            inputGrid.children[inIndex].classList.add('highlight-input');
            kernelGrid.children[kIndex].classList.add('highlight-kernel');

            const iVal = inputData[inR][inC];
            const kVal = kernelData[kr][kc];
            calcString += `(${iVal}×${kVal}) + `;
        }
    }
    calcDisplay.textContent = calcString.slice(0, -3);
}

function clearHighlight() {
    Array.from(document.querySelectorAll('.cell')).forEach(c => {
        c.classList.remove('highlight-input', 'highlight-kernel', 'highlight-output');
    });
    calcDisplay.textContent = 'Survolez une case de sortie...';
}

// Initialize Part 1
createGrid(inputGrid, inputData, true);
createGrid(kernelGrid, kernelData);
updateOutput();


// --- PART 2: IMAGE FILTERS ---

const canvasSource = document.getElementById('canvas-source');
const ctxSource = canvasSource.getContext('2d');
const canvasTarget = document.getElementById('canvas-target');
const ctxTarget = canvasTarget.getContext('2d');

// Kernels
const kernels = {
    identity: [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
    ],
    blur: [
        1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9,
        1 / 9, 1 / 9, 1 / 9
    ],
    sharpen: [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
    ],
    edge: [
        -1, -1, -1,
        -1, 8, -1,
        -1, -1, -1
    ],
    emboss: [
        -2, -1, 0,
        -1, 1, 1,
        0, 1, 2
    ]
};

// Draw a simple image on source canvas
function drawSourceImage() {
    // Background
    ctxSource.fillStyle = '#eee';
    ctxSource.fillRect(0, 0, 300, 300);

    // Shapes
    ctxSource.fillStyle = '#ff5252';
    ctxSource.beginPath();
    ctxSource.arc(150, 150, 80, 0, Math.PI * 2);
    ctxSource.fill();

    ctxSource.fillStyle = '#448aff';
    ctxSource.fillRect(50, 50, 80, 80);

    ctxSource.fillStyle = '#69f0ae';
    ctxSource.beginPath();
    ctxSource.moveTo(200, 200);
    ctxSource.lineTo(250, 280);
    ctxSource.lineTo(150, 280);
    ctxSource.fill();

    // Text
    ctxSource.fillStyle = '#333';
    ctxSource.font = '30px Arial';
    ctxSource.fillText("IA 20", 110, 160);

    // Apply default filter
    applyFilter('identity');
}

window.applyFilter = function (type) {
    // Update buttons
    document.querySelectorAll('.filter-controls button').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + type).classList.add('active');

    const kernel = kernels[type];
    const w = canvasSource.width;
    const h = canvasSource.height;

    const srcData = ctxSource.getImageData(0, 0, w, h);
    const dstData = ctxTarget.createImageData(w, h);

    const src = srcData.data;
    const dst = dstData.data;

    const side = Math.round(Math.sqrt(kernel.length));
    const halfSide = Math.floor(side / 2);

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = 0; ky < side; ky++) {
                for (let kx = 0; kx < side; kx++) {
                    const cy = y + ky - halfSide;
                    const cx = x + kx - halfSide;

                    if (cy >= 0 && cy < h && cx >= 0 && cx < w) {
                        const srcOff = (cy * w + cx) * 4;
                        const wt = kernel[ky * side + kx];

                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                    }
                }
            }

            const dstOff = (y * w + x) * 4;
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = 255; // Alpha
        }
    }

    ctxTarget.putImageData(dstData, 0, 0);
};

// Initialize Part 2
drawSourceImage();