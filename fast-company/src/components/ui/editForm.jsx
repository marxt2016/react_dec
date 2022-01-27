import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import Spinner from "../common/spinner";
import PropTypes from "prop-types";

const EditForm = ({ user, professions }) => {
    const [qualities, setQualities] = useState({});

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState();
    const history = useHistory();

    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    console.log(data);
    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };
    const getQualities = (elements) => {
        const qualArray = [];
        for (const elem in elements) {
            for (const quality in qualities) {
                if (elements[elem].value === qualities[quality]._id) {
                    qualArray.push(qualities[quality]);
                }
            }
        }
        return qualArray;
    };

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    api.qualities.fetchAll().then((data) => {
        setQualities(data);
    });

    useEffect(() => validate(), [data]);
    useEffect(() => {
        setIsLoading(true);

        setData((prevState) => ({
            ...prevState,
            ...user,
            qualities: transformData(user.qualities),
            profession: user.profession._id
        }));
    }, []);

    useEffect(() => {
        if (data._id) {
            setIsLoading(false);
        }
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        api.users.update(user._id, {
            ...data,
            profession: getProfessionById(data.profession),
            qualities: getQualities(data.qualities)
        });
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
    if (isLoading) {
        return <Spinner />;
    }
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
                defaultOption="Choose..."
                options={professions}
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
    user: PropTypes.object,
    professions: PropTypes.object
};

export default EditForm;
