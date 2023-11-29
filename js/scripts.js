var fullData; // Variable to store the full data for scatter plot
var fullLineData; // Variable to store the full data for line plot

// Load data and create scatter plot using Plotly
d3.csv("../data/ScatterPlotData.csv").then(function(data) {
  fullData = data; // Store the full data for scatter plot

  // Extract unique countries from the data for scatter plot
  var uniqueCountries = Array.from(new Set(data.map(function(entry) { return entry.Country; })));

  // Populate the dropdown list for scatter plot with country options
  var dropdown = document.getElementById("countryDropdown");

  // Add an option for displaying all countries
  var allOption = document.createElement("option");
  allOption.value = "all";
  allOption.text = "All Countries";
  dropdown.add(allOption);

  for (var i = 0; i < uniqueCountries.length; i++) {
    var option = document.createElement("option");
    option.value = uniqueCountries[i];
    option.text = uniqueCountries[i];
    dropdown.add(option);
  }

  // Create the scatter plot with all data
  createScatterPlot(data);
});

// Function to create the scatter plot
function createScatterPlot(data) {
  // Extract CO2 and Temperature arrays
  var co2Data = data.map(function(entry) { return parseFloat(entry.CO2); });
  var temperatureData = data.map(function(entry) { return parseFloat(entry.Temperature); });

  // Create a trace for the scatter plot
  var trace = {
    x: co2Data,
    y: temperatureData,
    mode: 'markers',
    type: 'scatter',
    marker: { size: 8, color: 'orange' }, // Adjust marker size and color as needed
    text: data.map(function(entry) { return entry.Country + ' (' + entry.Year + ')'; }) // Display country and year in tooltip
  };

  // Layout configuration with x-axis set to log scale and fixed axis limits
  var layout = {
    title: {
      text: 'CO2 Emission vs Temperature',
      font: {
        size: 24 // Set the title font size
      }
    },
    xaxis: {
      title: {
        text: 'CO2 Emission',
        font: {
          size: 20 // Set the x-axis label font size
        }
      },
      type: 'log'
    },
    yaxis: {
      title: {
        text: 'Temperature',
        font: {
          size: 20 // Set the y-axis label font size
        }
      },
      range: [-3, 3],
    },
    // plot_bgcolor: 'w',
    gridcolor: 'lightgray'
  };

  // Create the scatter plot
  Plotly.newPlot('scatter-plot', [trace], layout);
}

// Function to filter data by selected country and year range for scatter plot
function filterData() {
  var selectedCountry = document.getElementById("countryDropdown").value;
  var minYear = parseInt(document.getElementById("minYear").value);
  var maxYear = parseInt(document.getElementById("maxYear").value);

  // Filter data for the selected country
  var filteredData = (selectedCountry === "all") ? fullData : fullData.filter(function(entry) {
    return entry.Country === selectedCountry;
  });

  // Filter data for the selected year range
  filteredData = filteredData.filter(function(entry) {
    return entry.Year >= minYear && entry.Year <= maxYear;
  });

  // Remove the previous trace
  Plotly.purge('scatter-plot');

  // Create a new scatter plot with the filtered data
  createScatterPlot(filteredData);
}

// Load data for the line plot
d3.csv("../data/LinePlotData.csv").then(function(data) {
  //console.log("Data loaded:", data);

  fullLineData = data; // Store the full data for the line plot

  // Extract unique countries from the data for the line plot
  var uniqueLineCountries = Array.from(new Set(data.map(function(entry) { return entry.Country; })));

  // Populate the dropdown list for the line plot with country options
  var lineDropdown = document.getElementById("lineCountryDropdown");

  // Add an option for displaying all countries
  //var allLineOption = document.createElement("option");
  //allLineOption.value = "all";
  //allLineOption.text = "All Countries";
  //lineDropdown.add(allLineOption);



  for (var i = 0; i < uniqueLineCountries.length; i++) {
    var option = document.createElement("option");
    option.value = uniqueLineCountries[i];
    option.text = uniqueLineCountries[i];
    lineDropdown.add(option);
  }

 // Set "Pakistan" as the default selection
  var GGlobalOption = lineDropdown.querySelector('option[value="Global"]');
  if (GGlobalOption) {
    GGlobalOption.selected = true;
  }

  // Filter data for "Pakistan"
  var GlobalData = fullLineData.filter(function(entry) {
    return entry.Country === "Global";
  });

  // Create the initial line plot with data for "Pakistan"
  createLinePlot(GlobalData);

  // Create the initial line plot with all data
  //createLinePlot(data);
  //console.log("Line plot data loaded and function called.");
});

// Function to create the line plot
// Function to create the line plot
function createLinePlot(data) {
  console.log("Creating Line Plot with Data:", data);  // Add this line for debugging

  // Extract years, CO2, and temperature arrays
  var years = data.map(function(entry) { return parseInt(entry.Year); });
  var co2Data = data.map(function(entry) { return parseFloat(entry.CO2); });
  var temperatureData = data.map(function(entry) { return parseFloat(entry.Temperature); });

  // Create traces for the line plot
  var temperatureTrace = {
    x: years,
    y: temperatureData,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Temperature',
    yaxis: 'y1', // Use the left y-axis
    line: { color: 'red', width: 4 },
    marker: { size: 12, color: 'red', symbol: 'circle' }
  };

  var co2Trace = {
    x: years,
    y: co2Data,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'CO2',
    yaxis: 'y2', // Use the right y-axis
    line: { color: 'blue', width: 4, dash: 'dashdot' },
    marker: { size: 12, color: 'blue', symbol: 'star' }
  };

  // Layout configuration with dual y-axes
  var layout = {
    title: {
      text: 'Temperature and CO2 Over Time',
      font: {
        size: 24 // Set the title font size
      }
    },
    xaxis: {
      title: {
        text: 'Year',
        font: {
          size: 20 // Set the x-axis label font size
        }
      }
    },
    yaxis: {
      title: {
        text: 'Temperature',
        font: {
          size: 20 // Set the y-axis label font size
        }
      },
      side: 'left'
    },
    yaxis2: {
      title: {
        text: 'CO2 Emission',
        font: {
          size: 20 // Set the y-axis2 label font size
        }
      },
      overlaying: 'y',
      side: 'right'
    },
   plot_bgcolor: 'white',  // Add background color
    gridcolor: 'black'  // Add grid color
  };

  // Create the line plot
  Plotly.newPlot('line-plot', [temperatureTrace, co2Trace], layout);
}

// Function to filter data for the line plot
function filterLinePlotData() {
  var selectedCountry = document.getElementById("lineCountryDropdown").value;

  // Filter data for the selected country
  var filteredLineData = (selectedCountry === "all") ? fullLineData : fullLineData.filter(function(entry) {
    return entry.Country === selectedCountry;
  });

  // Remove the previous traces
  Plotly.purge('line-plot');

  // Create a new line plot with the filtered data
  createLinePlot(filteredLineData);
}