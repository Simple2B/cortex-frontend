import React, { ReactElement } from "react";
import "../ViewReport.sass";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
  //   Title,
  //   Tooltip,
  //   Legend
);

const labels = ["", "", "", ""];

const data = {
  labels,
  datasets: [
    {
      data: [7, 8.7, 6.6, 8],
      min: 0,
      max: 18,
      backgroundColor: "#982594",
      number: { min: 0, max: 18 },
    },
    {
      data: [6.5, 7.7, 6, 7.5],
      min: 0,
      max: 18,
      backgroundColor: "#15819B",
      number: { min: 0, max: 18 },
    },
  ],
};

export default function DashboardLowFrequency(): ReactElement {
  return (
    <Bar
      data={data}
      width={250}
      height={300}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 18,
          },
        },
      }}
    ></Bar>
  );
}
