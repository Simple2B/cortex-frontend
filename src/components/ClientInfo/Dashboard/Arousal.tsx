import React, { ReactElement } from "react";
import "./dashboard.sass";
import "@progress/kendo-theme-default/dist/all.css";
import {
  Chart,
  ChartArea,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

export default function Arousal(): ReactElement {
  const data1 = [8];
  const data2 = [13];

  return (
    <div className="containerDashboard">
      <div className="title">Arousal</div>
      <Chart>
        <ChartArea background={"transparent"} />
        <ChartSeries>
          <ChartSeriesItem
            data={data1}
            type="column"
            field="count"
            // categoryField="date"
            aggregate="count"
            // stack={true}
            // opacity={0.7}
            // gap={0.06}
            color={"#A3CEC7"}
          />
          <ChartSeriesItem
            data={data2}
            type="column"
            field="count"
            // categoryField="date"
            aggregate="count"
            // stack={true}
            // opacity={0.7}
            // gap={0.06}
            color={"#3F8DAF"}
          />
        </ChartSeries>
      </Chart>
    </div>
  );
}
