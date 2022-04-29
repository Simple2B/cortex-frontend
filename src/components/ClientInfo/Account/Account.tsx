import React, {
  ReactElement,
  useEffect,
  useState,
} from "react";
import "./account.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import { Client, ClientDefault } from "../../../api/clientApi";
import sendArrow from "../../../images/icons8-arrow.png";
import AccountClientInfo from "./AccountClientInfo";
import AccountClientBilling from "./AccountClientBilling";
import AccountClientCarePlan from "./AccountClientCarePlan";


export default function Account(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);

  const [nextTestDate, setNextTestDate] = useState<Date | null>(null);

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      setClient(response.data);
    } catch (error: any) {
      console.log("GET: error message account =>  ", error.message);
      console.log("error response data account => ", error.response.data);
      throw new Error(error.message);
    }
  };

  const getCarePlanDate = async () => {
    try {
      const response = await instance().get(
        `api/test/care_plan_create/${api_key}`
      );
      console.log("GET: getCarePlan response.data =>  ", response);
      if (response.data && response.data.progress_date) {
        setNextTestDate(new Date(response.data.progress_date));
      }
    } catch (error: any) {
      console.log("GET: getCarePlan message =>  ", error.message);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
    getCarePlanDate();
  }, [api_key]);

  return (
    <>
      <div className="accountContainer">
        <AccountClientInfo client={client} nextTestDate={nextTestDate}/>
        <div className="visitHistory">
          <div className="clientInfo_tittle">Care Plan</div>
          <AccountClientCarePlan api_key={api_key}/>
        </div>
        <AccountClientBilling api_key={api_key} client={client}/>
      </div>
    </>
  );
}
