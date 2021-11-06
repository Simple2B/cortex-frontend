import { instance } from "./axiosInstance";


interface IDataReportVisit {
  type: string,
  startDate: string,
  endDate: string,
};

export const reportApi = {

  filterDateToReportVisit: async (data: IDataReportVisit): Promise<void> => {

    console.log('dataReportVisit =>', data);

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

  filterDateToReportNewClients: async (data: IDataReportVisit): Promise<void> => {

    console.log('dataNewClients =>', data);

    const dataForBack = {
        type: data.type,
        start_time: data.startDate,
        end_time: data.endDate
    }

    try {
      const response = await instance()
      .post('api/client/report_new_clients', dataForBack)
      console.log('response report new clients ', response);

      // console.log('response report new clients received successfully ', response.headers["content-length"]);
      return response.headers
    } catch (error: any) {
      console.log(`POST: error message about report new clients => ${error.message}`);
      throw new Error(error.message);
    }
  },
};
