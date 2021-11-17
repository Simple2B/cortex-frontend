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

  return (
    <>
      <div className="accountReportStart_nameContainer_brain"></div>
    </>
  );
}
