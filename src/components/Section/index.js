import * as React from 'react';
import classnames from 'classnames';
import InfoBlock from '../InfoBlock';
import Vector from '../img/Vector.svg';
import { ReactComponent as Wave } from '../img/wave.svg';

export default class Section extends React.Component {
  state = {};
  sectionRef = React.createRef();
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentSlideNumber === this.props.number) {
      return true;
    }
    return false;
  }
  componentDidMount() {}
  render() {
    const { image, svgId } = this.props;
    const svgWave = classnames({
        svgWave: true
    })
    return (
      <section ref={this.sectionRef} className="section">
        <Wave className="svgWave" id={svgId}/>
        <img className="subject-image" src={image} alt="subjects" />
        <InfoBlock {...this.props} />
      </section>
    );
  }
}
