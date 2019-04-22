import * as React from 'react';
import { ReactComponent as Ok } from '../img/ok.svg';
import { ReactComponent as Fb } from '../img/fb.svg';
import { ReactComponent as Vk } from '../img/vk.svg';

const Footer = () => {
    return (
        <footer className="footer">
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
        </footer>
    );
}
export default Footer;