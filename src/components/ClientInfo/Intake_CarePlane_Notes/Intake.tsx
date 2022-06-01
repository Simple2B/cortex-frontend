import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";
import "./intake.css";
import Dashboards from "../Dashboard/Dashboards";
import { Alpha } from "../Alpha/Alpha";
import { ClientInfo, IClientInfo, IConsult } from "../../../types/visitTypes";
import sendArrow from "../../../images/icons8-arrow.png";
// import sendArrow2 from "../../../image/icons7-arrow.png";


export default function Intake(props: {
  activeBtnRogueMode: string;
}): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<IClientInfo>(ClientInfo);
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

  console.log("client intake", client.consentMinorChild);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [consultsData, setConsults] = useState<Array<IConsult> | null>(null);
  // The value of the textarea
  const [valueConsult, setValueConsult] = useState<string>("");


  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueConsult(event.target.value);
  };

  const getConsults = async () => {
    try {
      const response = await instance().get(`api/consult/get_consult/${api_key}`);
      console.log("GET: get consults => ", response.data);
      setConsults(response.data);
      return response.data;
    } catch (error: any) {
      console.log("GET: error message get consults => ", error.message);
      console.log("error response data get consults => ", error.response.data);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
    getConsults();
  }, [valueConsult]);

  const addConsults = async () => {
    const visit = client.visits[client.visits.length - 1];
    if (visit && client.id && visit.doctor_id && visit.id && valueConsult) {
      await clientApi.writeConsult({
        consult: valueConsult,
        api_key: api_key,
        // client_id: client.id,
        doctor_id: visit.doctor_id,
        visit_id: visit.id,
      });
      setValueConsult("");
    } else {
      console.log("Error write consult");
    }
    getConsults();
  };

  const removeConsult = (index: number) => {
    if (consultsData) {
      const updateConsults = [...consultsData]
      console.log("updateConsults before deleted => ", updateConsults);
      updateConsults.splice(index, 1);
      console.log("updateConsults after deleted => ", updateConsults);
      setConsults(updateConsults);
    }

  };

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
                  {client.consentMinorChild ? "yes" : "no"}
                </span>
              </div>

              <div>
                Consent:{" "}
                <span className="clientIntakeInfo_item">
                  {client.diagnosticProcedures ? "yes" : "no"}
                </span>
              </div>
            </div>

            <div
              className={
                activeBtn == "Family HX"
                  ? "clientIntakeInfo"
                  : "clientIntakeInfoBlock"
              }
            ></div>

            <div
              className={
                activeBtn == "Consult"
                  ? "clientIntakeInfo"
                  : "clientIntakeInfoBlock"
              }
            >
              <div className="containerResult">
                <div className="containerResult_historyResult">
                  {consultsData && consultsData.map((consult, i) => {
                    return (
                      <span className="historyResult" >
                        {consult.consult} ,  <span>{" "}</span>
                        <sup
                          key={i}
                          className="deleteCross"
                          title="delete consult"
                          onClick={() => {
                            removeConsult(i)
                            clientApi.deleteConsult({
                              id: consult.id,
                              api_key: api_key,
                              // client_id: consult.client_id,
                              doctor_id: consult.doctor_id,
                              visit_id: consult.visit_id,
                            });
                          }}
                        >
                          x
                        </sup>
                      </span>
                    )

                  })}

                </div>
                <textarea
                  ref={textareaRef}
                  className="intakeTextAreaResult"
                  onChange={textAreaChange}
                  placeholder="Write Result"
                  value={valueConsult}
                >
                </textarea>
                <div className="containerResult_img" onClick={addConsults}>
                  <img src={sendArrow} alt="sendArrow" />
                </div>
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
            </div>
          </div>
        </div>
        <Alpha />
      </div>
    </>
  );
}
