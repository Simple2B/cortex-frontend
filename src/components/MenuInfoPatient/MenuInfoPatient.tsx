import React, { ReactElement } from 'react';
import './menuInfoPatient.css';
import { NavLink } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';


export default function MenuInfoPatient(): ReactElement {

  return (
    <>
        <div className="menuInfoPatient">
            <div className="menuInfoPatientItem">JOHN</div>
            <div className="menuInfoPatientItem">Care Plan</div>
            <div className="menuInfoPatientItem">Notes</div>
            <div className="menuInfoPatientItem">Intake</div>
            <div className="menuInfoPatientItem">Report</div>
            <div className="menuInfoPatientItem">Account</div>
        </div>

    </>
  )
}
