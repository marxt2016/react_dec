import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import SelectField from "./form/selectField";
import TextArea from "./form/textArea";

const AddNewComment = ({ users, onSubmit }) => {
    const [data, setData] = useState({ user: "", comment: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    useEffect(() => validate(), [data]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({ user: "", comment: "" });
        setErrors({});
    };

    const validatorConfig = {
        user: {
            isRequired: { message: "User is required" }
        },
        comment: {
            isRequired: { message: "Comment is required" }
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
        <div className="card mb-2">
            <div className="card-body">
                <h2>New comment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <SelectField
                            defaultOption="Choose user"
                            options={users}
                            onChange={handleChange}
                            value={data.user}
                            name="user"
                            error={errors.user}
                        />
                    </div>
                    <div className="mb-4">
                        <TextArea
                            label="Comment"
                            name="comment"
                            error={errors.comment}
                            value={data.comment}
                            onChange={handleChange}
                            placeholder="Please enter your comment"
                            rows="3"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
AddNewComment.propTypes = {
    users: PropTypes.array,
    onSubmit: PropTypes.func
};
export default AddNewComment;
