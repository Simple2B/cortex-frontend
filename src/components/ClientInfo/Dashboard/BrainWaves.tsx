import React, { ReactElement } from "react";
import "./dashboard.sass";
import brainWaves from "../../../images/brainWaves.svg";

export default function BrainWaves(): ReactElement {
  return (
    <div className="containerDashboard">
      <div className="title">Brain Waves</div>
      <div className="overAroused">
        <div className="overAroused_content">
          <div className="nameDashboard">
            <img src={brainWaves} alt="brainWaves" />
          </div>
        </div>
      </div>
    </div>
  );
}
