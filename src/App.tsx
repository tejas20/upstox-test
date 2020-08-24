import React from 'react';
import './App.css';
import { Homepage } from './components/Homepage/HomepageView';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import CountryDetails from './components/CountryDetails/CountryDetails';
function App() { 
  return (
    <Router>
      <Route path='/' exact component={() => <Homepage />}/>
      <Route path='/country-details/:id' component={(props: any) => <CountryDetails id={props.match.params.id}/>}/>
    </Router>
  );
}

export default App;
