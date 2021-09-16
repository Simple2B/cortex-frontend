import React, { ReactElement, useState } from 'react'
import { ReactComponent as Brain } from '../../images/brain.svg'
import { ReactComponent as Logo } from '../../images/cortex_logo.svg'
import { IPatient } from '../../types/patientsTypes'
import { patientsList } from '../../fakeBase'
import './kiosk.css'
import { NavLink } from 'react-router-dom'


export default function Kiosk(): ReactElement {
  const [phoneQuery, setPhoneQuery] = useState('');
  const [welcomeText, setWelcomeText] = useState('Please enter your phone number')
  const [list, setList] = useState<IPatient[]>([...patientsList])
  const [filteredPhone, setFilteredPhone] = useState<IPatient[]>([])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneQuery(e.target.value);
  };
  console.log(patientsList);

  const linkToRegister = () => {
    <NavLink to="patient-registration">Registration form</ NavLink>
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    console.log(phoneQuery);
    const filteredName = list.filter(number => number.phone === phoneQuery).map(user => user.name).toString()
    e.preventDefault();
    if (filteredName) {
      setWelcomeText(`Thanks ${filteredName}, have a seat and we’ll call your name shortly.`)
    } else {
      setWelcomeText(`No such patience in base. Please fill Register Form`)
    }

  };

  return (
    <div className="kiosk">
      <div className="kiosk_image">
        <Brain />
      </div>
      <div className="cortex_logo">
        <Logo />
      </div>
      <div className="kiosk_welcome_text">
        {welcomeText}
      </div>
      <form className="kiosk_form">
        <input type="phone" value={phoneQuery} onChange={handlePhoneChange} className="kiosk_input" placeholder="PHONE" />
        <button onClick={handleSubmit}
          disabled={
            phoneQuery === ""
          } className="kiosk_button">LOGIN</button>
        <div className="redirect_registr">Not our patient yet? Please fill</div>
        <NavLink className="form_registr" to="patient-registration">Registration form</ NavLink>
      </form>
    </div>
  )
}
