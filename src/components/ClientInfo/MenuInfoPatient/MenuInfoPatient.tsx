import React, { ReactElement } from 'react';
import { useLocation } from "react-router-dom";
import './menuInfoPatient.css';
import { NavLink } from 'react-router-dom';


interface MyProps {
  api_key: string
  firstName: string
}


export default function MenuInfoPatient(props: MyProps): ReactElement {

      //assigning location variable
      const location = useLocation();

      //destructuring pathname from location
      const { pathname } = location;

      //Javascript split method to get the name of the path in array
      const splitLocation = pathname.split("/");

      console.log("props.name ", props.firstName );

  return (
    <div className="menuInfoPatient_container">
        <div className="menuInfoPatient">
            <div className={splitLocation[splitLocation.length - 1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#" className="item">{ props.firstName }</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Care Plan</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Notes</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === 'intake' ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${props.api_key}/intake`}>Intake</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Report</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === "account" ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/${props.api_key}/account`}>Account</NavLink>
            </div>
        </div>
    </div>
  )
}
