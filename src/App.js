import React, { createContext, useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Switch from 'react-bootstrap/esm/Switch';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home/Home';
import News from './components/News/News';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import 'bootstrap/dist/css/bootstrap.css';
import places from './fake-data/Places';
import Destination from './components/Destination/Destination';
import Booking from './components/Booking/Booking';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const CommonData = createContext();

function App() {
  const [selectedPlace, setSelectedPlace] = useState(places[0]);
  const [loggedInUser, setLoggedInUser] = useState({displayName:"",email:"",password:""});
  console.log("App Selected Place=",selectedPlace);
  return (
    <CommonData.Provider value={[loggedInUser, setLoggedInUser, selectedPlace, setSelectedPlace]}>
     
      <div className="App">
        <div className="imageBackground">
          <div className="colorBackground" >
            <Router>
              <Header></Header>
              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/blog">
                  <Blog />
                </Route>
                <PrivateRoute path="/booking">
                  <Booking />
                </PrivateRoute>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/destination">
                  <Destination />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>

      </div>
    </CommonData.Provider>

  );
}

export default App;
