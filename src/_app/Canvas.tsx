import * as React from "react";
import { observer } from "mobx-react";
import { AppModel } from "./AppModel";
import { MouseEvent } from "react";
import { action, observable } from "mobx";

export interface CanvasModelOwner {
    imageUrl: string;
    width: number;
    selectPoint(x: number, y: number): void;
}

export class CanvasModel {
    constructor(private owner: CanvasModelOwner) {        
    }

    private ctx: CanvasRenderingContext2D;
    private img: HTMLImageElement;
    @observable factor: number;
    
    @action setContext(context: CanvasRenderingContext2D) {
        this.ctx = context;
    }    

    @action draw(): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = this.owner.imageUrl;
            img.onload = () => {
                this.renderImage();
                resolve();
            }
            this.img = img;
        });
    }

    @action selectPoint(x: number, y: number) {
        x = x - 1;
        y = y - 2;
        this.renderImage();
        this.renderPointer(x, y);
        this.owner.selectPoint(x / this.factor, y / this.factor);
    }

    @action renderOriginalPoint(x: number, y: number) {
        console.log("renderOriginalPoint: ", x, y);
        if (this.ctx) {
            this.renderPointer(x * this.factor, y * this.factor);
        }
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
        this.factor = this.owner.width / this.img.width;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.img, 0, 0, this.img.width * this.factor, this.img.height * this.factor);
    }
}

export class CanvasProps {
    model: CanvasModel;
}

@observer
export class Canvas extends React.Component<CanvasProps> {
    
    private el: HTMLCanvasElement;

    constructor(props: CanvasProps) {
        super(props);
        this.click = this.click.bind(this);
    }

    componentDidMount() {
        const context = this.el.getContext("2d");
        this.props.model.setContext(context);
    }

    click(e: React.MouseEvent<HTMLCanvasElement>) {
        const clientRec = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - clientRec.left;
        const y = e.clientY - clientRec.top;
        this.props.model.selectPoint(x, y);
    }

    render() {
        const { model } = this.props;        
        return <canvas 
            className="canvas" 
            ref={r => this.el = r} 
            width={1200} 
            height={800}
            onClick={this.click}
        />;
    }
}