import React, { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Client, clientApi, ClientDefault } from "../../../api/clientApi";
import "../Name/name.sass";
import Arousal from "../Dashboard/Arousal";
import BrainWaves from "../Dashboard/BrainWaves";
import Coherence from "../Dashboard/Coherence";
import arrowRight from "../../../images/arrowRight.svg";
import arrowLeft from "../../../images/arrowLeft.svg";
import { useActions } from "../../../redux/useActions";
import { IDashboard } from "../../../types/dashboardTypes";
import { initialDashboard } from "../../../redux/reducers/dashboardReducer";
import { store } from "../../../redux";
import { instance } from "../../../api/axiosInstance";

export default function Dashboards(props: {
  activeBtnRogueMode: string;
}): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [client, setClient] = useState<Client>(ClientDefault);

  // console.log("Dashboard api_key ->", api_key);

  const getClient = async () => {
    try {
      const response = await instance().get(
        `api/client/client_intake/${api_key}`
      );
      console.log("GET: client_intake response !!!!!!!!! => ", response);
      setClient(response.data);
    } catch (error: any) {
      console.log(
        "GET->dashboard: error message get_client_intake name =>  ",
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
    if (api_key !== "nameOn") {
      getClient();
    }
  }, [api_key]);

  const componentUrl = splitLocation[splitLocation.length - 1];

  const getUrl = (componentUrl: string) => {
    if (componentUrl === "notes") {
      return null;
    }
    if (componentUrl === "care_plane") {
      return null;
    }
    if (componentUrl === "start") {
      return null;
    }
    return componentUrl;
  };

  const [dashboard, setDashboard] = useState<IDashboard>(
    store.getState().dashboard
  );
  const history = useHistory();

  const { dashboardUrl } = useActions();

  useEffect(() => {
    dashboardUrl(dashboard);
    if (props.activeBtnRogueMode === "on") {
      history.push(`/nameOn/${initialDashboard}`);
    }
  }, [props.activeBtnRogueMode, dashboard]);

  return (
    <>
      <div className="nameContainer_arousal">
        <div className="containerCoherence">
          {getUrl(componentUrl) && (
            <div className="arrowLeft">
              <img
                src={arrowLeft}
                alt="arrowLeft"
                onClick={() =>
                  dashboard === "coherence"
                    ? setDashboard("brainWaves")
                    : dashboard === "brainWaves"
                    ? setDashboard("arousal")
                    : setDashboard("coherence")
                }
              />
            </div>
          )}
          {componentUrl === "start" ? (
            <BrainWaves />
          ) : (
            (dashboard === "arousal" && <Arousal />) ||
            (dashboard === "brainWaves" && <BrainWaves />) ||
            (dashboard === "coherence" && <Coherence />)
          )}
          {getUrl(componentUrl) && (
            <div className="arrowRight">
              <img
                src={arrowRight}
                alt="arrowRight"
                onClick={() =>
                  dashboard === "coherence"
                    ? setDashboard("arousal")
                    : dashboard === "arousal"
                    ? setDashboard("brainWaves")
                    : setDashboard("coherence")
                }
              />
            </div>
          )}
        </div>

        <div className="containerComplete">
          {componentUrl !== "start" && (
            <div className="btn_circles">
              <div
                className={`${
                  dashboard === "arousal" ? "btn_circleActive" : "btn_circle"
                }`}
                onClick={() => setDashboard("arousal")}
              ></div>
              <div
                className={`${
                  dashboard === "brainWaves" ? "btn_circleActive" : "btn_circle"
                }`}
                onClick={() => setDashboard("brainWaves")}
              ></div>
              <div
                className={`${
                  dashboard === "coherence" ? "btn_circleActive" : "btn_circle"
                }`}
                onClick={() => setDashboard("coherence")}
              ></div>
            </div>
          )}

          <div
            className="coherenceBtn_complete"
            onClick={() => {
              const completeVisitClient = async () => {
                const completeVisit = await clientApi.completeClient({
                  api_key: api_key,
                  rougue_mode: false,
                  place_in_queue: client.place_in_queue,
                });
                console.log("completeVisit", completeVisit);
                history.push("/queue");
              };
              completeVisitClient();
            }}
          >
            Complete
          </div>
        </div>
      </div>
    </>
  );
}
