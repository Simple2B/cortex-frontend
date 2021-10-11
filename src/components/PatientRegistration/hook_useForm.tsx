import { useState } from "react";
import { IPatientForm } from '../../types/patientsTypes';

const defaultPageFormData: IPatientForm = {
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
  diseases: new Set(),
  diseaseError: "",
  medications: "",
  covidTestedPositive: null,
  covidVaccine: null,
  stressfulLevel: "",
  consentMinorChild: false,
  relationshipChild: "",
}

export const useForm = (callback: (values: IPatientForm) => Promise<void>, initialState = defaultPageFormData,  validate: Function) => {

    const [values, setValues] = useState<IPatientForm>(initialState);
    const [errors, setErrors] = useState<IPatientForm>(initialState);
    const [submitted, setSubmitted] = useState(false);

    const toggleCheckboxChange = (event: any) => {
      setValues(values  => ({ ...values, checkedOtherCondition: !values.checkedOtherCondition}));
    };

    const toggleCheckboxConsent = (event: any) => {
      setValues(values  => ({ ...values, consentMinorChild: !values.consentMinorChild}));
    };

    const onChange = (event: any) => {
      setValues(values  => ({ ...values, [event.target.name]: event.target.value }));
    };

    const toggleCheckboxFollowing = (label: string) => {
      const updatedCheckboxes = new Set(values.diseases);
      if (values.diseases.has(label)) {
        updatedCheckboxes.delete(label);
      } else {
        updatedCheckboxes.add(label);
      }

      setValues(values  => ({ ...values, "diseases":  updatedCheckboxes}));
    };

    const toggleCheckbox = (label: string) => {
      const updatedCheckboxes = new Set(values.conditions);
      if (values.conditions.has(label)) {
        updatedCheckboxes.delete(label);
      } else {
        updatedCheckboxes.add(label);
      }
      setValues(values  => ({ ...values, "conditions":  updatedCheckboxes}));

    };

    const onSubmit = (event: any) => {
      event.preventDefault();
      const errorBuffer = validate(values);
      console.log("errorBuffer", errorBuffer);

      if (Object.keys(errorBuffer).length === 0) {
        callback(values);
        setSubmitted(true);
        setValues(initialState);
        setErrors(initialState);
      } else {
        setErrors(errorBuffer);
        setSubmitted(false);
      }
    };

    return {
        toggleCheckboxConsent,
        toggleCheckboxFollowing,
        toggleCheckboxChange,
        toggleCheckbox,
        onChange,
        onSubmit,
        errors,
        values,
        submitted,
    }
  };
