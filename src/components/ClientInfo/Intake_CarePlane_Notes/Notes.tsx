import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { clientApi } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";
import "./intake.css";
import Dashboards from "../Dashboard/Dashboards";
import { Alpha } from "../Alpha/Alpha";
import { ClientInfo, IClientInfo, INote } from "../../../types/visitTypes";


export function Notes(props: { activeBtnRogueMode: string }): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const [client, setClient] = useState<IClientInfo>(ClientInfo);

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
      return response.data;
    } catch (error: any) {
      console.log("GET: error message get notes => ", error.message);
      console.log("error response data get notes => ", error.response.data);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
    getNotes();
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
    getNotes();
  }, [value, isModalOpen]);

  const deleteNote = (deleteNoteData: {
    id: number;
    client_id: number;
    doctor_id: number;
    visit_id: number;
  }) => {
    clientApi.deleteNote(deleteNoteData);
    getNotes();
  };

  const addNotes = () => {
    setModalOpen(!isModalOpen);
    // const today = new Date().toISOString().split("T")[0];
    const visit = client.visits[client.visits.length - 1];
    if (visit && client.id && visit.doctor_id && visit.id && value) {
      clientApi.writeNote({
        notes: value,
        client_id: client.id,
        doctor_id: visit.doctor_id,
        visit_id: visit.id,
      });
      setValue("");
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

            <div className="notesInfo">
              {notesData &&
                notesData.map((note, index) => {
                  return (
                    <div key={index} className="notesInfo_item">
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

            <div
              className="notesBtnAdd"
              onClick={() => {
                setValue("");
                setModalOpen(!isModalOpen);
              }}
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
                    value={value}
                  ></textarea>
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
          </div>
        </div>
        <Alpha />
      </div>
    </>
  );
}
