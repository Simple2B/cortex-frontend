import React, { ReactElement, useEffect, useState } from 'react';

import { useLocation } from "react-router-dom";
import NavBar from '../../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { Client, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';
import "./name.css";
import arrowRight  from "../../../images/arrowRight.svg";
import  arrowLeft  from "../../../images/arrowLeft.svg";
import nameDashboard from "../../../images/nameDashboard.svg";
import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';
import { ReactComponent as Brain } from '../../../images/brain.svg';



export default function Name(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);

  const [activeBtnAtlas, setActiveBtnAtlas] = useState("X");
  const [activeBtnShortLeg, setActiveBtnShortLeg] = useState("R");
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("on");

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
        <NavBar />
        <MenuInfoPatient api_key={api_key} firstName={client.firstName}/>

        <div className="nameContainer">
            <div className="nameContainer_arousal">

                <div className="title">Arousal</div>
                <div className="overAroused">
                    <div className="overAroused_tittle">
                        OVER AROUSED
                    </div>
                    <div className="overAroused_content">
                      <div className="arrowLeft">
                        <img src={arrowLeft} alt="arrowLeft" />
                      </div>

                      <div className="nameDashboard">
                        <img src={nameDashboard} alt="nameDashboard" />
                      </div>

                      <div className="arrowRight">
                        <img src={arrowRight} alt="arrowRight" />
                      </div>
                    </div>
                </div>
                <div className="containerComplete">
                  <div className="btn_circles">
                    <div className="btn_circle"></div>
                    <div className="btn_circle"></div>
                    <div className="btn_circle btn_circleActive"></div>
                  </div>
                  <div className="coherenceBtn_complete">
                    Complete
                  </div>
                </div>
            </div>

            <div className="nameContainer_brain">

              <div className="nameContainer_brainContent">
                <div className="btns">
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

                <div className=""></div>
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
