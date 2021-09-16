import React, { ReactElement, useState } from 'react'
import Popup from 'reactjs-popup';
import { patientsList } from '../../fakeBase'
import NavBar from '../NavBar/NavBar';
import './queue.css'



export default function Queue(): ReactElement {
  const [queue, setQueue] = useState<any[]>([])

  const addPatient = (patient: any) => {
    setQueue((prev) => {
      return [...prev, patient];
    });
  }

  const patientComponents = patientsList.map(item => (
    <div className="queue_list" onClick={() => {
      addPatient({ name: item.name, lastName: item.lastName })
    }}>{item.lastName}, {item.name}</div>
  ))

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


        {queue.map(item => (
          <div className="queue_list">{item.lastName}, {item.name}</div>
        ))}

        <Popup trigger={<button className="queue_add_button">+Add new</button>} modal>
          <div className="modal_window">{patientComponents}</div>
        </Popup>


      </div>

    </>
  )
}
