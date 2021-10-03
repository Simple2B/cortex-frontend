import React, { ReactElement, useState } from 'react'
import Popup from 'reactjs-popup';
import { patientsList } from '../../fakeBase'
import NavBar from '../NavBar/NavBar';
import './queue.css'

interface User {
  name: string,
  lastName: string,
}


export default function Queue(): ReactElement {
  const [queue, setQueue] = useState<User[]>([]);
  const [patients, setPatients] = useState(patientsList)

  const addPatient = (patient: User) => {
    setQueue((prev: User[]) => [...prev, patient]);
  };

  // const patientComponents = patients.map((item, index )=> (
  //   <div className="queue_list" onClick={(e: any) => {
  //     const copyListPatients = [...patients];
  //     const patient_target = e.target.innerText.split(",");
  //     if (patient_target[0].toLowerCase().trim() === copyListPatients[index].lastName.toLowerCase().trim() && patient_target[1].toLowerCase().trim() === copyListPatients[index].name.toLowerCase().trim()) {
  //       addPatient({ name: item.name, lastName: item.lastName });
  //       setPatients(patients.filter(patient => patient !== item));
  //     }
  //   }}>{item.lastName}, {item.name}</div>
  // ))

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
            <div className="queue_list" key={index}>{item.lastName}, {item.name}</div>
          ))
        }
        <Popup trigger={<button className="queue_add_button">+Add new</button>} modal>
          <div className="modal_window">
            {
              patients.map((item, index )=> (
                <div className="queue_list" onClick={(e: any) => {
                  const copyListPatients = [...patients];
                  const patient_target = e.target.innerText.split(",");
                  if (patient_target[0].toLowerCase().trim() === copyListPatients[index].lastName.toLowerCase().trim() && patient_target[1].toLowerCase().trim() === copyListPatients[index].name.toLowerCase().trim()) {
                    addPatient({ name: item.name, lastName: item.lastName });
                    setPatients(patients.filter(patient => patient !== item));
                  }
                }}>{item.lastName}, {item.name}</div>
              ))
            }
          </div>
        </Popup>
      </div>
    </>
  )
}
