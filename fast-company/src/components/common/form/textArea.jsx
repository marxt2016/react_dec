import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, name, value, onChange, error, placeholder, rows }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    rows={rows}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextArea.defaultProps = {
    type: "text"
};

TextArea.propTypes = {
    label: PropTypes.string,
    rows: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};
export default TextArea;
