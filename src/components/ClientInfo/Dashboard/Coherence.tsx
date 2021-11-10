import React, { ReactElement } from 'react';
import "./dashboard.sass";
import arrowRight  from "../../../images/arrowRight.svg";
import  arrowLeft  from "../../../images/arrowLeft.svg";
import CoherenceDashboard from "../../../images/intake_dashboard.svg";


export default function Coherence(): ReactElement {

  return (
    <div className="containerDashboard">
        <div className="title">Coherence</div>
        <div className="overAroused">
            <div className="overAroused_content">
                {/* <div className="arrowLeft" >
                    <img src={arrowLeft} alt="arrowLeft" onClick={() => {}} />
                </div> */}
                <div className="nameDashboard">
                    <img src={CoherenceDashboard} alt="brainWaves" onClick={() => {}} />
                </div>
                {/* <div className="arrowRight">
                    <img src={arrowRight} alt="arrowRight" onClick={() => {}} />
                </div> */}
            </div>
        </div>
    </div>
  )
}
