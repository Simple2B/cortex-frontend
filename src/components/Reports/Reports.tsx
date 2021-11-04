import React, { ReactElement, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { CSVDownload } from "react-csv";
import DatePicker from "react-datepicker";
import { ReactComponent as Arrow } from '../../images/arrow.svg'

import "react-datepicker/dist/react-datepicker.css";
import './reports.sass'
import Select, { components } from 'react-select'
import { reportApi } from '../../api/reportApi';
import { instance } from '../../api/axiosInstance';


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
  const [startDate, setStartDate] = useState<any>(new Date);
  const [endDate, setEndDate] = useState<any>(new Date);
  const [type, setType] = useState<any>(null);
  const [fileVisits, setFileVisits] = useState<string | any>(null);

  const options = [
    { value: 'Visits', label: 'Visits' },
    { value: 'New_clients', label: 'New clients' },
    { value: 'Revenue', label: 'Revenue' },
    { value: 'Client_export', label: 'Client export' },
    { value: 'Client_import', label: 'Client import' }
  ];


  const getFileWithVisits = async () => {
    try {
      const response = await instance()
      .get('api/client/report_visit');
      console.log("GET: csv file with visits => ", response);
      setFileVisits(response.data);
    } catch (error: any) {
      console.log('GET: error message (file visits)=>  ', new Error(error.message));
      throw new Error(error.message);
    }
  };

  const getFileWithNewClients = async () => {
    try {
      const response = await instance()
      .get('api/client/report_new_clients');
      console.log("GET: csv file with new_clients => ", response);
      setFileVisits(response.data);
    } catch (error: any) {
      console.log('GET: error message (file new_clients)=>  ', new Error(error.message));
      throw new Error(error.message);
    }
  };

  const handleSubmit = () => {
    const data: IDataReport = {
      type: type,
      startDate: startDate,
      endDate: endDate,
    };

    const fullStartDate = data.startDate.toISOString().replace("T", " ").replace(".", " ").split(" ");
    const dStart = fullStartDate[0].split("-");
    console.log(dStart);
    console.log(fullStartDate[1]);

    const fullTime = fullStartDate[1];
    const startDateToBack = `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`
    console.log("startDateToBack ", startDateToBack);

    const fullEndDate = data.endDate.toISOString().replace("T", " ").replace(".", " ").split(" ");
    const dEnd = fullEndDate[0].split("-");
    console.log(dEnd);
    console.log(fullEndDate[1]);

    const fullTimeEnd = fullEndDate[1];
    const endDateToBack = `${dEnd[1]}/${dEnd[2]}/${dEnd[0]}, ${fullTimeEnd}`
    console.log("startDateToBack ", endDateToBack);

    const typeString = Object.values(data.type)[0].toLowerCase()
    console.log("type", typeString);

    const dataToBack: IDataReportToBack = {
      type: typeString,
      startDate: startDateToBack,
      endDate: endDateToBack,
    };

    if (dataToBack.type === 'visits') {
      reportApi.filterDateToReportVisit(dataToBack);
      if (fileVisits && fileVisits.length > 42) {
        getFileWithVisits();
      } else {
        alert(`No visits during this period ${startDateToBack} - ${endDateToBack}`);
        console.log("No visits for this date")
      }
    }

    if (dataToBack.type === 'new_clients') {
      reportApi.filterDateToReportNewClients(dataToBack);
      if (fileVisits && fileVisits.length > 132) {
        getFileWithNewClients();
      } else {
        alert(`There are no new clients during this period ${startDateToBack} - ${endDateToBack}`);
        console.log("There are no new clients during this period")
      }
    }
  };

  console.log("fileVisits", fileVisits);
  console.log("fileVisits length", fileVisits && fileVisits.length);

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
              />

            </div>
            <button onClick={handleSubmit} className={`${type === null ? "reportsButtonDisabled" : "reportsButton"}`} disabled={type === null}>
              Generate
              { fileVisits && <CSVDownload data={fileVisits} target="_blank" />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
