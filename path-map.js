const nodes = [
    { id: "AnnaMaria", group: 1, x: 350, y: 1 },
    { id: "About", group: 2, x: 300, y: 100 },
    { id: "Services", group: 3, x: 500, y: 100 },
    { id: "Contact", group: 4, x: 700, y: 100 },
    { id: "Test", group: 5, x: 400, y: 300 },
    { id: "Rasmus", group: 6, x: 200, y: 300 },
    { id: "Espen", group: 6, x: 300, y: 300 }
];

const links = [
    { "source": "AnnaMaria", "target": "About", "value": 10 },
    { "source": "AnnaMaria", "target": "Services", "value": 15 },
    { "source": "Services", "target": "Contact", "value": 5 },
    { "source": "About", "target": "Contact", "value": 8 },
    { "source": "AnnaMaria", "target": "Contact", "value": 200 },
    { "source": "AnnaMaria", "target": "Test", "value": 70 },
    { "source": "Test", "target": "Rasmus", "value": 30 },
    { "source": "Test", "target": "Espen", "value": 10 },
];

// Set up the SVG canvas
const svg = d3.select("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

// Initialize the simulation
const minDistance = 10;

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
    .attr("stroke", "darkgrey")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

// Create nodes
const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 10)
    .attr("fill", d => d3.schemeCategory10[d.group % 10])
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .call(drag(simulation));

node.append("title")
    .text(d => d.id);

// Update the simulation at each tick
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);
});

// Pre-determined positions
const predeterminedPositions = {
    "AnnaMaria": { x: 350, y: 1 },
    "About": { x: 300, y: 100 },
    "Services": { x: 500, y: 100 },
    "Contact": { x: 700, y: 100 },
    "Test": { x: 400, y: 300 },
    "Rasmus": { x: 200, y: 300 },
    "Espen": { x: 300, y: 300 },
};

// Button click event to move nodes
d3.select("#moveButton").on("click", () => {
    nodes.forEach(node => {
        const newPosition = predeterminedPositions[node.id];
        if (newPosition) {
            node.x = newPosition.x;  // Fix the node at the new x position
            node.y = newPosition.y;  // Fix the node at the new y position
        }
    });

    // Restart the simulation with new positions
    simulation.alpha(1).restart();
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