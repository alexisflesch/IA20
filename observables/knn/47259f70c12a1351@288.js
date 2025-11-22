// https://observablehq.com/@jwilber/live-k-nearest-neighbors-classification@288
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Live K-Nearest Neighbors (knn) Classification

**Click on the canvas below** to add a test-point and watch it be classified using the k-nearest neighbors (knn) algorithm.

The nearest neighbors (& single-cell voronoi regions) used for the classification are briefly highlighted.

Circles are colored according to the majority class, and ties are colored white.

`
)}

function _numTrain(slider){return(
slider({
  min: 50, 
  max: 100, 
  step: 1, 
  value: 50, 
  title: "Number of Training Points", 
})
)}

function _k(slider){return(
slider({
  min: 1, 
  max: 50, 
  step: 1, 
  value: 5, 
  title: "k", 
  description: "Number of nearest neighbors (0-50) used for classification"
})
)}

function* _4(d3,DOM,width,height,padding,plotAreaWidth,plotAreaHeight,data,classColorScale,pointRadius,getNNN,k,t,predict)
{
  // draw chart
const svg = d3.select(DOM.svg(width, height));
    
  

const g = svg
  .append("g")
  .attr("transform", `translate(${padding}, ${padding})`);

//   VORONOI STUFF
const voronoiDiagram = d3
  .voronoi()
  .x((d) => d[0])
  .y((d) => d[1])
  .size([plotAreaWidth, plotAreaHeight])(data);

// // draw the polygons
const voronoiPolygons = g
  .append("g")
  .attr("class", "voronoi-polygons")
  .style("pointer-events", "none")
  .selectAll("path.polygon")
  .data(voronoiDiagram.polygons())
  .enter()
  .append("path")
  .attr("class", "polygon")
  .style("stroke-width", 2)
  .style("stroke", "white")
  .style("fill", (d) => classColorScale(d.data[2]))
  .style("opacity", 0)
  .attr("d", (d) => `M${d.join("L")}Z`)

// draw circles
const circles = g
  .append("g")
  .attr("class", "circles")
  .selectAll(".data-point")
  .data(data)
  .enter()
  .append("circle")
  .classed("data-point", true)
  .attr("r", pointRadius)
  .attr("cx", (d) => d[0])
  .attr("cy", (d) => d[1])
  .style('stroke', (d) => d[2] === 0 ? 'royalblue' : 'red')
  .style('stroke-width', 2)
  .attr("fill", (d) => classColorScale(d[2]))

const testCircles = g.append("g").attr("class", "test-circles");
const testTexts = g.append("g").attr("class", "test-texts");

// add the overlay on top of everything to take the mouse events
g.append("rect")
  .attr("class", "overlay")
  .attr("width", plotAreaWidth)
  .attr("height", plotAreaHeight)
  .style("opacity", 0)
  .on("click", mouseMoveHandler);

function highlightTest2Train(d) {
  const newCircle = testCircles
    .selectAll("circle.test")
    .data([d])
    .enter()
    .append("circle")
    .attr("r", pointRadius + 1)
    .style("stroke", "black")
    .style("stroke-width", 3)
    .attr("cx", (d) => d[0])
    .attr("cy", (d) => d[1])
    .attr("fill", "white")
  
  const testText = testTexts
    .selectAll('text.test')
    .data([d])
    .enter()
    .append('text')
    .attr('x', (d) => d[0])
    .attr('y', (d) => d[1])
     .html('PRED')
    .style('font-size', '11px')
    .style('font-family', 'Arial')
    .attr('dx', -pointRadius - 4)
    .attr('dy', -pointRadius - 2)

  // 2. find n-nearest neighbors to point
  const loc = d.slice(0, 2);
  const nn = getNNN(data, loc, k);

  // 3. draw lines from point to n-nearest neighbors
  g.selectAll(".polygon")
    .transition().duration(t)
    .style("opacity", (d, i) => (nn.indexOf(i) > -1 ? 0.5 : 0))
    .transition()
    .style("opacity", 0);
  // draw lines between points
  const points = data.filter((d, i) => nn.indexOf(i) > -1);
  g.selectAll(".line")
    .data(points)
    .enter()
    .append("line")
    .lower()
    .attr("class", "neighbor-line")
    .attr("x1", (d) => loc[0])
    .attr("y1", (d) => loc[1])
    .attr("x2", (d) => loc[0])
    .attr("y2", (d) => loc[1])
    .attr("stroke", "black")
    .style("stroke-width", 3)
    .style("pointer-events", "none")
    // .style("opacity", 0.5)
    .transition().duration(t)
    .attr("x1", (d) => loc[0])
    .attr("y1", (d) => loc[1])
    .attr("x2", (d) => d[0])
    .attr("y2", (d) => d[1])
    .transition()
    .attr("x1", (d) => loc[0])
    .attr("y1", (d) => loc[1])
    .attr("x2", (d) => loc[0])
    .attr("y2", (d) => loc[1])
    .transition()
    .remove();

  // predict the new class and color accordingly
  const classPred = predict(nn);
  newCircle
    .transition().duration(t)
    .attr("r", pointRadius + 4)
    .transition().duration(t)
    .style("fill", classColorScale(classPred))
    .attr("r", pointRadius)
}

// callback for when the mouse moves across the overlay
function mouseMoveHandler() {
  // get the current mouse position
  const [mx, my] = d3.mouse(this);
  // highlightToTest
  highlightTest2Train([mx, my, 0]);
}
  
  yield svg.node()
}


function _t(){return(
700
)}

function _predict(data,k){return(
function predict(nn) {
  // filter data to class scores of nn
  const neighborScores = data
    .filter((d, i) => nn.indexOf(i) > -1)
    .map((d) => d[2]);
  // sum scores
  let classPred = neighborScores.reduce((a, b) => a + b, 0);
  // divide sum scores by k
  classPred /= k;
  // resolve tie
  if (classPred === 0.5) { return 99; }
  // predict
  return Math.round(classPred);
}
)}

function _getNNN(dist){return(
function getNNN(data, point, n) {
  // 1. get the distances between the data & current point.
  let dists = [];
  for (let i = 0; i < data.length; i++) {
    dists.push([i, dist(data[i], point)]);
  }
  // 2. sort those points to the test data in ascending order
  dists.sort((a, b) => a[1] - b[1]);
  
  // 3. Keep the indices of the top n-nearest neighbors
  let nnn = [];
  for (let i = 0; i < n; i++) {
    nnn.push(dists[i][0]);
  }
  return nnn;
}
)}

function _classColorScale(d3){return(
d3
  .scaleOrdinal()
  .domain([0, 1, 99])
  .range(["skyblue", "salmon", "white"])
)}

function _data(makeData,numTrain){return(
makeData(numTrain)
)}

function _makeData(d3,plotAreaWidth,padding,plotAreaHeight){return(
(n) => {
  return d3.range(n).map(() => {
    let x = Math.random() * (plotAreaWidth - padding) + padding / 2;
    let y = Math.random() * (plotAreaHeight - padding) + padding / 2;
    return [x, y, Math.round(Math.random())];
  });
}
)}

function _dist(){return(
(x, y) => (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2
)}

function _pointRadius(){return(
10
)}

function _plotAreaHeight(height,padding){return(
height - padding - padding
)}

function _plotAreaWidth(width,padding){return(
width - padding - padding
)}

function _padding(){return(
40
)}

function _height(){return(
500
)}

function _d3(require){return(
require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof numTrain")).define("viewof numTrain", ["slider"], _numTrain);
  main.variable(observer("numTrain")).define("numTrain", ["Generators", "viewof numTrain"], (G, _) => G.input(_));
  main.variable(observer("viewof k")).define("viewof k", ["slider"], _k);
  main.variable(observer("k")).define("k", ["Generators", "viewof k"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","DOM","width","height","padding","plotAreaWidth","plotAreaHeight","data","classColorScale","pointRadius","getNNN","k","t","predict"], _4);
  main.variable(observer("t")).define("t", _t);
  main.variable(observer("predict")).define("predict", ["data","k"], _predict);
  main.variable(observer("getNNN")).define("getNNN", ["dist"], _getNNN);
  main.variable(observer("classColorScale")).define("classColorScale", ["d3"], _classColorScale);
  main.variable(observer("data")).define("data", ["makeData","numTrain"], _data);
  main.variable(observer("makeData")).define("makeData", ["d3","plotAreaWidth","padding","plotAreaHeight"], _makeData);
  main.variable(observer("dist")).define("dist", _dist);
  main.variable(observer("pointRadius")).define("pointRadius", _pointRadius);
  main.variable(observer("plotAreaHeight")).define("plotAreaHeight", ["height","padding"], _plotAreaHeight);
  main.variable(observer("plotAreaWidth")).define("plotAreaWidth", ["width","padding"], _plotAreaWidth);
  main.variable(observer("padding")).define("padding", _padding);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  return main;
}
