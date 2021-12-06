import React from "react";

export const Counter = (props) => {
  const { value } = props;

  const formatValue = () => {
    return value === 0 ? "empty" : value;
  };

  const getBageClasses = () => {
    let classes = "badge m-1 ";
    classes += value === 0 ? "bg-warning" : "bg-primary";
    return classes;
  };

  const handleIncrement = () => {
    props.onIncrement();
  };

  const handleDecrement = () => {
    props.onDecrement();
  };

  return (
    <div>
      <span>{props.name}</span>

      <span className={getBageClasses()}>{formatValue()}</span>

      <button className="btn btn-primary btn-sm m-2" onClick={handleIncrement}>
        +
      </button>
      <button className="btn btn-primary btn-sm m-2" onClick={handleDecrement}>
        -
      </button>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => props.onDelete(props.id)}
      >
        {" "}
        delete
      </button>
    </div>
  );
};
