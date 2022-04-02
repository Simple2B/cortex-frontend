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

interface ITest {
  id: number,
  client_id: number,
  doctor_id: number,
  care_plan_id: number,
  date: string,
}

interface INotes {
  id: number,
  client_id: number,
  doctor_id: number,
  note: string,
  date: string,
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
  notes: INotes[],
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
}

export default function Account(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const [client, setClient] = useState<Client>(ClientDefault);

  const [carePlans, setCarePlans] = useState<Array<ICarePlan>>([initialCarePlan]);

  console.log(" =>>>>> carePlans ", carePlans)

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
    getCarePlanDate()
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

  const convertDateToString = (date: Date) => {
    if (date) {
      const dateStr = new Date(date).toISOString().replace(/GMT.*$/, "GMT+0000");
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
  }

  const removeCarePlan = (index: number) => {
    const updateCarePlans = [...carePlans];
    console.log("updateCarePlans before deleted => ", updateCarePlans);
    updateCarePlans.splice(index, 1);
    console.log("updateCarePlans after deleted => ", updateCarePlans);
    setCarePlans(updateCarePlans);
  };

  {/* state of care plan in modal */}
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [progressDate, setProgressDate] = useState<any>(null);
  const [carePlanLength, setCarePlanLength] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");

  const [newNote, setNewNote] = useState<string>("");

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
                            if (carePlan.progress_date) setProgressDate(Date.parse(carePlan.progress_date.split(",")[0]));
                            setStartDate(Date.parse(carePlan.start_time));
                            if (carePlan.end_time) setEndDate(Date.parse(carePlan.end_time));
                            setCarePlanLength(carePlan.care_plan);
                            setFrequency(carePlan.frequency)
                            setModalOpen(carePlan.id);
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
                          <div className="modal-content">
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
                                      // clientApi.deleteClient({
                                      //   id: patient.id,
                                      //   api_key: patient.api_key,
                                      //   first_name: patient.first_name,
                                      //   last_name: patient.last_name,
                                      //   phone: patient.phone,
                                      //   email: patient.email,
                                      //   place_in_queue: patient.place_in_queue,
                                      //   req_date: patient.req_date,
                                      //   rougue_mode: true,
                                      //   visits: patient.visits,
                                      // });

                                      removeCarePlan(index);
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
                                  <input type="text" className="date" value={carePlanLength} onChange={() => {setCarePlanLength(carePlanLength)}}/>
                                </div>

                                <div className="inputDate">
                                  <div className="text">Frequency</div>
                                  <input type="text" className="date" value={frequency} onChange={() => setFrequency(frequency)}/>
                                </div>
                              </div>

                              <div className="data">
                                <div className="inputDate">
                                  <div className="text">Progress date</div>
                                    <DatePicker
                                      dateFormat="MM/dd/yyyy"
                                      className="date"
                                      selected={progressDate}
                                      onChange={(progressDate) => {setProgressDate(progressDate)}}
                                      selectsEnd
                                      startDate={progressDate}
                                    />
                                </div>
                              </div>

                              <div className="data">
                                <div className="inputDate">
                                  <div className="text">Tests</div>
                                  <div className="date">
                                      {
                                        carePlan.tests.length > 0 && carePlan.tests.map((test, i) => {
                                          const dateTest = test.date.split("T");
                                          return (
                                            <div key={test.id} className="dateContainer">
                                              <sup
                                                className="deleteCross"
                                                // title="delete note"
                                                // onClick={() => {
                                                //   deleteNote({
                                                //     id: note.id,
                                                //     client_id: note.client_id,
                                                //     doctor_id: note.doctor_id,
                                                //     visit_id: note.visit_id,
                                                //   });
                                                //   getNotes();
                                                // }}
                                              >
                                                x
                                              </sup>
                                              <div>{i+1}). {dateTest[0]}, {dateTest[1]}</div>
                                            </div>
                                            )
                                          })
                                      }
                                  </div>
                                </div>
                              </div>
                              <div className="data">
                                <div className="inputDate">
                                  <div className="text">Notes</div>
                                  <div className="date">
                                      {
                                        carePlan.notes.length > 0 && carePlan.notes.map((note, i) => {
                                          return (
                                            <div key={note.id} className="dateContainer">
                                              <sup
                                                className="deleteCross"
                                                title="delete note"
                                                // onClick={() => {
                                                //   deleteNote({
                                                //     id: note.id,
                                                //     client_id: note.client_id,
                                                //     doctor_id: note.doctor_id,
                                                //     visit_id: note.visit_id,
                                                //   });
                                                //   getNotes();
                                                // }}
                                              >
                                                x
                                              </sup>
                                              <div>{note.note}</div>
                                            </div>
                                            )
                                          })
                                      }
                                  </div>

                                </div>

                                <div className="inputDate">
                                  <div className="text">Write note</div>
                                  <input type="text" value={newNote} onChange={() => setNewNote(newNote)}/>
                                </div>
                              </div>
                            </div>

                            {/* end: information of care plan in modal */}
                            <div className="btnsModal">
                            <div className="saveChanges" onClick={() => setModalOpen(0)}>save changes</div>
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
                    onChange={(data) => {
                      setStartTime(data);
                      createCarePlane(data, endTime);
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
                    onChange={(data) => {
                      setEndTime(data);
                      createCarePlane(startTime, data);
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
