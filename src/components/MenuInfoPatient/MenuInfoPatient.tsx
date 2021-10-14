import React, { ReactElement, useState } from 'react';
import { useLocation } from "react-router-dom";
import './menuInfoPatient.css';
import { NavLink } from 'react-router-dom';

interface MyProps {
  api_key: string
  name: string
}


export default function MenuInfoPatient(props: MyProps): ReactElement {

      //assigning location variable
      const location = useLocation();

      //destructuring pathname from location
      const { pathname } = location;

      //Javascript split method to get the name of the path in array
      const splitLocation = pathname.split("/");

      console.log("props.name ", props.name );

  return (
    <div className="menuInfoPatient_container">
        <div className="menuInfoPatient">
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              {/* test data props */}
              <NavLink to="#">{ props.name === '' || props.name === null ? 'JOHN' : props.name }</NavLink>
            </div>
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Care Plan</NavLink>
            </div>
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Notes</NavLink>
            </div>
            <div className={splitLocation[splitLocation.length - 1] === `${props.api_key}` ? "active" : "menuInfoPatientItem"}>
              <NavLink to={`/intake/${props.api_key}`}>Intake</NavLink>
            </div>
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Report</NavLink>
            </div>
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Account</NavLink>
            </div>
        </div>
    </div>
  )
}
