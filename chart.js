var ctx = document.getElementById("chart").getContext('2d');
var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: []
    },
    options: {
        legend: {
            position: 'bottom'
        },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: true,
                    labelString: 'Monster AC'
                },
                ticks: {
                    min: 4, //TODO use constants
                    max: 26,
                    stepSize: 1
                }
            }],
            yAxes: [{
                type: 'linear',
                position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: 'Average Damage'
                },
                ticks: {
                    min: 0,
                    suggestedMax: 20,
                    stepSize: 1
                }
            }]
        }
    }
});
