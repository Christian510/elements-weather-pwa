import React from 'react';
import '../Button/button.css';

function Button(props) {
    return (
        <button className='add-button' onClick={() => console.log('clicked')}>
           {props.name}
        </button>
    );
}

export default Button;


