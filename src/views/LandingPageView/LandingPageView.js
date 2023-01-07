import React from 'react';
import Button from '../../components/Button/Button';
import '../LandingPageView/landingPageView.css';


function LandingPageView () {

    return (
        <header id="landing-page" className="landing-page-header">
                <div className='flex row'>
                    <Button name="Create Account" path="/createAccount" />
                    <Button name="Login" path="/login" />
                </div>
        </header>
    );
}

export default LandingPageView;