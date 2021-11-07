import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Client, clientApi, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';
import "./name.sass";
import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';
import { ReactComponent as Brain } from '../../../images/brain.svg';
import Arousal from '../Dashboard/Arousal';
import BrainWaves from '../Dashboard/BrainWaves';
import Coherence from '../Dashboard/Coherence';


export default function Name(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);

  const [activeBtnAtlas, setActiveBtnAtlas] = useState("X");
  const [activeBtnShortLeg, setActiveBtnShortLeg] = useState("L");
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("off");

  const [ dashboard, setDashboard] = useState<string>("arousal");

  const history = useHistory();

  const getClient = async () => {
    try {
      const response = await instance()
      .get(`api/client/client_intake/${api_key}`);
      console.log("GET: client_intake name => ", response.data);
      setClient(response.data);
      return response.data
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message get_client_intake name =>  ', error.message);
      console.log('error response data get_client_intake name => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClient()
  }, []);

  useEffect(() => {
    setActiveBtnRogueMode(activeBtnRogueMode);
    if (activeBtnRogueMode === "on") {
      history.push('/nameOn');
    }
  }, [activeBtnRogueMode]);

  console.log("activeBtnRogueMode", activeBtnRogueMode);

  const handleChangeBtn = (e: any) => {
    setActiveBtnAtlas(e.currentTarget.innerHTML);
  };

  const handleChangeBtnShortLeg = (e: any) => {
    setActiveBtnShortLeg(e.currentTarget.innerHTML);
  };

  const handleChangeBtnRogueMode = (e: any) => {
    setActiveBtnRogueMode(e.currentTarget.innerHTML);
  };


  return (
    <>
        <div className="nameContainer">
            <div className="nameContainer_arousal">

                {
                    dashboard === 'arousal' && <Arousal/>
                    ||
                    dashboard === 'brainWaves' && <BrainWaves/>
                    ||
                    dashboard === 'coherence' && <Coherence/>
                }

                <div className="containerComplete">
                  <div className="btn_circles">
                    <div className={`${dashboard === 'arousal' ? "btn_circleActive" : "btn_circle"}`} onClick={() => setDashboard("arousal")}></div>
                    <div className={`${dashboard === 'brainWaves' ? "btn_circleActive" : "btn_circle"}`} onClick={() => setDashboard("brainWaves")}></div>
                    <div className={`${dashboard === 'coherence' ? "btn_circleActive" : "btn_circle"}`} onClick={() => setDashboard("coherence")}></div>
                  </div>
                  <div className="coherenceBtn_complete" onClick={() => {
                        clientApi.completeClient({"api_key": api_key,
                        "rougue_mode": false, "place_in_queue": client.place_in_queue});
                        history.push('/queue');
                        console.log("client" , {"api_key": api_key,
                        "rougue_mode": false, "first_name": client.firstName, "place_in_queue": client.place_in_queue})
                  }}>
                    Complete
                  </div>
                </div>
            </div>

            <div className="nameContainer_brain">

              <div className="nameContainer_brainContent">
                <div className="brain_btns">
                  <div className="btn">
                    <div className="btn_Title">Atlas</div>
                    <div className="btnContainer">
                      <div onClick={handleChangeBtn} className={activeBtnAtlas == "L" ? "btnActive" : "name_btn"}>L</div>
                      <div onClick={handleChangeBtn} className={activeBtnAtlas == "X" ? "btnActive" : "name_btn"}>X</div>
                      <div onClick={handleChangeBtn} className={activeBtnAtlas == "R" ? "btnActive" : "name_btn"}>R</div>
                    </div>
                  </div>
                  <div className="btn">
                    <div className="btn_Title">ShortLeg</div>
                    <div className="btnContainer">
                      <div onClick={handleChangeBtnShortLeg} className={activeBtnShortLeg == "L" ? "btnActive" : "name_btn"}>L</div>
                      <div onClick={handleChangeBtnShortLeg} className={activeBtnShortLeg == "X" ? "btnActive" : "name_btn"}>X</div>
                      <div onClick={handleChangeBtnShortLeg} className={activeBtnShortLeg == "R" ? "btnActive" : "name_btn"}>R</div>
                    </div>
                  </div>
                  <div className="btn containerRogueMode">
                    <div className="btn_Title titleRogueMode">Rogue Mode</div>
                    <div className="btnContainer btnRogueMode">
                      <div onClick={handleChangeBtnRogueMode} className={activeBtnRogueMode == "on" ? "btnActive" : "name_btn"}>on</div>
                      <div onClick={handleChangeBtnRogueMode} className={activeBtnRogueMode == "off" ? "btnActive" : "name_btn"}>off</div>
                    </div>
                  </div>
                </div>

                <div className="brain">
                    <Brain/>
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
              <div className="alphaContainer">
                <div className="alphaContainer_text">
                  Alpha
                </div>
                <div className="alphaContainer_letters">
                  <div className="letter">R</div>
                  <div className="letter">L</div>
                </div>
                <div className="alphaContainer_dashboard">
                  <IntakeAlpha/>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}
