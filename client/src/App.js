import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <Link to="/">Home</Link>
        <Link to="/otherpage">Other page</Link>
      </header>
      <div>
        <Switch>
          <Route exact path="/">
            <Fib />
          </Route>
          <Route path="/otherpage">
            <OtherPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
