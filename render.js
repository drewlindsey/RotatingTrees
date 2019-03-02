export default class CanvasRenderer {
    constructor(canvas, options) {
        this.context2d = canvas.getContext('2d');
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.context2d.fillStyle = options.color || 'black';

        this.edgeLength = options.edgeLength || 60;
        this.totalLayers = options.totalLayers || 6;
        this.childCount = options.childCount || 3;
    }

    setOptions(options) {
        this.edgeLength = options.edgeLength || 60;
        this.totalLayers = options.totalLayers || 6;
        this.childCount = options.childCount || 3;
    }

    render() {
        this.context2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        const startX = (this.canvasWidth - 10) / 2;
        const startY = (this.canvasHeight / 2.5 );

        this.drawTree(this.context2d, startX, startY, 0, 0, this.childCount);
    }

    drawTree(ctx, startX, startY, rootValue, depth, childCount) {

        if (depth === this.totalLayers) {
            return;
        }

        const nodes = this.drawAtNode(ctx, startX, startY, rootValue, childCount);
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            setTimeout(() => {
                this.drawTree(ctx, node[0], node[1], node[2], depth + 1, childCount)

            }, 1);
        }
    }

    drawAtNode(ctx, startX, startY, parentValue, childCount) {

        const list = [];
        for (let i = 1; i < childCount + 1; i++) {

            const currValue = this.computeMapping(i, childCount);

            // grab child coords in normal (0,0) case
            const childrenCoords = this.childCoords(i, childCount);

            const addFactor = childCount % 2 === 0 ? 4 : 1; // wtf is this?

            // rotate to achieve location relative to parent's rotation,
            // parent's dictate how much the children are rotated from the "base" position
            const rotatedCoords = this.rotate(childrenCoords[0], childrenCoords[1], -(parentValue) * Math.PI / (childCount + addFactor ));

            // return back to basis relative to parent nodes
            const translatedCoords = this.translate(rotatedCoords[0], rotatedCoords[1], startX, startY);

            setTimeout(() => this.drawLine(ctx, startX, startY, translatedCoords[0], translatedCoords[1]), 1);
            list.push(translatedCoords.concat(currValue + parentValue));
        }

        return list;
    }

    translate(rotateX, rotateY, startX, startY) {
        return [
            rotateX + startX,
            rotateY + startY
        ];
    }

    computeMapping(currentChild, childCount) {
        return this.round(currentChild - (childCount+1) / 2);
    }

    round(val) {
        return val < 0 ? Math.floor(val) : Math.ceil(val);
    }

    childCoords(currentChild, totalChildren) {
        return [
            -1 * this.edgeLength * Math.cos(currentChild *Math.PI / (totalChildren+1)),
            this.edgeLength * Math.sin(currentChild * Math.PI / (totalChildren+1))
        ];
    }

    rotate(startX, startY, radians) {
        return [
            Math.cos(radians) * startX - Math.sin(radians) * startY,
            Math.sin(radians) * startX + Math.cos(radians) * startY
        ];
    }

    drawLine(ctx, startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}