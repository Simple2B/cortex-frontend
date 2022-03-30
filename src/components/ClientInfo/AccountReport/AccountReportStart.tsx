import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {clientApi} from "../../../api/clientApi";
import "./AccountReport.sass";
import { ReactComponent as Brain } from "../../../images/brain.svg";
import Dashboards from "../Dashboard/Dashboards";
import { Alpha } from "../Alpha/Alpha";

// 07:47 -> 467 seconds
const TIMER_COUNT = 10
interface ICreateTest {
    api_key: string,
    date: string,
    current_care_plan_id: number,
}

export default function AccountReportStart(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const currentCarePlanId: any = location.state;
  console.log(" => currentCarePlanId ", currentCarePlanId )
  const api_key = splitLocation[splitLocation.length - 2];
  // const [client, setClient] = useState<Client>(ClientDefault);
  const [activeBtnRogueMode, setActiveBtnRogueMode] = useState("off");

  // const sound = new Audio("/cortex_sound.mp3");
  const [sound] = useState(new Audio("/cortex_sound.mp3"));

  const [counter, setCounter] = useState<number>(TIMER_COUNT);

  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const history = useHistory();
  const [startTest, setStartTest] = useState<ICreateTest>({
    api_key: "",
    date: "",
    current_care_plan_id: currentCarePlanId,
  });

  const [test, setTest] = useState({
    id: null,
    date: "",
    client_id: null,
    doctor_id: null,
  });

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

  const getCreateTest = async (test: {
    api_key: string,
    date: string,
    current_care_plan_id: number,
  }) => {
    if (test.api_key.length > 0) {
      const testCarePlan = await clientApi.createTest(test);
      setTest(testCarePlan);
      console.log("=> getCreateTest: testCarePlan ", testCarePlan)
    }
  };

  useEffect(() => {
    if (counter < 1) {
      console.log("timerOver");
      resetTimer();
      setCounter(0);
      getCreateTest(startTest);
      return resetTimer();
    }
  }, [counter]);

  const createTest = async () => {
    // setSound(new Audio("/cortex_sound.mp3"))
    const playPromise = sound.play();
    const date = new Date().toISOString().replace(/GMT.*$/, "GMT+0000");
    const fullDate = date.replace("T", " ").replace(".", " ").split(" ");
    const dStart = fullDate[0].split("-");
    const fullTime = fullDate[1];
    const startDateToBack = `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`;
    const dataTest = {
      api_key: api_key,
      date: startDateToBack,
      current_care_plan_id: currentCarePlanId,
    };

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("Record START PLAYING");
          // Automatic playback started!
          // Show playing UI.
          console.log("audio played auto");
          startTimer();
          setIsTestStarted(true);
          setInterval(() => {
            sound.pause();
          }, counter * 1000);
          console.log("Record STOPPED!");
          setStartTest(dataTest)
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
          console.log("playback prevented");
        });
    }
  };

  const stopTest = () => {
    console.log(" stop test ");
    // sound.play();
    sound.pause();
    sound.currentTime = 0;
    resetTimer();
    setCounter(TIMER_COUNT);
    setIsTestStarted(false);
  }

  return (
    <>
      <Dashboards activeBtnRogueMode={activeBtnRogueMode} />

      <div className="accountReportStart_nameContainer_brain">
        <div className="nameContainer_brainContent">
          <div className="brain">
            <Brain />
          </div>
        </div>
        <Alpha />
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
              <div
                className="modalWindow_btnStart"
                onClick={() => {
                  createTest();
                }}
              >
                Start
              </div>
            ) :
            <div
              className="modalWindow_btnStart"
              onClick={() => {
                stopTest();
              }}
            >
              Stop
            </div>
          }
          </div>
        </div>
      </div>
    </>
  );
}
