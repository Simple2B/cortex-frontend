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
  { name: "VLF", value: 3, color: "#A4CEC7" },
  { name: "LF", value: 4, color: "#3F8DAF" },
  { name: "HF", value: 2, color: "#AEF7FF" },
];
const marker = ["#A4CEC7", "#3F8DAF", "#AEF7FF"];

const pointRender = (args: any) => {
  let seriesColor = ["#A4CEC7", "#3F8DAF", "#AEF7FF"];
  args.fill = seriesColor[args.point.index];
};

const primaryxAxis: AxisModel | undefined = {
  valueType: "Category",
};
const primaryyAxis = {
  minimum: 0,
  maximum: 5,
  interval: 1,
};

export default function Coherence(): ReactElement {
  return (
    <div className="containerDashboard">
      <div className="title">Coherence</div>
      {/* <div className="overAroused">
        <div className="overAroused_content">
          <div className="nameDashboard"></div>
        </div>
      </div> */}

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
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}
