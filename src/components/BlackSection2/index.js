import * as React from 'react';

const Button = ({ text, id }) => {
  return (
    <button key={id} className="blackSection__button">
      {text}
    </button>
  );
};
const Blockrow = ({ body }) => {
  return body.map(item => {
    return (
      <div className="blackSection__block-row" key={item.id}>
        <div className="blackSection__block-row_t">
            <h2 className="blackSection__h2"> {item.headerText} </h2>
            <span className="blackSection__text">{item.text}</span>
        </div>
        <div className="blackSection__row">
          {item.buttons.map(item => (
            <Button {...item} />
          ))}
        </div>
      </div>
    );
  });
};

export default class BlackSection2 extends React.PureComponent {
  render() {
    return (
      <section className="section blackSection">
        <div className="blackSection__slideLeft">
          <div className="blackSection__block blackSection__block_m">
            {<Blockrow {...this.props} />}
          </div>
        </div>
      </section>
    );
  }
}
