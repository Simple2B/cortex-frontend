import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Client, clientApi, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';
import './intake.css';
import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';
import Arousal from '../Dashboard/Arousal';
import BrainWaves from '../Dashboard/BrainWaves';
import Coherence from '../Dashboard/Coherence';


export function Notes(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  console.log("Care Plane -> api_key", api_key);
  const [client, setClient] = useState<Client>(ClientDefault);

  const [ dashboard, setDashboard] = useState<string>("coherence");

  const [activeBtn, setActiveBtn] = useState("Preset");

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

  const handleChangeBtn = (e: any) => {
    setActiveBtn(e.currentTarget.innerHTML);
  };

  return (
    <>
      <div className="coherence">
        <div className="containerCoherence">

            {
            dashboard === 'arousal' && <Arousal/>
            ||
            dashboard === 'brainWaves' && <BrainWaves />
            ||
            dashboard === 'coherence' && <Coherence />
            }

        </div>

        <div className="coherenceBtn">
            <div className="coherenceBtn_circles">
              <div className={`${dashboard === 'arousal' ? "coherenceBtn_circleActive" : "coherenceBtn_circle"}`} onClick={() => setDashboard("arousal")}></div>
              <div className={`${dashboard === 'brainWaves' ? "coherenceBtn_circleActive" : "coherenceBtn_circle"}`} onClick={() => setDashboard("brainWaves")}></div>
              <div className={`${dashboard === 'coherence' ? "coherenceBtn_circleActive" : "coherenceBtn_circle"}`} onClick={() => setDashboard("coherence")}></div>
            </div>
            <div className="coherenceBtn_complete"
                onClick={() => {
                  clientApi.completeClient({"api_key": api_key,
                  "rougue_mode": false, "place_in_queue": client.place_in_queue});
                  history.push('/queue');
                  console.log("client" , {"api_key": api_key,
                  "rougue_mode": false, "first_name": client.firstName, "place_in_queue": client.place_in_queue})
              }}
            >
              Complete
            </div>
        </div>
      </div>
      <div className="intakeInfo">
        <div className="intakeInfoText">
          <div className="intakeInfoText_health notesInfoText">
            <div className="intakeInfoText_healthTitle">Notes</div>
            <div className="notesInfo">

              <div className="notesInfo_item">
                <div className="title">Increase H2O</div>
                <div className="text"></div>
              </div>

              <div className="notesInfo_item">
                <div className="title">Stretch hamstrings</div>
                <div className="text"></div>
              </div>

              <div className="notesInfo_item">
                <div className="title">Spinal exercises</div>
                <div className="text"></div>
              </div>

            </div>
            <div className="notesBtnAdd">
                <svg id="plus-symbol-button" xmlns="http://www.w3.org/2000/svg" width="30.957" height="30.957" viewBox="0 0 30.957 30.957">
                    <path id="Path_1148" data-name="Path 1148" d="M30.957,12.526v5.905a.805.805,0,0,1-.805.805H19.236V30.152a.805.805,0,0,1-.805.805H12.526a.805.805,0,0,1-.805-.805V19.236H.805A.805.805,0,0,1,0,18.431V12.526a.805.805,0,0,1,.805-.805H11.721V.805A.805.805,0,0,1,12.526,0h5.905a.805.805,0,0,1,.805.805V11.721H30.152A.805.805,0,0,1,30.957,12.526Z" fill="#fff"/>
                </svg>
                <div className="text">Add new</div>
            </div>
            <div className="notesBtnToggle">
                <div onClick={handleChangeBtn} className={activeBtn == "Preset" ? "btnActive" : "btn"}>Preset</div>
                <div onClick={handleChangeBtn} className={activeBtn == "Manual" ? "btnActive" : "btn"}>Manual</div>
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
