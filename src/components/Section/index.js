import * as React from 'react';
import InfoBlock from '../InfoBlock';



export default class Section extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentSlideNumber === this.props.number || nextProps.animateTextDirection !== this.props.animateTextDirection) {
      return true;
    }
    return false;
  }
  componentDidMount() {}
  render() {
    const { image, specialID } = this.props;
    return (
      <section className="section">
        {image && <img className="subject-image" id={specialID} src={image} alt="subjects" /> }
        <InfoBlock {...this.props} />
      </section>
    );
  }
}
