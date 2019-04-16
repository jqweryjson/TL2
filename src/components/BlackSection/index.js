import * as React from 'react';

const Button = ({btn}) => {
    return <button className="blackSection__button">{btn.text}</button>
}

export default class BlackSection extends React.PureComponent {
    render(){
        const {header,upperText, textMark, text, btn} = this.props;
        return (
            <div className="blackSection">
                <div className="blackSection__block">
                    <h2 className="blackSection__h2">{ header }</h2>
                    <span className="blackSection__text blackSection__text_upper">{ upperText }</span>
                    <span className="blackSection__text-mark">{ textMark }</span>
                    <span className="blackSection__text">{ text }</span>
                    <div className="blackSection__row">
                        {
                            btn.map( item => <Button {...this.props}/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}