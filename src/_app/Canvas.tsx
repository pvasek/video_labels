import * as React from "react";
import { observer } from "mobx-react";
import { AppModel } from "./AppModel";
import { MouseEvent } from "react";
import { action } from "mobx";

export interface CanvasModelOwner {
    imageUrl: string;
    width: number;
}

export class CanvasModel {
    constructor(private owner: CanvasModelOwner) {        
    }

    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement;

    @action setContext(context: CanvasRenderingContext2D) {
        this.ctx = context;
    }    

    @action draw() {
        const img = new Image();
        img.src = this.owner.imageUrl;
        img.onload = () => {
            this.renderImage();
        }
        this.img = img;
    }

    @action selectPoint(x: number, y: number) {
        x = x - 1;
        y = y - 2;
        this.renderImage();
        this.renderPointer(x, y);
    }

    private renderPointer(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ffd50066"
        this.ctx.lineWidth = 2;
        const size = 30;                
        this.ctx.moveTo(x - size, y);
        this.ctx.lineTo(x + size, y);
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x, y + size);
        this.ctx.stroke();
    }

    private renderImage() {
        const factor = this.owner.width / this.img.width;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.img, 0, 0, this.img.width * factor, this.img.height * factor);
    }
}

export class CanvasProps {
    model: CanvasModel;
}

@observer
export class Canvas extends React.Component<CanvasProps> {
    
    private el: HTMLCanvasElement;

    componentDidMount() {
        const context = this.el.getContext("2d");
        this.props.model.setContext(context);
    }

    render() {
        const { model } = this.props;        
        return <canvas 
            className="canvas" 
            ref={r => this.el = r} 
            width={1200} 
            height={800}
            onClick={(e) => model.selectPoint(e.clientX - e.currentTarget.offsetLeft, e.clientY - e.currentTarget.offsetTop)}
        />;
    }
}