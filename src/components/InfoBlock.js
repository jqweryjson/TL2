import * as React from 'react';
import classnames from 'classnames';
import { TweenLite, TimelineLite, Power4  } from 'gsap';
//import { Tween, Timeline } from 'react-gsap';

export default class InfoBlock extends React.PureComponent {
  constructor() {
    super();
    this.tl = new TimelineLite();
    this.tl.defaultEase = Power4.easeOut;
  }
  state = {};
  tl;
  blockRef = React.createRef();
  blockWrapRef = React.createRef();
  headerRef = React.createRef();
  titleRef = React.createRef();
  buttonRef = React.createRef();
  delHed = 0.2;
  RigtAnim() {
    this.tl
      .to(this.headerRef.current, 0.3, { x: '150%' })
      .to(this.titleRef.current, 0.3, { x: '150%' },'-=.2')
      .to(this.buttonRef.current, 0.3, { x: '200%',onComplete: this.props.slickSliderRef.current.slickNext },'-=.1')
      .to(
        this.blockRef.current,
        this.delHed,
        { x: '150%'})
  }
  LeftAnim() {
    this.tl
    .to(this.headerRef.current, 0.3, { x: '-150%' })
    .to(this.titleRef.current, 0.3, { x: '-150%'},'-=.2')
    .to(this.buttonRef.current, 0.3, { x: '-200%',onComplete: this.props.slickSliderRef.current.slickPrev },'-=.1')
    .to(this.blockRef.current, this.delHed,{ x: '-150%'})
      
  }
  componentDidUpdate(prevProps, prevState) {
    // this.tl.clear();
    // if(this.props.currentSlideNumber === 0){
    //   this.delHed = 0.2
    // } else {
    //   this.delHed = 0
    // }
    // this.tl
    //   .to(this.blockRef.current, this.delHed, { x: '0%' })
    //   .to(this.headerRef.current, 0.1, { x: '0%' })
    //   .to(this.titleRef.current, 0.1, { x: '0%' })
    //   .to(this.buttonRef.current, 0.1, { x: '0%' });
    // if (this.props.slideRigtAnim) {
    //   this.RigtAnim();
    //   return;
    //   //this.tl.seek(0);
    // } else if (this.props.slideLeftAnim) {
    //   this.LeftAnim();
    //   return;
    //   //this.tl.seek(0);
    // }

    //this.tl.stop();
    // this.tl
    //   .to(this.blockRef.current, this.delHed, { x: '0%' })
    //   .to(this.headerRef.current, 0.2, { x: '0%' })
    //   .to(this.titleRef.current, 0.2, { x: '0%' })
    //   .to(this.buttonRef.current, 0.2, { x: '0%' });
    //this.animateBlock();
  }
  animateBlock() {
    // //tl.stop();
    // this.tl
    //   .set(this.headerRef.current,{x :'-100%',immediateRender:true})
    //   .set(this.titleRef.current,{x :'-100%',immediateRender:true})
    //   .set(this.buttonRef.current,{x :'-120%',immediateRender:true})
    //   this.tl
    //   .from(this.blockRef.current, 1, {width :0,immediateRender:true},"+=1")
    //   .to(this.headerRef.current, 1, {x :'0%'})
    //   .to(this.titleRef.current, 1, {x :'0%'})
    //   .to(this.buttonRef.current, 1, {x :'0%'})
  }
  componentDidMount() {

    this.tl.delay(2)
      .from(this.blockWrapRef.current, 1, { width: 0 ,immediateRender:true})
      .set(this.headerRef.current,{x :'-100%',immediateRender:true})
      .set(this.titleRef.current,{x :'-100%',immediateRender:true})
      .set(this.buttonRef.current,{opacity :0,immediateRender:true})
      .to(this.headerRef.current, .7, {x :'0%',opacity:1,immediateRender:false})
      .to(this.titleRef.current, .7, {x :'0%',opacity:1,immediateRender:false},'-=.3')
      .to(this.buttonRef.current, .3, {opacity :1,immediateRender:true})
      .from(this.buttonRef.current, .7, {width :0,immediateRender:true},'-=.3')
  }
  render() {
    const blockClass = classnames({
      hasBg: this.props.hasBg,
      wrapInfoBlock: true
    });
    const { title, header, btnText, onClick, icon } = this.props;

    return (
        <div className={blockClass} ref={this.blockWrapRef}>
          {icon && icon}
          <div className="infoBlock" ref={this.blockRef}>
            <h2 className="infoBlock__header" ref={this.headerRef}>
              {header}
            </h2>
            <div className="infoBlock__text" ref={this.titleRef}>
              {title}
            </div>
            <button
              onClick={onClick}
              ref={this.buttonRef}
              className="infoBlock__button"
            >
              {btnText}
            </button>
          </div>
        </div>
    );
  }
}
