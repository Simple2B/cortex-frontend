import React, { ReactElement, useState } from 'react'
import { ReactComponent as Brain } from '../../images/brain.svg'
import { ReactComponent as Logo } from '../../images/cortex_logo.svg'
import { IPatient } from '../../types/patientsTypes'
import { patientsList } from '../../fakeBase'
import './kiosk.css'


export default function Kiosk(): ReactElement {
  const [phoneQuery, setPhoneQuery] = useState('');
  const [welcomeText, setWelcomeText] = useState('Please enter your phone number')
  const [list, setList] = useState<IPatient[]>([...patientsList])
  const [filteredPhone, setFilteredPhone] = useState<IPatient[]>([])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneQuery(e.target.value);
  };
  console.log(patientsList);

  const handleSubmit = () => {
    console.log(phoneQuery);
    const filteredName = list.filter(number => number.phone === phoneQuery).map(user => user.name).toString()
    setWelcomeText(`Thanks ${filteredName}, have a seat and we’ll call your name shortly.`)
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
      </form>
    </div>
  )
}
