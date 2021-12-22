import React, { ReactElement } from "react";
import "./dashboard.sass";
import "@progress/kendo-theme-default/dist/all.css";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  ColumnSeries,
  AxisModel,
} from "@syncfusion/ej2-react-charts";

const data = [
  { name: "Alpha", value: 53, color: "#30FF3E" },
  { name: "Beta", value: 75, color: "#FF1C1C" },
  { name: "SMR", value: 35, color: "#FFA136" },
  { name: "Theta", value: 15, color: "#3091FF" },
];

const pointRender = (args: any) => {
  let seriesColor = ["#30FF3E", "#FF1C1C", "#FFA136", "#3091FF"];
  args.fill = seriesColor[args.point.index];
};

const primaryxAxis: AxisModel | undefined = {
  valueType: "Category",
};
const primaryyAxis = {
  minimum: 0,
  maximum: 100,
  interval: 15,
};

const marker = { dataLabel: { visible: true, font: { color: "#ffffff" } } };

export default function BrainWaves(): ReactElement {
  return (
    <div className="containerDashboard">
      <div className="title">Brain Waves</div>

      <ChartComponent
        id="charts"
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        pointRender={pointRender}
        width="280"
        height="360"
        background="none"
      >
        <Inject services={[ColumnSeries, Tooltip, DataLabel, Category]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName="name"
            yName="value"
            colorName="color"
            name="name"
            type="Column"
            marker={marker}
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}
