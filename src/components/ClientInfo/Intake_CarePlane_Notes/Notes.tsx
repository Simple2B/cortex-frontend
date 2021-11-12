import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { Client, ClientDefault } from '../../../api/clientApi';
import {instance} from '../../../api/axiosInstance';
import './intake.css';
import { ReactComponent as IntakeAlpha } from '../../../images/intake_alpha.svg';
import Dashboards from '../Dashboard/Dashboards';


export function Notes(props: {activeBtnRogueMode: string}): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  console.log("Care Plane -> api_key", api_key);
  const [client, setClient] = useState<Client>(ClientDefault);
  const [activeBtn, setActiveBtn] = useState("Preset");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // The value of the textarea
  const defaultValue = "Increase H2O";
  const [value, setValue] = useState<String>("");
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const getClient = async () => {
    try {
      const response = await instance()
      .get(`api/client/client_intake/${api_key}`);
      console.log("GET: client_intake => ", response.data);
      setClient(response.data);
      return response.data;
    } catch (error: any) {
      console.log('GET: error message get_client_intake =>  ', error.message);
      console.log('error response data get_client_intake => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClient()
  }, [api_key]);

  const handleChangeBtn = (e: any) => {
    setActiveBtn(e.currentTarget.innerHTML);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "100%";
      textareaRef.current.style.width = "92%";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
    setModalOpen(isModalOpen);
  }, [value, isModalOpen]);

  return (
    <>

      <Dashboards activeBtnRogueMode={props.activeBtnRogueMode}/>

      <div className="intakeInfo">
        <div className="intakeInfoText">
          <div className="intakeInfoText_health notesInfoText">
            <div className="intakeInfoText_healthTitle">Notes</div>
            <div className="notesInfo">

             { value ?
              <div className="notesInfo_item">
                <div className="title">{value}</div>
                <div className="text"></div>
              </div>
              :
              <>
                <div className="notesInfo_item">
                  <div className="title">Increase H2O</div>
                  <div className="text"></div>
                </div>

                <div className="notesInfo_item">
                  <div className="title">Stretch hamstrings</div>
                  <div className="text"></div>
                </div>

                <div className="notesInfo_item">
                  <div className="title">Spinal exercises</div>
                  <div className="text"></div>
                </div>
              </>
              }

            </div>
            <div className="notesBtnAdd" onClick={() => setModalOpen(!isModalOpen)}>
                <svg id="plus-symbol-button" xmlns="http://www.w3.org/2000/svg" width="30.957" height="30.957" viewBox="0 0 30.957 30.957">
                    <path id="Path_1148" data-name="Path 1148" d="M30.957,12.526v5.905a.805.805,0,0,1-.805.805H19.236V30.152a.805.805,0,0,1-.805.805H12.526a.805.805,0,0,1-.805-.805V19.236H.805A.805.805,0,0,1,0,18.431V12.526a.805.805,0,0,1,.805-.805H11.721V.805A.805.805,0,0,1,12.526,0h5.905a.805.805,0,0,1,.805.805V11.721H30.152A.805.805,0,0,1,30.957,12.526Z" fill="#fff"/>
                </svg>
                <div className="text">Add new</div>
            </div>
            <div className={isModalOpen ? "modalOpen" : "modal"}>
              <div className="modal-content modalContentNotes">
                <span className="close" onClick={() => setModalOpen(!isModalOpen)}>&times;</span>
                <div className="modalText modalContentNotesText">
                  <textarea
                    ref={textareaRef}
                    className="textAreaChange"
                    onChange={textAreaChange}
                    placeholder="Write Notes"
                  >
                    {
                      value
                    }
                  </textarea>
                </div>
                <div className="btnsModal">
                  <div className="btnModalOk" onClick={() => setModalOpen(!isModalOpen)}>
                      add
                  </div>
                  <div className="btnModalCancel" onClick={() => setModalOpen(!isModalOpen)}>Cancel</div>
                </div>
              </div>
            </div>
            <div className="notesBtnToggle">
                <div onClick={handleChangeBtn} className={activeBtn == "Preset" ? "btnActive" : "btn"}>Preset</div>
                <div onClick={handleChangeBtn} className={activeBtn == "Manual" ? "btnActive" : "btn"}>Manual</div>
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
    </>
  )
};