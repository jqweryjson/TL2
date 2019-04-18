import * as React from 'react';
import classnames from 'classnames';
import {fabric} from 'fabric';
import InfoBlock from '../InfoBlock';
import Vector from '../img/Vector.svg';

export default class Section extends React.Component {
    state = {

    }
    sectionRef = React.createRef();
    shouldComponentUpdate(nextProps, nextState) {
        
        if(nextProps.currentSlideNumber === this.props.number){
            return true;
        }
        return false;
    }
    componentDidMount(){
        const container = document.getElementById(this.props.canvasId);
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
            opacity: .8,
            originX: 'right'
        });
        //this.canvas.globalCompositeOperation = 'lighter'
        //this.canvas.add(path);
        //this.canvas.bringToFront(path);
        var self = this;
        self.canvas.getContext().globalCompositeOperation = 'lighter';
        // var webglBackend;
        // try {
        //   webglBackend = new fabric.WebglFilterBackend();
        // } catch (e) {
        //   console.log(e)
        // }
        // var canvas2dBackend = new fabric.Canvas2dFilterBackend()
        // fabric.filterBackend = canvas2dBackend;
        //fabric.filterBackend = webglBackend;
        //fabric.filterBackend = fabric.initFilterBackend();

        fabric.loadSVGFromURL(Vector, function(objects, options) {
            const Vector = fabric.util.groupSVGElements(objects, options);
            Vector.fill = self.props.fill;
            //Vector.scaleToHeight(self.canvas.height);
            Vector.set({
                top:-200,
                left:self.canvas.width,
                 originY: 'top',
                 opacity:.7,
                 originX: 'right'
            })
            Vector.scale(2);
            fabric.Image.fromURL(self.props.image, function(Img) {
                //const Img = fabric.util.groupSVGElements(objects, options);
                Img.scaleToHeight(self.canvas.height);
                Img.fill = self.props.fill
                Img.set({
                    left:self.canvas.width,
                    //left:500,
                    top:self.canvas.height,
                    originY: 'bottom',
                    originX: 'right'
                })
                // const filter = new fabric.Image.filters.BlendColor({
                //     image: Img,
                //     color:'red',
                //     mode: 'multiply',
                //     //alpha: 1
                //    });
                //    const group = new fabric.Group([ Vector,Img ], {
                //        left: self.canvas.width,
                //        top: 0,
                //        originY: 'top',
                //        originX: 'right'
                //        //opacity:.4
                //     });
                    //group.filters.push(filter);
                    //group.applyFilters();
                    //Img.scale(.5);
                    //Vector.clipPath = Img;
                    //self.canvas.add(group);
                    self.canvas.getContext().globalCompositeOperation = 'source-out';
                   self.canvas.add(Vector,Img);
                   self.canvas.bringToFront(Vector);
                   self.canvas.renderAll();
            });
        });
    }
    render(){
        const {canvasId, image} = this.props;
        const imgClass = classnames({
            mainImgWrap:true,
        })
        const iimm = {
            backgroundImage: `url(${image})`
        }
        return (
            <section ref={this.sectionRef} className="section">
                <div className={imgClass}> 
                    {/* <img className="mainImg" src={image} alt=""/> */}
                    {/* <div style={iimm} ></div> */}
                </div>
                <canvas className="canvas" id={canvasId}></canvas>
                <InfoBlock {...this.props} />
            </section>
        );
    }
}
