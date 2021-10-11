import React, { ReactElement, useContext, useState } from "react";
import { Redirect } from 'react-router';
import "./patientRegistration.css";
import Checkbox from "./Checkbox";
import { IPatientForm } from "../../types/patientsTypes";
import { useForm } from "./hook_useForm";
import { clientApi } from "../../api/clientApi";

const itemsConditions = [
  "Dizziness",
  "Headaches",
  "Ear infections",
  "Nausea",
  "Neck Pain",
  "Epilepsy",
  "Chronic sinus",
  "Migraines",
  "Anxiety",
  "Depression",
  "Throat issues",
  "Thyroid problems",
  "Asthma",
  "Ulcers",
  "Numbness in hands",
  "Disc problems",
  "Infertility",
  "Menstrual disorders",
  "High blood pressure",
  "Heart problems",
  "Digestive problems",
  "Kidney problems",
  "Bladder problems",
  "Numbness in legs",
  "Numbness in feet",
  "Low back pain",
  "Hip pain",
  "Shoulder pain",
  "Obesity",
  "Hormonal imbalance",
  "Liver disease",
  "Chronic fatigue",
  "Gastric reflux",
  "Lupus",
  "Fibromyalgia",
  "Chest pain",
  "Trouble concentrating",
  "Knee pain",
  "Nervousness",
  "Midback pain",
];

const itemsFollowing = [
  "Concussion",
  "Stroke",
  "Cancer",
  "Diabetes",
  "Heart Disease",
  "Seizures",
  "Spinal bone fracture",
  "Scoliosis",
];

const initialState = {
  firstName: "",
  lastName: "",
  birthday: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  referring: "",
  conditions: new Set(""),
  conditionError: "",
  checkedOtherCondition: false,
  otherCondition: "",
  diseases: new Set(""),
  diseaseError: "",
  medications: "",
  covidTestedPositive: null,
  covidVaccine: null,
  stressfulLevel: "",
  consentMinorChild: false,
  relationshipChild: "",
};

