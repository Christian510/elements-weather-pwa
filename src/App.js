import React from 'react';
import { Outlet } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import './styles/index.css';
import './styles/root.css';
import './styles/skeleton.css';
import LandingPageView from './views/LandingPageView/LandingPageView';
import SearchBar from './components/SearchBar/SearchBar';
import CreateAccountView from './views/CreateAccountView/CreateAccountView';

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
        <>
        {/* all the other elements */}
        <div className="App-container">
          <SearchBar />
          <LandingPageView />
        <div id="detail">
          <Outlet />
        </div>
        </div>
        </>
      );
    }
}

export default App;
