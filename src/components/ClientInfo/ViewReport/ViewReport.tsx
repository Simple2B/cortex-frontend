import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ViewReport.sass";
import Dashboards from "../Dashboard/Dashboards";
import { Client, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";

export default function ViewReport(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);

  const [activeBtn, setActiveBtn] = useState<string>("Brainwaves");

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

  return (
    <div className="containerViewReport">
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
      <div className="containerViewReport_toggleBtn">
        <div
          onClick={handleChangeBtn}
          className={activeBtn == "Brainwaves" ? "activeBtn" : "btn"}
        >
          Brainwaves
        </div>
        <div
          onClick={handleChangeBtn}
          className={activeBtn == "HRV" ? "activeBtn" : "btn"}
        >
          HRV
        </div>
        <div
          onClick={handleChangeBtn}
          className={activeBtn == "Resp/HR/SpO2" ? "activeBtn" : "btn"}
        >
          Resp/HR/SpO2
        </div>
        <div
          onClick={handleChangeBtn}
          className={activeBtn == "Care plan" ? "activeBtn" : "btn"}
        >
          Care plan
        </div>
      </div>
    </div>
  );
}
