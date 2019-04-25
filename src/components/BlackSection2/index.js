import * as React from 'react';
import { isMobile } from 'react-device-detect';

import { ReactComponent as Ok } from '../img/ok.svg';
import { ReactComponent as Fb } from '../img/fb.svg';
import { ReactComponent as Vk } from '../img/vk.svg';

const Button = ({ text, id }) => {
  return (
    <button key={id} className="blackSection__button">
      <span>{text}</span>
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
            <Button key={item.id} {...item} />
          ))}
        </div>
      </div>
    );
  });
};

export default class BlackSection2 extends React.PureComponent {
  render() {
    return (
      <section className="section blackSection blackSection-last">
          <div className="blackSection__block blackSection__block_m blackSection__block-op-2">
            {<Blockrow  {...this.props} />}
            {isMobile ? (
                <div className="footer__soc">
                  <a className="footer__soc-link" href="javascript:;">
                      <Ok />
                  </a>
                  <a className="footer__soc-link" href="javascript:;">
                      <Fb />
                  </a>
                  <a className="footer__soc-link" href="javascript:;">
                      <Vk />
                  </a>
                </div>          
            ) : null}
          </div>
       
      </section>
    );
  }
}
