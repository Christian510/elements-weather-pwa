import React from 'react';
import Button from '../../../components/Button/Button';


function LandingPageView () {

    return (
        <header className="App-header">
            <h1>Elements Weather</h1>
            <Button name="Check The Weather" />
            <h3>Sign Up To Save Weather Searches</h3>
                <div className='flex flex-column justify-ctr'>
                    <Button name="Create Account" />
                    <Button name="Login" />
                </div>
            
        </header>
    );
}

export default LandingPageView;