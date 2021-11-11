import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Client, clientApi, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';
import './intake.css';
import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';
import Arousal from '../Dashboard/Arousal';
import BrainWaves from '../Dashboard/BrainWaves';
import Coherence from '../Dashboard/Coherence';
import Dashboards from '../Dashboard/Dashboards';


export function CarePlane(props: {activeBtnRogueMode: string}): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  console.log("Care Plane -> api_key", api_key);
  const [client, setClient] = useState<Client>(ClientDefault);

  const [ dashboard, setDashboard] = useState<string>("arousal");

  const history = useHistory();

  const getClient = async () => {
    try {
      const response = await instance()
      .get(`api/client/client_intake/${api_key}`);
      console.log("GET: client_intake => ", response.data);
      setClient(response.data);
      return response.data;
    } catch (error: any) {
      console.log('GET: error message get_client_intake =>  ', error.message);
      console.log('error response data get_client_intake => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClient()
  }, [api_key]);

  return (
    <>
      <Dashboards activeBtnRogueMode={props.activeBtnRogueMode}/>

      <div className="intakeInfo">
        <div className="intakeInfoText">
          <div className="intakeInfoText_health carePlaneInfoText">
            <div className="intakeInfoText_healthTitle carePlaneTitle">Care Plane</div>
            <div className="carePlaneInfo">

              <div className="carePlaneInfo_item">
                <div className="title">First Visit:</div>
                <div className="text"></div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Last Visit:</div>
                <div className="text"></div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Total Visits:</div>
                <div className="text"></div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Care plan length:</div>
                <div className="text"></div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Visit Frequency:</div>
                <div className="text"></div>
              </div>

              <div className="carePlaneInfo_item">
                <div className="title">Expiration: </div>
                <div></div>
              </div>

            </div>
          </div>
          <div className="intakeInfoText_results">
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
          </div>
        </div>
        <div className="intakeInfoAlpha">
          <div className="intakeInfoAlpha_text">
            Alpha
          </div>
          <div className="intakeInfoAlpha_letters">
            <div className="letter">R</div>
            <div className="letter">L</div>
          </div>
          <div className="intakeInfoAlpha_dashboard">
            <IntakeAlpha/>
          </div>
        </div>
      </div>
    </>
  )
};
