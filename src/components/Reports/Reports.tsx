import React, { ReactElement, useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { CSVDownload, CSVLink } from "react-csv";
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
  const [startDate, setStartDate] = useState<Date | any>(null);
  const [endDate, setEndDate] = useState<Date | any>(null);
  const [type, setType] = useState<any>(null);
  const [file, setFile] = useState<string | any>(null);

  const [isOpenModal, setIsOpenModel] = useState(false);

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
      const data = await response.data;
      setFile(data);
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
      const data = await response.data
      setFile(data);
    } catch (error: any) {
      console.log('GET: error message (file new_clients)=>  ', new Error(error.message));
      throw new Error(error.message);
    }
  };

  const filterDateForReport = () => {

    const data: IDataReport = {
      type: type,
      startDate: startDate,
      endDate: endDate,
    };

    const fullStartDate = data.startDate.toISOString().replace("T", " ").replace(".", " ").split(" ");
    const dStart = fullStartDate[0].split("-");

    const fullTime = fullStartDate[1];
    const startDateToBack = `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`

    const fullEndDate = data.endDate.toISOString().replace("T", " ").replace(".", " ").split(" ");
    const dEnd = fullEndDate[0].split("-");

    const fullTimeEnd = fullEndDate[1];
    const endDateToBack = `${dEnd[1]}/${dEnd[2]}/${dEnd[0]}, ${fullTimeEnd}`
    const typeString = Object.values(data.type)[0].toLowerCase();
    // setType(typeString);


    const dataToBack: IDataReportToBack = {
      type: typeString,
      startDate: startDateToBack,
      endDate: endDateToBack,
    };

    if (dataToBack.type === 'visits') {
      reportApi.filterDateToReportVisit(dataToBack);
    };

    if (dataToBack.type === 'new_clients') {
      reportApi.filterDateToReportNewClients(dataToBack);
    };
  }

  useEffect(() => {
    setType(type);
    setStartDate(startDate);
    setEndDate(endDate);
    setFile(file);
    if (startDate && endDate) {
        filterDateForReport()
    };
  }, [type, startDate, endDate, file]);

  useEffect(() => {
    setIsOpenModel(isOpenModal)
  }, [isOpenModal]);

  const handleSubmit = () => {
    if (type && type.value.toLowerCase() === 'visits') {
      getFileWithVisits();
    };
    if (type && type.value.toLowerCase() === 'new_clients') {
      getFileWithNewClients();
        // alert(`There are no new clients during this period ${startDateToBack} - ${endDateToBack}`);
        // console.log("There are no new clients during this period")
    };
    setIsOpenModel(true);
  };

  const handleSelect = (type: string) => {
    setType(type)
  };
  if (file) {
    console.log("file", file.length);
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
                <button
                  onClick={handleSubmit}
                  className={`${!type || !startDate || !endDate ? "reportsButtonDisabled" : "reportsButton"}`}
                  disabled={!type || !startDate || !endDate}>
                    <span className="text">Generate</span>
                </button>
          </div>
        </div>
      </div>

      <div className={isOpenModal ? "modalOpen" : "modal"}>
        <div className="modal-content">
            <span className="close" onClick={() => setIsOpenModel(false)}>&times;</span>
              {
                type.value === 'visits' &&
                <div className="modalText">
                    { file.length > 42
                      ? `Download a report for the period ${startDate.toISOString().replace("T", " ").replace(".", " ").split(" ")[0].replace(",", "/")}  ${endDate.toISOString().replace("T", " ").replace(".", " ").split(" ")[0].replace(",", "/")}`
                      : `There are no visits during this period ${startDate.toISOString().replace("T", " ").replace(".", " ").split(" ")[0].replace(",", "/")}   ${endDate.toISOString().replace("T", " ").replace(".", " ").split(" ")[0].replace(",", "/")}`
                    }
                </div>
              }
            <div className="btnsModal">
              <div className="btnModalOk">
                  {
                    file
                      &&
                    <CSVLink
                      className="csvLink"
                      data={file}
                      filename={`${type.value.toLowerCase() + "_" + new Date().toLocaleDateString("en-US")}.csv`}
                      target="_blank"
                    >
                      Ok
                    </CSVLink>
                  }
              </div>
              <div onClick={() => setIsOpenModel(false)}>Cancel</div>
            </div>
        </div>
      </div>
    </>
  )
}
