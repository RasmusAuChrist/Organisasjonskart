// path-map.js

// Load the JSON data
d3.json("data.json").then(function(graph) {
    const nodes = graph.nodes;
    const links = graph.links;

    // Set up the SVG canvas
    const svg = d3.select("#path-map")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight);

    // Initialize the simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));

    // Create links
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    // Function to draw nodes as circles
    function drawCircles() {
        svg.selectAll(".node").remove();
        const node = svg.append("g")
            .attr("class", "node")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 10)
            .attr("fill", d => d3.schemeCategory10[d.group % 10])
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .call(drag(simulation));

        node.append("title")
            .text(d => d.id);
    }

    // Function to draw nodes as pie charts
    function drawPieCharts() {
        svg.selectAll(".node").remove();
        const pie = d3.pie().sort(null);
        const arc = d3.arc().innerRadius(0).outerRadius(20);

        const node = svg.append("g")
            .attr("class", "node")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("transform", d => `translate(${d.x}, ${d.y})`)
            .call(drag(simulation));

        node.selectAll("path")
            .data(d => pie(d.data))
            .join("path")
            .attr("d", arc)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

        node.append("title")
            .text(d => d.id);
    }

    // Initial drawing as circles
    drawCircles();

    // Toggle between circles and pie charts
    d3.select("#toggleShape").on("change", function() {
        if (this.checked) {
            drawPieCharts();
        } else {
            drawCircles();
        }
    });

    // Update the simulation at each tick
    simulation.on("tick", () => {
        svg.selectAll(".node")
            .attr("transform", d => `translate(${d.x}, ${d.y})`);

        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
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
});
