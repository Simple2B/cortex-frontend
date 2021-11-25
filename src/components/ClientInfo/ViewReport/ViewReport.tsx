import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./ViewReport.sass";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";

interface ITest {
  id: null | number;
  date: string;
  client_name: string;
  doctor_name: string;
  care_plan: string;
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
    client_name: "",
    date: "",
    doctor_name: "",
    care_plan: "",
    frequency: "",
  });

  const [typeCaraPlan, setTypeCaraPlan] = useState<string>("");
  const [typeFrequency, setTypeFrequency] = useState<string>("");

  const [date, setDate] = useState<any>(null);
  const [testWithCarePlan, setTestWithCarePlan] = useState();

  const test_id = splitLocation[splitLocation.length - 1].split("_")[2];
  console.log("test_id", Number(test_id));

  const [carePlanNames, setCarePlanNames] = useState();

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

  const getTest = async () => {
    try {
      const response = await instance().get(`api/test/test/${test_id}`);
      console.log("GET: getTest => ", response.data);
      setTest(response.data);
      return response.data;
    } catch (error: any) {
      console.log("GET: error message getTest =>  ", error.message);
      console.log("error response data getTest => ", error.response.data);
      throw new Error(error.message);
    }
  };

  const getCarePlanNames = async () => {
    try {
      const response = await instance().get(`api/test/care_plan_names`);
      console.log("GET: getCarePlanNames => ", response.data);
      setCarePlanNames(response.data);
      return response.data;
    } catch (error: any) {
      console.log("GET: error message getCarePlanNames =>  ", error.message);
      console.log(
        "error response data getCarePlanNames => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
    getCarePlanNames();
  }, [api_key]);

  console.log("carePlanNames", carePlanNames);

  useEffect(() => {
    getTest();
    setTypeCaraPlan(test.care_plan);
    setTypeFrequency(test.frequency);
  }, [test_id]);

  useEffect(() => {
    if (test.care_plan && test.frequency) {
      setTypeCaraPlan(test.care_plan);
      setTypeFrequency(test.frequency);
    }
  }, [test]);

  const handleChangeBtn = (e: any) => {
    setActiveBtn(e.currentTarget.innerHTML);
  };

  const dataForTest = {
    test_id: Number(test_id),
    api_key: api_key,
    care_plan: typeCaraPlan,
    frequency: typeFrequency,
  };

  useEffect(() => {
    if (typeCaraPlan !== "" && typeFrequency !== "" && test.care_plan) {
      const postCarePlanToTest = async () => {
        const test = await clientApi.putToTestInfoCarePlan(dataForTest);
        console.log("post care plan to test", test);
        setTestWithCarePlan(test);
      };
      postCarePlanToTest();
    }
  }, [typeCaraPlan, typeFrequency]);

  console.log("testWithCarePlan => ", testWithCarePlan);
  console.log("test with id=> ", test);

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
                  <input
                    type="text"
                    className="dataInput"
                    placeholder="Care plan"
                    value={typeCaraPlan}
                    onChange={(e) => setTypeCaraPlan(e.target.value)}
                  />
                </div>
                <div className="reportTypeSelector">
                  <input
                    type="text"
                    className="dataInput"
                    placeholder="Frequency"
                    value={typeFrequency}
                    onChange={(e) => setTypeFrequency(e.target.value)}
                  />
                </div>
                <div className="reportTypeSelector">
                  <DatePicker
                    dateFormat="MM/dd/yyyy h:mm aa"
                    className="dataInput"
                    selected={date}
                    onChange={(data) => setDate(data)}
                    selectsEnd
                    showTimeInput
                    startDate={date}
                    isClearable
                    placeholderText="Progress Test"
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
