import React, { ReactElement } from 'react';
import './intake.css';
import { NavLink } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';
import { ReactComponent as IntakeDashboard } from '../../images/intake_dashboard.svg';
import { ReactComponent as IntakeAlpha } from '../../images/intake_alpha.svg';


export default function Intake(): ReactElement {

  return (
    <>
        <NavBar />
        <MenuInfoPatient/>
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
                </div>
                <div className="results">

                </div>
                <div className="results">

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
