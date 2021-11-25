import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Client, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";
import "./intake.css";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
import Dashboards from "../Dashboard/Dashboards";

export default function Intake(props: {
  activeBtnRogueMode: string;
}): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);
  const [activeBtn, setActiveBtn] = useState("Health HX");

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      console.log("GET: client_intake => ", response.data);
      setClient(response.data);
      return response.data;
    } catch (error: any) {
      console.log("GET: error message get_client_intake =>  ", error.message);
      console.log(
        "error response data get_client_intake => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
  }, [api_key]);

  const handleChangeBtn = (e: any) => {
    setActiveBtn(e.currentTarget.innerHTML);
  };

  console.log("client intake", client);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // The value of the textarea
  const [value, setValue] = useState<String>();
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);

  return (
    <>
      <Dashboards activeBtnRogueMode={props.activeBtnRogueMode} />
      <div className="intakeInfo">
        <div className="intakeInfoText">
          <div className="intakeInfoText_health">
            <div className="intakeInfoText_healthTitle">Intake</div>
            <div
              className={
                activeBtn == "Health HX"
                  ? "clientIntakeInfo"
                  : "clientIntakeInfoBlock"
              }
            >
              <div>
                Referred by:{" "}
                <span className="clientIntakeInfo_item">
                  {client.referring === "" ? " - " : client.referring}
                </span>
              </div>
              <div>
                Condition:{" "}
                {client.conditions.map((condition, index) => (
                  <span
                    className="clientIntakeInfo_item itemsConditions"
                    key={index}
                  >
                    {condition},
                  </span>
                ))}
              </div>
              <div>
                Diseases:{" "}
                {client.diseases.map((disease, index) => (
                  <span
                    className="clientIntakeInfo_item itemsConditions"
                    key={index}
                  >
                    {disease},
                  </span>
                ))}
              </div>
              <div>
                Medications:{" "}
                <span className="clientIntakeInfo_item">
                  {client.medications}
                </span>
              </div>
              <div>
                Covid+:{" "}
                <span className="clientIntakeInfo_item">
                  {client.covidTestedPositive === "null"
                    ? "rather not say"
                    : client.covidTestedPositive}
                </span>
              </div>
              <div>
                Covid vaccine:{" "}
                <span className="clientIntakeInfo_item">
                  {client.covidVaccine === "null"
                    ? "rather not say"
                    : client.covidVaccine}
                </span>
              </div>
              <div>
                Stress level:{" "}
                <span className="clientIntakeInfo_item">
                  {client.stressfulLevel}
                </span>
              </div>
              <div>
                Consent for minor:{" "}
                <span className="clientIntakeInfo_item">
                  {client.consentMinorChild}
                </span>
              </div>

              <div>
                Consent:{" "}
                <span className="clientIntakeInfo_item">
                  {client.diagnosticProcedures}
                </span>
              </div>
            </div>

            <div
              className={
                activeBtn == "Family HX"
                  ? "clientIntakeInfo"
                  : "clientIntakeInfoBlock"
              }
            >
              {/* <div>Consent minor child: <span className="clientIntakeInfo_item">{client.consentMinorChild }</span></div>
              <div>Relationship child: <span className="clientIntakeInfo_item">{client.relationshipChild === "" ? " - " : client.relationshipChild}</span></div> */}
            </div>

            <div
              className={
                activeBtn == "Consult"
                  ? "clientIntakeInfo"
                  : "clientIntakeInfoBlock"
              }
            >
              <div className="containerResult">
                <textarea
                  ref={textareaRef}
                  className="intakeTextAreaResult"
                  onChange={textAreaChange}
                  placeholder="Write Result"
                >
                  {value}
                </textarea>
              </div>
            </div>

            <div className="intakeInfoText_healthBtn">
              <div
                onClick={handleChangeBtn}
                className={
                  activeBtn == "Consult" ? "intake_btnActive" : "intake_btn"
                }
              >
                Consult
              </div>
              <div
                onClick={handleChangeBtn}
                className={
                  activeBtn == "Health HX" ? "intake_btnActive" : "intake_btn"
                }
              >
                Health HX
              </div>
              {/* <div onClick={handleChangeBtn} className={activeBtn == "Family HX" ? "intake_btnActive" : "intake_btn"}>
                Family HX
              </div> */}
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
          <div className="intakeInfoAlpha_text">Alpha</div>
          <div className="intakeInfoAlpha_letters">
            <div className="letter">R</div>
            <div className="letter">L</div>
          </div>
          <div className="intakeInfoAlpha_dashboard">
            <IntakeAlpha />
          </div>
        </div>
      </div>
    </>
  );
}
