import React from 'react';
// import logo from './logo.svg';
import './App.css';
import LandingPageView from './views/LandingView.js/LandingPageView/LandingPageView';

class App extends React.Component {
    constructor (props) {
      super(props);
      this.state = {        
        isLoggedIn: false,
        hasSession: false,
      }

    }
    render() {

      return (
        <div className="App-container">
          <LandingPageView />
          {/* Login view */}
          {/* About page view */}
          {/* SavedWeatherView */}
          {/* CurrentWeatherView */}
          {/* WeatherMapView */}
          
        </div>
      );
    }
}

export default App;
