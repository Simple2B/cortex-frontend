import React, { ReactElement } from 'react';
import "./dashboard.sass";
import arrowRight  from "../../../images/arrowRight.svg";
import  arrowLeft  from "../../../images/arrowLeft.svg";
import CoherenceDashboard from "../../../images/intake_dashboard.svg";


export default function Coherence(): ReactElement {

  return (
    <>
        <div className="title">Coherence</div>
        <div className="overAroused">
            <div className="overAroused_content">
                <div className="arrowLeft">
                    <img src={arrowLeft} alt="arrowLeft" />
                </div>
                <div className="nameDashboard">
                    <img src={CoherenceDashboard} alt="brainWaves" />
                </div>
                <div className="arrowRight">
                    <img src={arrowRight} alt="arrowRight" />
                </div>
            </div>
        </div>
    </>
  )
}
