import React, {
  ReactElement,
  useState,
  useEffect,
} from "react";
import "reactjs-popup/dist/index.css";
import { clientApi } from "../../api/clientApi";
import NavBar from "../NavBar/NavBar";
import { instance } from "../../api/axiosInstance";
import { Test, User } from "../../types/patientsTypes";
import { ReactComponent as SearchIcon } from "../../images/lupa.svg";
import "./queue.sass";
import { NavLink, useHistory } from "react-router-dom";
import { isProgressDateMoreToday, isRegToday } from "./helper";
import { store } from "../../redux";
import { useActions } from "../../redux/useActions";

const QUEUE_INTERVAL = 5000;

export default function Queue(): ReactElement {
  const [queue, setQueue] = useState<User[]>([]);
  const [isOpenClientModal, setIsOpenClientModal] = useState<boolean>(false);
  const [querySearch, setSearchQuery] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<number>(0);
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("off");
  const [activeBtnWarpSpeed, setActiveBtnWarpSpeed] = useState(store.getState().queueWarpSpeed);
  const [search, setSearch] = useState<string>("");
  const history = useHistory();
  const [clients, setClients] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loadingClients, setLoadingClients] = useState<boolean>(false);
  const [nextTestDate, setNextTestDate] = useState<Date[]>([]);

  const getCarePlanDate = async (api_key: string) => {
    try {
      const response = await instance().get(
        `api/test/care_plan_create/${api_key}`
      );
      console.log("GET: getCarePlan response.data =>  ", response);
      if (response.data && response.data.progress_date) {
        setNextTestDate(prev => [...prev, new Date(response.data.progress_date)]);
      }
    } catch (error: any) {
      console.log("GET: getCarePlan message =>  ", error.message);
      throw new Error(error.message);
    }
  };

  const getClientsForQueue = async () => {
    try {
      const response = await instance().get("api/client/queue");
      console.log("!!! getClientsForQueue: clients in queue => ", response);
      setQueue(response.data);
      if (response.data.length > 0) {
        response.data.map((client_queue: { api_key: string; })=> {
           getCarePlanDate(client_queue.api_key)
        })
      }
    } catch (error: any) {
      console.log("GET: error message =>  ", new Error(error.message));
      throw new Error(error.message);
    }
  };

  console.log("!!! Queue: queue => ", queue);

  const getClients = async () => {
    setLoadingClients(true);
    try {
      const response = await instance(querySearch, pageNumber).get(
        `api/client/clients`
      );
      console.log("clients => ", response);
      setClients([...response.data]);
      setLoadingClients(false);
    } catch (error: any) {
      console.log("GET (clients_for_queue): error message =>  ", error.message);
      console.log(
        "error response data /clients_for_queue => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getClients();
  }, [pageNumber, querySearch]);

  useEffect(() => {
    getClientsForQueue();
    // const intervalId = setInterval(getClientsForQueue, QUEUE_INTERVAL);
    // return () => {
    //   clearInterval(intervalId);
    // };
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
    newClients.splice(index, 1);
    setQueue(newClients);
  };

  const handleChangeBtnRogueMode = (e: any) => {
    setActiveBtnRogueMode(e.currentTarget.innerHTML);
  };

  const { queueWarpSpeed, nextPatientInQueue } = useActions();

  const handleChangeBtnWarpSpeed = (e: any) => {
    setActiveBtnWarpSpeed(e.currentTarget.innerHTML);
    queueWarpSpeed(e.currentTarget.innerHTML);
  };

  console.log("Queue: activeBtnWarpSpeed ", activeBtnWarpSpeed);
  return (
    <div>
      <NavBar />
      <div className="queue">
        <h1 className="title_queue">The Queue</h1>
        <div className="queue_container_search">
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
        <div className="queue_btn queue_btnWarpSpeed">
          <div className="queue_titleRogueMode">Warp Speed</div>
          <div className="queue_btnRogueMode">
            <div
              onClick={handleChangeBtnWarpSpeed}
              className={
                activeBtnWarpSpeed == "on"
                  ? "queue_btnActive"
                  : "queue_name_btn"
              }
            >
              on
            </div>
            <div
              onClick={handleChangeBtnWarpSpeed}
              className={
                activeBtnWarpSpeed == "off"
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
            <div className="queue_lists">
              <div className="queue_list_space"></div>

              {queue.length > 0 ? (
                queue
                  .filter((client) => {
                    if (search === "") {
                      return client;
                    } else if (
                      (client.first_name + ' ' + client.last_name)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return client;
                    }
                  })
                  .map((patient, index) => (
                    <div className={ isRegToday(patient.req_date, patient.visits) ? "queueListWithoutVisits" : "queue_list"} key={index}>
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
                          <span
                            className="close"
                            onClick={() => setModalOpen(0)}
                          >
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
                                  req_date: patient.req_date,
                                  progress_date: patient.progress_date,
                                  rougue_mode: true,
                                  tests: patient.tests,
                                  visits: patient.visits,
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
                          className={
                            isRegToday(patient.req_date, patient.visits)
                              ?  "list listWithoutVisits"
                              : isProgressDateMoreToday(patient.progress_date, patient.tests) ? "listWithProgressDate" : "list"
                          }
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
                            if (queue[index+1] !== undefined) {
                              const nextPatientFromQueue = {
                                api_key: queue[index+1].api_key,
                                first_name: queue[index+1].first_name,
                                place_in_queue: queue[index+1].place_in_queue,
                              };
                              console.log("Queue: next patient => ", nextPatientFromQueue);
                              nextPatientInQueue(nextPatientFromQueue);
                            }
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
            <div className="client_lists" onScroll={handleScroll}>
              <div className="items">
                {clients
                  .filter(
                    (client) =>
                      !queue.map((q) => q.phone).includes(client.phone)
                  )
                  .filter((client) => {
                    if (querySearch === "") {
                      return client;
                    } else if (
                      (client.first_name + " " + client.last_name)
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
                      {patient.last_name + " " + patient.first_name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
