import React from 'react';


function Error(code, message) {
    return (
        <div>
            <h1>{code}</h1>
            <h2>{message}</h2>
        </div>
    );
}

export default Error;