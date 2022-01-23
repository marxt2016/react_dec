import React, { useRef } from "react";
import CollapseWrapper from "../common/collapse";
import Divider from "../common/divider";
const UseRefExercise = () => {
    const block = useRef();
    const handleClick = () => {
        block.current.style.type = "text";
        block.current.style.width = "80px";
        block.current.style.height = "150px";
        console.log(block.current);
    };
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть блок, у которого заданы ширина и высота. Добавьте
                кнопку, при нажатии которой изменятся следующие свойства:
            </p>
            <ul>
                <li>Изменится содержимое блока на &quot;text&quot;</li>
                <li>высота и ширина станут равны 150 и 80 соответственно</li>
            </ul>
            <Divider />
            <div
                className="bg-primary d-flex flex-row justify-content-center align-items-center rounded"
                style={{
                    height: 40,
                    width: 60,
                    color: "white"
                }}
                ref={block}
            >
                <small>Блок</small>
            </div>

            <button className="btn btn-secondary mt-2" onClick={handleClick}>
                Change Block
            </button>
        </CollapseWrapper>
    );
};

export default UseRefExercise;
