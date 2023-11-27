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
    1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891,
    1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903,
    1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915,
    1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927,
    1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939,
    1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951,
    1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963,
    1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975,
    1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987,
    1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];

  const noSmoothingValues = [
    -0.17, -0.09, -0.11, -0.18, -0.29, -0.34, -0.32, -0.37, -0.17, -0.11, -0.36,
    -0.23, -0.28, -0.31, -0.3, -0.23, -0.11, -0.11, -0.27, -0.17, -0.08, -0.15,
    -0.28, -0.37, -0.47, -0.26, -0.22, -0.38, -0.42, -0.48, -0.43, -0.44, -0.36,
    -0.34, -0.15, -0.14, -0.35, -0.45, -0.29, -0.27, -0.27, -0.18, -0.28, -0.26,
    -0.27, -0.22, -0.1, -0.21, -0.2, -0.36, -0.16, -0.09, -0.16, -0.28, -0.12,
    -0.2, -0.14, -0.03, 0.0, -0.02, 0.13, 0.19, 0.07, 0.09, 0.2, 0.09, -0.07,
    -0.03, -0.11, -0.11, -0.17, -0.07, 0.01, 0.08, -0.13, -0.14, -0.19, 0.05,
    0.06, 0.03, -0.02, 0.06, 0.03, 0.05, -0.2, -0.11, -0.06, -0.02, -0.08, 0.05,
    0.03, -0.08, 0.01, 0.16, -0.07, -0.01, 0.02, -0.1, 0.18, 0.07, 0.16, 0.26,
    0.32, 0.14, 0.31, 0.16, 0.12, 0.18, 0.32, 0.39, 0.27, 0.45, 0.4, 0.22, 0.23,
    0.31, 0.44, 0.33, 0.46, 0.61, 0.38, 0.39, 0.53, 0.62, 0.62, 0.53, 0.67,
    0.63, 0.66, 0.54, 0.65, 0.72, 0.61, 0.65, 0.67, 0.74, 0.9, 1.01, 0.92, 0.85,
    0.97, 1.01, 0.84, 0.89,
  ];
  // Split the string into an array of values

  const filteredYears = years.filter((year) => year >= 1994);

  // Calculate average CO2 for each filtered year
  const co2Valuess = filteredYears.map((year, index) => {
    return {
      year: year,
      average: parseFloat(noSmoothingValues[index].toFixed(2)),
    };
  });
  console.log(co2Valuess);

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
          data: co2Valuess.map((co2Valuess) => ({
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
