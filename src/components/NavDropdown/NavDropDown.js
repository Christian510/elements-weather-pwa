import React from 'react';
import { NavLink } from 'react-router-dom';
import './navDropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
// import { useState } from 'react';




function NavDropdown (props) {
      
    // const [currentView, setCurrentView] = useState()
    
    function toggleDropdown() {
        let menu = document.querySelector('.nav-menu');
        menu.classList.toggle('hide');
    }


    return (
        <>
        <div onClick={() => toggleDropdown()}>
            <FontAwesomeIcon icon={faBars} size='2x' />
        </div>
        <nav className='nav-menu hide'>
            <ul className='nav-list'>
                <li className='nav-link' onClick={() => toggleDropdown()}>
                    <NavLink
                    to='/'
                    >
                    Home
                    </NavLink>
                </li>
                <li className='nav-link' onClick={() => toggleDropdown()}>
                    <NavLink
                    to='/create_account'
                    >
                    Create Account
                    </NavLink>
                </li>
                <li className='nav-link' onClick={() => toggleDropdown()}>
                    <NavLink
                    to='/login'
                    >
                    Login
                    </NavLink>
                </li>
                <li className='nav-link' onClick={() => toggleDropdown()}>
                    <NavLink
                    to='/about'
                    >
                    About
                    </NavLink>
                </li>
                <li className='nav-link' onClick={() => toggleDropdown()}>
                    <NavLink
                    to='/user_account'
                    >
                    {props.user}'s Account
                    </NavLink>
                </li>
                <li className='nav-link' onClick={() => toggleDropdown()}>
                    <NavLink
                    to='/favorites'
                    >
                    Favorites
                    </NavLink>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default NavDropdown;