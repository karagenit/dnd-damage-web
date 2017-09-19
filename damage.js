const AC_MIN = 5;
const AC_MAX = 25;

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
                    min: 4,
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

var dataset = [];

function createDataset() {
    //get attributes
    var hit = parseFloat(document.getElementById('tohit').value);
    var dmg = parseFloat(document.getElementById('damage').value);
    var name = document.getElementById('name').value || "Hit " + hit + " Damage " + dmg;

    if(isNaN(hit)) {
        alert('To Hit Cannot Be Left Blank!');
        return;
    }

    if(isNaN(dmg)) {
        alert('Damage Cannot Be Left Blank!');
        return;
    }

    //add data to graph
    pushDataset(name, calculateDataset(hit, dmg));
    updateGraph();

    //clear input boxes
    document.getElementById('tohit').value = '';
    document.getElementById('damage').value = '';
}


function calculateDataset(hit, dmg) {
    var data = [];

    for(ac = AC_MIN; ac <= AC_MAX; ac++) {
        var hits = Math.min(Math.max(20 + hit - ac, 0), 18);
        var damage = dmg * hits;
        damage += 2 * dmg;
        damage /= 20;
        data[ac] = damage;
        console.log(hits);
    }

    return data;
}
function pushDataset(name, rawdata) {
    var color = randomColor();
    var data = [];

    rawdata.forEach(function makeSet(damage, ac) {
        data.push({
            x: ac,
            y: damage
        });
    });

    dataset.push({
        label: name,
        data: data,
        borderColor: color,
        pointBorderColor: color
    });
}

function clearDatasets() {
    dataset = [];
    updateGraph();
}

function updateGraph() {
    scatterChart.data.datasets = dataset;
    scatterChart.update();
}

function randomColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
