import * as React from 'react';
import classnames from 'classnames';
//import { TweenLite, TimelineLite } from 'gsap/TweenLite';
import { Tween, Timeline } from 'react-gsap';

export default class InfoBlock extends React.PureComponent {
  blockClass = classnames({
    hasBg: this.props.hasBg,
    infoBlock: true
  });
  //infoBlockRef = React.createRef();
  componentDidMount() {
    if (this.props.playStartAnim) {
      //this.infoBlockRef.current.tween.play();
    }
    console.log(this.props.children)
  }
  onComplete() {
    //alert('pidor')
  }
  render() {
    const { title, header, btnText, onClick, icon } = this.props;
    return (
        <div className="wrapInfoBlock">
            {icon && icon}
            <div className={this.blockClass}>
                <h2 className="infoBlock__header">{header}</h2>
                <div className="infoBlock__text">{title}</div>
            <button onClick={onClick} className="infoBlock__button">
                {btnText}
            </button>
            </div>
        </div>
    );
  }
}
