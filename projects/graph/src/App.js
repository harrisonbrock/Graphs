import React, {Component} from 'react';
import {Graph} from './graph';
import './App.css';


const canvasWidth = 800;
const canvasHeight = 800;



/**
 * GraphView
 */
class GraphView extends Component {

    state = {
        vertex1: null,
        vertex2: null
    };
    /**
     * On mount
     */
    componentDidMount() {
        this.updateCanvas();
    }

    /**
     * On state update
     */
    componentDidUpdate() {
        this.updateCanvas();
    }

    clickHandler(event) {

        // get canvas
        const canvas = this.refs.canvas;
        const reactBox = canvas.getBoundingClientRect();
        const x = event.clientX - reactBox.left;
        const y = event.clientY - reactBox.top;

        // check if user click on vertex

        // check if this is the first vertex the user selected
        // draw selected image around vertex
        // unselected if selected

        // check for the second vertex to be selected
        // draw selected image vertex

        // enable buttons for search graph or find path

    }


    getRandomColor() {
        const r = Math.floor(Math.random() * 200) + 40,
            g = Math.floor(Math.random() * 200) + 40,
            b = Math.floor(Math.random() * 200) + 40;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    /**
     * Render the canvas
     */


    updateCanvas() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(239, 241, 244)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        const graph = this.props.graph;
        graph.randomize(5, 4, 150, 0.6);
        const connectedComponents = graph.getConnectedComponents();
        this.draw(connectedComponents, ctx);
    }


    draw(connectedComponents, ctx) {
        for (const subgraph of connectedComponents) {
            const color = this.getRandomColor();
            this.drawSubgraph(subgraph, ctx, color);
            this.drawVertex(subgraph, ctx, color);
        }
    }

    drawSubgraph(subgraph, ctx, color) {
        for (const v of subgraph) {
            // Fill edges
            for (let e of v.edges) {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = e.weight;
                ctx.moveTo(v.pos.x, v.pos.y);
                ctx.lineTo(e.destination.pos.x, e.destination.pos.y);
                ctx.closePath();
                ctx.stroke();

                ctx.font = '12px serif';
                ctx.fillStyle = 'black';
            }
        }
    }

    drawVertex(subgraph, ctx, color) {
        for (let v of subgraph) {
            // Fill verts
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(v.pos.x - 3, v.pos.y - 6, 1, v.pos.x - 9, v.pos.y - 3, 15);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(1, color);
            ctx.fillStyle = gradient;
            ctx.arc(v.pos.x, v.pos.y, 25, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.font = 'bold 14px serif';
            ctx.fillStyle = 'black';
            ctx.fillText(`${v.value.slice(1, v.value.length)}`, v.pos.x, v.pos.y + 2);
        }
    }

    /**
     * Render
     */
    render() {
        return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>;
    }
}


/**
 * App
 */
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graph: new Graph()
        };

    }

    clickHandler = () => {

        const newGraph = new Graph();
        this.setState({graph: newGraph})
    };

    render() {
        return (
            <div className="App">
                <GraphView graph={this.state.graph}/>
                <button onClick={this.clickHandler}>Random Graph</button>
            </div>
        );
    }
}

export default App;
