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
        </header>
    );
}
export default Header;