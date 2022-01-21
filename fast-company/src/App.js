import React from "react";

import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";

import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./components/common/notFoundPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" render={(props) => <Users {...props} />} />
                <Route path="/404" component={PageNotFound} />

                <Redirect to="/404" />
            </Switch>
        </>
    );
}

export default App;

//  <Route path="/users" exact render={(props) => <Users {...props} />} />;
