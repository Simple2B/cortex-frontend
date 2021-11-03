// import { AxiosError, AxiosResponse } from "axios";
import { instance } from "./axiosInstance";


export const reportApi = {

  filterDateToReportVisit: async (data: {
    type: string,
    startDate: string,
    endDate: string,
  }): Promise<void> => {

    console.log('dataReqPatient =>', data);

    const dataForBack = {
        type: data.type,
        start_time: data.startDate,
        end_time: data.endDate
    }

    try {
      const response = await instance()
      .post('api/client/report_visit', dataForBack)
      console.log('response report visit ', response);

      const res = response.data
      console.log('response report visit received successfully ', res);
      return res;
    } catch (error: any) {
      console.log(`POST: error message about report visit => ${error.message}`);
      throw new Error(error.message);
    }
  },
};
