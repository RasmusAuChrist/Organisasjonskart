const preDefinedPositionsHierarchy = {
    "AnnaMaria": { x: 800, y: 50 },
    "Monica": { x: 600, y: 200 },
    "Benny": { x: 700, y: 200 },
    "Eirik": { x: 800, y: 200 },
    "Anette C": { x: 900, y: 200 },
    "Rasmus": { x: 600, y: 300 },
    "Espen A": { x: 700, y: 300 },
    "Gunn L": { x: 800, y: 300 },
    "Ivar F": { x: 900, y: 300 },
    "Jan Ragnar G-T": { x: 1000, y: 300 },
    "Kristin V": { x: 1100, y: 300 },
    "Thomas O": { x: 1200, y: 300 },
    "Roger T": { x: 1300, y: 300 },
    "Grethe F": { x: 1400, y: 300 }
};

const preDefinedPositionsTasks = {
    "AnnaMaria": { x: 100, y: 500 },
    "Monica": { x: 200, y: 400 },
    "Benny": { x: 300, y: 500 },
    "Eirik": { x: 400, y: 400 },
    "Anette C": { x: 500, y: 500 },
    "Rasmus": { x: 600, y: 400 },
    "Espen A": { x: 700, y: 500 },
    "Gunn L": { x: 800, y: 400 },
    "Ivar F": { x: 900, y: 500 },
    "Jan Ragnar G-T": { x: 1000, y: 400 },
    "Kristin V": { x: 1100, y: 500 },
    "Thomas O": { x: 1200, y: 400 },
    "Roger T": { x: 1300, y: 500 },
    "Grethe F": { x: 1400, y: 400 }
};

const categories = [
    { label: "Saksbehandling", color: d3.schemeCategory10[0] },
    { label: "Mediekonvertering", color: d3.schemeCategory10[1] },
    { label: "Telefonvakt", color: d3.schemeCategory10[2] },
    { label: "Transkribering", color: d3.schemeCategory10[3] }
];

const nodes = [
    { id: "AnnaMaria", level: 1, group: 1, data: [10, 90] },
    { id: "Monica", level: 2, group: 9, data: [10, 20, 30, 40] },
    { id: "Benny", level: 2, group: 3, data: [10, 20, 30, 40] },
    { id: "Eirik", level: 2, group: 4, data: [10, 20, 40] },
    { id: "Anette C", level: 2, group: 5, data: [10, 20, 30, 40] },
    { id: "Rasmus", level: 3, group: 3, data: [10, 20, 30, 40] },
    { id: "Espen A", level: 3, group: 9, data: [0, 30, 30, 40] },
    { id: "Gunn L", level: 3, group: 9, data: [10, 50, 40] },
    { id: "Ivar F", level: 3, group: 9, data: [0, 30, 30, 40] },
    { id: "Jan Ragnar G-T", level: 3, group: 9, data: [10, 50, 40] },
    { id: "Kristin V", level: 3, group: 9, data: [0, 30, 30, 40] },
    { id: "Thomas O", level: 3, group: 9, data: [10, 50, 40] },
    { id: "Roger T", level: 3, group: 9, data: [0, 30, 30, 40] },
    { id: "Grethe F", level: 3, group: 9, data: [10, 50, 40] }
];

const links = [
    { "source": "AnnaMaria", "target": "Monica", "value": 10 },
    { "source": "AnnaMaria", "target": "Benny", "value": 15 },
    { "source": "Benny", "target": "Rasmus", "value": 5 },
    { "source": "Monica", "target": "Espen A", "value": 8 },
    { "source": "Monica", "target": "Gunn L", "value": 8 },
    { "source": "Monica", "target": "Ivar F", "value": 8 },
    { "source": "Monica", "target": "Jan Ragnar G-T", "value": 8 },
    { "source": "Monica", "target": "Kristin V", "value": 8 },
    { "source": "Monica", "target": "Thomas O", "value": 8 },
    { "source": "Monica", "target": "Roger T", "value": 8 },
    { "source": "Monica", "target": "Grethe F", "value": 8 },
    { "source": "AnnaMaria", "target": "Eirik", "value": 20 },
    { "source": "AnnaMaria", "target": "Anette C", "value": 3 }
];
