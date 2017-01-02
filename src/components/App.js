import React, { Component } from 'react';
import HomePage from './HomePage';
import LoadingPage from './LoadingPage';
import World from './World';

class App extends Component {
  state = {
    route: window.location.hash.substr(1),
  };

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  renderRoute() {
    if (this.state.route === '/loading') {
      return <LoadingPage />;
    }

    if (this.state.route === '/world') {
      return <World />;
    }

    return <HomePage />;
  }

 

  render() {
    return (
      <div>
        {this.renderRoute()}
      </div>
    );
  }
}


export default App;
