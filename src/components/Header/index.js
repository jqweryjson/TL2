import * as React from 'react';
import classnames from 'classnames';
import { ReactComponent as Logo } from '../img/logo.svg';

const Header = ({ isBlackScreen }) => {
    const headerClass = classnames({
        isBlackScreen: isBlackScreen,
        header: true
    });
    return (
        <header className={headerClass}>
        <Logo className="logoClass" id="logoBlac"/> 
        <a href="../" 
            className="header__button-back">
            <span className="header__button-back-arrow-box">
            <span className="header__button-back-arrow">←</span> </span>Назад</a>
        </header>
    );
}
export default Header;