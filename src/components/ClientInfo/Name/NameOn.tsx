import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./name.sass";
import { ReactComponent as Brain } from "../../../images/brain.svg";
import Dashboards from "../Dashboard/Dashboards";
import { Alpha } from "../Alpha/Alpha";
import { LargeCortexShowDonut } from "../../Brain/LargeCortexShowDown";

export default function NameOn(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const dashboardNameOn = splitLocation[splitLocation.length - 1];

  console.log("dashboardNameOn", dashboardNameOn);

  const [activeBtnAtlas, setActiveBtnAtlas] = useState("X");
  const [activeBtnShortLeg, setActiveBtnShortLeg] = useState("X");
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("on");

  useEffect(() => {
    setActiveBtnRogueMode(activeBtnRogueMode);
    if (activeBtnRogueMode === "on") {
      //   history.push('/nameOn');
    }
  }, [activeBtnRogueMode]);

  console.log("activeBtnRogueMode", activeBtnRogueMode);

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
      <div className="nameContainerOn">
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

            <div className="intakeInfoText_results "></div>
          </div>
          <Alpha />
        </div>
      </div>
    </>
  );
}
