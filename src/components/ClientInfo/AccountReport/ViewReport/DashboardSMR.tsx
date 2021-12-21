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
      data: [5, 18, 3, 10],
      backgroundColor: "#982594",
    },
    {
      data: [4, 17, 2, 8],
      backgroundColor: "#15819B",
    },
  ],
};

export default function DashboardSMR(): ReactElement {
  return (
    <Bar
      data={data}
      width={250}
      height={300}
      options={{ maintainAspectRatio: false }}
    ></Bar>
  );
}
