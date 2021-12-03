import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import { instance } from "../../../api/axiosInstance";
// import "../Name/name.sass";
import "./AccountReport.sass";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
import { ReactComponent as Brain } from "../../../images/brain.svg";
import Dashboards from "../Dashboard/Dashboards";
import useSound from "use-sound";

export default function AccountReportStart(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("off");
  const [play, exposedData] = useSound("/cortex_sound.mp3");
  const [counter, setCounter] = useState<number>(3);
  // 07:47 -> 467 seconds
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const history = useHistory();
  const [startTest, setStartTest] = useState({
    api_key: "",
    date: "",
  });

  const [test, setTest] = useState({
    client_id: null,
    date: "",
    doctor_id: null,
    id: null,
  });

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      console.log("GET: client_intake name => ", response.data);
      setClient(response.data);
      return response.data;
    } catch (error: any) {
      console.log(
        "GET: error message get_client_intake name =>  ",
        error.message
      );
      console.log(
        "error response data get_client_intake name => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getClient();
  }, [api_key]);

  useEffect(() => {
    setActiveBtnRogueMode(activeBtnRogueMode);
  }, [activeBtnRogueMode]);

  const padTime = (time: number) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  const format = (time: number) => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);

    // Get the seconds left after converting minutes
    const seconds = time % 60;

    //Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

  const timerId = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    const timer = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    timerId.current = timer;
  };

  const resetTimer = () => {
    timerId.current && clearInterval(timerId.current);
    timerId.current = undefined;
  };

  useEffect(() => {
    if (counter < 1) {
      console.log("timerOver");
      resetTimer();
      setCounter(0);
      return resetTimer();
    }
  }, [counter]);

  const handlePlay = () => {
    console.log("Record START PLAYING");
    setIsTestStarted(true);
    play();
    setInterval(() => {
      exposedData.stop();
    }, counter * 1000);
    console.log("Record STOPPED!");
  };
  const createTest = () => {
    startTimer();
    handlePlay();
    const date = new Date().toISOString().replace(/GMT.*$/, "GMT+0000");
    const fullDate = date.replace("T", " ").replace(".", " ").split(" ");
    const dStart = fullDate[0].split("-");
    const fullTime = fullDate[1];
    const startDateToBack = `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`;
    const startTest = {
      api_key: api_key,
      date: startDateToBack,
    };
    console.log("start test", startTest);
    setStartTest(startTest);
    // clientApi.createTest(startTest);

    const getCreateTest = async () => {
      const test = await clientApi.createTest(startTest);
      console.log("AccountReportStart: create test for client", test);
      setTest(test);
    };
    getCreateTest();
  };

  return (
    <>
      <Dashboards activeBtnRogueMode={activeBtnRogueMode} />

      <div className="accountReportStart_nameContainer_brain">
        <div className="nameContainer_brainContent">
          <div className="brain">
            <Brain />
          </div>

          {/* <div className="intakeInfoText_results">
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
          </div> */}
        </div>
        <div className="alphaContainer">
          <div className="alphaContainer_text">Alpha</div>
          <div className="alphaContainer_letters">
            <div className="letter">R</div>
            <div className="letter">L</div>
          </div>
          <div className="alphaContainer_dashboard">
            <IntakeAlpha />
          </div>
        </div>
      </div>

      <div className="accountReportStart_modalWindow">
        <div className="modalWindow_content">
          <div className="content">
            <div className="modalWindow_time">
              {counter === 0 ? "Time over" : <>{format(counter)}</>}
            </div>
            {counter === 0 ? (
              <div className="viewReport">
                <div className="viewReport_content">
                  <div>Assessment Complete</div>
                </div>
                <div
                  className="viewReport_btn"
                  onClick={() =>
                    history.push(`/${api_key}/view_report_` + `${test.id}`)
                  }
                >
                  View Report
                </div>
              </div>
            ) : !isTestStarted ? (
              <div className="modalWindow_btnStart" onClick={createTest}>
                Start
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
