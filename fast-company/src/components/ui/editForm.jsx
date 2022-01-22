import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";

const EditForm = ({ user }) => {
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const [data, setData] = useState({
        email: user.email,
        name: user.name,
        profession: user.profession,
        sex: user.sex,
        qualities: [...user.qualities]
    });
    useEffect(() => validate(), [data]);
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        console.log(professions);
        if (target.name === "profession") {
            const key = Object.keys(professions).filter(
                (professionName) => target.value === professions[professionName]._id
            );
            console.log(key[0]);
            setData((prevState) => ({ ...prevState, [target.name]: professions[key[0]] }));
            //    { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" };
        } else {
            setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        api.users.update(user._id, data);
        history.replace(`/users/${user._id}`);
    };
    const isValid = Object.keys(errors).length === 0;
    const validatorConfig = {
        name: {
            isRequired: { message: "Name is required" }
        },
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Incorrect email" }
        },
        profession: {
            isRequired: { message: "Profession is required" }
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
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />

            <SelectField
                defaultOption={data.profession.name}
                options={professions}
                onChange={handleChange}
                error={errors.profession}
                value={data.profession.name}
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
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Qualities"
            />
            <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

EditForm.propTypes = {
    id: PropTypes.string,
    user: PropTypes.object
};

export default EditForm;
