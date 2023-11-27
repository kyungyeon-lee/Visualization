var data, year, code, country, value, filteredData, countryName;
var slider2 = document.getElementById("myRangeCo2");
var year = 1989;
var values =[];

var years = ['1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', 
'1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984',
 '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997',
  '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
   '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];

(async () => {
    // Load the topology data using fetch
    const topology2 = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());


    function drawLineChart(countryCode){ // USA , AUS
        console.log(countryCode);

        d3.csv('../data/co2.csv').then(function(csvData) {
            values=[];
            filteredData = csvData.filter(row => row.code === countryCode);
            if (filteredData.length === 0) {
                console.error("No data found for the specified country code.");
                return;
            }
            console.log(filteredData);
            countryName = filteredData[0].country;
            console.log(countryName);

            years.forEach(year => {
                val = parseFloat(filteredData[0][year]);
                values.push(val);
            });
            console.log(values);
        

        Highcharts.chart('lineChartContainerCo2', {
            chart: {
                type: 'line'
            },
            title: {
                text: countryName,
                fontSize: '3px',
            },
            subtitle: {
                text: 'Temperature Changes Over Time',
                fontSize: '3px',
            },
            xAxis: {
                categories: years
            },
            yAxis: {
                title: {
                    text: '(°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'variance',
                data: values
            }]
        });        
        console.log('done'        );
    })
    };



    function drawMap(data) {
        // Create the chart
       return Highcharts.mapChart('mapContainerCo2', {
            chart: {
                map: topology2
            },
            title: {
                text: 'Co2 Changes'
            },
            colors: ['rgba(255,0,0,1)', 'rgba(255,0,0,1)', 'rgba(19,64,117,0.4)',
            'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            mapView: {
                fitToGeometry: {
                    type: 'MultiPoint',
                    coordinates: [
                        // Alaska west
                        [-164, 54],
                        // Greenland north
                        [-35, 84],
                        // New Zealand east
                        [179, -38],
                        // Chile south
                        [-68, -55]
                    ]
                }
            },
            colorAxis: {
                min: 0,
                stops: 
                [
                    [0.1, '#2e3ed1'], //Blue
                    [0.2, '#55a0da'], //light blue
                    [0.3, '#55dacd'], //green light blue
                    [0.4, '#188e2a'], // Green
                    [0.5, '#188e2a'], // Green
                    [0.6, '#fee401'], // Yellow
                    [0.7,'#da9a55'], //orange
                    [1, '#df1309'] // Red
                ],
                min: 0, //-2.062
                max: 15800000000 //3.691
            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },

            series: [{
                data: data,
                joinBy: ['iso-a3', 'code'],
                name: 'Temperature',
                allowPointSelect: true,
                cursor: 'pointer',
                states: {
                    hover: {
                        color: '#BADA55'
                    },
                    select: {
                        color: '#EFFFEF',
                        borderColor: 'black',
                        dashStyle: 'dot'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontWeight: 100,
                        fontSize: '6px',
                        textOutline: 'none'
                    }
                }
            }], 
            plotOptions: {
                series: {
                    point: {
                        events: {
                            select: function () { 
                                console.log(this.code);
                                drawLineChart(this.code);  
                            },
                            unselect: function () {
                                //remove chart  //TODO

                            }//end of unselect
                        } //end of events
                    }
                } //end of series
            },

        }); //end of mapContainer

    } //end of drawMap

    d3.csv('../data/co2.csv').then(function(csvData) {

        // Filter the rows based on the desired year
        filteredData = csvData.map(row => {
                return {
                    code: row.code,
                    value: parseFloat(row[year])
                };
            });
    
        console.log(filteredData);
        drawMap(filteredData);
        //drawLineChart('USA');
    });

    slider2.oninput = function() {
        console.log(this.value);  
        // 1 ~ 100
        // 1962 ~ 2017
        year = 1962 + Math.floor(this.value / 1.8);
        console.log(year);
        
        d3.csv('../data/co2.csv').then(function(csvData) {
            filteredData = csvData.map(row => {
                return {
                    code: row.code,
                    value: parseFloat(row[year])
                };
            });
        
            console.log(filteredData);
            drawMap(filteredData);
        });
    };
    
  
})();


