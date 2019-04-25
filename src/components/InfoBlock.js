import * as React from 'react';
import classnames from 'classnames';
import { TweenLite, TimelineLite, Power4  } from 'gsap';
import { isMobile } from 'react-device-detect';

export default class InfoBlock extends React.Component {
  constructor() {
    super();
    this.tl = new TimelineLite();
    this.tl.defaultEase = Power4.easeOut;
    this.isMobile = isMobile;
  }
  shouldComponentUpdate(nextProps, nextState){

    if(nextProps.currentSlideNumber === nextProps.number) {
      return true;
    }
    return false;
  }
  state = {};
  tl;
  blockRef = React.createRef();
  blockWrapRef = React.createRef();
  headerRef = React.createRef();
  titleRef = React.createRef();
  buttonRef = React.createRef();
  whiteSlide = React.createRef();
  whiteSlide2 = React.createRef();
  whiteSlide3 = React.createRef();

  headerT =.5;
  textT = .5;
  btnT = .5;
  iconRefT = .1

  blockWrapRefT = 1;
  whiteSlideT = .6;

  textTDEL = '-=.0'
  btnTDEL = this.isMobile ? '-=.5' : '-=.4';
  whiteSlide3DEl = '-=.4'

  componentDidUpdate(prevProps, prevState) {
      if(this.props.animateTextDirection === 'initial'){
        this.tl
        .set(this.headerRef.current,{opacity :1,x :'0%',immediateRender:true})
        .set(this.titleRef.current,{opacity :1,x :'0%',immediateRender:true})
        .set(this.buttonRef.current,{opacity :1,x :'0%',immediateRender:true})
          return;
      }
      if(this.props.animateTextDirection === 'sttart'){
        this.tl
        .set(this.headerRef.current,{x :'-100%',immediateRender:true})
        .set(this.titleRef.current,{x :'-100%',immediateRender:true})
        .set(this.buttonRef.current,{opacity :0,scale :0,immediateRender:true})
          return;
      }
      if(this.props.animateTextDirection === 'next') {
        if(this.props.currentSlideNumber === 0){
          this.tl
            .to(this.whiteSlide.current, this.whiteSlideT, {left :0,immediateRender:false,onComplete:()=>{}})
            .set(this.headerRef.current,{x :'-100%',immediateRender:true})
            .set(this.titleRef.current,{x :'-100%',immediateRender:true})
            .set(this.buttonRef.current,{opacity :0,immediateRender:true})
        } else {
          this.tl
          .set(this.whiteSlide.current,{left:"-120%",immediateRender:true})
          .to(this.props.icon.ref.current,this.iconRefT,{scale:0,immediateRender:true})
          .to(this.whiteSlide2.current, this.whiteSlideT, {left :0,immediateRender:false})
          .to(this.whiteSlide3.current, this.whiteSlideT, {left :0,immediateRender:false},this.whiteSlide3DEl)
          .to(this.buttonRef.current, .2, {scale :0,immediateRender:false,onComplete:()=>{}}, this.btnTDEL)
          .set(this.headerRef.current,{x :'-100%',immediateRender:true})
          .set(this.titleRef.current,{x :'-100%',immediateRender:true})
          .set(this.buttonRef.current,{opacity :0,immediateRender:true})

        }
      }
      if( this.props.animateTextDirection === 'fromLeft') {
        if(this.props.currentSlideNumber === 0){
          this.tl
          .set(this.whiteSlide.current,{left:"-120%",immediateRender:true})
          .set(this.headerRef.current,{opacity :0,immediateRender:true})
          .set(this.titleRef.current,{opacity :0,immediateRender:true})
          .set(this.buttonRef.current,{opacity :0,immediateRender:true})
          .from(this.blockWrapRef.current, this.blockWrapRefT, { width: 0 ,immediateRender:true})
          .set(this.headerRef.current,{x :'-100%',immediateRender:true})
          .set(this.titleRef.current,{x :'-100%',immediateRender:true})
          .to(this.headerRef.current, this.headerT, {x :'0%',opacity:1,immediateRender:false})
          .to(this.titleRef.current, this.textT, {x :'0%',opacity:1,immediateRender:false},this.textTDEL)
          .to(this.buttonRef.current, this.btnT, {opacity :1,immediateRender:true})
          .from(this.buttonRef.current, this.btnT, {width :0,immediateRender:true,onComplete:()=>{}},this.btnTDEL)
          return;
        }
        this.tl
        .set(this.whiteSlide.current,{left:"-120%",immediateRender:true})
        .set(this.props.icon.ref.current,{scale:0,immediateRender:true})
        .set(this.whiteSlide2.current, {left :"-120%",immediateRender:true})
        .set(this.whiteSlide3.current, {left :"-120%",immediateRender:true})
        .set(this.buttonRef.current,{opacity:0,immediateRender:true})
        .set(this.buttonRef.current,{scale:1,immediateRender:true})
        .set(this.headerRef.current,{x :'-100%',immediateRender:true})
        .set(this.titleRef.current,{x :'-100%',immediateRender:true})
        .to(this.props.icon.ref.current,this.iconRefT,{scale:1,immediateRender:true})
        .to(this.headerRef.current, this.headerT, {x :'0%',opacity:1,immediateRender:false})
        .to(this.titleRef.current, this.textT, {x :'0%',opacity:1,immediateRender:false},this.textTDEL)
        .to(this.buttonRef.current, this.btnT, {opacity :1,immediateRender:true}, this.btnTDEL)
        .from(this.buttonRef.current, this.btnT, {width :0,immediateRender:true,onComplete:()=>{}},this.btnTDEL)
      }
  }
  componentDidMount() {
    if( this.props.animateTextDirection === 'nothing') {
      this.tl
      .set(this.headerRef.current,{opacity :1,immediateRender:true})
      .set(this.titleRef.current,{opacity :1,immediateRender:true})
      .set(this.buttonRef.current,{opacity :1,immediateRender:true})
      return;
    }
    if(this.props.number === 0) {
      this.tl.delay(2)
      .from(this.blockWrapRef.current, 1, { width: 0 ,immediateRender:true})
      .set(this.headerRef.current,{x :'-100%',immediateRender:true})
      .set(this.titleRef.current,{x :'-100%',immediateRender:true})
      .set(this.buttonRef.current,{opacity :0,immediateRender:true})
      .to(this.headerRef.current, this.headerT, {x :'0%',opacity:1,immediateRender:false})
      .to(this.titleRef.current, this.textT, {x :'0%',opacity:1,immediateRender:false},this.textTDEL)
      .to(this.buttonRef.current, this.btnT, {opacity :1,immediateRender:true})
      .from(this.buttonRef.current, this.btnT, {width :0,immediateRender:true,onComplete:()=>{}},this.btnTDEL)
    } else {
      this.tl
      .from(this.blockWrapRef.current, 0, { width: 0 ,immediateRender:true,onComplete:()=>{}})
      .set(this.props.icon.ref.current,{scale:0,immediateRender:true})
      .set(this.headerRef.current,{x :'-100%',immediateRender:true})
      .set(this.titleRef.current,{x :'-100%',immediateRender:true})
      .set(this.buttonRef.current,{opacity :0,immediateRender:true})
    }
  }

  render() {
    console.log('WASRENDER')
    const { title, header, btnText, onClick, icon, number } = this.props;
    const blockClass = classnames({
      hasBg: this.props.hasBg,
      isFourInfoBlock: number === 4,
      wrapInfoBlock: true
    });
    return (
        <div className={blockClass} ref={this.blockWrapRef}>
          {icon && icon}
          <div className="infoBlock" ref={this.blockRef}>
            <div className="infoBlock__whiteSlide" ref={this.whiteSlide}></div>
            <h2 className="infoBlock__header" ref={this.headerRef}>
              <div className="infoBlock__whiteSlide" ref={this.whiteSlide2}></div>
              {header}
            </h2>
            <div className="infoBlock__text" ref={this.titleRef}>
            <div className="infoBlock__whiteSlide" ref={this.whiteSlide3}></div>
              {title}
            </div>
            <button
              onClick={onClick}
              ref={this.buttonRef}
              className="infoBlock__button"
            >
              <span>{btnText}</span>
            </button>
          </div>
        </div>
    );
  }
}
