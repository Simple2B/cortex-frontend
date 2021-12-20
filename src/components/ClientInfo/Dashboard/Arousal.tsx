import React, { ReactElement } from "react";
import "./dashboard.sass";
import "@progress/kendo-theme-default/dist/all.css";
import {
  Chart,
  ChartArea,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
} from "@progress/kendo-react-charts";
import "hammerjs";

export default function Arousal(): ReactElement {
  const data1 = [13];
  const data2 = [8];

  const categories = ["S", "P"];
  const series = [
    {
      data: [13, 8],
      color: "#3F8DAF",
    },
  ];

  return (
    <div className="containerDashboard">
      <div className="title">Arousal</div>
      <Chart>
        <ChartArea background={"transparent"} />

        <ChartTitle text="" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} startAngle={45} />
        </ChartCategoryAxis>

        {/* <ChartCategoryAxisItem categories={categories} startAngle={45} /> */}

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

                // dynamicHeight={false}
                // dynamicSlope={false}
                // visible={true}
              >
                <ChartSeriesLabels color="#fff" background="none" />
              </ChartSeriesItem>
            );
          })}
        </ChartSeries>
      </Chart>
    </div>
  );
}
