import React, {
    ReactElement,
    useEffect,
    useState,
  } from "react";
import "./account.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { clientApi} from "../../../api/clientApi";
import sendArrow from "../../../images/icons8-arrow.png";
import { convertDateToString, modifyProgressDate } from "./helper";
import { ICarePlan, IConsult, INote, ITest } from "../../../types/accountTypes";
import { instance } from "../../../api/axiosInstance";

const initialCarePlan = {
  id: 0,
  date: '',
  start_time: '',
  end_time: '',
  progress_date: '',
  care_plan: '',
  frequency: '',
  client_id: 1,
  doctor_id: 1,
  doctor_name: "",
  tests: [],
  notes: [],
  consults: [],
}

export default function AccountClientCarePlan(props: {api_key: string}): ReactElement {

  const {api_key} = props;

  const [carePlans, setCarePlans] = useState<Array<ICarePlan>>([initialCarePlan]);
  const [isModalOpen, setModalOpen] = useState<number>(0);
  const [isModalBtnsOpen, setModelBtnsOpen] = useState<number>(0);
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();

  const getHistoryCarePlans = async () => {
    try {
      const response = await instance().get(
        `api/test/care_plan_history/${api_key}`
      );
      console.log("GET: response history care plans =>  ", response);
      setCarePlans(response.data);
    } catch (error: any) {
      console.log("GET: error message account care plans =>  ", error.message);
      console.log(
        "error response data account care plans => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  const getCarePlanDate = async () => {
      try {
        const response = await instance().get(
          `api/test/care_plan_create/${api_key}`
        );
        console.log("GET: getCarePlan response.data =>  ", response);
        // setCarePlan({...response.data});
        if (response.data && response.data.start_time) {
          setStartTime(new Date(response.data.start_time));
        }
        if (response.data && response.data.end_time) {
          setEndTime(new Date(response.data.end_time));
        }
      } catch (error: any) {
        console.log("GET: getCarePlan message =>  ", error.message);
        throw new Error(error.message);
      }
    };

  const createCarePlane = (startDate: any, endDate: any) => {
    const createPlan = async () => {
      const startDateToBack = convertDateToString(startDate);
      const endDateToBack = convertDateToString(endDate);
      const carePlan = await clientApi.createCarePlan({
        api_key: api_key,
        start_time: startDateToBack,
        end_time: endDateToBack,
      });
      console.log("Account: created care plan", carePlan);
    };
    createPlan();
    getHistoryCarePlans();
  }

  useEffect(() => {
    getHistoryCarePlans();
    getCarePlanDate();
  }, [api_key]);

  const removeCarePlan = (index: number) => {
      const updateCarePlans = [...carePlans];
      console.log("updateCarePlans before deleted => ", updateCarePlans);
      updateCarePlans.splice(index, 1);
      console.log("updateCarePlans after deleted => ", updateCarePlans);
      setCarePlans(updateCarePlans);
  };

  const [typeInput, setTypeInput] = useState<string>("text");

  const [carePlanId, setCarePlanId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const [progressDate, setProgressDate] = useState<any>(null);
  console.log("=> progressDate ", progressDate)

  const progressDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setProgressDate(event.target.value);
      setTypeInput("text");
  };
  const [carePlanLength, setCarePlanLength] = useState<string>("");
  const carePlanLengthChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setCarePlanLength(event.target.value);
  };
  const [frequency, setFrequency] = useState<string>("");
  const frequencyChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setFrequency(event.target.value);
  };

  const [lastTestId, setTestId] = useState<number | null>(null);
  const [tests, setTests] = useState<ITest[]>([]);
  const [deletedTests, setDeletedTests] = useState<ITest[]>([]);

  const [notes, setNotes] = useState<INote[]>([]);
  const [deletedNotes, setDeletedNotes] = useState<INote[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const noteChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setNewNote(event.target.value);
  };

  const [consults, setConsults] = useState<IConsult[]>([]);
  const [deletedConsults, setDeletedConsults] = useState<IConsult[]>([]);

  const [newConsult, setNewConsult] = useState<string>("");
  const consultChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewConsult(event.target.value);
  };

  const removeTest = (index: number) => {
    const updateTests = [...tests];
    const deletedTest = updateTests[index];
    setDeletedTests(prev => [...prev, deletedTest]);
    console.log("! deletedTest => ", deletedTest);
    console.log("updateCarePlans before deleted => ", updateTests);
    updateTests.splice(index, 1);
    console.log("updateTests after deleted => ", updateTests);
    setTests(updateTests);
  };

  const removeNote = (index: number) => {
    const updateNotes = [...notes];
    const deletedNote = updateNotes[index];
    setDeletedNotes(prev => [...prev, deletedNote]);
    console.log("! deletedNote => ", deletedNote);
    console.log("updateNotes before deleted => ", updateNotes);
    updateNotes.splice(index, 1);
    console.log("updateTests after deleted => ", updateNotes);
    setNotes(updateNotes);
  };

  const removeConsult = (index: number) => {
    const updateConsults = [...consults];
    const deletedConsult = updateConsults[index];
    setDeletedConsults(prev => [...prev, deletedConsult]);
    console.log("! deletedConsult => ", deletedConsult);
    console.log("updateConsults before deleted => ", updateConsults);
    updateConsults.splice(index, 1);
    console.log("updateConsults after deleted => ", updateConsults);
    setConsults(updateConsults);
  };

  const saveChangesCarePlan = async (id: number, startDate: Date, endDate: Date, progressDate: Date) => {
    if(carePlanId && carePlanId === id) {

      if (progressDate) {
        const progressDateToBack = convertDateToString(progressDate);
        console.log("saveChangesCarePlan: =>>>>> progressDateToBack ==>>>", progressDateToBack);
        const carePlan = await clientApi.putInfoToCarePlan({
          test_id: Number(lastTestId),
          api_key: api_key,
          progress_date: progressDateToBack,
          care_plan: carePlanLength,
          frequency: frequency,
        });
        console.log("saveChangesCarePlan: carePlan ", carePlan);
      }

      if (deletedNotes.length > 0) {
        console.log(" count of deleted notes ", deletedNotes.length)
        deletedNotes.map(async(note) => {
            console.log(" start delete note ")
            // const deleteNotes = async() => {
              if (note.id && note.visit_id) {
                await clientApi.deleteNote({
                  id: note.id,
                  client_id: note.client_id,
                  doctor_id: note.doctor_id,
                  visit_id: note.visit_id,
                });
            }
        })
        console.log(" end delete note ")
      }

      if (deletedConsults.length > 0) {
        console.log(" count of deleted consults ", deletedConsults.length)
        deletedConsults.map(async(consult) => {
          if (consult.id && consult.visit_id) {
            console.log(" start delete consult ")
            await clientApi.deleteConsult({
              id: consult.id,
              client_id: consult.client_id,
              doctor_id: consult.doctor_id,
              visit_id: consult.visit_id,
            });
          }
        })
        console.log(" end delete consult ")
      }

      if (deletedTests.length > 0) {
        console.log(" count of deleted tests ", deletedTests.length)
        deletedTests.map(async(test) => {
          console.log(" start delete tests ")
          await clientApi.deleteTest({
            id: test.id,
            api_key: api_key,
            current_care_plan_id: carePlanId,
          });
        })
        console.log(" end delete tests ")

      }

      const startDateToBack = convertDateToString(startDate);
      const endDateToBack = convertDateToString(endDate);

      if (notes.length > 0) {
        const notesWithoutId = notes.filter(note => note.id === undefined);
        notesWithoutId.map(async(note) => {
          if (startDate && endDate) {
            await clientApi.writeNote({
              notes: note.note,
              client_id: note.client_id,
              doctor_id: note.doctor_id,
              start_time: startDateToBack,
              end_time: endDateToBack,
            });
          }
        })
        getHistoryCarePlans();
      }

      if (consults.length > 0) {
        const consultsWithoutId = consults.filter(consult => consult.id === undefined);
        consultsWithoutId.map(async(consult) => {
          if (startDate && endDate) {
            await clientApi.writeConsult({
              consult: consult.consult,
              client_id: consult.client_id,
              doctor_id: consult.doctor_id,
              start_time: startDateToBack,
              end_time: endDateToBack,
            });
          }
        })
        getHistoryCarePlans();
      }

      createCarePlane(startDate, endDate);
      getCarePlanDate();
    }
  }

  return (
    <>
    <div className="visitHistory_table">
            <table className="table">
              <tr className="tableHeader">
                <th className="date">Start Date</th>
                <th className="service">End Date</th>
                <th className="practitioner">Practitioner</th>
              </tr>
                {carePlans.map((carePlan, index) => {
                    return (
                      <>
                        <tr key={index} className="tableRow" onClick={(e) => {
                            setCarePlanId(carePlan.id);
                            if (carePlan.progress_date) setProgressDate(convertDateToString(new Date(Date.parse(carePlan.progress_date.split(",")[0]))));
                            setTypeInput("text");
                            setStartDate(Date.parse(carePlan.start_time));
                            if (carePlan.end_time) setEndDate(Date.parse(carePlan.end_time));
                            setCarePlanLength(carePlan.care_plan);
                            setFrequency(carePlan.frequency)
                            setModalOpen(carePlan.id);
                            if(carePlan.tests.length > 0) setTestId(carePlan.tests[carePlan.tests.length - 1].id)
                            setTests(carePlan.tests);
                            setNotes(carePlan.notes);
                            setConsults(carePlan.consults);
                          }}>
                          <td>{carePlan.start_time.split(",")[0]}</td>
                          {carePlan.end_time && <td>{carePlan.end_time.split(",")[0]}</td>}
                          <td>{carePlan.doctor_name}</td>
                        </tr>
                        <div
                          id="myModal"
                          className={
                            isModalOpen === carePlan.id && isModalOpen !== 0 ? "modalOpen" : "modal"
                          }>
                          <div className="modal-content modalContent">
                            <span
                              className="close"
                              onClick={() => setModalOpen(0)}
                            >
                              &times;
                            </span>

                            {
                              isModalBtnsOpen
                              ?
                              <div className="btns-content">
                                <div className="modalText">
                                  Are you sure you want to remove this care plan?
                                </div>
                                <div className="btnsModal">
                                  <div
                                    className="btnModalOk"
                                    onClick={() => {
                                      clientApi.deleteCarePlan({
                                        id: carePlan.id,
                                        api_key: api_key,
                                      });
                                      removeCarePlan(index);
                                      getCarePlanDate();
                                      setModalOpen(0);
                                    }}
                                  >
                                    Ok
                                  </div>
                                  <div onClick={() => setModelBtnsOpen(0)}>Cancel</div>
                                </div>
                              </div>
                              :
                              null
                            }

                            <div className="infoCarePlanContainer">
                              <div className="infoCarePlanContainer_header">Care Plan # {index + 1}</div>
                              <div className="data">
                                <div className="inputDate">
                                  <div className="text">Start date</div>
                                  <DatePicker
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    className="date"
                                    selected={startDate}
                                    onChange={(data) => {setStartDate(data)}}
                                    selectsStart
                                    showTimeInput
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText= "Start date"
                                  />
                                </div>
                                <div className="inputDate">
                                <div className="text">End date</div>
                                  <DatePicker
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    className="date"
                                    selected={endDate}
                                    onChange={(data) => {setEndDate(data)}}
                                    selectsEnd
                                    showTimeInput
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    placeholderText="End date"
                                  />
                                </div>
                              </div>
                              <div className="data">
                                <div className="inputDate">
                                  <div className="text">Care plan length</div>
                                  <input type="text" className="date" value={carePlanLength} onChange={carePlanLengthChange}/>
                                </div>
                                <div className="inputDate">
                                  <div className="text">Frequency</div>
                                  <input type="text" className="date" value={frequency} onChange={frequencyChange}/>
                                </div>
                              </div>
                              <div className="data">
                                <div className="inputDate">
                                  <div className="text">Progress date</div>
                                  <input className="date"
                                    type={typeInput}
                                    value={modifyProgressDate(progressDate)}
                                    onChange={progressDateChange}
                                    onBlur={() => setTypeInput("date")}
                                    onFocus={() => setTypeInput("date")}
                                    placeholder={progressDate}
                                  />
                                </div>
                              </div>
                              <div className="data">
                                <div className="inputDate">
                                  <div className="text">Tests</div>
                                  <div className="date">
                                      {
                                        carePlan.tests.length > 0 && tests.map((test, i) => {
                                          const dateTest = test.date.split("T");
                                          return (
                                            <>
                                              <div key={test.id} className="dateContainer" >

                                                <span className="dateNote">{i+1}). {dateTest[0]}, {dateTest[1]}
                                                  <sup
                                                    className="deleteCross deleteCrossNote"
                                                    title="delete note"
                                                    onClick={() => removeTest(i)}
                                                  >
                                                    x
                                                  </sup>
                                                </span>
                                              </div>
                                            </>
                                            )
                                          })
                                      }
                                  </div>
                                </div>
                              </div>
                              <div className="data">
                                <div className="inputDate inputDateString">
                                  <div className="text">Notes</div>
                                  <div className="date dateString">
                                      {
                                        notes.length > 0 && notes.map((note, i) => {
                                          return (
                                            <>
                                              <div key={note.id} className="dateContainer">
                                                <span className="dateNote">{note.note}
                                                  <sup
                                                    className="deleteCross deleteCrossNote"
                                                    title="delete note"
                                                    onClick={() => removeNote(i)}
                                                  >
                                                    x
                                                  </sup>
                                                </span>
                                              </div>
                                            </>
                                            )
                                          })
                                      }
                                  </div>
                                </div>
                                <div className="inputDate inputDateContainer">
                                  <div className="text">Add new note</div>
                                  <input className="date" type="text" value={newNote} onChange={noteChange}/>
                                  <div className="sendArrow"><img src={sendArrow} alt="sendArrow2" onClick={() => {
                                        setNotes(prev => [...prev, {
                                          "client_id": carePlan.id,
                                          "doctor_id": carePlan.doctor_id,
                                          "note": newNote,
                                        }])
                                        setNewNote("");
                                  }}/></div>
                                </div>
                              </div>
                              <div className="data">
                                <div className="inputDate inputDateString">
                                  <div className="text">Consults</div>
                                  <div className="date dateString">
                                      {
                                        consults.length > 0 && consults.map((consult, i) => {
                                          return (
                                            <>
                                              <div key={consult.id} className="dateContainer">
                                                <span className="dateNote">{consult.consult}
                                                  <sup
                                                    className="deleteCross deleteCrossNote"
                                                    title="delete note"
                                                    onClick={() => removeConsult(i)}
                                                  >
                                                    x
                                                  </sup>
                                                </span>
                                              </div>
                                            </>
                                            )
                                          })
                                      }
                                  </div>

                                </div>

                                <div className="inputDate inputDateContainer">
                                  <div className="text">Write consult</div>
                                  <input className="date" type="text" value={newConsult} onChange={consultChange}/>
                                  <div className="sendArrow"><img src={sendArrow} alt="sendArrow2" onClick={() => {
                                        setConsults(prev => [...prev, {
                                          "client_id": carePlan.id,
                                          "doctor_id": carePlan.doctor_id,
                                          "consult": newConsult,
                                        }])
                                        setNewConsult("");
                                  }}/></div>
                                </div>
                              </div>
                            </div>

                            <div className="btnsModal">
                              <div className="saveChanges" onClick={() => {
                                  saveChangesCarePlan(carePlan.id, startDate, endDate, progressDate);
                                  setModalOpen(0);
                                }}>
                                  save changes
                              </div>
                              <div className="delete" onClick={() => setModelBtnsOpen(carePlan.id)}>delete</div>
                            </div>
                          </div>
                        </div>
                      </>

                    );
                  })
                }
            </table>
      </div>
      <div className="visitHistory_inputs">
          <div className="visitHistory_inputsContainer">
            <div className="visitHistory_inputContainer">
              <div className="inputTitle">Start date</div>
              <div className="datetimeContainer">
                <DatePicker
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="dataInput"
                  selected={startTime}
                  onChange={(date) => {setStartTime(date)}}
                  selectsStart
                  showTimeInput
                  startDate={startTime}
                  endDate={endTime}
                  isClearable
                  placeholderText= "Start date"
                />
              </div>
            </div>
            <div className="visitHistory_inputContainer">
              <div className="inputTitle">End date</div>
              <div className="datetimeContainer">
                <DatePicker
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="dataInput"
                  selected={endTime}
                  onChange={(date) => {setEndTime(date)}}
                  selectsEnd
                  showTimeInput
                  startDate={startTime}
                  endDate={endTime}
                  minDate={startTime}
                  isClearable
                  placeholderText="End date"
                />
              </div>
            </div>
            <div className="visitHistory_inputContainer">
              <button
                className={`${
                  (!startTime && !endTime) ? "btnSaveDisable" : "btnSave"
                }`}
                disabled={!startTime && !endTime}
                onClick={() => createCarePlane(startTime, endTime)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
    </>

  )}
