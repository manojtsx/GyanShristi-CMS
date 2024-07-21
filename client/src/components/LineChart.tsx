"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { color } from "chart.js/helpers";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

type ChartOptions = {
  responsive: boolean;
  plugins: {
    legend: {
      position: "top" | "center" | "left" | "right" | "bottom" | "chartArea";
      labels: {
        font: {
          size: number;
        };
      };
    };
    title: {
      display: boolean;
      text: string;
      font: {
        size: number;
      };
    };
  };
  scales: {
    y: {
      beginAtZero: boolean;
      title: {
        display: boolean;
        text: string;
        font: {
          size: number;
          color: string;
      };
    };
    };
    x: {
      title: {
        display: boolean;
        text: string;
        font: {
          size: number;
          color: string;
      };
    };
  };
};
};

function LineChart() {
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Articles Published",
        data: [5, 25, 50, 15, 10, 40, 20, 25, 20, 15, 10, 5],
        borderColor: "blue",
        borderWidth: 3,
        tension: 0.3,
        backgroundColor: "blue",
        pointBackgroundColor: "blue",
        pointBorderColor: "rgba(0,0,255,0.2)",
      },
      {
        label: "User Registered",
        data: [10, 20, 5, 10, 15, 30, 36, 40, 50, 60, 70, 80],
        borderColor: ["rgb(255, 206, 86)"],
        borderWidth: 3,
        tension: 0.3,
        backgroundColor: "orange",
        pointBackgroundColor: "orange",
        pointBorderColor: "rgba(255, 206, 86, 0.2)",
      }
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 15,
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Metrics of GyanShristi",
        font: {
          size: 25,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "No. of Content Published and User Registered",
          font: {
            size: 20,
            color: "black",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Months of the Year",
          font: {
            size: 20,
            color: "black",
          }
        },
        
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options}></Line>
    </div>
  );
}

export default LineChart;
