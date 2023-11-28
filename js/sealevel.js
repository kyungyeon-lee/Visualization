function drawSealevel(){

    // Insert your data calculation code here
    let dataByYear = {};

    // Specify the range of years you want to filter
    const startYear = 1993;
    const endYear = 2021;
    
    d3.csv('data/sealevel.csv').then(function(csvData) {
        // Filter the rows based on the desired year range and 'TotalWeightedObservations' column
        csvData.forEach(row => {
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

        // Calculate range and average for each year
        const years = Object.keys(dataByYear);
        const ranges = [];
        const averages = [];

        years.forEach(year => {
            const values = dataByYear[year];
            const range = [Math.min(...values), Math.max(...values)];
            const average = (range[0] + range[1]) / 2;

            ranges.push({ year: year, range: range });
            averages.push({ year: year, average: parseFloat(average.toFixed(2)) });
        });

        console.log(ranges);
        console.log(averages);
        // Assuming 'ranges' and 'averages' are calculated as per the previous example
       return Highcharts.chart("sealevel-container", {
            title: {
                text: "Global Sea Level | 1993 - 2021",
                align: "left",
            },
    
            subtitle: {
                text:
                    "Source: " +
                    '<a href="https://climate.nasa.gov/"' +
                    'target="_blank">climate.nasa.gov</a>',
                align: "left",
            },
    
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    year: "%Y",
                },
            },
    
            yAxis: {
                title: {
                    text: null,
                },
            },
    
            tooltip: {
                xDateFormat: '%Y',
                crosshairs: true,
                shared: true,
                valueSuffix: "mm",
                valueDecimals: 2,

            },
    
         
    
            series: [
                {
                    name: "Averages",
                    data: averages.map(avg => ({
                        x: new Date(avg.year, 0, 1).getTime(), // Assuming avg.year is the year
                        y: avg.average,
                    })),
                    zIndex: 1,
                    marker: {
                        fillColor: "white",
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[0],
                    },
                },
                {
                    name: "Range",
                    data: ranges.map(range => ({
                        x: new Date(range.year, 0, 1).getTime(), // Assuming range.year is the year
                        low: range.range[0],
                        high: range.range[1],
                    })),
                    type: "arearange",
                    lineWidth: 0,
                    linkedTo: ":previous",
                    color: Highcharts.getOptions().colors[0],
                    fillOpacity: 0.3,
                    zIndex: 0,
                    marker: {
                        enabled: false,
                    },
                },
            ],
        });
    });


}
drawSealevel()
