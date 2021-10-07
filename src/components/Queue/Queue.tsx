import React, { ReactElement, useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
import axios from 'axios';
import { clientApi } from "../../api/clientApi";
import NavBar from '../NavBar/NavBar';
import './queue.css'

interface User {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
}

export default function Queue(): ReactElement {
  const [queue, setQueue] = useState<User[]>([]);
  const [patients, setPatients] = useState<User[]>([])

  useEffect(() => {
    // // GET request using axios inside useEffect React hook
    axios.get('https://cortex.simple2b.net/api/client/clients')
        .then(response => {
          console.log("clients => ", response.data)
          setPatients(response.data)
        });
  }, []);


  useEffect(() => {
    // // GET request using axios inside useEffect React hook
    axios.get('https://cortex.simple2b.net/api/client/queue')
        .then(response => {
          console.log("queue => ", response.data)
          setQueue(response.data)
        });
  }, [patients]);

  const addPatient = (patient: User) => {
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
          queue.map((item, index) => (
            <div className="queue_list" key={index}>{item.last_name}, {item.first_name}</div>
          ))
        }
        <Popup trigger={<button className="queue_add_button">+Add new</button>} modal>
          <div className="modal_window">
            {
              patients.map((item, index )=> (
                <div className="queue_list" key={index} onClick={(e: any) => {
                  const copyListPatients = [...patients];
                  const patient_target = e.target.innerText.split(",");
                    clientApi.addClientToQueue(item);
                    setPatients(patients.filter(patient => patient !== item));
                    addPatient(item);
                }}>{item.last_name}, {item.first_name}</div>
              ))
            }
          </div>
        </Popup>
      </div>
    </>
  )
}
