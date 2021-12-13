import React, { ReactElement } from "react";
import "./dashboard.sass";
// import nameDashboard from "../../../images/nameDashboard.svg";
import "@progress/kendo-theme-default/dist/all.css";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

export default function Arousal(): ReactElement {
  const seriesData = [
    {
      product: "S",
      sales: 50,
    },
    {
      product: "L",
      sales: 100,
    },
    {
      product: "S",
      sales: 150,
    },
    {
      product: "L",
      sales: 200,
    },
    {
      product: "S",
      sales: 250,
    },
    {
      product: "L",
      sales: 300,
    },
    {},
  ];

  const data = [8, 13];

  // const data = [
  //   {
  //     name: "Point2",
  //     color: "#00FF00",
  //   },
  //   {
  //     name: "Point1",
  //     color: "#FF00FF",
  //   },
  // ];

  return (
    <div className="containerDashboard">
      <div className="title">Arousal</div>
      {/* <div className="overAroused"> */}
      {/* <div className="overAroused_tittle">OVER AROUSED</div>
        <div className="overAroused_content">
          <div className="nameDashboard">
            <img src={nameDashboard} alt="nameDashboard" />
          </div>
        </div> */}
      <Chart>
        <ChartSeries>
          <ChartSeriesItem data={data} />
        </ChartSeries>
      </Chart>
      {/* </div> */}
    </div>
  );
}
