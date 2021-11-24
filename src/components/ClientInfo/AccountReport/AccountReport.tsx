import React, { ReactElement, useEffect, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import "./AccountReport.sass";

interface ITest {
  date: string;
  client_name: string;
  doctor_name: string;
}

export function AccountReport(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  const [tests, setClientTests] = useState<Array<ITest>>([
    { client_name: "", date: "", doctor_name: "" },
  ]);

  const history = useHistory();

  const getClientTests = async () => {
    try {
      const response = await instance().get(`api/test/client_tests/${api_key}`);
      console.log("GET: getClientTests => ", response.data);
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

  console.log("tests", tests);

  useEffect(() => {
    getClientTests();
  }, [api_key]);

  return (
    <div className="containerReportAccount">
      <div
        className="reportAccountBtn"
        onClick={() => history.push(`/${api_key}/start`)}
      >
        New Test
      </div>
      <div className="reportAccountTestTime">
        {tests.map((test, index) => {
          return (
            <NavLink to={""}>
              <div key={index}>{test.date}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
