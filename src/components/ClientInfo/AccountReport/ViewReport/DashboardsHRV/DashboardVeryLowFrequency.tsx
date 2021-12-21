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
      data: [2, 6, 3.5, 4.5],
      min: 0,
      max: 18,
      backgroundColor: "#982594",
      number: { min: 0, max: 18 },
      borderRadius: 100,
    },
    {
      data: [1, 5.5, 3, 4],
      min: 0,
      max: 18,
      backgroundColor: "#15819B",
      number: { min: 0, max: 18 },
      borderRadius: 100,
    },
  ],
};

export default function DashboardVeryLowFrequency(): ReactElement {
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
