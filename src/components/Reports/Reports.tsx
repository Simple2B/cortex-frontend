import React, { ReactElement, useState } from 'react';
import NavBar from '../NavBar/NavBar';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-modern-calendar-datepicker';
import DatePicker from "react-datepicker";
import { ReactComponent as Arrow } from '../../images/arrow.svg'

import "react-datepicker/dist/react-datepicker.css";
import './reports.sass'
import Select, { components } from 'react-select'


interface IDataReport {
  startDate: Date;
  endDate: Date;
  type: string;
}

const customStyles: any = {
  option: (provided: any, state: { isSelected: any; }) => ({
    ...provided,
    border: '1px solid #fff',
    background: 'black',
    fontSize: '25px',
    color: 'white',
    padding: 20,
  }),

  control: () => ({
    position: 'relative',
    width: 290,
    height: 61
  }),

  menu: () => ({
    background: 'black',
    marginTop: '-12px',
  }),

  valueContainer: () => ({
    position: 'relative',
    border: '1px solid #aef7ff',
    fontSize: '25px',
    color: '#aef7ff',
    borderRadius: '10px',
    zIndex: '100',
    background: 'black',
  }),

  indicatorsContainer: () => ({
    position: 'absolute',
    zIndex: '1000',
    top: '20px',
    right: '20px'
  }),

  input: () => ({
    height: 61,
    paddingLeft: '20px',
    lineHeight: '61px'
  }),

  placeholder: () => ({
    paddingLeft: '20px',
    position: 'absolute',
    lineHeight: '61px'
  }),

  singleValue: (provided: any, state: { isDisabled: any; }) => {
    const transition = 'opacity 300ms';
    const color = '#aef7ff';
    const fontSize = '25px';
    const paddingLeft = '20px';

    return { ...provided, transition, color, fontSize, paddingLeft };
  }
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow />
    </components.DropdownIndicator>
  );
};

export default function Reports(): ReactElement {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [type, setType] = useState<any>(null)

  const options = [
    { value: 'Visits', label: 'Visits' },
    { value: 'New_clients', label: 'New clients' },
    { value: 'Revenue', label: 'Revenue' },
    { value: 'Client_export', label: 'Client export' },
    { value: 'Client_import', label: 'Client import' }
  ]

  const handleSubmit = () => {
    const data: IDataReport = {
      type: type,
      startDate: startDate,
      endDate: endDate,
    };
    console.log("report data", data);
  }

  const handleSelect = (type: string) => {
    setType(type)
  };

  return (
    <>
      <NavBar />
      <div className="reports">
        <h1 className="reportsTitle">Reports</h1>

        <div className="reportsGeneration">
          <div className="reportTypeSelector">
            <Select
              components={{ DropdownIndicator }}
              placeholder={'Select type'}
              options={options}
              onChange={handleSelect}
              styles={customStyles}
              value={type}
            />
          </div>
          <div className="reportsDateSelect">
            <div className="dates">
              <DatePicker
                dateFormat="MM/dd/yyyy h:mm aa"
                className="dataInput"
                selected={startDate}
                onChange={(data) => setStartDate(data)}
                selectsStart
                showTimeInput
                startDate={startDate}
                endDate={endDate}
                isClearable
                placeholderText="Start date"
                showMonthDropdown
              />
              <DatePicker
                dateFormat="MM/dd/yyyy h:mm aa"
                className="dataInput"
                selected={endDate}
                onChange={(data) => setEndDate(data)}
                selectsEnd
                showTimeInput
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                isClearable
                placeholderText="End date"
                showMonthDropdown
              />

            </div>
            <button onClick={handleSubmit} className="reportsButton">
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
