import React from 'react';
import './header.css';


function Header (props) {
    const { children } = props;
    // console.log("Header props: ", props);
    return (
        // <header id="header" className="header flex row justify-between">
        <header id="header" className="">
            {children}
        </header>
    );
}

export default Header;