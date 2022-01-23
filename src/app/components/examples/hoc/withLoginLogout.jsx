import React, { useState } from "react";
import CardWrapper from "../../common/Card";

const WithLoginLogout = (Component) => (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const isAuthCheck = () => {
        return localStorage.getItem("user") && true;
    };

    const onLogin = () => {
        localStorage.setItem("user", "John");
        setIsAuth(isAuthCheck());
    };
    const onLogout = () => {
        localStorage.removeItem("user");
        setIsAuth(isAuthCheck());
    };
    return (
        <CardWrapper>
            <Component
                {...props}
                isAuth={isAuth}
                onLogin={onLogin}
                onLogout={onLogout}
            />
        </CardWrapper>
    );
};

export default WithLoginLogout;
