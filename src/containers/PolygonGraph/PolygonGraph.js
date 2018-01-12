import React, { Component } from 'react';
import PolygonGraphControll from '../../components/PolygonGraphControll/PolygonGraphControll';

class PolygonGraph extends Component {

    state = {
        radius: this.props.radius || '',
        percentages: this.props.percentages || [],
        borderColor: this.props.borderColor || '',
        fillColor: this.props.fillColor || ''
    }

    circle = (canvas, ctx) => {
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 200, 0, Math.PI * 2, true);
        ctx.strokeStyle = '#f00';
        ctx.stroke();
    }

    changeGraphBackground = (event) => {
        this.setState({fillColor: event.target.value});
    }

    changeGraphBorder = (event) => {
        this.setState({borderColor: event.target.value});
    }

    pointCoordinates = (radius, angle, canvas) => {
        const radians = angle * (Math.PI / 180);
        const x = canvas.width/2 + radius*Math.cos(radians);
        const y = canvas.height/2 + radius*Math.sin(radians);

        return [x, y];
    }

    createPolygon = (graphSettings) => {
        graphSettings.ctx.beginPath();
        graphSettings.pointsCoordinates.forEach((coordinates, index) => {
            const x = coordinates[0];
            const y = coordinates[1];
            if (index === 0) {
                graphSettings.ctx.moveTo(x, y);
            }

            graphSettings.ctx.lineTo(x, y);

            if (index === graphSettings.pointsCoordinates.length - 1) {
                graphSettings.ctx.lineTo(graphSettings.pointsCoordinates[0][0], graphSettings.pointsCoordinates[0][1]);
            }            
        });

        graphSettings.ctx.fillStyle = graphSettings.fillColor || '#eee';
        if (graphSettings.hasOwnProperty('strokeColor')) {
            graphSettings.ctx.strokeStyle = graphSettings.strokeColor;
            graphSettings.ctx.stroke();
        }
        graphSettings.ctx.fill();
    }

    createCanvas = () => {
        const canvas = this.canvas
        let ctx = canvas.getContext('2d');

        this.circle(canvas, ctx); // Used for visual test

        const angle = 360 / this.state.percentages.length;

        const placeholderPointsCoordinates = this.state.percentages.map((percentages, index) => {
            return this.pointCoordinates(this.state.radius, index * angle, canvas);
        });

        this.createPolygon({
            pointsCoordinates: placeholderPointsCoordinates,
            ctx: ctx
        });

        const graphPointsCoordinates = this.state.percentages.map((percentages, index) => {
            return this.pointCoordinates(percentages * this.state.radius, index * angle, canvas);
        });
        
        this.createPolygon({
            pointsCoordinates: graphPointsCoordinates,
            fillColor: this.state.fillColor,
            strokeColor: this.state.borderColor,
            ctx: ctx
        });
    }

    componentDidMount = () => {
        this.createCanvas();
    }

    componentDidUpdate = () => {
        this.createCanvas();
    }

    render = () => {
        return (
            <div>
                <canvas ref={(canvas) => {this.canvas = canvas}} width="500" height="500"></canvas>
                <PolygonGraphControll
                    changeGraphBackground={this.changeGraphBackground}
                    changeGraphBorder={this.changeGraphBorder} />
            </div>
        );
    }
}

export default PolygonGraph;