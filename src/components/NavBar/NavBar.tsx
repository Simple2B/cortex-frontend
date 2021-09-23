import React, { ReactElement, useState } from 'react'
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
    logout()
    // localStorage.removeItem("token")
  }

  return (
    <div className="nav_bar">
      <div onClick={handleMenuSwitch} className="menu_button"><Menu /></div>
      <nav className={`menu ${switchMenu ? 'open' : ''}`}>
        <NavLink className="nav_item" to="/patients">Patients</NavLink>
        <NavLink className="nav_item" to="/reports">Reports</NavLink>
        <NavLink className="nav_item" to="/kiosk">Kiosk</NavLink>
        <NavLink onClick={handlerLogout} className="nav_item" to="/login">Log out</NavLink>
      </nav>
      <div className="logo"><Logo /></div>
    </div>
  )
}
