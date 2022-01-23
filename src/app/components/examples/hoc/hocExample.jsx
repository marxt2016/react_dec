import React from "react";
import Component from "./someComponent";
import withLogin from "./withLogin";

import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";
import withPropsStyles from "./withPropsStyles";
import SimpleComponenet from "./simpleComponent";
import WithLoginLogout from "./withLoginLogout";

const HOCExample = () => {
    const ComponentWithAuth = withLogin(Component);
    const ComponentWithPropsStyles = withPropsStyles(Component);
    const NewComponent = withPropsStyles(ComponentWithAuth);
    const Simple = WithLoginLogout(SimpleComponenet);
    return (
        <>
            <CardWrapper>
                <SmallTitle>1. Обычный компонент</SmallTitle>
                <Divider />
                <Component />
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>2. Функциональный HOC</SmallTitle>
                <Divider />
                <ComponentWithAuth />
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>3. HOC With Styles and Props</SmallTitle>
                <Divider />
                <ComponentWithPropsStyles />
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>4. Composed HOC</SmallTitle>
                <NewComponent />
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>5. Example</SmallTitle>
                <Simple />
            </CardWrapper>
        </>
    );
};

export default HOCExample;
