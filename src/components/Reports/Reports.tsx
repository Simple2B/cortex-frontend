import React, { ReactElement, useState } from 'react';
import NavBar from '../NavBar/NavBar';
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-modern-calendar-datepicker';
import DatePicker from "react-datepicker";
import { ReactComponent as Arrow } from '../../images/arrow.svg'

import "react-datepicker/dist/react-datepicker.css";
import './reports.sass'
import Select, { components } from 'react-select'
import { reportApi } from '../../api/reportApi';


interface IDataReport {
  startDate: Date;
  endDate: Date;
  type: string;
}

interface IDataReportToBack {
  startDate: string;
  endDate: string;
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
  const [type, setType] = useState<any>(null);

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
    const startMonth = data.startDate.getMonth() < 10 ? '0' + data.startDate.getMonth().toString() : data.startDate.getMonth().toString();
    const startDay = data.startDate.getDay() < 10 ? '0' + data.startDate.getDay().toString() : data.startDate.getDay().toString() ;
    const startFullYear = data.startDate.getFullYear().toString();

    const startHours = data.startDate.getHours() < 10 ? '0' + data.startDate.getHours().toString() : data.startDate.getHours().toString();
    const startMinutes = data.startDate.getMinutes() < 10 ? '0' + data.startDate.getMinutes().toString() : data.startDate.getMinutes().toString();
    const startSeconds = data.startDate.getSeconds() < 10 ? '0' + data.startDate.getSeconds().toString() : data.startDate.getSeconds().toString();
    const startDateToBack = `${startMonth}/${startDay}/${startFullYear}, ${startHours}/${startMinutes}/${startSeconds}`;
    console.log("start_date",  startDateToBack);

    const endMonth = data.endDate.getMonth() < 10 ? '0' + data.endDate.getMonth().toString() : data.endDate.getMonth().toString();
    const endDay = data.endDate.getDay() < 10 ? '0' + data.endDate.getDay().toString() : data.endDate.getDay().toString();
    const endFullYear = data.endDate.getFullYear();

    const endHours = data.endDate.getHours() < 10 ? '0' + data.endDate.getHours().toString() : data.endDate.getHours().toString();
    const endMinutes = data.endDate.getMinutes() < 10 ? '0' + data.endDate.getMinutes().toString() : data.endDate.getMinutes().toString();
    const endSeconds = data.endDate.getSeconds() < 10 ? '0' + data.endDate.getSeconds().toString() : data.endDate.getSeconds().toString();
    const endDateToBack = `${endMonth}/${endDay}/${endFullYear}, ${endHours}/${endMinutes}/${endSeconds}`;
    console.log("start_date",  endDateToBack);

    const typeString = Object.values(data.type)[0].toLowerCase()
    console.log("type", typeString);

    const dataToBack: IDataReportToBack = {
      type: typeString,
      startDate: startDateToBack,
      endDate: endDateToBack,
    };

    console.log("dataToBack", dataToBack);

    if (dataToBack.type === 'visits') {
      reportApi.filterDateToReportVisit(dataToBack)
    }
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
            <button onClick={handleSubmit} className="reportsButton" disabled={type === null}>
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
