import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ViewReport.sass";
import DatePicker from "react-datepicker";
import Select, { components } from "react-select";
import { ReactComponent as Arrow } from "../../../images/arrow.svg";
import { Client, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";

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
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    border: "1px solid #fff",
    background: "black",
    fontSize: "25px",
    color: "white",
    padding: 20,
  }),

  control: () => ({
    position: "relative",
    width: 290,
    height: 61,
  }),

  menu: () => ({
    background: "black",
    marginTop: "-12px",
  }),

  valueContainer: () => ({
    position: "relative",
    border: "1px solid #aef7ff",
    fontSize: "25px",
    color: "#aef7ff",
    borderRadius: "10px",
    zIndex: "100",
    background: "black",
  }),

  indicatorsContainer: () => ({
    position: "absolute",
    zIndex: "1000",
    top: "20px",
    right: "20px",
  }),

  input: () => ({
    height: 61,
    paddingLeft: "20px",
    lineHeight: "61px",
  }),

  placeholder: () => ({
    paddingLeft: "20px",
    position: "absolute",
    lineHeight: "61px",
  }),

  singleValue: (provided: any, state: { isDisabled: any }) => {
    const transition = "opacity 300ms";
    const color = "#aef7ff";
    const fontSize = "25px";
    const paddingLeft = "20px";

    return { ...provided, transition, color, fontSize, paddingLeft };
  },
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow />
    </components.DropdownIndicator>
  );
};

export default function ViewReport(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);

  const [activeBtn, setActiveBtn] = useState<string>("Brain");

  const [typeCaraPlan, setTypeCaraPlan] = useState<any>(null);
  const [typeFrequency, setTypeFrequency] = useState<any>(null);
  const [typeProgressTest, setTypeProgressTest] = useState<any>(null);
  const [file, setFile] = useState<string | any>(null);

  const optionsCarePlane = [
    { value: "Care plan option", label: "Care plan option" },
    { value: "Care plan option", label: "Care plan option" },
    { value: "Care plan option", label: "Care plan option" },
    { value: "Care plan option", label: "Care plan option" },
    { value: "Care plan option", label: "Care plan option" },
  ];

  const optionsFrequency = [
    { value: "Frequency option", label: "Frequency option" },
    { value: "Frequency option", label: "Frequency option" },
    { value: "Frequency option", label: "Frequency option" },
    { value: "Frequency option", label: "Frequency option" },
    { value: "Frequency option", label: "Frequency option" },
  ];

  const optionsProgressTest = [
    { value: "Progress option", label: "Progress option" },
    { value: "Progress option", label: "Progress option" },
    { value: "Progress option", label: "Progress option" },
    { value: "Progress option", label: "Progress option" },
    { value: "Progress option", label: "Progress option" },
  ];

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      console.log("GET: client_intake name => ", response.data);
      setClient(response.data);
      return response.data;
    } catch (error: any) {
      console.log(
        "GET: error message get_client_intake name =>  ",
        error.message
      );
      console.log(
        "error response data get_client_intake name => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
  }, [api_key]);

  const handleChangeBtn = (e: any) => {
    setActiveBtn(e.currentTarget.innerHTML);
  };

  const handleSelectCaraPlan = (type: string) => {
    setTypeCaraPlan(type);
  };

  const handleSelectFrequency = (type: string) => {
    setTypeFrequency(type);
  };

  const handleSelectProgressTest = (type: string) => {
    setTypeProgressTest(type);
  };

  return (
    <div className="containerViewReport">
      <div className="containerViewReport_report">
        {activeBtn === "Brain" && (
          <div className="containerViewReport_dashboards">
            <div className="exampleBrain">exampleBrain</div>
            <div className="patientBrain">patientBrain</div>
          </div>
        )}

        {activeBtn === "Brainwaves" && (
          <div className="containerViewReport_dashboards">
            <div className="containerDashboard">
              <div className="dashboard">dashboard</div>
              <div className="title">BETA</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">dashboard</div>
              <div className="title">SMR</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">dashboard</div>
              <div className="title">ALPHA</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">dashboard</div>
              <div className="title">THETA</div>
            </div>
          </div>
        )}

        {activeBtn === "HRV" && (
          <div className="containerViewReport_dashboards">
            <div className="containerDashboard">
              <div className="dashboard">dashboard</div>
              <div className="title">Very Low Frequency</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">dashboard</div>
              <div className="title">Low Frequency</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">dashboard</div>
              <div className="title">High Frequency</div>
            </div>
          </div>
        )}

        {activeBtn === "Care plan" && (
          <div className="containerViewReport_dashboards">
            <div className="reports">
              <div className="reportsGeneration">
                <div className="reportTypeSelector">
                  <Select
                    components={{ DropdownIndicator }}
                    placeholder={"Care plan"}
                    options={optionsCarePlane}
                    onChange={handleSelectCaraPlan}
                    styles={customStyles}
                    value={typeCaraPlan}
                  />
                </div>
                <div className="reportTypeSelector">
                  <Select
                    components={{ DropdownIndicator }}
                    placeholder={"Frequency"}
                    options={optionsFrequency}
                    onChange={handleSelectFrequency}
                    styles={customStyles}
                    value={typeFrequency}
                  />
                </div>
                <div className="reportTypeSelector">
                  <Select
                    components={{ DropdownIndicator }}
                    placeholder={"Progress Test"}
                    options={optionsProgressTest}
                    onChange={handleSelectProgressTest}
                    styles={customStyles}
                    value={typeProgressTest}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="containerViewReport_toggleBtn">
        <div
          onClick={handleChangeBtn}
          className={activeBtn === "Brain" ? "activeBtn" : "btn"}
        >
          Brain
        </div>
        <div
          onClick={handleChangeBtn}
          className={activeBtn === "Brainwaves" ? "activeBtn" : "btn"}
        >
          Brainwaves
        </div>
        <div
          onClick={handleChangeBtn}
          className={activeBtn === "HRV" ? "activeBtn" : "btn"}
        >
          HRV
        </div>
        <div
          onClick={handleChangeBtn}
          className={activeBtn === "Care plan" ? "activeBtn" : "btn"}
        >
          Care plan
        </div>
      </div>
    </div>
  );
}
