import React, { ReactElement } from "react";
import "./ViewReport.sass";

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
      data: [12, 19, 11, 8],
      backgroundColor: "#982594",
    },
    {
      data: [10, 17, 10, 6],
      backgroundColor: "#15819B",
    },
  ],
};

export default function DashboardBeta(): ReactElement {
  return (
    <Bar
      data={data}
      width={250}
      height={300}
      options={{ maintainAspectRatio: false }}
    ></Bar>
  );
}
