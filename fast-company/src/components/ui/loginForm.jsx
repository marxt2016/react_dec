import React, { useEffect, useState } from "react";
// import { useAuth } from "../../hooks/useAuth";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/users";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", passw: "", stayOn: true });
    const history = useHistory();
    const [enterError, setEnterError] = useState(null);
    const [errors, setErrors] = useState({});
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        setEnterError(null);
    };
    // const { signIn } = useAuth();
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        const redirect = history.location.state ? history.location.state.from.pathname : "/";
        if (!isValid) return;
        dispatch(logIn({ payload: data, redirect }));

        // try {
        //     await signIn(data);
        //     history.push(history.location.state ? history.location.state.from.pathname : "/");
        // } catch (error) {
        //     setEnterError(error.message);
        // }
    };
    const isValid = Object.keys(errors).length === 0;
    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required" }
        },
        passw: {
            isRequired: { message: "Password is required" }
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
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid || enterError}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
