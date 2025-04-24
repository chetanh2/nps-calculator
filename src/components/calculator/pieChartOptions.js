import formatIndianCurrency from "./utils/formatIndianCurrency";

// export default function pieChartOptions(lumpsumValue, annuityValue) {
//     const optionsTwo = {
//       chart: {
//         type: "pie",
//       },
//       credits: {
//         enabled: false,
//       },
//       title: {
//         text: "",
//       },
//       tooltip: {
//         formatter: function () {
//           return `<div>
//             ${this.point.name}: <b> ₹ ${formatIndianCurrency(
//             Math.ceil(this.y)
//           )}</b></div>`;
//         },
//       },

//       plotOptions: {
//         series: {
//           allowPointSelect: true,
//           cursor: "pointer",
//           dataLabels: [],
//         },
//       },
//       series: [
//         {
//           name: "",
//           colorByPoint: true,
//           data: [
//             {
//               name: "Lumpsum",
//               y: lumpsumValue,
//               color: "#2C6EB5",
//               // selected: true,
//             },
//             {
//               name: "Annuity",
//               sliced: true,
//               selected: true,
//               y: annuityValue,
//               color: "#66CC99",
//             },
//           ],
//         },
//       ],
//     };

//   return optionsTwo;
// }
export default function pieChartOptions(lumpsumValue, annuityValue) {
  const optionsTwo = {
    chart: {
      type: "variablepie",
    },
    title: {
      text: "",
      align: "left",
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return `<div>
            ${this.point.name}: <b> ₹ ${formatIndianCurrency(
          Math.round(this.y)
        )}</b></div>`;
      },
    },
    plotOptions: {
      variablepie: {
        dataLabels: {
          enabled: false,
          connectorWidth: 0,
        },
      },
    },
    series: [
      {
        minPointSize: 10,
        innerSize: "50%",
        zMin: 0,
        name: "",
        borderRadius: 0,
        data: [
          {
            name: "Lumpsum",
            y: lumpsumValue,
            color: "#2C6EB5",
            z: 119,
          },
          {
            name: "Annuity",
            y: annuityValue,
            color: "#66CC99",
            z: 92,
          },
        ],
      },
    ],
  };

  return optionsTwo;
}
