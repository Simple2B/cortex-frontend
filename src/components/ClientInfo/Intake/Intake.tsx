import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import NavBar from '../../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { clientApi, Client } from '../../../api/clientApi';
import './intake.css';
import { ReactComponent as IntakeDashboard } from '../../../images/intake_dashboard.svg';
import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';



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
};


export default function Intake(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>();


  useEffect(() => {
    const clientDB = clientApi.getClient(api_key);
    // setClient(clientDB);
  }, []);

  console.log("client intake => ", client);

  console.log("location in ClientInfo => ", location.pathname);


  return (
    <>
        <NavBar />
        <MenuInfoPatient api_key={api_key} name={'client.firstName'}/>
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
                {/* <div className="clientIntakeInfo">
                  <div>Referring: {client.referring},</div>
                  <div>Other condition: {client.otherCondition},</div>
                  <div>Medications: {client.medications},</div>
                  <div>Covid tested: {client.covidTestedPositive},</div>
                  <div>Covid vaccine:  {client.covidVaccine},</div>
                  <div>Stressfull level: {client.stressfulLevel},</div>
                  <div>Consent minor child: {client.consentMinorChild},</div>
                  <div>Relationship child: {client.relationshipChild},</div>
                </div> */}
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
