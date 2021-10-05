import { useState, useEffect } from "react";
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
    const [checked, setChecked] = useState(false);

    // const onChangeOtherCondition = (event: any) => {
    //   if (isChecked){
    //     setValues(values  => ({ ...values, [event.target.name]: event.target.value }))
    //   } else {
    //     setValues(values  => ({ ...values, [event.target.name]: event.target.value }))
    //   };
    // };

    // const handleChangeTestedPositive = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //   setTestedPositive(e.target.value)
    // };

    const toggleCheckboxChange = (event: any) => {
      setChecked(!checked);
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
        setValues(initialState);
        setErrors(initialState);
      } else {
        setErrors(errorBuffer);
      }
    };

    return {
        toggleCheckboxConsent,
        toggleCheckboxFollowing,
        checked,
        toggleCheckboxChange,
        toggleCheckbox,
        onChange,
        onSubmit,
        errors,
        values
    }
  };

