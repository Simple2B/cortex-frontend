import React, { ReactElement, useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import { clientApi } from "../../api/clientApi";
import NavBar from "../NavBar/NavBar";
import { instance } from "../../api/axiosInstance";
import { User } from "../../types/patientsTypes";
import { ReactComponent as SearchIcon } from "../../images/lupa.svg";
import "./queue.sass";
import { NavLink, useHistory } from "react-router-dom";

export default function Queue(): ReactElement {
  const [queue, setQueue] = useState<User[]>([]);
  const [clients, setClients] = useState<User[]>([]);

  const [isOpenClientModal, setIsOpenClientModal] = useState<boolean>(false);
  const [querySearch, setSearchQuery] = useState<string>("");

  const [isModalOpen, setModalOpen] = useState<number>(0);

  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("off");

  const [search, setSearch] = useState<string>("");

  const history = useHistory();

  const getClientsForQueue = async () => {
    try {
      const response = await instance().get("api/client/queue");
      console.log("clients in queue => ", response.data);
      setQueue(response.data);
    } catch (error: any) {
      console.log("GET: error message =>  ", new Error(error.message));
      throw new Error(error.message);
    }
  };

  const getClients = async () => {
    try {
      const response = await instance().get("api/client/clients");
      console.log("clients => ", response.data);
      setClients(response.data);
    } catch (error: any) {
      console.log("GET: error message =>  ", error.message);
      console.log("error response data clients => ", error.response.data);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClients();
    getClientsForQueue();
  }, []);

  useEffect(() => {
    setActiveBtnRogueMode(activeBtnRogueMode);
    if (activeBtnRogueMode === "on") {
      history.push("/nameOn/arousal");
    }
  }, [activeBtnRogueMode]);

  const addClient = (patient: User) => {
    setQueue((prev: User[]) => [...prev, patient]);
  };

  const removeMemberFromQueue = (index: number) => {
    const newClients = [...queue];
    console.log("newClients before deleted => ", newClients);
    newClients.splice(index, 1);
    console.log("newClients after deleted => ", newClients);
    setQueue(newClients);
  };

  const handleChangeBtnRogueMode = (e: any) => {
    setActiveBtnRogueMode(e.currentTarget.innerHTML);
  };

  return (
    <div>
      <NavBar />
      <div className="queue">
        <h1 className="queue_title">The Queue</h1>
        <div className="queue_input_search">
          <SearchIcon className="queue_search_icon" />
          <input
            className="queue_patients_search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="queue_btn">
          <div className="queue_titleRogueMode">Rogue Mode</div>
          <div className="queue_btnRogueMode">
            <div
              onClick={handleChangeBtnRogueMode}
              className={
                activeBtnRogueMode == "on"
                  ? "queue_btnActive"
                  : "queue_name_btn"
              }
            >
              on
            </div>
            <div
              onClick={handleChangeBtnRogueMode}
              className={
                activeBtnRogueMode == "off"
                  ? "queue_btnActive"
                  : "queue_name_btn"
              }
            >
              off
            </div>
          </div>
        </div>

        <div className="containerListsButton">
          <div className="queue_lists_container">
            {queue.length > 0 ? (
              queue
                .filter((client) => {
                  if (search === "") {
                    return client;
                  } else if (
                    (client.first_name + client.last_name)
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return client;
                  }
                })
                .map((patient, index) => (
                  <div className="queue_list" key={index}>
                    <i
                      className="fas fa-times faTimesItemQueue"
                      title="Delete from queue"
                      onClick={(e) => setModalOpen(patient.id)}
                    />
                    <div
                      id="myModal"
                      className={
                        isModalOpen === patient.id ? "modalOpen" : "modal"
                      }
                    >
                      <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(0)}>
                          &times;
                        </span>
                        <div className="modalText">
                          Are you sure you want to remove {patient.first_name}{" "}
                          {patient.last_name} from the queue ?
                        </div>
                        <div className="btnsModal">
                          <div
                            className="btnModalOk"
                            onClick={() => {
                              clientApi.deleteClient({
                                id: patient.id,
                                api_key: patient.api_key,
                                first_name: patient.first_name,
                                last_name: patient.last_name,
                                phone: patient.phone,
                                email: patient.email,
                                place_in_queue: patient.place_in_queue,
                                rougue_mode: true,
                              });

                              removeMemberFromQueue(index);
                              setModalOpen(0);
                            }}
                          >
                            Ok
                          </div>
                          <div onClick={() => setModalOpen(0)}>Cancel</div>
                        </div>
                      </div>
                    </div>
                    <NavLink to={`/${patient.api_key}/${patient.first_name}`}>
                      <div
                        className="list"
                        onClick={() => {
                          console.log("clientIntake", {
                            patient_name: patient.first_name,
                            api_key: patient.api_key,
                            rougue_mode: activeBtnRogueMode,
                            place_in_queue: patient.place_in_queue,
                          });
                          clientApi.clientIntake({
                            api_key: patient.api_key,
                            rougue_mode: true,
                            place_in_queue: patient.place_in_queue,
                          });
                        }}
                      >
                        {patient.last_name}, {patient.first_name}
                      </div>
                    </NavLink>
                  </div>
                ))
            ) : (
              <div className="infoMessage">NO PATIENTS IN QUEUE</div>
            )}
          </div>

          <button
            className="queue_add_button"
            onClick={() => {
              console.log("Add patient");
              setIsOpenClientModal(!isOpenClientModal);
              setSearchQuery("");
            }}
          >
            +Add new
          </button>
        </div>
        <div
          className={`${
            isOpenClientModal ? "modal_window" : "modal_window_close"
          }`}
        >
          <div className="lists">
            <i
              className="fas fa-times modalCross"
              onClick={() => setIsOpenClientModal(!isOpenClientModal)}
            />
            <div className="input_search">
              <SearchIcon className="search_icon" />
              <input
                value={querySearch}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="patients_search"
                placeholder="Search"
              />
            </div>
            <div className="client_lists">
              {clients
                .filter(
                  (client) => !queue.map((q) => q.phone).includes(client.phone)
                )
                .filter((client) => {
                  if (querySearch === "") {
                    return client;
                  } else if (
                    (client.first_name + client.last_name)
                      .toLowerCase()
                      .includes(querySearch.toLowerCase())
                  ) {
                    return client;
                  }
                })
                .map((patient, index) => (
                  <div
                    className="queue_list"
                    key={index}
                    onClick={() => {
                      clientApi.addClientToQueue(patient);
                      addClient(patient);
                      setSearchQuery("");
                      setIsOpenClientModal(!isOpenClientModal);
                    }}
                  >
                    {patient.last_name}, {patient.first_name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
