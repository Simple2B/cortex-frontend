import React, { ReactElement } from 'react';
import "./dashboard.sass";
import arrowRight  from "../../../images/arrowRight.svg";
import  arrowLeft  from "../../../images/arrowLeft.svg";
import brainWaves from "../../../images/brainWaves.svg";


export default function BrainWaves(): ReactElement {

  return (
    <div className="containerDashboard">
        <div className="title">Brain Waves</div>
        <div className="overAroused">
            <div className="overAroused_content">
                {/* <div className="arrowLeft">
                    <img src={arrowLeft} alt="arrowLeft" />
                </div> */}
                <div className="nameDashboard">
                    <img src={brainWaves} alt="brainWaves" />
                </div>
                {/* <div className="arrowRight">
                    <img src={arrowRight} alt="arrowRight" />
                </div> */}
            </div>
        </div>
    </div>
  )
}
