import React from 'react';
import './header.css';


function Header (props) {
    const { children } = props;
    return (
        <header id="header" className="header flex row justify-between">
            {children}
        </header>
    );
}

export default Header;