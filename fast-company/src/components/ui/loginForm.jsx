import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", passw: "", stayOn: true });
    const history = useHistory();

    const [errors, setErrors] = useState({});
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const { signIn } = useAuth();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signIn(data);
            history.push(
                history.location.state.from.pathname ? history.location.state.from.pathname : "/"
            );
        } catch (error) {
            setErrors(error);
        }
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
            if (data[fieldName] === "") {
                errors[fieldName] = `${fieldName} is required`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
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
            <CheckBoxField value={data.stayOn} onChange={handleChange} name={"stayOn"}>
                Remain Logged In
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
