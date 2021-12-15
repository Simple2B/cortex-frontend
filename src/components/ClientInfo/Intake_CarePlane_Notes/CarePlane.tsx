import React, { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Client, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";
import "./intake.css";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
import Dashboards from "../Dashboard/Dashboards";
import { Alpha } from "../Alpha/Alpha";

export function CarePlane(props: { activeBtnRogueMode: string }): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  console.log("Care Plane -> api_key", api_key);
  const [client, setClient] = useState<Client>(ClientDefault);

  const [carePlanInfo, setCarePlanInfo] = useState({
    first_visit: "",
    last_visit: "",
    total_visits: "",
    care_plan_length: "",
    visit_frequency: "",
    next_visit: "",
    expiration: "",
  });

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      console.log("GET: client_intake => ", response.data);
      setClient(response.data);
      return response.data;
    } catch (error: any) {
      console.log("GET: error message get_client_intake =>  ", error.message);
      console.log(
        "error response data get_client_intake => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  const getCarePlanInfo = async () => {
    try {
      const response = await instance().get(
        `api/test/info_for_care_plan_page/${api_key}`
      );
      console.log("GET: getCarePlanInfo => ", response);
      if (response.data) setCarePlanInfo(response.data);

      return response.data;
    } catch (error: any) {
      console.log("GET: error message getCarePlanInfo =>  ", error.message);
      console.log(
        "error response data getCarePlanInfo => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  console.log("CarePlane: carePlanInfo => ", carePlanInfo);

  useEffect(() => {
    getClient();
    getCarePlanInfo();
  }, [api_key]);

  return (
    <>
      <Dashboards activeBtnRogueMode={props.activeBtnRogueMode} />

      <div className="intakeInfo">
        <div className="intakeInfoText">
          <div className="intakeInfoText_health carePlaneInfoText">
            <div className="intakeInfoText_healthTitle carePlaneTitle">
              Care Plan
            </div>
            <div className="carePlaneInfo">
              <div className="carePlaneInfo_item">
                <div className="title">First Visit:</div>
                <div className="text">{carePlanInfo.first_visit}</div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Last Visit:</div>
                <div className="text">{carePlanInfo.last_visit}</div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Total Visits:</div>
                <div className="text">{carePlanInfo.total_visits}</div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Care plan length:</div>
                <div className="text">{carePlanInfo.care_plan_length}</div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Visit Frequency:</div>
                <div className="text">{carePlanInfo.visit_frequency}</div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Next progress test:</div>
                <div className="text">{carePlanInfo.next_visit}</div>
              </div>

              {/* <div className="carePlaneInfo_item">
                <div className="title">Expiration: </div>
                <div>{carePlanInfo.expiration}</div>
              </div> */}
            </div>
          </div>
          {/* <div className="intakeInfoText_results">
            <div className="results">
              <div>63bpm</div>
              <div>HR</div>
            </div>
            <div className="results">
              <div>10</div>
              <div>Resp</div>
            </div>
            <div className="results">
              <div>98%</div>
              <div>SpO2</div>
            </div>
          </div> */}
        </div>
        <Alpha />
      </div>
    </>
  );
}
