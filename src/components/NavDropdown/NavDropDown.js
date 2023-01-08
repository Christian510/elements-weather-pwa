import React from 'react';
import { NavLink } from 'react-router-dom';
import './navDropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'




function NavDropdown (props) {
      
    function toggleDropdown() {
        let menu = document.querySelector('.nav-menu');
        menu.classList.toggle('hide');
    }
    return (
        <>
        <div onClick={() => toggleDropdown()}>
            <FontAwesomeIcon icon={faBars} size='2x' />
        </div>
        <nav className='nav-menu'>
            <ul className='nav-list'>
                <li className='nav-link'>
                    <NavLink
                    to='/createAccount'
                    >
                    Create Account
                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink
                    to='/login'
                    >
                    Login
                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink
                    to='/about'
                    >
                    About Elements Weather
                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink
                    to='/user_account'
                    >
                    {props.user}'s Account
                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink
                    to=''
                    >

                    </NavLink>
                </li>
                <li className='nav-link'>
                    <NavLink
                    to=''
                    >

                    </NavLink>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default NavDropdown;