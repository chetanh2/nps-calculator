import formatIndianCurrency from "./utils/formatIndianCurrency";

export default function barGraphOptions(totalInvestedAmount, corpusValue) {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    tooltip: {
      formatter: function () {
        return `<div>
            ${this.point.name}: <b> ₹ ${formatIndianCurrency(
          Math.round(this.y)
        )}</b></div>`;
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: ["", ""],
      crosshair: true,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
    },

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },

    series: [
      {
        minPointSize: null,
        innerSize: "0%",
        zMin: 0,
        name: "",
        borderRadius: 10,
        data: [
          {
            name: "Lumpsum",
            y: totalInvestedAmount,
            color: "#CC66CC",
          },
          {
            name: "Corpus",
            y: corpusValue,
            color: "#66CC99",
          },
        ],
      },
    ],
  };
  return options;
}
