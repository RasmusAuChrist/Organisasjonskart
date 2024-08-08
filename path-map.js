const nodes = [
    { id: "AnnaMaria", group: 1, data: [10], x: 350, y: 1 },
    { id: "Monica", group: 9, data: [10, 20, 30, 40], x: 300, y: 100 },
    { id: "Benny", group: 3, data: [10, 20, 30, 40], x: 500, y: 100 },
    { id: "Eirik", group: 4, data: [10, 20, 40], x: 700, y: 100 },
    { id: "Anette C", group: 5, data: [10, 20, 30, 40], x: 400, y: 100 },
    { id: "Rasmus", group: 3, data: [10, 20, 30, 40], x: 200, y: 300 },
    { id: "Espen", group: 9, data: [10, 20, 30, 40], x: 300, y: 300 },
    { id: "Gunn", group: 9, data: [10, 50, 40], x: 350, y: 300 }
];

const links = [
    { "source": "AnnaMaria", "target": "Monica", "value": 10 },
    { "source": "AnnaMaria", "target": "Benny", "value": 15 },
    { "source": "Benny", "target": "Rasmus", "value": 5 },
    { "source": "Monica", "target": "Espen", "value": 8 },
    { "source": "Monica", "target": "Gunn", "value": 8 },
    { "source": "AnnaMaria", "target": "Eirik", "value": 20 },
    { "source": "AnnaMaria", "target": "Anette C", "value": 3 }
];

// Set up the SVG canvas
const svg = d3.select("#path-map")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

const minDistance = 100;  // Set your desired minimum distance

// Initialize the simulation
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links)
        .id(d => d.id)
        .distance(d => minDistance)
        .strength(0.0)
    )
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

// Create links
const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

// Pie chart setup
const pie = d3.pie().sort(null);
const arc = d3.arc().innerRadius(0).outerRadius(20);  // Inner radius 0 for full pie

// Create nodes with pie charts and labels
const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .call(drag(simulation))  // Apply drag behavior to the group element
    .attr("transform", d => `translate(${d.x}, ${d.y})`);  // Initial position

// Append pie chart paths to each node
node.selectAll("path")
    .data(d => pie(d.data))
    .join("path")
    .attr("d", arc)
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

// Append text labels to each node
node.append("text")
    .attr("dy", 35)  // Adjusts the vertical position of the text
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .text(d => d.id);

// Update the simulation at each tick
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${d.x}, ${d.y})`);  // Update node positions
});

// Drag functionality
function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}