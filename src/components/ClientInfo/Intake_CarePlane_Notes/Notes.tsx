import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";
import "./intake.css";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
import Dashboards from "../Dashboard/Dashboards";

interface IVisit {
  date: string;
  client_id: number | null;
  doctor_id: number | null;
  id: number | null;
  start_time: string | null;
  end_time: string | null;
}

interface IClientForNotesPage extends Client {
  visits: Array<IVisit>;
}

export const ClientNotes = {
  id: null,
  firstName: "",
  lastName: "",
  birthday: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  referring: "",
  conditions: [],
  otherCondition: "",
  diseases: [],
  medications: "",
  covidTestedPositive: "",
  covidVaccine: "",
  stressfulLevel: 1,
  consentMinorChild: false,
  relationshipChild: "",
  place_in_queue: null,
  visits: [
    {
      date: "",
      client_id: null,
      doctor_id: null,
      id: null,
      start_time: null,
      end_time: null,
    },
  ],
};

interface INote {
  client_id: number;
  date: string;
  doctor_id: number;
  id: number;
  notes: string;
  visit_id: number;
}

// interface INotes {
//   notes: Array<INote>;
// }

export function Notes(props: { activeBtnRogueMode: string }): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const [client, setClient] = useState<IClientForNotesPage>(ClientNotes);
  const [activeBtn, setActiveBtn] = useState("Preset");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [notesData, setNotes] = useState<Array<INote>>();

  // The value of the textarea
  const defaultValue = "Increase H2O";
  const [value, setValue] = useState<string>("");
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      // console.log("GET: client_intake => ", response.data);
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

  const getNotes = async () => {
    try {
      const response = await instance().get(`api/client/note/${api_key}`);
      console.log("GET: get notes => ", response.data);
      setNotes(response.data);
    } catch (error: any) {
      console.log("GET: error message get notes => ", error.message);
      console.log("error response data get notes => ", error.response.data);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
  }, [api_key]);

  useEffect(() => {
    getNotes();
  }, []);

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

  const deleteNote = (deleteNoteData: {
    id: number;
    client_id: number;
    doctor_id: number;
    visit_id: number;
  }) => {
    clientApi.deleteNote(deleteNoteData);
  };

  const addNotes = () => {
    setModalOpen(!isModalOpen);

    const today = new Date().toISOString().split("T")[0];
    console.log("today for notes => ", today);

    const today_visits = client.visits.filter((visit) => visit.date === today);
    console.log("today_visits for notes => ", today_visits);

    const visit = today_visits.find(
      (visit) => visit.end_time === null && visit
    );

    if (visit && client.id && visit.doctor_id && visit.id && value) {
      clientApi.writeNote({
        // date: visit.date,
        notes: value,
        client_id: client.id,
        doctor_id: visit.doctor_id,
        visit_id: visit.id,
      });
    } else {
      console.log("Error write note");
    }
    getNotes();
  };

  return (
    <>
      <Dashboards activeBtnRogueMode={props.activeBtnRogueMode} />
      <div className="intakeInfo">
        <div className="intakeInfoText">
          <div className="intakeInfoText_health notesInfoText">
            <div className="intakeInfoText_healthTitle">Notes</div>

            {activeBtn === "Preset" ? (
              <div className="notesInfo">
                {notesData &&
                  notesData.map((note) => {
                    return (
                      <div className="notesInfo_item">
                        <div className="title">
                          {note.notes}{" "}
                          <sup
                            className="deleteCross"
                            title="delete note"
                            onClick={() => {
                              deleteNote({
                                id: note.id,
                                client_id: note.client_id,
                                doctor_id: note.doctor_id,
                                visit_id: note.visit_id,
                              });
                              getNotes();
                            }}
                          >
                            x
                          </sup>
                        </div>

                        <div className="text"></div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="notesInfo">Notes</div>
            )}

            {activeBtn === "Preset" && (
              <div
                className="notesBtnAdd"
                onClick={() => setModalOpen(!isModalOpen)}
              >
                <svg
                  id="plus-symbol-button"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30.957"
                  height="30.957"
                  viewBox="0 0 30.957 30.957"
                >
                  <path
                    id="Path_1148"
                    data-name="Path 1148"
                    d="M30.957,12.526v5.905a.805.805,0,0,1-.805.805H19.236V30.152a.805.805,0,0,1-.805.805H12.526a.805.805,0,0,1-.805-.805V19.236H.805A.805.805,0,0,1,0,18.431V12.526a.805.805,0,0,1,.805-.805H11.721V.805A.805.805,0,0,1,12.526,0h5.905a.805.805,0,0,1,.805.805V11.721H30.152A.805.805,0,0,1,30.957,12.526Z"
                    fill="#fff"
                  />
                </svg>
                <div className="text">Add new</div>
              </div>
            )}

            <div className={isModalOpen ? "modalOpen" : "modal"}>
              <div className="modal-content modalContentNotes">
                <span
                  className="close"
                  onClick={() => setModalOpen(!isModalOpen)}
                >
                  &times;
                </span>
                <div className="modalText modalContentNotesText">
                  <textarea
                    ref={textareaRef}
                    className="textAreaChange"
                    onChange={textAreaChange}
                    placeholder="Write Notes"
                  >
                    {value}
                  </textarea>
                </div>
                <div className="btnsModal">
                  <div className="btnModalOk" onClick={addNotes}>
                    add
                  </div>
                  <div
                    className="btnModalCancel"
                    onClick={() => setModalOpen(!isModalOpen)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
            <div className="notesBtnToggle">
              <div
                onClick={handleChangeBtn}
                className={activeBtn === "Preset" ? "btnActive" : "btn"}
              >
                Preset
              </div>
              <div
                onClick={handleChangeBtn}
                className={activeBtn === "Manual" ? "btnActive" : "btn"}
              >
                Manual
              </div>
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
