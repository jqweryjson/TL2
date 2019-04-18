import * as React from 'react';
import classnames from 'classnames';
import { TweenLite, TimelineLite } from 'gsap';
//import { Tween, Timeline } from 'react-gsap';

export default class InfoBlock extends React.PureComponent {
  constructor() {
    super();
    this.tl = new TimelineLite();

  }
  state = {};
  tl;
  blockRef = React.createRef();
  headerRef = React.createRef();
  titleRef = React.createRef();
  buttonRef = React.createRef();
  delHed = 0.2;
  RigtAnim() {
    this.tl
      .to(this.headerRef.current, 0.4, { x: '150%' })
      .to(this.titleRef.current, 0.4, { x: '150%' },'-=.3')
      .to(this.buttonRef.current, 0.4, { x: '200%',onComplete: this.props.slickSliderRef.current.slickNext },'-=.3')
      .to(
        this.blockRef.current,
        this.delHed,
        { x: '150%'})
  }
  LeftAnim() {
    this.tl
    .to(this.headerRef.current, 0.4, { x: '-150%' })
    .to(this.titleRef.current, 0.4, { x: '-150%'},'-=.3')
    .to(this.buttonRef.current, 0.4, { x: '-200%',onComplete: this.props.slickSliderRef.current.slickPrev },'-=.3')
    .to(this.blockRef.current, this.delHed,{ x: '-150%'})
      
  }
  componentDidUpdate(prevProps, prevState) {
    this.tl.clear();
    if(this.props.currentSlideNumber === 0){
      this.delHed = 0.2
    } else {
      this.delHed = 0
    }
    this.tl
      .to(this.blockRef.current, this.delHed, { x: '0%' })
      .to(this.headerRef.current, 0.1, { x: '0%' })
      .to(this.titleRef.current, 0.1, { x: '0%' })
      .to(this.buttonRef.current, 0.1, { x: '0%' });
    if (this.props.slideRigtAnim) {
      this.RigtAnim();
      return;
      //this.tl.seek(0);
    } else if (this.props.slideLeftAnim) {
      this.LeftAnim();
      return;
      //this.tl.seek(0);
    }

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
  componentDidMount() {}
  render() {
    console.log('ffffff')
    const blockClass = classnames({
      hasBg: this.props.hasBg,
      infoBlock: true
    });
    const { title, header, btnText, onClick, icon } = this.props;

    return (
      <div className="wrapInfoBlock">
        {icon && icon}
        <div className={blockClass} ref={this.blockRef}>
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
