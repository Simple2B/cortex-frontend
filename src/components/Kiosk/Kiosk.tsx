import React, { ReactElement, useState, useEffect } from 'react';
import './kiosk.css';
import { clientApi } from "../../api/clientApi";
import { ReactComponent as Brain } from '../../images/brain.svg';
import { ReactComponent as Logo } from '../../images/cortex_logo.svg';
import { IPatient } from '../../types/patientsTypes';
import { NavLink } from 'react-router-dom';
import { instance } from "../../api/axiosInstance";


export default function Kiosk(): ReactElement {
  const [phoneQuery, setPhoneQuery] = useState('');
  const [welcomeText, setWelcomeText] = useState('Please enter your phone number');
  const [style, setStyle] = useState(false);
  // const [list, setList] = useState<IPatient[]>([]);
  // const [client, setClient] = useState<IPatient>({
  //   "api_key": "",
  //   "first_name": "",
  //   "last_name": "",
  //   "phone": "",
  //   "email": ""
  // });
  const [clients, setClients] = useState<IPatient[]>([]);


  // const getClient = async (phone: string) => {
  //   try {
  //     const response = await instance()
  //     .get(`api/client/kiosk/${phone}`);
  //     console.log("client kiosk => ", response.data);
  //     setClient(response.data);
  //   } catch (error: any) {
  //     // place to handle errors and rise custom errors
  //     console.log('GET: error message =>  ', error.message);
  //     console.log('error response client kiosk => ', error.response.data);
  //     throw new Error(error.message);
  //   };
  // };

  const getClients = async () => {
    try {
      const response = await instance()
      .get("api/client/clients");
      console.log("clients kiosk => ", response.data);
      setClients(response.data);
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', error.message);
      console.log('error response clients kiosk => ', error.response.data);
      throw new Error(error.message);
    };
  };

  useEffect(() => {
    // if (phoneQuery) {
    //   getClient(phoneQuery)
    // };

    getClients();

  }, [phoneQuery]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneQuery(e.target.value);
  };

  const linkToRegister = () => {
    <NavLink to="patient-registration">Registration form</ NavLink>
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    console.log("phoneQuery => ", phoneQuery);
    e.preventDefault();

    // const filteredName = client.first_name;
    // console.log("Kiosk -> client ", client);
    const clientFromDB = clients.filter(client => client.phone === phoneQuery);
    const filteredName = clientFromDB.length > 0 ? clientFromDB[0].first_name : false ;

    if (filteredName) {
          console.log('filteredName => ', filteredName);

          clientApi.identifyClientWithPhone(phoneQuery);

          setStyle(true);
          setWelcomeText(`Thanks ${filteredName}, have a seat and we’ll call your name shortly.`);
          setPhoneQuery('');

          const interval = setInterval(() => {
            setStyle(false);
            setWelcomeText('Please enter your phone number');
          }, 4000);
          return () => clearInterval(interval);

        } else {
          setStyle(false);
          setWelcomeText(`No such patience in base. Please fill Register Form`);
          setPhoneQuery('');

          const interval = setInterval(() => {
            setStyle(false);
            setWelcomeText('Please enter your phone number');
          }, 4000);
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
