import React, { ReactElement } from "react";
import "./Alpha.sass";
import { useLocation } from "react-router-dom";
import { ReactComponent as IntakeAlpha } from "../../../images/intake_alpha.svg";
// import {
//   Category,
//   ChartComponent,
//   DataLabel,
//   LineSeries,
//   Legend,
//   Tooltip,
//   Inject,
//   AxisModel,
//   SeriesCollectionDirective,
//   SeriesDirective,
// } from "@syncfusion/ej2-react-charts";

// import Paper from '@material-ui/core/Paper';
// import {
//   Chart,
//   ArgumentAxis,
//   ValueAxis,
//   LineSeries,
//   Title,
//   Legend,
// } from '@devexpress/dx-react-chart-material-ui';
// import { withStyles } from '@material-ui/core/styles';
// import { Animation } from '@devexpress/dx-react-chart';

// const data1 = [
//   { name: "1", value: 15 },
//   { name: "2", value: 28 },
//   { name: "3", value: 20 },
//   { name: "4", value: 32 },
//   { name: "5", value: 40 },
//   { name: "6", value: 32 },
//   { name: "7", value: 35 },
//   { name: "8", value: 50 },
//   { name: "9", value: 38 },
//   { name: "10", value: 30 },
//   { name: "11", value: 25 },
//   { name: "12", value: 32 },
// ];

// const data2 = [
//   { name: "1", value: 255 },
//   { name: "2", value: 278 },
//   { name: "3", value: 250 },
//   { name: "4", value: 262 },
//   { name: "5", value: 270 },
//   { name: "6", value: 282 },
//   { name: "7", value: 295 },
//   { name: "8", value: 250 },
//   { name: "9", value: 288 },
//   { name: "10", value: 290 },
//   { name: "11", value: 300 },
//   { name: "12", value: 255 },
// ];

// const primaryxAxis: AxisModel | undefined = { valueType: "Category" };

export function Alpha(): ReactElement {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const api_key = splitLocation[splitLocation.length - 2];

  //   const [client, setClient] = useState<Client>(ClientDefault);

  //   const getClient = async () => {
  //     try {
  //       const response = await instance().get(
  //         `api/clients_intake/client_intake/${api_key}`
  //       );
  //       console.log("GET: client_intake => ", response.data);
  //       setClient(response.data);
  //       return response.data;
  //     } catch (error: any) {
  //       console.log("GET: error message get_client_intake =>  ", error.message);
  //       console.log(
  //         "error response data get_client_intake => ",
  //         error.response.data
  //       );
  //       throw new Error(error.message);
  //     }
  //   };

  return (
    <div className="intakeInfoAlpha">
      <div className="intakeInfoAlpha_text">Alpha</div>
      <div className="intakeInfoAlpha_letters">
        <div className="letter">R</div>
        <div className="letter">L</div>
      </div>
      <div className="intakeInfoAlpha_dashboard">
        <IntakeAlpha />
        {/* <ChartComponent
          id="chartsAlpha"
          // width="800"
          height="110"
          background="none"
          primaryXAxis={primaryxAxis}
        >
          <Inject services={[LineSeries, Tooltip, Category]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data1}
              xName="name"
              yName="value"
              name="Sales"
            />

            <SeriesDirective
              dataSource={data2}
              xName="name"
              yName="value"
              name="Sales"
            />
          </SeriesCollectionDirective>
        </ChartComponent> */}
      </div>
    </div>
  );
}
