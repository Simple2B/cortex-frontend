import React, { ReactElement, useState, useEffect } from 'react'
import './patientRegistration.css'
import Checkbox from './Checkbox';


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
  const [referring, setReferring] = useState('');
  const [otherLabel, setLabelOther] = useState('');

  const itemsConditions = [
    'Dizziness',
    'Headaches',
    'Ear infections',
    'Nausea',
    'Neck Pain',
    'Epilepsy',
    'Chronic sinus',
    'Migraines',
    'Anxiety',
    'Depression',
    'Throat issues',
    'Thyroid problems',
    'Asthma',
    'Ulcers',
    'Numbness in hands',
    'Disc problems',
    'Infertility',
    'Menstrual disorders',
    'High blood pressure',
    'Heart problems',
    'Digestive problems',
    'Kidney problems',
    'Bladder problems',
    'Numbness in legs',
    'Numbness in feet',
    'Low back pain',
    'Hip pain',
    'Shoulder pain',
    'Obesity',
    'Hormonal imbalance',
    'Liver disease',
    'Chronic fatigue',
    'Gastric reflux',
    'Lupus',
    'Fibromyalgia',
    'Chest pain',
    'Trouble concentrating',
    'Knee pain',
    'Nervousness',
    'Midback pain',
  ];

  const [checkboxes, setCheckboxes] = useState(itemsConditions);

  const [isChecked, setChecked] = useState(false);

  // const toggleCheckbox = (label: string) => {
  //   if (checkboxes.has(label)) {
  //     checkboxes.delete(label);
  //   } else {
  //     checkboxes.add(label);
  //   }
  // }


  const handleSubmit = (formSubmitEvent: any) => {
    formSubmitEvent.preventDefault();

    for (const checkbox of checkboxes) {
      console.log(checkbox, 'is selected.');
    }

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

      otherLabel: isChecked ? otherLabel : '',

    };
    console.log(data);
  }

  const createCheckbox = (label: string) => (
    <Checkbox
            label={label}
            handleCheckboxChange={() => {}}
            key={label}
        />
  )

  const createCheckboxes = () => (
    itemsConditions.map(createCheckbox)
  )

  const toggleCheckboxChange = () => {
    setChecked(!isChecked)
  }


  return (
    <>
      <div className="registration">
        <h1 className="registration_title">Registration Form</h1>
        <form className="registration_form">
          <input value={firstName} onChange={(e) => { setName(e.target.value) }} className="registration_input" placeholder="First Name" />
          <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} className="registration_input" placeholder="Last Name" />
          <input value={dateBirth} onChange={(e) => { setDateBirth(e.target.value) }} className="registration_input" placeholder="Date of Birth"/>
          <input value={address} onChange={(e) => { setAddress(e.target.value) }} className="registration_input" placeholder="Address" />
          <input value={city} onChange={(e) => { setCity(e.target.value) }} className="registration_input" placeholder="City" />
          <input value={state} onChange={(e) => { setState(e.target.value) }} className="registration_input" placeholder="State" />
          <input value={zip} onChange={(e) => { setZip(e.target.value) }} className="registration_input" placeholder="ZIP" />
          <input value={phone} onChange={(e) => { setPhone(e.target.value) }} className="registration_input" placeholder="Phone Number" />
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="registration_input" placeholder="Email" />

          <input value={referring} onChange={(e) => { setReferring(e.target.value) }} className="registration_input" placeholder="Who can we thank for referring you?" />
          <div className="reqFormTitleText">Check any conditions you CURRENTLY have <span className="asterisk">*</span></div>
          {createCheckboxes()}
          <div className="checkboxRegisterForms checkboxOtherRegisterForms">
            <label className="container">
              <input
                type="checkbox"
                // value={checkLabelOther}
                checked={isChecked}
                onChange={toggleCheckboxChange}
              />
              <span className="checkMark"></span>
              Other :
            </label>
            <input value={otherLabel} onChange={(e) => { setLabelOther(e.target.value) }} className="inputOtherCheckBoxRegForm" placeholder=""/>
          </div>

          <button onClick={handleSubmit} className="registration_button">Registration</button>
        </form>
      </div>
    </>
  )
}
