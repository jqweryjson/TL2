import * as React from 'react';
import classnames from 'classnames';
import {fabric} from 'fabric';
import InfoBlock from '../InfoBlock';


export default class Section extends React.Component {
    state = {
        playStartAnimText: null
    }
    sectionRef = React.createRef();
    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.playStartAnimText !== nextProps.playStartAnimText){
            return {
              playStartAnimText: nextProps.playStartAnimText
            };
        }
        return null;
    }
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
            opacity: 0.3,
            originX: 'right'
        });
        this.canvas.add(path);
        this.canvas.bringToFront(path);

    }
    render(){
        const {canvasId, image} = this.props;
        const imgClass = classnames({
            mainImgWrap:true,
            playStartAnimText: this.state.playStartAnimText
        })
        return (
            <section ref={this.sectionRef} className="section">
                <div className={imgClass}> 
                    <img className="mainImg" src={image} alt=""/>
                </div>
                <canvas className="canvas" id={canvasId}></canvas>
                <InfoBlock {...this.props} />
            </section>
        );
    }
}
