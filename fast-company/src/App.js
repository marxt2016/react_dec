import React from "react";
// import Dashboard from "./components/dashboard";
import Main from "./components/main";
import Login from "./components/login";
import NavBar from "./components/fromLessonRouting/navBar";
// import Posts from "./components/posts";
import Users from "./components/users";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./components/notFoundPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" render={(props) => <Users {...props} />} />

                <Route path="/404" component={PageNotFound} />

                <Redirect to="/404" />
            </Switch>
        </>
    );
}

export default App;

//  <Route path="/users" exact render={(props) => <Users {...props} />} />;