export default function PatientRegistration(): ReactElement {
  const validateForm = (values: IPatientForm) => {
    let errors: Partial<IPatientForm> = {};
    if (values.firstName.trim() === "") {
      errors.firstName = "First name must not be empty";
    }

    if (values.lastName.trim() === "") {
      errors.lastName = "Last name must not be empty";
    }

    const regexPhoneNumber = new RegExp(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );

    if (values.phone.trim() === "") {
      errors.phone = "Phone must not be empty";
    } else if (!regexPhoneNumber.test(values.phone)) {
      errors.phone = "Incorrect phone number. Must be like xxx-xxx-xxxx";
    }

    const regexEmail = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

    if (values.email.trim() === "") {
      errors.email = "Phone must not be empty";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Incorrect email. Must be like email@email.com";
    }

    if (values.conditions.size === 0) {
      errors.conditionError = "Yuo must choose some condition";
    }

    if (values.diseases.size === 0) {
      errors.diseaseError = "Yuo must choose some disease";
    }

    if (values.medications.trim() === "") {
      errors.medications = "Medications must not be empty";
    }

    if (values.stressfulLevel === "") {
      errors.stressfulLevel = "Stressfull level must be choose";
    }

    return errors;
  };

  const createCheckbox = (label: string) => (
    <Checkbox
      label={label}
      handleCheckboxChange={toggleCheckbox}
      key={label}
      checked={values.conditions.has(label)}
    />
  );

  const createCheckboxFollowing = (label: string) => (
    <Checkbox
      label={label}
      handleCheckboxChange={toggleCheckboxFollowing}
      key={label}
      checked={values.diseases.has(label)}
    />
  );



  const {
    values,
    errors,
    submitted,
    toggleCheckbox,
    toggleCheckboxFollowing,
    toggleCheckboxChange,
    toggleCheckboxConsent,
    onChange,
    onSubmit,
  } = useForm(clientApi.registrationClient, initialState, validateForm);

  if (errors) {
    console.log("errors => ", errors)
  }


  const createCheckboxes = () => itemsConditions.map(createCheckbox);

  const createCheckboxesFollowing = () =>
    itemsFollowing.map(createCheckboxFollowing);

  const stressLevel = Array.from({ length: 10 }, (_, i) => i + 1);


  if (submitted) {
    return <Redirect push to={{
      pathname: '/kiosk',
    }}
    />
  }

  return (
    <>
      <div className="registration">
        <h1 className="registration_title">Registration Form</h1>
        <form onSubmit={onSubmit} noValidate className="registration_form">
          <div className="registration_input" >
            <input
              name="firstName"
              value={values.firstName.trim() || ""}
              onChange={onChange}
              className={`registration_input_data ${
                errors.firstName && "is-invalid"
              }`}
              placeholder="First Name"
            />{" "}
            <span className="asterisk positionAsterisk">*</span>
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          <div className="registration_input">
            <input
              name="lastName"
              value={values.lastName.trim() || ""}
              onChange={onChange}
              className={`registration_input_data ${
                errors.lastName && "is-invalid"
              }`}
              placeholder="Last Name"
            />{" "}
            <span className="asterisk positionAsterisk">*</span>
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          <div className="registration_input registration_input_birth">
            <input
              name="birthday"
              value={values.birthday.trim() || ""}
              onChange={onChange}
              className={`registration_input_data input_birth`}
              type="date"
            />
            <div className="label_birth">
              { values.birthday === "" ?
                'Date of birth' :
                values.birthday
              }
            </div>
          </div>

          <input
            value={values.address.trim()}
            name="address"
            onChange={onChange}
            className="registration_input"
            placeholder="Address"
          />
          <input
            value={values.city.trim()}
            name="city"
            onChange={onChange}
            className="registration_input"
            placeholder="City"
          />
          <input
            value={values.state.trim()}
            name="state"
            onChange={onChange}
            className="registration_input"
            placeholder="State"
          />
          <input
            value={values.zip.trim()}
            name="zip"
            onChange={onChange}
            className="registration_input"
            placeholder="ZIP"
          />

          <div className="registration_input">
            <input
              name="phone"
              value={values.phone.trim()}
              onChange={onChange}
              className={`registration_input_data ${
                errors.phone && "is-invalid"
              }`}
              placeholder="Phone Number"
            />{" "}
            <span className="asterisk positionAsterisk">*</span>
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <div className="registration_input">
            <input
              name="email"
              value={values.email.trim() || ""}
              onChange={onChange}
              className={`registration_input_data ${
                errors.email && "is-invalid"
              }`}
              placeholder="Email"
            />{" "}
            <span className="asterisk positionAsterisk">*</span>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <input
            value={values.referring.trim()}
            name="referring"
            onChange={onChange}
            className="registration_input"
            placeholder="Who can we thank for referring you?"
          />

          <div
            className={`reqFormTitleText ${
              errors.conditionError && "is-invalid"
            }`}
          >
            Check any conditions you CURRENTLY have{" "}
            <span className="asterisk">*</span>
            {errors.conditionError && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.conditionError}
              </div>
            )}
          </div>
          {createCheckboxes()}

          <div className="checkboxRegisterForms checkboxOtherRegisterForms">
            <label className="containerOtherCondition">
              <input
                type="checkbox"
                checked={values.checkedOtherCondition}
                onChange={toggleCheckboxChange}
              />
              <span className="checkMark"></span>
              Other :
            </label>
            <input
              value={values.otherCondition}
              name="otherCondition"
              onChange={onChange}
              className="inputOtherCheckBoxRegForm"
              placeholder=""
            />
          </div>

          <div
            className={`reqFormTitleText ${
              errors.diseaseError && "is-invalid"
            }`}
          >
            Have you ever had any of the following?{" "}
            <span className="asterisk">*</span>
            {errors.diseaseError && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.diseaseError}
              </div>
            )}
          </div>
          {createCheckboxesFollowing()}

          <div className="registration_input">
            <input
              name="medications"
              value={values.medications.trim() || ""}
              onChange={onChange}
              className={`registration_input_data ${
                errors.medications && "is-invalid"
              }`}
              placeholder="List all current medications"
            />{" "}
            <span className="asterisk positionAsterisk">*</span>
            {errors.medications && (
              <div className="invalid-feedback">{errors.medications}</div>
            )}
          </div>

          <div className="reqFormTitleText">
            This question is used for research purposes. Have you tested
            positive for COVID-19?
          </div>

          <div className="checkboxRegisterForms">
            <label className="containerRadiobutton">
              Yes
              <input
                value="true"
                name="covidTestedPositive"
                type="radio"
                onChange={onChange}
              />
              <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
              No
              <input
                value="false"
                name="covidTestedPositive"
                type="radio"
                onChange={onChange}
              />
              <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
              Rather not say
              <input
                value="null"
                name="covidTestedPositive"
                type="radio"
                onChange={onChange}
              />
              <span className="checkmarkRadiobutton"></span>
            </label>
          </div>

          <div className="reqFormTitleText">
            This question is used for research purposes on the effects of the
            COVID-19 vaccine and its potential effects on the brain and nervous
            system. Have you received the COVID-19 vaccine?
          </div>
          <div className="checkboxRegisterForms">
            <label className="containerRadiobutton">
              Yes
              <input
                value="true"
                name="CovidVaccine"
                type="radio"
                onChange={onChange}
              />
              <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
              No
              <input
                value="false"
                name="CovidVaccine"
                type="radio"
                onChange={onChange}
              />
              <span className="checkmarkRadiobutton"></span>
            </label>
            <label className="containerRadiobutton">
              Rather not say
              <input
                value="null"
                name="CovidVaccine"
                type="radio"
                onChange={onChange}
              />
              <span className="checkmarkRadiobutton"></span>
            </label>
          </div>

          <div className="reqFormTitleText">
            On a scale of 1-10 how stressfull has your life been?{" "}
            <span className="asterisk">*</span>
          </div>
          <div className="reqFormTitleText error">{errors.stressfulLevel}</div>

          <div className="containerCheckboxStressfulLevel">
            <div className="reqFormSubTitleText">Not stressful</div>
            <div className="reqFormButtonsStressfulLevel">
              {stressLevel.map((level) => {
                return (
                  <div key={level}>
                    <label className="containerRadiobutton containerRadiobuttonStressfulLevel">
                      <div className="level">{level}</div>
                      <input
                        value={level}
                        name="stressfulLevel"
                        type="radio"
                        onChange={onChange}
                      />
                      <span className="checkmarkRadiobutton checkmarkRadiobuttonStressfulLevel"></span>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="reqFormSubTitleText">Very stressful</div>
          </div>

          <div className="reqFormTitleText">
            {" "}
            Consent for a minor child
            <br />
            <div className="reqFormSubTitleText">
              I authorize Doctor to perform diagnostic procedures and render
              chiropractic care and adjustments to my minor child.
            </div>
          </div>
          <div className="reqFormTitleText">Consent</div>

          <div className="checkboxRegisterForms checkboxOtherRegisterForms">
            <label className="container">
              <input
                name="consentMinorChild"
                type="checkbox"
                // value="I consent"
                checked={values.consentMinorChild}
                onChange={toggleCheckboxConsent}
              />
              <span className="checkMark"></span>I consent
            </label>
          </div>

          <div className="reqFormTitleText">Relationship to child</div>
          <input
            name="relationshipChild"
            value={values.relationshipChild.trim()}
            onChange={onChange}
            className="inputRelationshipChild"
            placeholder=""
          />

          <button type="submit" className="registration_button">
            Registration
          </button>
        </form>
      </div>
    </>
  );
}
