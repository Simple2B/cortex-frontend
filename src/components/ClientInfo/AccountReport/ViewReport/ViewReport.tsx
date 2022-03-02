import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./ViewReport.sass";
import { Client, clientApi, ClientDefault } from "../../../../api/clientApi";
import { instance } from "../../../../api/axiosInstance";
import DashboardBeta from "./DashboardsBrainWaves/DashboardBeta";
import DashboardSMR from "./DashboardsBrainWaves/DashboardSMR";
import DashboardAlpha from "./DashboardsBrainWaves/DashboardAlpha";
import DashboardTheta from "./DashboardsBrainWaves/DashboardTheta";
import DashboardVeryLowFrequency from "./DashboardsHRV/DashboardVeryLowFrequency";
import DashboardLowFrequency from "./DashboardsHRV/DashboardLowFrequency";
import DashboardHightFrequency from "./DashboardsHRV/DashboardHightFrequency";
import { CortexShowDonut } from "../../../Brain/CortexShowDown";
import { ShowDonut } from "../../../Brain/ShowDown";

interface ITest {
  id: null | number;
  date: string;
  client_name: string;
  doctor_name: string;
  care_plan_id: null | number;
  care_plan: string;
  frequency: string;
}

interface INameCarePlan {
  number: null | number;
  care_plan: string;
}

interface INameFrequency {
  number: null | number;
  frequency: string;
}

