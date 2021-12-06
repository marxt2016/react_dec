import React, { useState } from "react";
import { Counter } from "./counter";

const CountersList = () => {
  const initialState = [
    { id: 0, value: 0, name: "Some thing" },
    { id: 1, value: 5, name: "Spoon" },
    { id: 2, value: 0, name: "Fork" },
    { id: 3, value: 0, name: "Plate" },
    { id: 4, value: 0, name: "Minimal set" },
  ];
  const [counters, setCounters] = useState(initialState);
  const handleDelete = (id) => {
    const newCounters = counters.filter((counter) => counter.id !== id);
    setCounters(newCounters);
  };
  const handleReset = () => {
    setCounters(initialState);
  };
  const onIncrement = (id) => {
    const newCounters = counters.map((counter) =>
      counter.id === id
        ? { ...counter, ...{ value: counter.value + 1 } }
        : counter
    );
    setCounters(newCounters);
  };
  const onDecrement = (id) => {
    const newCounters = counters.map((counter) =>
      counter.id === id
        ? { ...counter, ...{ value: counter.value - 1 } }
        : counter
    );
    setCounters(newCounters);
  };
  return (
    <>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          {...counter}
          onIncrement={() => onIncrement(counter.id)}
          onDecrement={() => onDecrement(counter.id)}
          onDelete={handleDelete}
        />
      ))}
      <button className="btn btn-primary btn-sm m-2" onClick={handleReset}>
        refresh to default
      </button>
    </>
  );
};

export default CountersList;
