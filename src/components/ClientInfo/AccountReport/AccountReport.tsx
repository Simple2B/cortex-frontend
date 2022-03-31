import React, { ReactElement, useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import { clientApi } from "../../../api/clientApi";
import { store } from "../../../redux";
import { useActions } from "../../../redux/useActions";
import { ICurrentCarePlanId } from "../../../types/patientsTypes";
import "./AccountReport.sass";

interface ITest {
  id: null | number;
  date: string;
  client_name: string;
  doctor_name: string;
  care_plan_id: null | number;
}

interface ICurrentCarePlan {
    id: null | number;
    date: string;
    start_time: string;
    end_time: string | null;
    care_plan: string;
    frequency: string;
    progress_date: string;
    client_id: number;
    doctor_id: number;
}

const initialCarePlan = {
    id: null,
    date: "",
    start_time: "",
    end_time: null,
    care_plan: "",
    frequency: "",
    progress_date: "",
    client_id: 0,
    doctor_id: 0,
}

export function AccountReport(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];
  const [currentCarePlan, setCurrentCarePlan] = useState<ICurrentCarePlan>(initialCarePlan);
  const [currentCarePlanId, setCurrentCarePlanId] = useState<ICurrentCarePlanId>(store.getState().patientCurrentCarePlan);
  const { patientCurrentCarePlan } = useActions();
  const [tests, setClientTests] = useState<Array<ITest>>([
    { id: null, client_name: "", date: "", doctor_name: "", care_plan_id: null },
  ]);
  const history = useHistory();

  const getClientTests = async () => {
    try {
      const response = await instance().get(`api/test/client_tests/${api_key}`);
      // console.log("GET: getClientTests => ", response.data);
      setClientTests(response.data);
      return response.data;
    } catch (error: any) {
      console.log("GET: error message getClientTests =>  ", error.message);
      console.log(
        "error response data getClientTests => ",
        error.response.data
      );
      throw new Error(error.message);
    }
  };

  console.log("AccountReport: tests => ", tests);

  useEffect(() => {
    getClientTests();
    patientCurrentCarePlan(currentCarePlanId);
    if (currentCarePlan.id) {
      // patientCurrentCarePlan(currentCarePlan.id);
      history.push({
        pathname: `/${api_key}/start`,
        state:  currentCarePlan.id,
      });
    }
  }, [api_key, currentCarePlan.id, currentCarePlanId]);

  const handleCreateCarePlan = () => {
    const createCarePlan = async () => {
      const carePlan = await clientApi.createCarePlan({
        api_key: api_key,
      });
      console.log(" =>>> AccountReport: created care plan ===", carePlan);
      setCurrentCarePlan(carePlan);
      // setCurrentCarePlanId(carePlan.id);
    };
    createCarePlan();
  };

  return (
    <div className="containerReportAccount">
      <div className="reportAccountBtn" onClick={handleCreateCarePlan}>
        New Test
      </div>
      <div className="reportAccountTestTimeScrollContainer">
        <div className="reportAccountTestTime">
          {tests.map((test, index) => {
            return (
              <NavLink
                key={index}
                to={`/${api_key}/view_report_` + `${test.id}`}
              >
                <div>{test.date}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
