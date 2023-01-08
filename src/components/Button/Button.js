import React from 'react';
import { Link } from "react-router-dom";
import '../Button/button.css';

function Button(props) {

    return (
        <div className='add-button'>
            <Link to={props.path}>{props.name}</Link>
        </div>
    );
}

export default Button;


