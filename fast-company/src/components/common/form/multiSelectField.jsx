import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <Select
                className="basic-multi-select"
                classNamePrefix="select"
                closeMenuOnSelect={false}
                // defaultValue={
                //     defaultValue.length > 0
                //         ? defaultValue.map((value) => {
                //               return { label: value.name, value: value._id };
                //           })
                //         : defaultValue
                // }
                defaultValue={defaultValue}
                isMulti
                options={optionsArray}
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default MultiSelectField;
