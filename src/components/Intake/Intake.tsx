import React, { ReactElement } from 'react';
import './intake.css';
import { NavLink } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import MenuInfoPatient from '../MenuInfoPatient/MenuInfoPatient';


export default function Intake(): ReactElement {

  return (
    <>
        <NavBar />
        <MenuInfoPatient/>
    </>
  )
}
