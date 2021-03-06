import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";

import { refreshToken } from "./redux/actions/authAction"

function App() {
  
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])

  return (
    <Router>

      <Alert />

      <input type="checkbox" id="theme" />

      <div className="App">
        <div className="main">

          { auth.token && <Header />}

          <Switch>
            <Route exact path="/" component={auth.token ? Home : Login} />
            <Route exact path="/register" component={Register} />
            
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
