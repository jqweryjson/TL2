import * as React from 'react';
import InfoBlock from '../InfoBlock';



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
    const { image } = this.props;
    return (
      <section ref={this.sectionRef} className="section">
        {image && <img className="subject-image" src={image} alt="subjects" /> }
        <InfoBlock {...this.props} />
      </section>
    );
  }
}
