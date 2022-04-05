import React, {
  ReactElement,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import "./account.css";
import { useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import DatePicker from "react-datepicker";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import useGetBilling from "./useGetBilling";
import sendArrow from "../../../images/icons8-arrow.png";

interface ITest {
  id: number,
  client_id: number,
  doctor_id: number,
  care_plan_id: number,
  date: string,
}

interface INote {
  id?: number,
  client_id: number,
  doctor_id: number,
  note: string,
  date?: string,
  visit_id?: number,
  start_time?: string,
  end_time?: string,
}

interface IConsult {
  id?: number,
  client_id: number,
  doctor_id: number,
  consult: string,
  date?: string,
  visit_id?: number,
  start_time?: string,
  end_time?: string,
}

interface ICarePlan {
  id: number,
  date: string,
  start_time: string,
  end_time: string | null,
  progress_date: string | null,
  care_plan: string,
  frequency: string,
  client_id: number,
  doctor_id: number,
  doctor_name: string,
  tests: ITest[],
  notes: INote[],
  consults: IConsult[]
}

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

export default function Account(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const [client, setClient] = useState<Client>(ClientDefault);

  const [carePlans, setCarePlans] = useState<Array<ICarePlan>>([initialCarePlan]);

  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();

  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<string>("one time");
  const [number, setNumber] = useState<string>("");
  const [interval, setIntervalPay] = useState<string>("");

  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [pkStripeKey, setPKStripeKey] = useState<string>("");

  const [pageNumber, setPageNumber] = useState(1);
  const [isModalOpen, setModalOpen] = useState<number>(0);
  const [isModalBtnsOpen, setModelBtnsOpen] = useState<number>(0);

  const { loadingBilling, error, billingData, hasMore, total, size } =
    useGetBilling(api_key, "", pageNumber);

  const observer: any = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loadingBilling) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("entries ", entries);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingBilling, hasMore]
  );

  const intervalPay = ["2-week", "1-month"];
  const typesPay = ["one time", "recurring"];

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      setClient(response.data);
    } catch (error: any) {
      console.log("GET: error message account =>  ", error.message);
      console.log("error response data account => ", error.response.data);
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
      if (response.data) {
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

  const getHistoryCarePlans = async () => {
    try {
      const response = await instance().get(
        `api/test/care_plan_history/${api_key}`
      );
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

  useEffect(() => {
    getStripeKey();
  }, []);

  useEffect(() => {
    getClient();
    getHistoryCarePlans();
    getCarePlanDate();
  }, [api_key]);

  const getStripeKey = async () => {
    const stripeKeys = await instance().get(`api/client/get_secret`);
    const res = await loadStripe(stripeKeys.data.pk_test);
    setStripe(res);
    setPKStripeKey(stripeKeys.data.pk_test);
  };

  const appearance: any = {
    theme: "night",
  };

  const options: any = {
    pkStripeKey,
    appearance,
  };

  const setStatuses = () => {
    setAmount("");
  };

  useEffect(() => {
    if (type === "one time") {
      setNumber("1");
      setIntervalPay("");
    } else if (type === "requirement") {
      setNumber("1");
      setIntervalPay("2-week");
    } else {
      setNumber("");
    }
    if (interval !== "") {
      setNumber("");
      setType("requirements");
    }
  }, [type, interval]);

  const convertDateToString = (dateProgress: Date) => {
    if (dateProgress) {
      const dateStr = new Date(dateProgress).toISOString().replace(/GMT.*$/, "GMT+0000");
      const fullDate = dateStr.replace("T", " ").replace(".", " ").split(" ");
      const dStart = fullDate[0].split("-");
      const fullTime = fullDate[1];
      return `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`;
    }

  }

  const createCarePlane = (startDate: any, endDate: any) => {
    const createCarePlan = async () => {
      const startDateToBack = convertDateToString(startDate);
      const endDateToBack = convertDateToString(endDate);

      const carePlan = await clientApi.createCarePlan({
        api_key: api_key,
        start_time: startDateToBack,
        end_time: endDateToBack,
      });
      console.log("Account: created care plan", carePlan);
    };
    createCarePlan();
    getHistoryCarePlans();
  }

  const removeCarePlan = (index: number) => {
    const updateCarePlans = [...carePlans];
    console.log("updateCarePlans before deleted => ", updateCarePlans);
    updateCarePlans.splice(index, 1);
    console.log("updateCarePlans after deleted => ", updateCarePlans);
    setCarePlans(updateCarePlans);
  };

  {/* state of care plan in modal */}
  const [carePlanId, setCarePlanId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const [progressDate, setProgressDate] = useState<any>(null);
  const [typeInput, setTypeInput] = useState<string>("text");

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

  const modifyProgressDate = (stringDate: string) => {
    if(stringDate) {
      if (stringDate.includes("-")) {
        const date = stringDate.split("-");
        return date[1] + "/" + date[2] + "/" + date[0];
      }
      const date = stringDate.split(',')[0].split("/");

      return date[0] + "/0" + String(Number(date[1]) + 1) + "/" + date[2];
    }
    return stringDate
  }

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
      <div className="accountContainer">
        <div className="clientInfo">
          <div className="clientInfo_tittle">Client info</div>
          <div className="clientInfoAccount">
            <div className="infoContainer">
              <div className="info_title">Name </div>
              <div className="clientInfo_text">
                {client.firstName} {client.lastName}
              </div>
            </div>
            <div className="info">
              <div>DOB: </div>
              <div className="clientInfo_text">{client.birthday}</div>
            </div>
            <div className="info">
              <div>Address: </div>
              <div className="clientInfo_text">{client.address}</div>
            </div>
            <div className="info">
              <div>City: </div>
              <div className="clientInfo_text">{client.city}</div>
            </div>
            <div className="info">
              <div>State: </div>
              <div className="clientInfo_text">{client.state}</div>
            </div>
            <div className="info">
              <div>Zip: </div>
              <div className="clientInfo_text">{client.zip}</div>
            </div>
            <div className="info">
              <div>Phone: </div>
              <div className="clientInfo_text">{client.phone}</div>
            </div>
            <div className="info">
              <div>Email: </div>
              <div className="clientInfo_text">{client.email}</div>
            </div>
          </div>
        </div>
        <div className="visitHistory">
          <div className="clientInfo_tittle">Care Plan</div>
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
                            {/* start: information of care plan in modal */}

                            <div className="infoCarePlanContainer">
                              <div className="infoCarePlanContainer_header">Care Plan # {carePlan.id}</div>
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
                                    // isClearable
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
                                    // isClearable
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
                                  {/* progressDateChange */}
                                  <input className="date"
                                    type={typeInput}
                                    value={modifyProgressDate(progressDate)}
                                    onChange={progressDateChange}
                                    onBlur={() => setTypeInput("date")}
                                    onFocus={() => setTypeInput("date")}
                                    placeholder={progressDate}
                                  />

                                  {/* <DatePicker
                                    dateFormat="MM/dd/yyyy"
                                    className="date"
                                    selected={progressDate}
                                    onChange={(data) => setProgressDate(data)}
                                    onChange={progressDateChange}
                                    selectsEnd
                                    startDate={progressDate}
                                  /> */}
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

                            {/* end: information of care plan in modal */}
                            <div className="btnsModal">
                            <div className="saveChanges" onClick={() => {
                                saveChangesCarePlan(carePlan.id, startDate, endDate, progressDate);
                                setModalOpen(0);
                              }}>save changes</div>
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
                    onChange={(date) => {
                      setStartTime(date);
                      createCarePlane(date, endTime);
                    }}
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
                    onChange={(date) => {
                      setEndTime(date);
                      createCarePlane(startTime, date);
                    }}
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
            </div>
          </div>
        </div>
        <div className="billing">
          <div className="clientInfo_tittle">Billing</div>
          <div className="billing_table">
            <table className="table">
              <>
                <tr className="tableHeader">
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>

                {billingData.map((billing, index) => {
                  if (billingData.length === index + 1 && billing.date) {
                    return (
                      <tr key={index} ref={lastElementRef}>
                        {billing.status === "succeeded" ? (
                          <td>{billing.date}</td>
                        ) : billing.status === "active" ? (
                          <td className="billingReq">
                            <sup className="req">req</sup> {billing.date}
                            <br />
                            next payment: {billing.date_next_payment_attempt}
                          </td>
                        ) : (
                          <td>{billing.date}</td>
                        )}

                        {billing.status === "succeeded" ? (
                          <td>${billing.amount}</td>
                        ) : billing.status === "active" ? (
                          <td>
                            <br />
                            <br />${billing.amount}
                          </td>
                        ) : (
                          <td>${billing.amount}</td>
                        )}

                        {billing.status === "succeeded" ? (
                          <td style={{ color: "green" }}>Paid</td>
                        ) : billing.status === "active" ? (
                          <td style={{ color: "green" }}>
                            Active
                            <br />
                            <br />
                            {billing.paid === false ? (
                              <span style={{ color: "red" }}>Failed</span>
                            ) : (
                              <span style={{ color: "green" }}>Paid</span>
                            )}
                          </td>
                        ) : (
                          <td style={{ color: "red" }}>Failed</td>
                        )}
                      </tr>
                    );
                  } else if (index !== 0 && billing.date) {
                    return (
                      <tr key={index}>
                        {billing.status === "succeeded" ? (
                          <td>{billing.date}</td>
                        ) : billing.status === "active" ? (
                          <td className="billingReq">
                            <sup className="req">req</sup> {billing.date}
                            <br />
                            next payment: {billing.date_next_payment_attempt}
                          </td>
                        ) : (
                          <td>{billing.date}</td>
                        )}

                        {billing.status === "succeeded" ? (
                          <td>${billing.amount}</td>
                        ) : billing.status === "active" ? (
                          <td>
                            <br />
                            <br />${billing.amount}
                          </td>
                        ) : (
                          <td>${billing.amount}</td>
                        )}

                        {billing.status === "succeeded" ? (
                          <td style={{ color: "green" }}>Paid</td>
                        ) : billing.status === "active" ? (
                          <td style={{ color: "green" }}>
                            Active
                            <br />
                            <br />
                            {billing.paid === false ? (
                              <span style={{ color: "red" }}>Failed</span>
                            ) : (
                              <span style={{ color: "green" }}>Paid</span>
                            )}
                          </td>
                        ) : (
                          <td style={{ color: "red" }}>Failed</td>
                        )}
                      </tr>
                    );
                  }
                })}

                {loadingBilling ? (
                  <tr className="tableHeader">
                    <td colSpan={3}>Loading...</td>
                  </tr>
                ) : null}

                {error ? (
                  <tr className="tableHeader">
                    <td colSpan={3}>Error</td>
                  </tr>
                ) : null}
              </>
            </table>
          </div>

          <div className="visitHistory_billing">
            <div className="visitHistory_inputContainer">
              <div className="inputTitle">Number</div>
              <div className="visitHistory_inputContainer-size">
                <input
                  type="number"
                  placeholder=""
                  maxLength={6}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="visitHistory_inputContainer">
              <div className="inputTitle">Type</div>
              <div className="visitHistory_inputContainer-selectContainer">
                <input
                  type="text"
                  placeholder=""
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <div className="selectContainer">
                  {typesPay.map((type, index) => {
                    return (
                      <div key={index} onClick={(_e) => setType(type)}>
                        {type}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="visitHistory_billing">
            <div className="visitHistory_inputContainer">
              <div className="inputTitle">Interval</div>
              <div className="visitHistory_inputContainer-selectContainer">
                <input
                  type="text"
                  placeholder=""
                  value={interval}
                  onChange={(e) => setIntervalPay(e.target.value)}
                  className={error ? "error" : ""}
                />
                <div className="selectContainer">
                  {intervalPay.map((interval, index) => {
                    return (
                      <div
                        key={index}
                        onClick={(_e) => setIntervalPay(interval)}
                      >
                        {interval}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="visitHistory_inputContainer">
              <div className="inputTitle">Amount</div>
              <div className="visitHistory_inputContainer-size">
                <input
                  type="number"
                  placeholder=""
                  maxLength={6}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="visitHistory_inputContainer">
            {pkStripeKey && (
              <Elements options={options} stripe={stripe}>
                <CheckoutForm
                  onUpdateCallback={setStatuses}
                  amount={amount}
                  type_description={type}
                  interval={interval}
                  number={number}
                  api_key={api_key}
                  email={client.email}
                  name={client.firstName + " " + client.lastName}
                  stripe_key={stripe}
                  error_type={error}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
