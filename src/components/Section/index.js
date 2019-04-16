import * as React from 'react';
import {fabric} from 'fabric';
import InfoBlock from '../InfoBlock';


export default class Section extends React.PureComponent {

    state = {

    }
    sectionRef = React.createRef();
    componentDidMount(){
        const container = document.getElementById(this.props.canvasId);
        // container.width = this.sectionRef.current.offsetWidth;
        // container.height = this.sectionRef.current.offsetHeight;
         container.width = window.innerWidth;
         container.height  = window.innerHeight      
        this.canvas = new fabric.Canvas(container);
        fabric.Object.prototype.selectable = false;
        fabric.Object.prototype.hasRotatingPoint = false;
        fabric.Object.prototype.hasControls = false;
        fabric.Object.prototype.borderScaleFactor = 0;
        fabric.Object.prototype.hoverCursor = 'default';
        this.canvas.selection = false;
        this.canvas.selection = false;
        const path = new fabric.Path('M ' + (-this.canvas.width / 7) + ' 0 L 0 0 L 0 ' + this.canvas.height + ' L ' + (-this.canvas.width / 1.5) + ' ' + this.canvas.height + ' z');
        path.set({ 
            left: this.canvas.width, 
            top: 0,
            fill:this.props.fill,
            opacity: 0.3,
            originX: 'right'
        });
        console.log(path)
        fabric.Image.fromURL(this.props.image, img => this.addCouPleIMg(img,path));

    }
    addCouPleIMg(img,path){
        //img.filters.push(new fabric.Image.filters.Grayscale());
        //img.applyFilters(this.canvas.renderAll());
        // добавляем изображения на холст
        //img.scale(0.5);
        img.scaleToHeight(this.canvas.height);
        //img.scaleToWidth(300);
        img.set({
            left:this.canvas.width,
            top:this.canvas.height,
            originY: 'bottom',
            originX: 'right'
        })
//this.canvas.getContext().globalCompositeOperation = 'xor';

// var filter = new fabric.Image.filters.HueRotation({
//     rotation: -5.5
// });

// img.filters.push(filter);
// img.applyFilters();
//path.toObject();

        //    const group = new fabric.Group([ img, path ], {
        //     left: 0,
        //     top: 0,
        //   });
        //   group.clipPath = img;
        //   this.canvas.add(group);
        //this.canvas.bringToFront(path)
        //path.set({globalCompositeOperation: 'lighter'}); //set gCO for yellow

        this.canvas.add(img,path);
        //this.canvas.bringToFront(img);
        this.canvas.bringToFront(path);
        this.canvas.renderAll();
    }
    render(){
        const {canvasId} = this.props;
        return (
            <section ref={this.sectionRef} className="section">
                <canvas className="canvas" id={canvasId}></canvas>
                <InfoBlock {...this.props} />
            </section>
        );
    }
}
