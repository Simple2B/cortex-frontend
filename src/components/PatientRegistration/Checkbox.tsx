import React, { ReactElement } from 'react'

type MyProps = {
    handleCheckboxChange: Function;
    label: string;
    checked: boolean;
  };

export default function Checkbox(props: MyProps): ReactElement {

  const toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = props;

    handleCheckboxChange(label);
  }

    const { label, checked } = props;

    return (
      <div className="checkboxRegisterForms">
        <label className="container">
          <input
            type="checkbox"
            value={label}
            checked={checked}
            onChange={toggleCheckboxChange}
          />

          <span className="checkMark"></span>

          {label}
        </label>
      </div>

    );
}
