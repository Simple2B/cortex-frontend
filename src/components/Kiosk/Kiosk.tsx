import React, { ReactElement, useState, useEffect } from 'react';
import './kiosk.css';
import { ReactComponent as Brain } from '../../images/brain.svg';
import { ReactComponent as Logo } from '../../images/cortex_logo.svg';
import { IPatient } from '../../types/patientsTypes';
import { NavLink } from 'react-router-dom';
import { instance } from "../../api/axiosInstance";


export default function Kiosk(): ReactElement {
  const [phoneQuery, setPhoneQuery] = useState('');
  const [welcomeText, setWelcomeText] = useState('Please enter your phone number');
  const [style, setStyle] = useState(false);
  const [list, setList] = useState<IPatient[]>([]);
  const [filteredPhone, setFilteredPhone] = useState<IPatient[]>([]);

  const getClients = async () => {
    try {
      const response = await instance()
      .get('api/client/clients');
      console.log("clients => ", response.data);
      setList(response.data);
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', error.message);
      console.log('error response data client identify with phone => ', error.response.data);
      throw new Error(error.message);
    };
  };

  useEffect(() => {
    getClients()
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneQuery(e.target.value);
  };

  const linkToRegister = () => {
    <NavLink to="patient-registration">Registration form</ NavLink>
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    console.log(phoneQuery);
    const filteredName = list.filter(number => number.phone === phoneQuery).map(user => user.first_name).toString()
    e.preventDefault();

    if (filteredName) {
          setStyle(true);
          setWelcomeText(`Thanks ${filteredName}, have a seat and we’ll call your name shortly.`);
          setPhoneQuery('');

          const interval = setInterval(() => {
            setStyle(false);
            setWelcomeText('Please enter your phone number');
          }, 3000);
          return () => clearInterval(interval);

        } else {
          setStyle(false);
          setWelcomeText(`No such patience in base. Please fill Register Form`);
          setPhoneQuery('');

          const interval = setInterval(() => {
            setStyle(false);
            setWelcomeText('Please enter your phone number');
          }, 3000);
          return () => clearInterval(interval);
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
      <div className={!style ? "kiosk_welcome_text" : "alert_text welcome_text"}>
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
