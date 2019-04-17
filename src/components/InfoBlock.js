import * as React from 'react';
import classnames from 'classnames';
//import { TweenLite, TimelineLite } from 'gsap/TweenLite';
//import { Tween, Timeline } from 'react-gsap';

export default class InfoBlock extends React.PureComponent {
  // shouldComponentUpdate(nextProps, nextState){
  //     return false;
  // }
  state = {
    playStartAnimText: null
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.playStartAnimText !== nextProps.playStartAnimText){
        return {
          playStartAnimText: nextProps.playStartAnimText
        };
    }
    return null;
  }
  componentDidMount() {}
  render() {
    const blockClass = classnames({
      hasBg: this.props.hasBg,
      infoBlock: true,
      playStartAnimText: this.state.playStartAnimText
    });
    const { title, header, btnText, onClick, icon } = this.props;
    return (
      <div className="wrapInfoBlock">
        {icon && icon}
        <div className={blockClass}>
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
