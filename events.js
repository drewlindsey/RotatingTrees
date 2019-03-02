import CanvasRenderer from './render.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const defaultOptions = {
        edgeLength: 60,
        childCount: 3,
        totalLayers: 2
    };

    const canvasRenderer = new CanvasRenderer(canvas, defaultOptions);

    canvasRenderer.render();

    setCurrents(defaultOptions);

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();

        const edgeLength = parseInt(document.getElementById('edgeLength').value) || 60;
        const childCount = parseInt(document.getElementById('childCount').value) || 3;
        const totalLayers = parseInt(document.getElementById('layers').value) || 3;

        const options = {
            edgeLength,
            childCount,
            totalLayers
        };

        canvasRenderer.setOptions(options);

        setCurrents(options);
        canvasRenderer.render();
    }, false)
});

function setCurrents(options) {
    document.getElementById('currEdgeLength').innerText = options.edgeLength;
    document.getElementById('currChildCount').innerText = options.childCount;
    document.getElementById('currTotalLayers').innerText = options.totalLayers;
}

