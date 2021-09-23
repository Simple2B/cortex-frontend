import React, { ReactElement, useState } from 'react'
import './patientRegistration.css'


export default function PatientRegistration(): ReactElement {
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateBirth, setDateBirth] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      dateBirth: dateBirth,

      address: address,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email,
    };
    console.log(data);
  }

  return (
    <>
      <div className="registration">
        <h1 className="registration_title">Registration Form</h1>
        <form className="registration_form">
          <input value={firstName} onChange={(e) => { setName(e.target.value) }} className="registration_input" placeholder="First Name" />
          <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} className="registration_input" placeholder="Last Name" />
          <input value={dateBirth} onChange={(e) => { setLastName(e.target.value) }} className="registration_input" placeholder="Date of Birth" type="date"/>
          <input value={address} onChange={(e) => { setAddress(e.target.value) }} className="registration_input" placeholder="Address" />
          <input value={city} onChange={(e) => { setCity(e.target.value) }} className="registration_input" placeholder="City" />
          <input value={state} onChange={(e) => { setState(e.target.value) }} className="registration_input" placeholder="State" />
          <input value={zip} onChange={(e) => { setZip(e.target.value) }} className="registration_input" placeholder="ZIP" />
          <input value={phone} onChange={(e) => { setPhone(e.target.value) }} className="registration_input" placeholder="Phone Number" />
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="registration_input" placeholder="Email" />

          <button onClick={handleSubmit} className="registration_button">Registration</button>
        </form>
      </div>
    </>
  )
}
