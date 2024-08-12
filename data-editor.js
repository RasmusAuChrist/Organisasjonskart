// Helper functions to find and update data
function findNode(id) {
    return nodes.find(node => node.id === id);
}

function findLink(source, target) {
    return links.find(link => link.source === source && link.target === target);
}

function findCategory(label) {
    return categories.find(category => category.label === label);
}

// Add or update a node
document.getElementById('add-node').addEventListener('click', () => {
    const id = document.getElementById('node-id').value;
    const group = parseInt(document.getElementById('node-group').value);
    const level = parseInt(document.getElementById('node-level').value);
    const data = document.getElementById('node-data').value.split(',').map(Number);

    let node = findNode(id);
    if (node) {
        node.group = group;
        node.level = level;
        node.data = data;
    } else {
        nodes.push({ id, group, level, data });
    }

    alert('Node added/updated successfully.');
});

// Delete a node
document.getElementById('delete-node').addEventListener('click', () => {
    const id = document.getElementById('node-id').value;
    const index = nodes.findIndex(node => node.id === id);
    if (index > -1) {
        nodes.splice(index, 1);
        alert('Node deleted successfully.');
    } else {
        alert('Node not found.');
    }
});

// Add or update a link
document.getElementById('add-link').addEventListener('click', () => {
    const source = document.getElementById('link-source').value;
    const target = document.getElementById('link-target').value;
    const value = parseInt(document.getElementById('link-value').value);

    let link = findLink(source, target);
    if (link) {
        link.value = value;
    } else {
        links.push({ source, target, value });
    }

    alert('Link added/updated successfully.');
});

// Delete a link
document.getElementById('delete-link').addEventListener('click', () => {
    const source = document.getElementById('link-source').value;
    const target = document.getElementById('link-target').value;
    const index = links.findIndex(link => link.source === source && link.target === target);
    if (index > -1) {
        links.splice(index, 1);
        alert('Link deleted successfully.');
    } else {
        alert('Link not found.');
    }
});

// Add or update a category
document.getElementById('add-category').addEventListener('click', () => {
    const label = document.getElementById('category-label').value;
    const color = document.getElementById('category-color').value;

    let category = findCategory(label);
    if (category) {
        category.color = color;
    } else {
        categories.push({ label, color });
    }

    alert('Category added/updated successfully.');
});

// Delete a category
document.getElementById('delete-category').addEventListener('click', () => {
    const label = document.getElementById('category-label').value;
    const index = categories.findIndex(category => category.label === label);
    if (index > -1) {
        categories.splice(index, 1);
        alert('Category deleted successfully.');
    } else {
        alert('Category not found.');
    }
});

// Save the modified data (this would typically be sent to a server or saved as a file)
document.getElementById('save-data').addEventListener('click', () => {
    console.log('Nodes:', JSON.stringify(nodes, null, 2));
    console.log('Links:', JSON.stringify(links, null, 2));
    console.log('Categories:', JSON.stringify(categories, null, 2));
    alert('Data saved to console (in a real application, this would save to a file or server).');
});
