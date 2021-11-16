// import { AxiosError, AxiosResponse } from "axios";
import { instance, authInstance } from "./axiosInstance";
import { IPatientForm, User } from "../types/patientsTypes";

interface IPatientFormForBackend {
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  referring: string;
  conditions: string[];
  otherCondition: string;
  diseases: string[];
  medications: string;
  covidTestedPositive: boolean | null;
  covidVaccine: boolean | null;
  stressfulLevel: string;
  relationshipChild: string;
}

const formatRequestData = (
  modifyDataForBackend: IPatientForm
): IPatientFormForBackend => {
  const params = {
    firstName: modifyDataForBackend.firstName,
    lastName: modifyDataForBackend.lastName,
    birthday: modifyDataForBackend.birthday,
    address: modifyDataForBackend.address,
    city: modifyDataForBackend.city,
    state: modifyDataForBackend.state,
    zip: modifyDataForBackend.zip,
    phone: modifyDataForBackend.phone,
    email: modifyDataForBackend.email,
    referring: modifyDataForBackend.referring,
    conditions: Array.from(modifyDataForBackend.conditions),
    diseases: Array.from(modifyDataForBackend.diseases),
    medications: modifyDataForBackend.medications,
    covidTestedPositive: modifyDataForBackend.covidTestedPositive,
    covidVaccine: modifyDataForBackend.covidVaccine,
    stressfulLevel: modifyDataForBackend.stressfulLevel,
    consentMinorChild: modifyDataForBackend.consentMinorChild,

    otherCondition: modifyDataForBackend.checkedOtherCondition
      ? modifyDataForBackend.otherCondition
      : "",
    relationshipChild: modifyDataForBackend.relationshipChild,
  };
  return params;
};

interface IClientQueue {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface Client {
  id: number | null;
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  referring: string;
  conditions: string[];
  otherCondition: string;
  diseases: string[];
  medications: string;
  covidTestedPositive: string;
  covidVaccine: string;
  stressfulLevel: number;
  consentMinorChild: boolean;
  relationshipChild: string;
  place_in_queue: number | null;
}

export const ClientDefault = {
  id: null,
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
  conditions: [],
  otherCondition: "",
  diseases: [],
  medications: "",
  covidTestedPositive: "",
  covidVaccine: "",
  stressfulLevel: 1,
  consentMinorChild: false,
  relationshipChild: "",
  place_in_queue: null,
  // visits: null,
};

export const clientApi = {
  registrationClient: async (data: IPatientForm): Promise<void> => {
    console.log("dataReqPatient =>", data);

    try {
      const response = await instance().post(
        "api/client/registration",
        formatRequestData(data)
      );
      console.log(`!!!!! response registration `, response);

      const res = response.data;
      console.log(`response received successfully `, res);
      return res;
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log(`POST: error message => ${error.message}`);
      // console.log("error.response.data) => ", error.response.data);
      throw new Error(error.message);
    }
  },

  addClientToQueue: async (data: IClientQueue): Promise<void> => {
    console.log("dataReqAddPatient =>", data);

    try {
      const response = await instance().post(
        "api/client/add_clients_queue",
        data
      );
      console.log("response received successfully ", response.data);
      return response.data;
    } catch (error: any) {
      // place to handle errors and rise custom errors

      console.log(
        "error message addClientToQueue => ",
        new Error(error.message)
      );
      console.log("POST: error data  addClientToQueue =>", error.message.data);
      throw new Error(error.message);
    }
  },

  identifyClientWithPhone: async (phone: string): Promise<void> => {
    console.log("identifyClientWithPhone: phone =>", phone);
    const data = { phone: phone };
    console.log("dataReqIdentifyClient =>", data);
    try {
      const response = await instance().post("api/client/kiosk", data);
      console.log("response kiosk ", response);
      console.log("response received successfully ", response.data);
      // return response.data;
    } catch (error: any) {
      console.log(
        "error message addClientToQueue => ",
        new Error(error.message)
      );
      console.log("POST: error data  addClientToQueue =>", error.message.data);
      throw new Error(error.message);
    }
  },

  clientIntake: async (data_client: {
    api_key: string;
    rougue_mode: boolean;
    place_in_queue: number | null;
  }): Promise<void> => {
    console.log("clientIntake: data_client =>", data_client);
    try {
      const response = await instance().post(
        "api/client/client_intake",
        data_client
      );
      console.log("POST: response Intake ", response);
      console.log(
        "POST: Intake response received successfully ",
        response.data
      );
      return response.data;
    } catch (error: any) {
      console.log(
        "POST: error message clientIntake => ",
        new Error(error.message)
      );
      console.log("POST: error data  clientIntake =>", error.message.data);
      throw new Error(error.message);
    }
  },

  deleteClient: async (client: User): Promise<void> => {
    console.log("deleteClient: data_client =>", client);
    try {
      const response = await instance().post(
        "api/client/delete_clients_queue",
        client
      );
      console.log("POST: response deleteClient ", response);
      console.log(
        "POST: response deleted client from queue successfully ",
        response.data
      );
      return response.data;
    } catch (error: any) {
      console.log(
        "POST: error message deleteClient => ",
        new Error(error.message)
      );
      console.log("POST: error data  deleteClient =>", error.message.data);
      throw new Error(error.message);
    }
  },

  completeClient: async (data_client: {
    api_key: string;
    rougue_mode: boolean;
    place_in_queue: number | null;
  }): Promise<void> => {
    console.log("completeClient: data_client =>", data_client);
    try {
      const response = await instance().post(
        "api/client/complete_client_visit",
        data_client
      );
      console.log("POST: response completeClient ", response);
      console.log(
        "POST: response complete client successfully ",
        response.data
      );
      return response.data;
    } catch (error: any) {
      console.log(
        "POST: error message completeClient => ",
        new Error(error.message)
      );
      console.log("POST: error data  completeClient =>", error.message.data);
      throw new Error(error.message);
    }
  },

  writeNote: async (data_note: {
    // date: string;
    notes: string;
    client_id: number;
    doctor_id: number;
    visit_id: number;
  }): Promise<void> => {
    try {
      const response = await instance().post("api/client/note", data_note);
      console.log("POST: response writeNote ", response);
      console.log("POST: response write note successfully ", response.data);
      // return response.data;
    } catch (error: any) {
      console.log(
        "POST: error message writeNote => ",
        new Error(error.message)
      );
      console.log("POST: error data writeNote =>", error.message.data);
      throw new Error(error.message);
    }
  },

  deleteNote: async (data_delete_note: {
    id: number;
    client_id: number;
    doctor_id: number;
    visit_id: number;
  }): Promise<void> => {
    console.log("deleteNote: data_delete_note =>", data_delete_note);

    try {
      const response = await instance().post(
        "api/client/note_delete",
        data_delete_note
      );
      console.log("POST: response deleteNote ", response);
      console.log("POST: response deleteNote successfully ", response.data);
      // return response.data;
    } catch (error: any) {
      console.log(
        "POST: error message deleteNote => ",
        new Error(error.message)
      );
      console.log("POST: error data deleteNote =>", error.message.data);
      throw new Error(error.message);
    }
  },
};
