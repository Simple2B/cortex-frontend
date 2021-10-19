import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import NavBar from '../../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { Client, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';
import './intake.css';
// import { clientApi } from "../../../api/clientApi";
import { ReactComponent as IntakeDashboard } from '../../../images/intake_dashboard.svg';
import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';


export default function Intake(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);
  const [activeBtn, setActiveBtn] = useState('');

  const getClient = async () => {
    try {
      const response = await instance()
      .get(`api/client/client_intake/${api_key}`);
      console.log("GET: client_intake => ", response.data);
      setClient(response.data);
      return response.data
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message get_client_intake =>  ', error.message);
      console.log('error response data get_client_intake => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClient()
  }, []);

  const handleChangeBtn = (e: any) => {
    setActiveBtn(e.currentTarget.innerHTML);
  }


  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} firstName={client.firstName}/>
        <div className="containerIntakeContent">
          <div className="coherence">
            <div className="coherenceTitleText">Coherence</div>
            <div className="coherenceDashboard">
                <IntakeDashboard/>
            </div>
            <div className="coherenceBtn">
              <div className="coherenceBtn_circles">
                <div className="coherenceBtn_circle"></div>
                <div className="coherenceBtn_circle"></div>
                <div className="coherenceBtn_circle coherenceBtn_circleActive"></div>
              </div>
              <div className="coherenceBtn_complete">
                Complete
              </div>
            </div>
          </div>
          <div className="intakeInfo">
            <div className="intakeInfoText">
              <div className="intakeInfoText_health">
                <i className="fas fa-times"/>
                <div className="intakeInfoText_healthTitle">Intake</div>
                <div className={activeBtn == "Health HX" ? "clientIntakeInfo" : "clientIntakeInfoBlock"}>
                  <div>Referring: <span className="clientIntakeInfo_item">{client.referring}</span></div>
                  <div>Other condition: <span className="clientIntakeInfo_item">{client.otherCondition}</span></div>
                  <div>Medications: <span className="clientIntakeInfo_item">{client.medications}</span></div>
                  <div>Covid tested: <span className="clientIntakeInfo_item">{client.covidTestedPositive}</span></div>
                  <div>Covid vaccine:  <span className="clientIntakeInfo_item">{client.covidVaccine}</span></div>
                  <div>Stressfull level: <span className="clientIntakeInfo_item">{client.stressfulLevel}</span></div>
                  <div>Consent minor child: <span className="clientIntakeInfo_item">{client.consentMinorChild}</span></div>
                  <div>Relationship child: <span className="clientIntakeInfo_item">{client.relationshipChild}</span></div>
                </div>

                <div className={activeBtn == "Family HX" ? "clientIntakeInfo" : "clientIntakeInfoBlock"}>
                  <div>Consent minor child: <span className="clientIntakeInfo_item">{client.consentMinorChild}</span></div>
                  <div>Relationship child: <span className="clientIntakeInfo_item">{client.relationshipChild}</span></div>
                </div>

                <div className={activeBtn == "Consult" ? "clientIntakeInfo" : "clientIntakeInfoBlock"}>
                  <div>Consult: <span className="clientIntakeInfo_item"></span></div>
                </div>

                <div className="intakeInfoText_healthBtn">
                  <div onClick={handleChangeBtn} className={activeBtn == "Consult" ? "intake_btnActive" : "intake_btn"}>
                    Consult
                  </div>
                  <div onClick={handleChangeBtn} className={activeBtn == "Health HX" ? "intake_btnActive" : "intake_btn"}>
                    Health HX
                  </div>
                  <div onClick={handleChangeBtn} className={activeBtn == "Family HX" ? "intake_btnActive" : "intake_btn"}>
                    Family HX
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
        </div>
    </>
  )
}
