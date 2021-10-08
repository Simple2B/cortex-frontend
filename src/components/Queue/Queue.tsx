import React, { ReactElement, useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
// import axios from 'axios';
import { clientApi } from "../../api/clientApi";
import NavBar from '../NavBar/NavBar';
import { instance } from "../../api/axiosInstance";
import './queue.css'

interface User {
    id: number,
    api_key: string,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
}

export default function Queue(): ReactElement {
  const [queue, setQueue] = useState<User[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  let patients = getClients();

  function saveClients(clients: User[]): void {
    localStorage.setItem('clients', JSON.stringify(clients));
  }

 function getClients(): User[] {
  const clients: any = localStorage.getItem('clients');
    try {
      const patients = JSON.parse(clients)
      return patients;
    } catch (error: any) {
      throw new Error(error.message);
    }
}

  const GetClientsForQueue = async () => {
    try {
      const response = await instance()
      .get('api/client/queue')
      console.log("clients in queue => ", response.data)
      // console.log(response.headers);
      if (response.data !== []) {
        console.log(" response.data -> queue  ", response.data);
        let filterPatients: User[] = [];
        for (let j = 0; j < response.data.length; j ++ ){
          filterPatients = patients.filter(client => client.id !== response.data[j].id);
        }
        console.log(" filterPatients -> queue  ", filterPatients);
        saveClients(filterPatients);
          // setClients(filterPatients);
      }
      setQueue(response.data);
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', new Error(error.message));
      console.log('error response data queue => ', error.response.data);
      throw new Error(error.message);
    }
  };

  const GetClients = async () => {
    try {
      const response = await instance()
      .get('api/client/clients');
      console.log("clients => ", response.data);
      const clients = response.data;
      saveClients(clients);
      // return clients
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', error.message);
      console.log('error response data clients => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    GetClients();
    GetClientsForQueue();

    setClients(patients);
  }, []);

  const addClient = (patient: User) => {
    setQueue((prev: User[]) => [...prev, patient]);

    console.log("addPatient: clients => ", clients);
    console.log("addPatient: queue => ", queue);

    let filterClients = clients.filter(client => client.id !== patient.id);
    console.log("filterClients => ", filterClients);
    saveClients(filterClients);
    // setClients(filterClients);
  };

  console.log("filtered patients => ", clients);

  return (
    <>
      <NavBar />
      <div className="rogue"><div className="rogue_mode">Rogue Mode</div>
        <div className="button b2" id="button-10">
          <input defaultChecked={true} type="checkbox" className="checkbox" />
          <div className="knobs">
            <span>On</span>
          </div>
          <div className="layer"></div>
        </div>
      </div>
      <div className="queue">
        <h1 className="queue_title">The Queue</h1>
        {
          queue.map((patient, index) => (
            <div className="queue_list" key={index}>{patient.last_name}, {patient.first_name}</div>
          ))
        }
        <Popup trigger={<button className="queue_add_button">+Add new</button>} modal>
          <div className="modal_window">
            {
              clients.map((patient, index )=> (
                <div className="queue_list" key={index} onClick={(e: any) => {
                  const copyListPatients = [...clients];
                  const patient_target = e.target.innerText.split(",");
                    clientApi.addClientToQueue(patient);
                    // setClients(clients.filter(client => client !== patient));
                    addClient(patient);
                }}>{patient.last_name}, {patient.first_name}</div>
              ))
            }
          </div>
        </Popup>
      </div>
    </>
  )
}
