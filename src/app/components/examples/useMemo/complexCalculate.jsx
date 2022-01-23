import React, { useState, useEffect, useMemo } from "react";

import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}
function runFactorial(n) {
    console.log("runFactorial");
    return factorial(n);
}

const ComplexCalculateExample = () => {
    const [value, setValue] = useState(100);
    const [anotherValue, setAnotherValue] = useState(false);

    const btnColor = anotherValue ? "primary" : "secondary";

    const fact = useMemo(() => runFactorial(value), [value]);
    useEffect(() => {
        console.log("render butt color");
    }, [btnColor]);
    return (
        <>
            <CardWrapper>
                <SmallTitle>Кэширование сложных вычислений</SmallTitle>
                <p>Value: {value}</p>
                <p>Result: {fact}</p>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue((prevState) => prevState + 10)}
                >
                    Increment
                </button>
                <button
                    className="btn btn-primary mx-2"
                    onClick={() => setValue((prevState) => prevState - 10)}
                >
                    Decrement
                </button>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>Зависимость от сторонних setState</SmallTitle>
                <button
                    className={`btn m-2 btn-${btnColor}`}
                    onClick={() => setAnotherValue((prevState) => !prevState)}
                >
                    Change another
                </button>
            </CardWrapper>
        </>
    );
};

export default ComplexCalculateExample;
