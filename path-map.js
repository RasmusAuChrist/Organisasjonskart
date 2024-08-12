// Load saved positions from local storage
    const savedPositions = JSON.parse(localStorage.getItem('nodePositions'));
            if (savedPositions) {
            nodes.forEach(node => {
                if (savedPositions[node.id]) {
                    node.x = savedPositions[node.id].x;
                    node.y = savedPositions[node.id].y;
                }
            });
        }

    
// Set up the SVG canvas
const svgContainer = d3.select("#path-map")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

const svg = svgContainer.append("g");

const zoom = d3.zoom()
.scaleExtent([0.1, 10]) // Set the scale limits for zooming
.on("zoom", (event) => {
    svg.attr("transform", event.transform);
});

// Apply zoom behavior to the SVG
svg.call(zoom);

// Apply zoom behavior to the svgContainer
svgContainer.call(zoom);

const minDistance = 80;  // Set your desired minimum distance
const nodeSize = 20;



// Initialize the simulation
const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links)
        .id(d => d.id)
        .distance(d => minDistance)
        .strength(0.0)
    )
    .force("charge", d3.forceManyBody().strength(-5))
    .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
    .on("tick", ticked);

    function ticked() {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    
        node.attr("transform", d => `translate(${d.x}, ${d.y})`);
    }

let link;
const nodeVisibility = {};

    // Create links
function drawLinks(){
     link = svg.append("g")
    .attr("stroke", "lightgrey")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));
}
let node;

// Function to draw nodes as circles
function drawCircles() {
    svg.selectAll(".node").remove();
    svg.selectAll(".legend").remove();
    node = svg.append("g")
        .attr("class", "node")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .attr("data-group", d => d.group)
        .call(drag(simulation));

    // Append circles to the g elements
    node.append("circle")
        .attr("r", nodeSize)
        .attr("fill", d => d3.schemeCategory10[d.group % 10]);

    // Append text labels to the g elements
    node.append("text")
        .attr("dy", 35)  // Adjusts the vertical position of the text
        .attr("x", 0)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .text(d => d.id);

        nodes.forEach(d => nodeVisibility[d.id] = true);
}
// Function to move nodes to pre-defined positions
function moveToPreDefinedPositionsHiearchy() {
    nodes.forEach(node => {
        if (preDefinedPositionsHierarchy[node.id]) {
            node.fx = preDefinedPositionsHierarchy[node.id].x;
            node.fy = preDefinedPositionsHierarchy[node.id].y;
        }
    });
    simulation.alpha(1).restart();  // Restart the simulation to apply the new positions
}
// Function to move nodes to pre-defined positions
function moveToPreDefinedPositionsTasks() {
    nodes.forEach(node => {
        if (preDefinedPositionsTasks[node.id]) {
            node.fx = preDefinedPositionsTasks[node.id].x;
            node.fy = preDefinedPositionsTasks[node.id].y;
        }
    });
    simulation.alpha(1).restart();  // Restart the simulation to apply the new positions
}

// Function to move nodes back to saved positions
function moveToSavedPositions() {
    if (savedPositions) {
        nodes.forEach(node => {
            if (savedPositions[node.id]) {
                node.fx = savedPositions[node.id].x;
                node.fy = savedPositions[node.id].y;
            } else {
                node.fx = null;
                node.fy = null;
            }
        });
        simulation.alpha(1).restart();  // Restart the simulation to apply the new positions
    }
}

// Function to draw nodes as pie charts
let legend;

function drawPieCharts() {
    svg.selectAll(".node").remove();
    const pie = d3.pie().sort(null);
    const arc = d3.arc().innerRadius(0).outerRadius(nodeSize);

    node = svg.append("g")
        .attr("class", "node")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .attr("data-group", d => d.group)
        .call(drag(simulation));

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
// Create a legend for the pie chart segments
    legend = svg.append("g")
    
        .attr("class", "legend")
        .attr("transform", `translate(${window.innerWidth - 200}, 50)`);  // Position the legend

// Add legend items
    legend.selectAll("rect")
        .data(categories)
        .join("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", d => d.color);

// Add legend text
    legend.selectAll("text")
        .data(categories)
        .join("text")
        .attr("x", 25)
        .attr("y", (d, i) => i * 20 + 14)
        .text(d => d.label);

        nodes.forEach(d => nodeVisibility[d.id] = true);        
}

// Initial drawing as circles
drawLinks();
drawCircles();

// Function to toggle visibility based on group
function toggleGroupVisibility(group, visible) {
    node.filter(d => d.group === group)
        .style("display", visible ? "block" : "none");

    // Update node visibility state
    nodes.filter(d => d.group === group).forEach(d => {
        nodeVisibility[d.id] = visible;
    });

    // Update the visibility of links
    updateLinkVisibility();
}

// Function to update link visibility based on source/target node visibility
function updateLinkVisibility() {
    link.style("display", d => {
        return nodeVisibility[d.source.id] && nodeVisibility[d.target.id] ? "block" : "none";
    });
}

// Add event listeners to checkboxes
d3.selectAll(".group-toggle").on("change", function() {
    const group = parseInt(this.value);
    const visible = this.checked;
    toggleGroupVisibility(group, visible);
});

// Toggle between circles and pie charts
d3.select("#toggleShape").on("change", function() {
    if (this.checked) {
        drawPieCharts();
    } else {
        drawCircles();
    }
});

// Toggle the visibility of the links
d3.select("#toggleLinks").on("change", function() {
    if (this.checked) {
        link.style("visibility", "visible");
    } else {
        link.style("visibility", "hidden");
    }
});

// Event listener for saving positions
d3.select("#savePositions").on("click", function() {
    const nodePositions = {};
    nodes.forEach(node => {
        nodePositions[node.id] = { x: node.x, y: node.y };
    });
    localStorage.setItem('nodePositions', JSON.stringify(nodePositions));
    alert("Node positions saved!");

    simulation.alpha(1).restart();  // Restart the simulation to apply the new positions
});



// Event listener for moving to pre-defined positions
d3.select("#moveToPreDefinedHierarchy").on("click", function() {
    moveToPreDefinedPositionsHiearchy();
});

// Event listener for moving to pre-defined positions
d3.select("#moveToPreDefinedTasks").on("click", function() {
    moveToPreDefinedPositionsTasks();
});

// Event listener for moving to saved positions
d3.select("#moveToSaved").on("click", function() {
    moveToSavedPositions();
});



// Update the simulation at each tick
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

        svg.selectAll("g")
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
        // d.fx = null;
        // d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}