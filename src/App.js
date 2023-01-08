import React from 'react';
import { Outlet } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import './styles/index.css';
import './styles/root.css';
import './styles/skeleton.css';
import Header from './views/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import NavDropdown from './components/NavDropdown/NavDropDown';

class App extends React.Component {
    constructor (props) {
      super(props);
      this.state = {        
        isLoggedIn: false,
        hasSession: false,
        user: "Sam"
      }

    }
    render() {

      return (
        <>
        {/* all the other elements */}
        <div className="App-container">
          <Header>
            <SearchBar />
            <NavDropdown user={this.state.user} />
          </Header>
        <div id="detail">
          <Outlet />
        </div>
        </div>
        </>
      );
    }
}

export default App;
