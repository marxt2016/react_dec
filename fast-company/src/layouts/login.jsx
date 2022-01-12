import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", passw: "" });
    const [errors, setErrors] = useState({});
    useEffect(() => validate(), [data]);
    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    const isValid = Object.keys(errors).length === 0;
    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Incorrect email" }
        },
        passw: {
            isRequired: { message: "Password is required" },
            isCapital: { message: "Password should have at least 1 Capital letter" },
            isDigit: { message: "Password should have at least 1 number" },
            isMinimum: { message: "Password should have at least 8 characters", value: 8 }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);

        for (const fieldName in data) {
            if (data[fieldName].trim() === "") {
                errors[fieldName] = `${fieldName} is required`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label="password"
                            type="password"
                            name="passw"
                            value={data.passw}
                            onChange={handleChange}
                            error={errors.passw}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
