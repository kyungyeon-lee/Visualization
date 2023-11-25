(async () => {

    // Load the topology data using fetch
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());


    function drawLineChart(countryCode){ // USA , AUS
        console.log(countryCode);

        d3.csv('data/world.csv').then(function(csvData) {
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
        

        Highcharts.chart('lineChartContainer', {
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
       return Highcharts.mapChart('mapContainer', {
            chart: {
                map: topology
            },
            title: {
                text: 'Global Temperature Changes'
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
                min: -2, //-2.062
                max: 3 //3.691
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




    d3.csv('data/world.csv').then(function(csvData) {

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

    slider.oninput = function() {
        console.log(this.value);  
        // 1 ~ 100
        // 1967 ~ 2022
        year = 1967 + Math.floor(this.value / 1.8);
        console.log(year);
        
        d3.csv('data/world.csv').then(function(csvData) {
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