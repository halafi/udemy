import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import requireAuth from "./components/require_authentication";
import App from "./components/app";
import Welcome from "./components/welcome";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import Signout from "./components/auth/signout";
import Resources from "./components/resources";
import Feature from "./components/feature";
import reducers from "./reducers";
import Async from "./middlewares/async";
import { AUTH_USER } from "./actions/types";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {/* <Route path="resources" component={requireAuth(Resources)}/> */}
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin}/>
        <Route path="signout" component={Signout}/>
        <Route path="signup" component={Signup}/>
        <Route path="feature" component={requireAuth(Feature)}/>
      </Route>
    </Router>
  </Provider>,
  document.querySelector(".container")
);
