import React, { ReactElement, useEffect, useState } from 'react';
import './intake.css';
import { useLocation } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { instance } from "../../api/axiosInstance";
import { ReactComponent as IntakeDashboard } from '../../images/intake_dashboard.svg';
import { ReactComponent as IntakeAlpha } from '../../images/intake_alpha.svg';

interface Client {
  api_key: string,
  firstName: string,
  lastName: string,
  birthday: string,
  address: string,
  city: string,
  state: string,
  zip: number,
  phone: string,
  email: string,
  referring: string,
  // conditions: list[str]
  otherCondition: string,
  // diseases: list[str]
  medications: string,
  covidTestedPositive: boolean | null,
  covidVaccine:  boolean | null,
  stressfulLevel: number,
  consentMinorChild: boolean,
  relationshipChild: string,
}

const ClientDefault = {
  api_key: "",
  firstName: "",
  lastName: "",
  birthday: "",
  address: "",
  city: "",
  state: "",
  zip: 0,
  phone: "",
  email: "",
  referring: "",
  // conditions: list[str]
  otherCondition: "",
  // diseases: list[str]
  medications: "",
  covidTestedPositive: null,
  covidVaccine:  null,
  stressfulLevel: 0,
  consentMinorChild: false,
  relationshipChild: "",
}


export default function Intake(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 1];
  const [client, setClient] = useState<Client>(ClientDefault);

  const getClients = async () => {
    try {
      const response = await instance()
      .get('api/client/clients_intake');
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].api_key === api_key) {
          console.log("response.data[i] => ", response.data[i])
          let client_db = response.data[i]
          setClient(client_db)
        }
      }
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', error.message);
      console.log('error response data clients => ', error.response.data);
      throw new Error(error.message);
    };
  };

  useEffect(() => {
    getClients();
  }, []);

  console.log("client intake => ", client)

  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} name={client.firstName}/>
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
                <div className="clientIntakeInfo">
                  <div>Referring: {client.referring},</div>
                  <div>Other condition: {client.otherCondition},</div>
                  <div>Medications: {client.medications},</div>
                  <div>Covid tested: {client.covidTestedPositive},</div>
                  <div>Covid vaccine:  {client.covidVaccine},</div>
                  <div>Stressfull level: {client.stressfulLevel},</div>
                  <div>Consent minor child: {client.consentMinorChild},</div>
                  <div>Relationship child: {client.relationshipChild},</div>
                </div>
                <div className="intakeInfoText_healthBtn">
                  <div className="intake_btn">
                    Consult
                  </div>
                  <div className="intake_btn intake_btnActive">
                    Health HX
                  </div>
                  <div className="intake_btn">
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
