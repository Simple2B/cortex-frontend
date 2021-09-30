import React, { ReactElement, useState, useEffect } from 'react'
import './patientRegistration.css'
import Checkbox from './Checkbox';
import { authApi } from '../../api/authApi';


export default function PatientRegistration(): ReactElement {
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');

  // const [startDate, setStartDate] = useState<any>(new Date());
  const [dateBirth, setDateBirth] = useState<any>(new Date());
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [referring, setReferring] = useState('');
  const [otherLabel, setLabelOther] = useState('');
  const [medications, setMedications] = useState('');
  const [testedPositive, setTestedPositive] = useState('');
  const [covidVaccine, setCovidVaccine] = useState('');
  const [stressfulLevel, setStressfulLevel] = useState<number>();
  const [consentMinorChild, setConsentMinorChild] = useState('');
  const [relationshipChild, setRelationshipChild] = useState('');

  const [conditionsError, setConditionsError] = useState('');
  const [followingError, setFollowingError] = useState('');
  const [stressfulLevelError, setStressfulLevelError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [emailError, setEmailError] = useState('');


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

  const itemsFollowing = [
    'Concussion',
    'Stroke',
    'Cancer',
    'Diabetes',
    'Heart Disease',
    'Seizures',
    'Spinal bone fracture',
    'Scoliosis',
  ]
  const [checkboxes, setCheckboxes] = useState(new Set());

  const [checkboxesFollowing, setCheckboxesFollowing] = useState(new Set());

  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = (label: string) => {
    let item = label;
    let indexItem: number = itemsConditions.indexOf(item)
    let value: string = itemsConditions[indexItem];
    const updatedCheckboxes = new Set(checkboxes);
    if (checkboxes.has(label) || label != value) {
      updatedCheckboxes.delete(label);
      setCheckboxes(updatedCheckboxes);
    } else {
      updatedCheckboxes.add(value);
      setCheckboxes(updatedCheckboxes);
    }
  }

  const toggleCheckboxFollowing = (label: string) => {
    let item = label;
    let indexItem: number = itemsFollowing.indexOf(item)
    let value: string = itemsFollowing[indexItem];
    const updatedCheckboxes = new Set(checkboxesFollowing);
    if (checkboxesFollowing.has(label) || label != value) {
      updatedCheckboxes.delete(label);
      setCheckboxesFollowing(updatedCheckboxes);
    } else {
      updatedCheckboxes.add(value);
      setCheckboxesFollowing(updatedCheckboxes);
    }
  }


  const handleSubmit = (formSubmitEvent: any) => {
    formSubmitEvent.preventDefault();

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

      checkBoxesСonditions: {
        conditions: checkboxes,
        otherLabel: isChecked ? otherLabel : '',
      },
      checkboxesFollowing: checkboxesFollowing,
      medications: medications,
      testedPositive: testedPositive,
      covidVaccine: covidVaccine,
      stressfulLevel: stressfulLevel,
      consentMinorChild: isChecked ? consentMinorChild : '',
      relationshipChild: relationshipChild,

    };

    if (data.checkBoxesСonditions.conditions.size == 0 ) {
      setConditionsError('Some should be chosen')
    } else if (data.checkboxesFollowing.size == 0) {
      setFollowingError('Some should be chosen')
    } else if (stressfulLevel === undefined) {
      setStressfulLevelError('Note the level of stress')
    } else if (phone === "") {
      setPhoneError("You must enter phone number")
    } else if (email === "") {
      setEmailError("You must enter phone email")
    } else {
      setConditionsError("");
      setFollowingError("");
      setStressfulLevelError("");
      setPhoneError("");
      setEmailError("");
      // authApi.registrationClient(data)

      setName('');
      setLastName('');
      setDateBirth('');
      setAddress('');
      setCity('');
      setState('');
      setZip('');
      setPhone('');
      setEmail('');
      setReferring('');
      setLabelOther('');
      setMedications('');
      setTestedPositive('');
      setCovidVaccine('');
      setStressfulLevel(undefined);
      setConsentMinorChild('');
      setRelationshipChild('');
      // setChecked(false);

      console.log(data);

    }
  }


  const createCheckbox = (label: string) => (
    <Checkbox
            label={label}
            handleCheckboxChange={toggleCheckbox}
            key={label}
            checked={checkboxes.has(label)}
        />
  )

  const createCheckboxFollowing = (label: string) => (
    <Checkbox
            label={label}
            handleCheckboxChange={toggleCheckboxFollowing}
            key={label}
            checked={checkboxesFollowing.has(label)}
        />
  )

  const createCheckboxes = () => (
    itemsConditions.map(createCheckbox)
  )

  const createCheckboxesFollowing = () => (
    itemsFollowing.map(createCheckboxFollowing)
  )

  const toggleCheckboxChange = () => {
    setChecked(!isChecked)
  }


  const handleChangeTestedPositive = (e: any) => {
    setTestedPositive(e.target.value)
  }

  const handleChangCovidVaccine = (e: any) => {
    setCovidVaccine(e.target.value)
  }

  const handleChangStressfulLevel = (e: any) => {
    setStressfulLevel(e.target.value)
  }

  const handleChangConsentMinorChild = (e: any) => {
    toggleCheckboxChange()
    setConsentMinorChild(e.target.value)
  }

  const stressLevel = Array.from({length: 10}, (_, i) => i + 1);

  return (
    <>
      <div className="registration">
        <h1 className="registration_title">Registration Form</h1>
        <form className="registration_form">
          <input value={firstName} onChange={(e) => { setName(e.target.value) }} className="registration_input" placeholder="First Name" />
          <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} className="registration_input" placeholder="Last Name" />
          <div className="registration_input">
            <input value={dateBirth} onChange={(e) => { setDateBirth(e.target.value) }} className="registration_input_data"  type="date"/>
          </div>

          <input value={address} onChange={(e) => { setAddress(e.target.value) }} className="registration_input" placeholder="Address" />
          <input value={city} onChange={(e) => { setCity(e.target.value) }} className="registration_input" placeholder="City" />
          <input value={state} onChange={(e) => { setState(e.target.value) }} className="registration_input" placeholder="State" />
          <input value={zip} onChange={(e) => { setZip(e.target.value) }} className="registration_input" placeholder="ZIP" />

          <div className="registration_input">
            <input value={phone} onChange={(e) => { setPhone(e.target.value) }} className="registration_input_data" placeholder="Phone Number" />
            <span className="asterisk positionAsterisk">*</span>
          </div>
          <div className="reqFormTitleText error">{phoneError}</div>

          <div className="registration_input">
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="registration_input_data" placeholder="Email" />
            <span className="asterisk positionAsterisk">*</span>
          </div>
          <div className="reqFormTitleText error">{emailError}</div>

          <input value={referring} onChange={(e) => { setReferring(e.target.value) }} className="registration_input" placeholder="Who can we thank for referring you?" />
          <div className="reqFormTitleText">Check any conditions you CURRENTLY have <span className="asterisk">*</span></div>

          <div className="reqFormTitleText error">{checkboxes.has("") ? null: conditionsError}</div>
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

          <div className="reqFormTitleText">Have you ever had any of the following? <span className="asterisk">*</span></div>
          <div className="reqFormTitleText error">{followingError}</div>
          {createCheckboxesFollowing()}


          <div className="registration_input">
            <input value={medications} onChange={(e) => { setMedications(e.target.value) }} className="registration_input_data" placeholder="List all current medications" />
            <span className="asterisk positionAsterisk">*</span>
          </div>


          <div className="reqFormTitleText">This question is used for research purposes. Have you tested positive for COVID-19?</div>

          <div className="checkboxRegisterForms">
            <label className="containerRadiobutton">
                Yes
                <input
                  value="yes"
                  name="tested_positive"
                  type="radio"
                  onChange={handleChangeTestedPositive}
                />
                <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
                No
                <input
                  value="no"
                  name="tested_positive"
                  type="radio"
                  onChange={handleChangeTestedPositive}
                />
                <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
                Rather not say
                <input
                  value="Rather not say"
                  name="tested_positive"
                  type="radio"
                  onChange={handleChangeTestedPositive}
                />
                <span className="checkmarkRadiobutton"></span>
            </label>
          </div>

          <div className="reqFormTitleText">This question is used for research purposes on the effects of the COVID-19 vaccine and its potential effects on the brain and nervous system. Have you received the COVID-19 vaccine?</div>
          {/* <div className="reqFormTitleText error">{covidVaccineError}</div> */}
          <div className="checkboxRegisterForms">
            <label className="containerRadiobutton">
                Yes
                <input
                  value="yes"
                  name="CovidVaccine"
                  type="radio"
                  onChange={handleChangCovidVaccine}
                />
                <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
                No
                <input
                  value="no"
                  name="CovidVaccine"
                  type="radio"
                  onChange={handleChangCovidVaccine}
                />
                <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
                Rather not say
                <input
                  value="Rather not say"
                  name="CovidVaccine"
                  type="radio"
                  onChange={handleChangCovidVaccine}
                />
                <span className="checkmarkRadiobutton"></span>
            </label>
          </div>

          <div className="reqFormTitleText">On a scale of 1-10 how stressful has your life been? <span className="asterisk">*</span></div>
          <div className="reqFormTitleText error">{stressfulLevelError}</div>

          <div className="containerCheckboxStressfulLevel">
            <div className="reqFormSubTitleText">Not stressful</div>

              <div className="reqFormButtonsStressfulLevel">
                { stressLevel.map((level) => {
                  return <div key={level}>
                      <label className="containerRadiobutton containerRadiobuttonStressfulLevel">
                          <div className="level">{level}</div>
                          <input
                            value={level}
                            name="stressfulLevel"
                            type="radio"
                            onChange={handleChangStressfulLevel}
                          />
                          <span className="checkmarkRadiobutton checkmarkRadiobuttonStressfulLevel"></span>
                      </label>
                    </div>
                })
                }
              </div>

            <div className="reqFormSubTitleText">Very stressful</div>
          </div>

          <div className="reqFormTitleText"> Consent for a minor child
            <br/>
            <div className="reqFormSubTitleText">I authorize Doctor to perform diagnostic procedures and render chiropractic care and adjustments to my minor child.</div>
          </div>
          <div className="reqFormTitleText">Consent</div>

          <div className="checkboxRegisterForms checkboxOtherRegisterForms">
            <label className="container">
              <input
                type="checkbox"
                value="I consent"
                checked={isChecked}
                onChange={handleChangConsentMinorChild}
              />
              <span className="checkMark"></span>
              I consent
            </label>
          </div>

          <div className="reqFormTitleText">Relationship to child</div>
          <input value={relationshipChild} onChange={(e) => { setRelationshipChild(e.target.value) }} className="inputRelationshipChild" placeholder=""/>
          <button onClick={handleSubmit} className="registration_button">Registration</button>
        </form>
      </div>
    </>
  )
}
