import * as React from 'react';

const Button = ({ text }) => {
    return <button className="blackSection__button">{text}</button>
}

export default class BlackSection extends React.PureComponent {
    render(){
        const {header,upperText, textMark, text, btn} = this.props;
        return (
            <section className="section blackSection">
                <div id="blackSection__slideLeft">
                    <div className="blackSection__block">
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
                </div>
            </section>
        )
    }
}