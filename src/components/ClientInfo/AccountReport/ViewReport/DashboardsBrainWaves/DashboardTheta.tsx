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
      data: [15, 16.5, 8, 10],
      backgroundColor: "#982594",
      borderRadius: 100,
    },
    {
      data: [14, 15.5, 7, 9],
      backgroundColor: "#15819B",
      borderRadius: 100,
    },
  ],
};

export default function DashboardTheta(): ReactElement {
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
