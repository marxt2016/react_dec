import React from "react";

import Main from "./layouts/main";
import Login from "./layouts/login";
import Logout from "./layouts/logout";
import NavBar from "./components/ui/navBar";

import Users from "./layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./components/common/notFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />

                <ProfessionProvider>
                    <QualityProvider>
                        <Switch>
                            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />

                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/" exact component={Main} />
                            <Route path="/404" component={PageNotFound} />
                            <Redirect to="/404" />
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
