import React, { useEffect, useState } from "react";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
// import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useQualities } from "../../hooks/useQualities";

const RegisterForm = () => {
    // const [professions, setProfessions] = useState();

    // const [qualities, setQualities] = useState({});
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        passw: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const qualitiesList = qualities.map((quality) => ({ label: quality.name, value: quality._id }));
    const professionsList = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }));

    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfessions(data));
    //     api.qualities.fetchAll().then((data) => setQualities(data));
    // }, []);
    useEffect(() => validate(), [data]);
    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const { signUp } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((quality) => quality.value),
            password: data.passw
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };
    const isValid = Object.keys(errors).length === 0;
    const validatorConfig = {
        name: {
            isRequired: { message: "Name is required" },
            isMinimum: { message: "Name should have at least 3 characters", value: 3 }
        },
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Incorrect email" }
        },
        passw: {
            isRequired: { message: "Password is required" },
            isCapital: { message: "Password should have at least 1 Capital letter" },
            isDigit: { message: "Password should have at least 1 number" },
            isMinimum: { message: "Password should have at least 8 characters", value: 8 }
        },
        profession: {
            isRequired: { message: "Profession is required" }
        },
        licence: {
            isRequired: { message: "Confirm agreement with Terms and Conditions" }
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
                label="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
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
            <SelectField
                defaultOption="Choose..."
                options={professionsList}
                onChange={handleChange}
                error={errors.profession}
                value={data.profession}
                label="Profession"
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Qualities"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name={"licence"}
                error={errors.licence}
            >
                Accept <a>Terms and Conditions</a>
            </CheckBoxField>
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