export default function ViewReport(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);
  const [activeBtn, setActiveBtn] = useState<string>("Brain");
  const [test, setTest] = useState<ITest>({
    id: null,
    date: "",
    client_name: "",
    doctor_name: "",
    care_plan_id: null,
    care_plan: "",
    frequency: "",
  });

  const [typeCaraPlan, setTypeCaraPlan] = useState<string>("");
  const [typeFrequency, setTypeFrequency] = useState<string>("");

  const [date, setDate] = useState<any>(null);
  const [carePlan, setCarePlan] = useState({
    date: "",
    care_plan: "",
    frequency: "",
    client_id: null,
    doctor_id: null,
  });

  const [progressTestDate, setProgressTestDate] = useState<string | null>(null);
  const test_id = splitLocation[splitLocation.length - 1].split("_")[2];
  const [carePlanNames, setCarePlanNames] = useState<Array<INameCarePlan>>([
    {
      number: null,
      care_plan: "",
    },
  ]);
  const [frequencyNames, setFrequencyNames] = useState<Array<INameFrequency>>([
    {
      number: null,
      frequency: "",
    },
  ]);

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      setClient(response.data);
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

  const getTest = async () => {
    try {
      const response = await instance().get(`api/test/test/${test_id}`);
      setTest(response.data);
      if (response.data.care_plan && response.data.frequency) {
        setTypeCaraPlan(response.data.care_plan);
        setTypeFrequency(response.data.frequency);
      }
    } catch (error: any) {
      console.log("GET: error message getTest =>  ", error.message);
      console.log("error response data getTest => ", error.response.data);
      throw new Error(error.message);
    }
  };

  const getCarePlanNames = async () => {
    try {
      const response = await instance().get("api/test/care_plan_names");
      setCarePlanNames(response.data);
    } catch (error: any) {
      console.log("GET: error message getCarePlanNames =>  ", error.message);
      console.log(
        "error response data getCarePlanNames => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  const getFrequencyNames = async () => {
    try {
      const response = await instance().get(`api/test/frequency_names`);
      setFrequencyNames(response.data);
    } catch (error: any) {
      console.log("GET: error message getFrequencyNames =>  ", error.message);
      console.log(
        "error response data getFrequencyNames => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getFrequencyNames();
    getCarePlanNames();
    getClient();
  }, []);

  useEffect(() => {
    getTest();
  }, [test_id]);

  const handleChangeBtn = (e: any) => {
    setActiveBtn(e.currentTarget.innerHTML);
  };

  useEffect(() => {
    if (date) {
      // console.log("!!!!!!!date => ", date);
      const testDate = new Date(
        date.toString().replace(/GMT.*$/, "GMT+0000")
      ).toISOString();
      const fullStartDate = testDate
        .replace("T", " ")
        .replace(".", " ")
        .split(" ");
      const dStart = fullStartDate[0].split("-");
      const fullTime = fullStartDate[1];
      const progressTestDate = `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`;

      setProgressTestDate(progressTestDate);
    }
  }, [date]);

  const handleCompleteCarePlan = () => {
    const postCarePlanInfo = async () => {
      const carePlan = await clientApi.putInfoToCarePlan({
        test_id: Number(test_id),
        api_key: api_key,
        progress_date: progressTestDate,
        care_plan: typeCaraPlan,
        frequency: typeFrequency,
      });
      setCarePlan(carePlan);
    };
    postCarePlanInfo();

    setTypeCaraPlan("");
    setTypeFrequency("");
    setDate(null);
  };

  return (
    <div className="containerViewReport">
      <div className="containerViewReport_report">
        {activeBtn === "Brain" && (
          <div className="containerViewReport_dashboards">
            <div className="exampleBrain">
              <CortexShowDonut />
            </div>
            <div className="patientBrain">
              <ShowDonut />
            </div>
          </div>
        )}

        {activeBtn === "Brainwaves" && (
          <div className="containerViewReport_dashboards">
            <div className="containerDashboard">
              <div className="dashboard">
                <DashboardBeta />
              </div>
              <div className="title">BETA</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">
                <DashboardSMR />
              </div>
              <div className="title">SMR</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">
                <DashboardAlpha />
              </div>
              <div className="title">ALPHA</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">
                <DashboardTheta />
              </div>
              <div className="title">THETA</div>
            </div>
          </div>
        )}

        {activeBtn === "HRV" && (
          <div className="containerViewReport_dashboards">
            <div className="containerDashboard">
              <div className="dashboard">
                <DashboardVeryLowFrequency />
              </div>
              <div className="title">Very Low Frequency</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">
                <DashboardLowFrequency />
              </div>
              <div className="title">Low Frequency</div>
            </div>
            <div className="containerDashboard">
              <div className="dashboard">
                <DashboardHightFrequency />
              </div>
              <div className="title">High Frequency</div>
            </div>
          </div>
        )}

        {activeBtn === "Care plan" && (
          <div className="containerViewReport_dashboards">
            <div className="reports">
              <div className="reportsGeneration">
                <div className="reportTypeSelector">
                  <input
                    type="text"
                    className="dataInput"
                    placeholder="Care plan"
                    value={typeCaraPlan}
                    onChange={(e) => setTypeCaraPlan(e.target.value)}
                  />
                  {carePlanNames.length > 1 && (
                    <div className="reportTypeSelector_names">
                      <div className="names">
                        {carePlanNames.map((name, index) => {
                          return (
                            <div
                              key={index}
                              onClick={(e) => {
                                setTypeCaraPlan(name.care_plan);
                              }}
                              className="name"
                            >
                              {name.care_plan}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="reportTypeSelector">
                  <input
                    type="text"
                    className="dataInput"
                    placeholder="Frequency"
                    value={typeFrequency}
                    onChange={(e) => setTypeFrequency(e.target.value)}
                  />
                  {frequencyNames.length > 1 && (
                    <div className="reportTypeSelector_names">
                      <div className="names">
                        {frequencyNames.map((name, index) => {
                          return (
                            <div
                              key={index}
                              onClick={(e) => {
                                setTypeFrequency(name.frequency);
                              }}
                              className="name"
                            >
                              {name.frequency}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="reportTypeSelector">
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    className="dataInput"
                    selected={date}
                    onChange={(data) => setDate(data)}
                    selectsEnd
                    // showTimeInput
                    startDate={date}
                    isClearable
                    placeholderText="Progress Test"
                  />
                </div>
              </div>
              <button
                onClick={handleCompleteCarePlan}
                className={`${
                  typeCaraPlan === "" || typeFrequency === ""
                    ? "btnReportsDisabled"
                    : "btnReports"
                }`}
                disabled={typeCaraPlan === "" || typeFrequency === ""}
              >
                Complete
              </button>
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
