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

export default function Arousal(): ReactElement {
  const data = [
    { name: "S", value: 75, text: "#982594" },
    { name: "P", value: 35, text: "#15819B" },
  ];

  const pointRender = (args: any) => {
    let seriesColor = ["#982594", "#15819B"];
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

  return (
    <div className="containerDashboard">
      <div className="title">Arousal</div>
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
            name="name"
            type="Column"
            marker={marker}
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}
