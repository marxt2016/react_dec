import React from "react";
import useMockdata from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockdata();
    const handleClick = () => {
        console.log("clicked");
        initialize();
    };

    return (
        <div className="container mt-2">
            <h1>Main</h1>
            <h3>Init data in Firebase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Initialize
            </button>
        </div>
    );
};

export default Main;
