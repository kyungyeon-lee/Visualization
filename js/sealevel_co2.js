function drawSealevel() {
  // Insert your data calculation code here
  let dataByYear = {};
  let dataByYearCo2 = {};

  // Specify the range of years you want to filter
  const startYear = 1993;
  const endYear = 2021;

  // Load CO2 data

// Assuming 'years' and 'co2Values' are arrays with your dataset
const years = [1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021];

const co2ValuesString = "16120.84694 16044.98508 16846.42043 17841.77066 17788.0853 17726.89029 18731.80077 19276.83267 19752.209 20321.65855 20058.57028 19713.75298 19457.91496 19586.70453 20200.08641 20458.19764 20835.47891 21485.11683 22262.43546 22651.69654 22717.73246 22849.89665 22783.51914 22882.67291 23116.09599 23773.04136 24220.31242 24673.04888 24815.13464 24993.93793 25834.97336 26155.30827 26536.30299 27795.06628 29088.7723 30161.57486 31200.0718 32401.39371 32588.25224 32192.84167 34158.43902 35220.77684 35702.30008 36188.84877 36412.19735 36301.97657 36392.32279 37014.17918 37876.88257 37993.282 35960.67411 37857.57575 37993.282 35960.67411 37857.57575";

// Split the string into an array of values
const co2ValuesArray = co2ValuesString.split(" ").map(value => parseFloat(value));

const filteredYears = years.filter(year => year >= 1994);

// Calculate average CO2 for each filtered year
const co2Valuess = filteredYears.map((year, index) => {
    const startIndex = index * 3;
    const values = co2ValuesArray.slice(startIndex, startIndex + 3);
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;

    return { year: year, average: parseFloat(co2ValuesArray[index].toFixed(2))  };
});
console.log(co2Valuess);


    // Assuming 'co2Values' is calculated as per the previous example
    // Load sea level data
    d3.csv("data/sealevel.csv").then(function (seaLevelData) {
      // Filter the rows based on the desired year range and 'TotalWeightedObservations' column
      seaLevelData.forEach(row => {
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

      years.forEach(year => {
          const values = dataByYear[year];
          const range = [Math.min(...values), Math.max(...values)];
          const average = (range[0] + range[1]) / 2;

          ranges.push({ year: parseInt(year), range: range });
          averages.push({ year: parseInt(year), average: parseFloat(average.toFixed(2)) });
      });

    // Assuming 'ranges' and 'averages' are calculated as per the previous example
const seaLevelChart = Highcharts.chart("sealevel-container-co2", {
    title: {
        text: "Global Sea Level and Total Co2 Emission | 1993 - 2021",
        align: "left",
    },

    subtitle: {
        text:
            "Source: " +
            '<a href="https://climate.nasa.gov/"' +
            'target="_blank">climate.nasa.gov</a>'+
            ' and ' +
            '<a href="https://edgar.jrc.ec.europa.eu/report_2022"' +

            'target="_blank">edgar.jrc.ec.europa.eu</a>',
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
                text: "CO2 Data",
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
                x: new Date(avg.year, 0, 1).getTime(),
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
            name: "CO2 Data",
            data: co2Valuess.map((co2Valuess) => ({
                x: new Date(co2Valuess.year, 0, 1).getTime(),
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