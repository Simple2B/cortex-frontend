import React from 'react';

type MyProps = {
    handleCheckboxChange: Function;
    label: string;
  };
  type MyState = {
    isChecked: boolean;
  };

class Checkbox extends React.Component<MyProps, MyState> {
  state: MyState = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkboxRegisterForms">
        <label className="container">
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />

          <span className="checkMark"></span>

          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;