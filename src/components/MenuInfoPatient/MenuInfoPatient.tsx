import React, { ReactElement, useState } from 'react';
import { useLocation } from "react-router-dom";
import './menuInfoPatient.css';
import { NavLink } from 'react-router-dom';


export default function MenuInfoPatient(): ReactElement {

      //assigning location variable
      const location = useLocation();

      //destructuring pathname from location
      const { pathname } = location;

      //Javascript split method to get the name of the path in array
      const splitLocation = pathname.split("/");


  return (
    <div className="menuInfoPatient_container">
        <div className="menuInfoPatient">
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">JOHN</NavLink>
            </div>
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Care Plan</NavLink>
            </div>
            <div className={splitLocation[1] === "#" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="#">Notes</NavLink>
            </div>
            <div className={splitLocation[1] === "intake" ? "active" : "menuInfoPatientItem"}>
              <NavLink to="/intake">Intake</NavLink>
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
