import React, { ReactElement, useEffect, useState } from 'react'
import { ReactComponent as SearchIcon } from '../../images/lupa.svg'
import { IPatient } from '../../types/patientsTypes'
import NavBar from '../NavBar/NavBar'
import './patients.css'


export default function Patients(): ReactElement {
  const [query, setQuery] = useState<string>('');
  const [list, setList] = useState<IPatient[]>([]);
  const [filteredList, setFilteredList] = useState<IPatient[]>([]);


  const patientsSearching = (query: string) => {
    const filteredList = [...list]
      .filter(patient => (patient.first_name + patient.last_name)
        .toLowerCase()
        .includes(query.toLowerCase()));
    setQuery(query)
    setFilteredList(filteredList)
  }

  const patientComponents = filteredList.map(item => (
    <div className="patients_items">{item.last_name}, {item.first_name}</div>
  ))

  useEffect(() => {
    patientsSearching(query)
  }, [query])

  return (
    <>
      <NavBar />

      <div className="patients">
        <h1 className="patients_title">Patients</h1>
        <div className="input_search">
          <SearchIcon className="search_icon" />
          <input value={query} onChange={(e) => {
            setQuery(e.target.value);
          }} className="patients_search" placeholder="Search" />
        </div>

        <div className="patients_list">{patientComponents}</div>
      </div>
    </>
  )
}
