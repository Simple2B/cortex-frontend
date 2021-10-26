import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import { ReactComponent as Menu } from '../../images/menu.svg';
import { ReactComponent as Logo } from '../../images/cortex_logo_small.svg';
import './navbar.css'
import { useActions } from '../../redux/useActions';


export default function NavBar(): ReactElement {
  const [switchMenu, setSwitchMenu] = useState<boolean>(false);

  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const handleMenuSwitch = () => {
    setSwitchMenu(!switchMenu)
    console.log('click');
  }
  const { logout } = useActions();
  const handlerLogout = () => {
    logout();
    localStorage.removeItem("dateNow");
  }

  const dateFromLocalStorage = new Date(parseInt(localStorage['dateNow'], 10));
  //one hour from now
  const intervalTime = new Date(dateFromLocalStorage.getFullYear(), dateFromLocalStorage.getMonth(), dateFromLocalStorage.getDate(), dateFromLocalStorage.getHours() + 1, dateFromLocalStorage.getMinutes(), dateFromLocalStorage.getSeconds());

  const now = new Date();

  if (intervalTime < now) {
    console.log("intervalTime < now", intervalTime < now);
    localStorage.removeItem("token");
    localStorage.removeItem("dateNow");
    window.location.reload();
    console.log("!!! removeItem dateNow  !!!");
  }


  return (
    <div className="nav_bar">
      <div onClick={handleMenuSwitch} className="menu_button"><Menu /></div>
      <nav className={`menu ${switchMenu ? 'open' : ''}`}>
        <NavLink className="nav_item" to="/queue" onClick={()=> splitLocation[splitLocation.length - 1] === 'queue' && setSwitchMenu(false) }>Patients</NavLink>
        <NavLink className="nav_item" to="/reports" onClick={()=> splitLocation[splitLocation.length - 1] === 'reports' && setSwitchMenu(false) }>Reports</NavLink>
        <NavLink className="nav_item" to="/kiosk">Kiosk</NavLink>
        <NavLink onClick={handlerLogout} className="nav_item" to="/">Log out</NavLink>
      </nav>
      <div className="logo"><Logo /></div>
    </div>
  )
}
