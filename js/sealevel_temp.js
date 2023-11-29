function drawSealevel() {
  // Insert your data calculation code here
  let dataByYear = {};
  let dataByYearCo2 = {};

  // Specify the range of years you want to filter
  const startYear = 1993;
  const endYear = 2021;

  // Load CO2 data

  // Assuming 'years' and 'co2Values' are arrays with your dataset
  const years = [
    1993, 1994, 1995, 1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021
  ];
  const noSmoothingValues = [
    5.804, 5.976, 5.274, 5.516, 6.23, 6.183, 5.501, 5.207, 5.272, 6.236,
    5.318, 5.964, 5.521, 6.024, 5.759, 5.738, 6.788, 6.761, 6.547, 6.841,
    6.404, 6.592, 6.788, 6.761, 6.547, 6.841, 6.404, 6.592, 6.592
]

  // Split the string into an array of values

  const filteredYears = years.filter((year) => year >= 1994);

  // Calculate average CO2 for each filtered year
  const temp = filteredYears.map((year, index) => {
    return {
      year: year,
      average: parseFloat(noSmoothingValues[index].toFixed(2)),
    };
  });
  console.log(temp);

  // Assuming 'co2Values' is calculated as per the previous example
  // Load sea level data
  d3.csv("data/sealevel.csv").then(function (seaLevelData) {
    // Filter the rows based on the desired year range and 'TotalWeightedObservations' column
    seaLevelData.forEach((row) => {
      const year = parseInt(row.Year);
      if (!isNaN(year) && year >= startYear && year <= endYear) {
        const value = parseFloat(row.TotalWeightedObservations);
        if (!dataByYear[year]) {
          dataByYear[year] = [value];
        } else {
          dataByYear[year].push(value);
        }
      }
    });
    console.log(seaLevelData);
    // Calculate range and average for each year
    const years = Object.keys(dataByYear);
    const ranges = [];
    const averages = [];

    years.forEach((year) => {
      const values = dataByYear[year];
      const range = [Math.min(...values), Math.max(...values)];
      const average = (range[0] + range[1]) / 2;

      ranges.push({ year: parseInt(year), range: range });
      averages.push({
        year: parseInt(year),
        average: parseFloat(average.toFixed(2)),
      });
    });

    // Assuming 'ranges' and 'averages' are calculated as per the previous example
    const seaLevelChart = Highcharts.chart("sealevel-container-temp", {
      title: {
        text: "Global Sea Level and Temperature | 1993 - 2021",
        align: "left",
      },

      subtitle: {
        text:
          "Source: " +
          '<a href="https://climate.nasa.gov/"' +
          'target="_blank">climate.nasa.gov</a>',
        align: "left",
      },
      // Sea level chart configuration
      yAxis: [
        {
          title: {
            text: "Sea Level",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          labels: {
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          opposite: false, // Set to true if you want the axis on the right side
        },
        {
          title: {
            text: "Temperature",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          labels: {
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          opposite: true, // Set to false if you want the axis on the left side
        },
      ],
      series: [
        {
          name: "Sea Level",
          data: averages.map((avg) => ({
            x: avg.year,
            y: avg.average,
          })),
          yAxis: 0, // Associate this series with the first Y-axis
          zIndex: 1,
          marker: {
            fillColor: "white",
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[0],
          },
        },
        {
          name: "Temperature (LAND-OCEAN TEMPERATURE INDEX)",
          data: temp.map((co2Valuess) => ({
            x: co2Valuess.year,
            y: co2Valuess.average,
          })),
          yAxis: 1, // Associate this series with the second Y-axis
          zIndex: 2,
          marker: {
            fillColor: "white",
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[1],
          },
        },
      ],
    });
  });
}

drawSealevel();
