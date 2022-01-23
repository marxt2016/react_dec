import React from "react";
import CollapseWrapper from "../common/collapse";
import PropTypes from "prop-types";

const ChildrenExercise = () => {
    const List = ({ children }) => {
        let number = 1;
        return React.Children.map(children, (child) => {
            if (number < React.Children.count(children) + 1) {
                const config = {
                    number: number
                };
                number++;
                return React.cloneElement(child, config);
            }
        });
    };
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <List>
                <Component />
                <Component />
                <Component />
            </List>
        </CollapseWrapper>
    );
};

const Component = (props) => {
    return <div> {props.number} Компонент списка</div>;
};
Component.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    number: PropTypes.number
};
export default ChildrenExercise;
