import React, { ReactElement, useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
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

  const getClientsForQueue = async () => {
    try {
      const response = await instance()
      .get('api/client/queue')
      console.log("clients in queue => ", response.data)
      setQueue(response.data);
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', new Error(error.message));
      console.log('error response data queue => ', error.response.data);
      throw new Error(error.message);
    }
  };

  const getClients = async () => {
    try {
      const response = await instance()
      .get('api/client/clients');
      console.log("clients => ", response.data);
      setClients(response.data);
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', error.message);
      console.log('error response data clients => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClients();
    getClientsForQueue();
  }, []);

  const addClient = (patient: User) => {
    setQueue((prev: User[]) => [...prev, patient]);
  };

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
            { clients.filter(client => !(queue.map(q => q.id)).includes(client.id)).map((patient, index )=> (
                <div className="queue_list" key={index} onClick={(e: any) => {
                  const copyListPatients = [...clients];
                  const patient_target = e.target.innerText.split(",");
                    clientApi.addClientToQueue(patient);
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
