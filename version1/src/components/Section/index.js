import * as React from 'react';
import InfoBlock from '../InfoBlock';
import classnames from 'classnames';


export default class Section extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentSlideNumber === this.props.number || nextProps.animateTextDirection !== this.props.animateTextDirection) {
      return true;
    }
    return false;
  }
  componentDidMount() {}
  render() {
    const { image, specialID, number } = this.props;
    const ImgClas = classnames({
      "subject-image":true,
      isFour: number === 4,
      isThree: number === 3,
    })
    return (
      <section className="section">
        {image && <img className={ImgClas} id={specialID} src={image} alt="subjects" /> }
        <InfoBlock {...this.props} />
        {this.props.children}
      </section>
    );
  }
}
