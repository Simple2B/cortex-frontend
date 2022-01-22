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
      data: [6.5, 8.8, 12.9, 16.9],
      min: 0,
      max: 18,
      backgroundColor: "#982594",
      number: { min: 0, max: 18 },
      borderRadius: 100,
    },
    {
      data: [7, 9.8, 13.9, 17.8],
      min: 0,
      max: 18,
      backgroundColor: "#15819B",
      number: { min: 0, max: 18 },
      borderRadius: 100,
    },
  ],
};

export default function DashboardHightFrequency(): ReactElement {
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
