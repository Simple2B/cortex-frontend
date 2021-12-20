import React, { ReactElement } from "react";
import "./Alpha.sass";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
import { useLocation } from "react-router-dom";

export function Alpha(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  console.log("Alpha: api_key ", api_key);

  //   const [client, setClient] = useState<Client>(ClientDefault);

  //   const getClient = async () => {
  //     try {
  //       const response = await instance().get(
  //         `api/client/client_intake/${api_key}`
  //       );
  //       console.log("GET: client_intake => ", response.data);
  //       setClient(response.data);
  //       return response.data;
  //     } catch (error: any) {
  //       console.log("GET: error message get_client_intake =>  ", error.message);
  //       console.log(
  //         "error response data get_client_intake => ",
  //         error.response.data
  //       );
  //       throw new Error(error.message);
  //     }
  //   };

  return (
    <div className="intakeInfoAlpha">
      <div className="intakeInfoAlpha_text">Alpha</div>
      <div className="intakeInfoAlpha_letters">
        <div className="letter">R</div>
        <div className="letter">L</div>
      </div>
      <div className="intakeInfoAlpha_dashboard">
        <IntakeAlpha />
      </div>
    </div>
  );
}
