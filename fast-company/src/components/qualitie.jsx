import React from "react";
const Qualitie = ({ name, color, _id }) => {
  const provideColor = (color) => {
    let classes = "badge m-1  ";
    classes += `bg-${color}`;
    return classes;
  };
  return <span className={provideColor(color)}>{name}</span>;
};

export default Qualitie;
