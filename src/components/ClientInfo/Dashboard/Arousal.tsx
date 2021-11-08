import React, { ReactElement } from 'react';
import "./dashboard.sass";
import arrowRight  from "../../../images/arrowRight.svg";
import  arrowLeft  from "../../../images/arrowLeft.svg";
import nameDashboard from "../../../images/nameDashboard.svg";


export default function Arousal(): ReactElement {

  return (
    <>
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
    </>
  )
}
