const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const select = document.getElementById('func-select');
const slider = document.getElementById('x-val');
const xDisplay = document.getElementById('x-display');
const outDisplay = document.getElementById('output-display');

const functions = {
    sigmoid: {
        f: x => 1 / (1 + Math.exp(-x)),
        color: '#2563eb',
        name: 'Sigmoïde'
    },
    tanh: {
        f: x => Math.tanh(x),
        color: '#db2777',
        name: 'Tanh'
    },
    relu: {
        f: x => Math.max(0, x),
        color: '#16a34a',
        name: 'ReLU'
    },
    leakyrelu: {
        f: x => Math.max(0.1 * x, x),
        color: '#ea580c',
        name: 'Leaky ReLU'
    }
};

function toCanvasX(x) {
    return (x + 6) * (canvas.width / 12); // Range [-6, 6]
}

function toCanvasY(y) {
    return canvas.height / 2 - y * (canvas.height / 4); // Scale
}

function draw() {
    const funcName = select.value;
    const func = functions[funcName];
    const xVal = parseFloat(slider.value);

    xDisplay.textContent = xVal.toFixed(2);
    const yVal = func.f(xVal);
    outDisplay.innerHTML = `f(${xVal}) = <b>${yVal.toFixed(4)}</b>`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // X axis
    ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2);
    // Y axis
    ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Plot Function
    ctx.strokeStyle = func.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = -6; x <= 6; x += 0.05) {
        const cx = toCanvasX(x);
        const cy = toCanvasY(func.f(x));
        if (x === -6) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Draw Point
    const px = toCanvasX(xVal);
    const py = toCanvasY(yVal);

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw Dashed Lines
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px, canvas.height / 2); ctx.lineTo(px, py);
    ctx.moveTo(canvas.width / 2, py); ctx.lineTo(px, py);
    ctx.stroke();
    ctx.setLineDash([]);
}

slider.addEventListener('input', draw);
draw();