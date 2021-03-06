import * as React from 'react';
import { isMobile } from 'react-device-detect';

const Button = ({ text }) => {
    return <button className="blackSection__button"><span>{text}</span></button>
}

export default class BlackSection extends React.PureComponent {
    render(){
        const {header,upperText, textMark, text, btn } = this.props;
        return (
            <section className={`section blackSection ${isMobile ? '' : 'blackSection-fix'}`}>
                    <div className="blackSection__block blackSection__block-op">
                        <h2 className="blackSection__h2">{ header }</h2>
                        <div className="blackSection__row">
                            <span className="blackSection__text blackSection__text_upper">{ upperText }</span>
                            <span className="blackSection__text-mark">{ textMark }</span>
                            <span className="blackSection__text blackSection__text_f">{ text }</span>
                        </div>
                        <div className="blackSection__row">
                            {
                                btn.map( item => <Button key={item.id} {...item}/>)
                            }
                        </div>
                    </div>
            </section>
        )
    }
}