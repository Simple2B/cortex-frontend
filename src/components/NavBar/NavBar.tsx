import React, { ReactElement, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

import { ReactComponent as Menu } from '../../images/menu.svg';
import { ReactComponent as Logo } from '../../images/cortex_logo_small.svg';
import './navbar.css'
import { useActions } from '../../redux/useActions';


export default function NavBar(): ReactElement {
  const [switchMenu, setSwitchMenu] = useState<boolean>(false)

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
  console.log("dateFromLocalStorage => ", dateFromLocalStorage);
  //one hour from now
  const intervalTime = new Date(dateFromLocalStorage.getFullYear(), dateFromLocalStorage.getMonth(), dateFromLocalStorage.getDate(), dateFromLocalStorage.getHours() + 1, dateFromLocalStorage.getMinutes(), dateFromLocalStorage.getSeconds());
  console.log("intervalTime => ", intervalTime);

  const now = new Date();
  console.log("now => ", now);

  if (intervalTime < now) {
    console.log("intervalTime < now", intervalTime < now);
    localStorage.removeItem("token");
    localStorage.removeItem("dateNow");
    console.log("!!! removeItem dateNow  !!!");
  }


  return (
    <div className="nav_bar">
      <div onClick={handleMenuSwitch} className="menu_button"><Menu /></div>
      <nav className={`menu ${switchMenu ? 'open' : ''}`}>
        <NavLink className="nav_item" to="/patients">Patients</NavLink>
        <NavLink className="nav_item" to="/reports">Reports</NavLink>
        <NavLink className="nav_item" to="/kiosk">Kiosk</NavLink>
        <NavLink onClick={handlerLogout} className="nav_item" to="/">Log out</NavLink>
      </nav>
      <div className="logo"><Logo /></div>
    </div>
  )
}
