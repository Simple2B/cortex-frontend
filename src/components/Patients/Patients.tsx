import React, { ReactElement, useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
import { clientApi } from "../../api/clientApi";
import NavBar from '../NavBar/NavBar';
import { instance } from "../../api/axiosInstance";
import { User } from "../../types/patientsTypes";
import { ReactComponent as SearchIcon } from '../../images/lupa.svg'
import './Patients.sass'
import { NavLink } from 'react-router-dom';

export default function Patient(): ReactElement {
  const [clients, setClients] = useState<User[]>([]);

  const [search, setSearch] = useState<string>('');

  const getClients = async () => {
    try {
      const response = await instance()
      .get('api/client/clients');
      console.log("clients => ", response.data);
      setClients(response.data);
    } catch (error: any) {
      console.log('GET: error message =>  ', error.message);
      console.log('error response data clients => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <NavBar />
      <div className="patientsContainer">
        <h1 className="queue_title">Patients</h1>
        <div className="patients_input_search">
            <SearchIcon className="patients_search_icon" />
            <input className="patients_patients_search" placeholder="Search" value={search} onChange={(e) => {
                    setSearch(e.target.value);}}/>
        </div>

        <div className="lists">
            { clients.length > 0
            ?
            clients.filter(client => {
              if (search === '') {
                  return client;
              } else if ((client.first_name + client.last_name).toLowerCase().includes(search.toLowerCase())) {
                return client;
              }
            })
            .map((patient, index) => (
              <div className="queue_list" key={index} >
                  <NavLink to={`/${patient.api_key}/${patient.first_name}`} >
                    <div className="list"  onClick={() => {clientApi.clientIntake({"api_key": patient.api_key, "rougue_mode": true})}}>
                        {patient.last_name}, {patient.first_name}
                    </div>
                  </NavLink>
              </div>
            ))
            :
            <div className="infoMessage">NO PATIENTS</div>
            }
        </div>
      </div>
    </>
  )
}
