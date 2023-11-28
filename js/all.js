// var  comboData = {};
// d3.csv("data/sea_temp2.csv").then(function (data) {

//     data.forEach((row) => {
//         const year = parseInt(row.Year)
//         const temp = parseInt(row.Temp);
//         const sea_lvl = parseInt(row.Sea_Level);
//     });

// comboData = [year, temp, sea_lvl];


// Include the D3 library (make sure to include it in your HTML file)
// <script src="https://d3js.org/d3.v5.min.js"></script>

// Assuming you are working in a browser environment
d3.csv('../data/sea_temp2.csv').then(csvData => {
    // Extract header and column names
    // const [header, ...columnNames] = Object.keys(csvData[0]);

    // // Create an array of objects
    // const csvArray = csvData.map(row => {
    //     const rowObject = {};

    //     columnNames.forEach(col => {
    //         rowObject[col] = row[col];
    //     });

    //     return rowObject;
    // });
    // console.log(csvArray);

    const formattedData = csvData.map(row => {
        return {
            Year: row.Year,
            Sea_Level: parseFloat(row.Sea_Level).toFixed(2),
            Temp: parseFloat(row.Temp).toFixed(3)
        };
    });

    // Print the formatted data
    console.log('Year,Sea_Level,Temp');
    formattedData.forEach(row => {
        console.log(`${row.Year},${row.Sea_Level},${row.Temp}`);
    });





    const chart = Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: "Global Temperature, Co2, Sea level| 1993 -2021, Normalized Value",
        },
        sonification: {
            duration: 27000,
            afterSeriesWait: 1200,
            defaultInstrumentOptions: {
                instrument: 'basic2',
                mapping: {
                    playDelay: 500
                }
            },
            // Speak the series name at beginning of series
            globalTracks: [{
                type: 'speech',
                mapping: {
                    text: '{point.series.name}',
                    volume: 0.4,
                    rate: 2
                },
                // Active on first point in series only
                activeWhen: function (e) {
                    return e.point && !e.point.index;
                }
            }]
        },
        accessibility: {
            screenReaderSection: {
                axisRangeDateFormat: '%B %Y',
                beforeChartFormat: ''
            },
            point: {
                dateFormat: '%b %e, %Y',
                valueDescriptionFormat: '{value}{separator}{xDescription}'
            },
            series: {
                pointDescriptionEnabledThreshold: false
            }
        },
        colors: ['#3d3f51', '#42858C', '#AD343E'],
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: true
                },
                marker: {
                    enabled: false
                },
                cropThreshold: 10
            }
        },
        data: //formattedData,
        {
            csv: document.getElementById('csv').textContent
        },
        yAxis: {
            title: {
                text: null
            },
            accessibility: {
                description: 'Temperature, Co2, Sea_level Data'
            },
            labels: {
                format: '{text}'
            }
        },
        xAxis: {
            accessibility: {
                description: 'Time'
            },
            type: 'year'
        },
        tooltip: {
            // valueSuffix: '%',
            stickOnContact: true
        },
        legend: {
            enabled: false
        }
    });


    // Handle the keyboard navigation
    document.getElementById('controls').onkeydown = function (e) {
        let lastPlayed;

        const speaker = new Highcharts.sonification.SonificationSpeaker({
            volume: 0.4, rate: 2
        });

        // Announce values + series name after playing individual points. We
        // just reuse the accessibility description for the point, for simplicity.
        // We use a single SonificationSpeaker for the announcement, since it makes
        // it easy to avoid multiple announcements overlapping.
        function onSinglePointPlayed(e) {
            const point = e.pointsPlayed && e.pointsPlayed[0];
            if (point) {
                speaker.sayAtTime(700, point.accessibility.valueDescription +
                    ' ' + point.series.name);
            }
        }

        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            chart.sonification.playAdjacent(
                e.key === 'ArrowRight', onSinglePointPlayed);

        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const newSeries = chart.sonification
                .playAdjacentSeries(e.key === 'ArrowUp', 'x', onSinglePointPlayed);
            lastPlayed = chart.sonification.getLastPlayedPoint();
            if (lastPlayed.x && newSeries) {
                // Speak new series if not first point
                chart.sonification.speak(newSeries.name);
            }

        } else if (e.key === ' ') {
            chart.toggleSonify(false);

        } else if (e.key === 'Home' || e.key === 'End') {
            lastPlayed = chart.sonification.getLastPlayedPoint();
            if (lastPlayed) {
                lastPlayed.series.points[e.key === 'End' ?
                    lastPlayed.series.points.length - 1 : 0
                ].sonify(onSinglePointPlayed);
            }

        } else {
            return; // Don't prevent default on unknown keys
        }
        speaker.cancel();
        e.preventDefault();
    };


    // Start sonification mode
    document.getElementById('sonify').onclick = function () {
        // Show the help field and set keyboard focus to it
        const controls = document.getElementById('controls');
        controls.className = 'visible';

        setTimeout(function () {
            controls.focus();
        }, 10);

        // Notification sound to indicate something happened
        chart.sonification.playNote('vibraphone', {
            note: 'g6', volume: 0.2, noteDuration: 300
        });
    };

});