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
// import {
//   Chart,
//   ChartArea,
//   ChartCategoryAxis,
//   ChartCategoryAxisItem,
//   ChartLegend,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartSeriesLabels,
//   ChartTitle,
// } from "@progress/kendo-react-charts";
// import "hammerjs";

export default function Arousal(): ReactElement {
  // const data1 = [13];
  // const data2 = [8];

  // const categories = ["S", "P"];
  // const series = [
  //   {
  //     data: [13, 8],
  //     color: "#3F8DAF",
  //   },
  // ];

  const data = [
    { name: "S", value: 75 },
    { name: "P", value: 35 },
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
    title: "",
  };

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
            name="Gold"
            type="Column"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
      {/* <Chart>
        <ChartArea background={"transparent"} />

        <ChartTitle text="" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} startAngle={45} />
        </ChartCategoryAxis>

        <ChartSeries>
          {series.map((data, index) => {
            return (
              <ChartSeriesItem
                key={index}
                data={data.data}
                type="column"
                field="count"
                aggregate="count"
                color={data.color}
              >
                <ChartSeriesLabels color="#fff" background="none" />
              </ChartSeriesItem>
            );
          })}
        </ChartSeries>
      </Chart> */}
    </div>
  );
}
