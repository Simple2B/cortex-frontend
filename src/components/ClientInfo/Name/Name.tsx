import React, { ReactElement, useEffect, useState } from "react";
import "./name.sass";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
import { ReactComponent as Brain } from "../../../images/brain.svg";
import Dashboards from "../Dashboard/Dashboards";
import { Alpha } from "../Alpha/Alpha";
import { LargeCortexShowDonut } from "../../Brain/LargeCortexShowDown";

export default function Name(): ReactElement {
  const [activeBtnAtlas, setActiveBtnAtlas] = useState("X");
  const [activeBtnShortLeg, setActiveBtnShortLeg] = useState("X");
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("off");

  useEffect(() => {
    setActiveBtnRogueMode(activeBtnRogueMode);
  }, [activeBtnRogueMode]);

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
      <Dashboards activeBtnRogueMode={activeBtnRogueMode} />

      <div className="nameContainer_brain">
        <div className="nameContainer_brainContent">
          <div className="brain_btns">
            <div className="btn">
              <div className="btn_Title">Atlas</div>
              <div className="btnContainer btnAtlasShortLeg">
                <div
                  onClick={handleChangeBtn}
                  className={activeBtnAtlas == "L" ? "btnActive" : "name_btn"}
                >
                  L
                </div>
                <div
                  onClick={handleChangeBtn}
                  className={activeBtnAtlas == "X" ? "btnActive" : "name_btn"}
                >
                  X
                </div>
                <div
                  onClick={handleChangeBtn}
                  className={activeBtnAtlas == "R" ? "btnActive" : "name_btn"}
                >
                  R
                </div>
              </div>

              <div className="btn_Title">ShortLeg</div>
              <div className="btnContainer">
                <div
                  onClick={handleChangeBtnShortLeg}
                  className={
                    activeBtnShortLeg == "L" ? "btnActive" : "name_btn"
                  }
                >
                  L
                </div>
                <div
                  onClick={handleChangeBtnShortLeg}
                  className={
                    activeBtnShortLeg == "X" ? "btnActive" : "name_btn"
                  }
                >
                  X
                </div>
                <div
                  onClick={handleChangeBtnShortLeg}
                  className={
                    activeBtnShortLeg == "R" ? "btnActive" : "name_btn"
                  }
                >
                  R
                </div>
              </div>
            </div>

            <div className="btn">
              {/* <div className="btn_Title">ShortLeg</div> */}
              {/* <div className="btnContainer">
                <div
                  onClick={handleChangeBtnShortLeg}
                  className={
                    activeBtnShortLeg == "L" ? "btnActive" : "name_btn"
                  }
                >
                  L
                </div>
                <div
                  onClick={handleChangeBtnShortLeg}
                  className={
                    activeBtnShortLeg == "X" ? "btnActive" : "name_btn"
                  }
                >
                  X
                </div>
                <div
                  onClick={handleChangeBtnShortLeg}
                  className={
                    activeBtnShortLeg == "R" ? "btnActive" : "name_btn"
                  }
                >
                  R
                </div>
              </div> */}
            </div>

            <div className="btn containerRogueMode">
              <div className="btn_Title titleRogueMode">Rogue Mode</div>
              <div className="btnContainer btnRogueMode">
                <div
                  onClick={handleChangeBtnRogueMode}
                  className={
                    activeBtnRogueMode == "on" ? "btnActive" : "name_btn"
                  }
                >
                  on
                </div>
                <div
                  onClick={handleChangeBtnRogueMode}
                  className={
                    activeBtnRogueMode == "off" ? "btnActive" : "name_btn"
                  }
                >
                  off
                </div>
              </div>
            </div>
          </div>

          <div className="brain">
            <LargeCortexShowDonut/>
          </div>

          <div className="intakeInfoText_results">
            {/* <div className="results">
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
            </div> */}
          </div>
        </div>
        <Alpha />
      </div>
    </>
  );
}
