const AC_MIN = 5;
const AC_MAX = 25;

var ctx = document.getElementById("chart").getContext('2d');
var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: []
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

var dataset = [];

function calculate() {
    var hit = parseFloat(document.getElementById('tohit').value);
    var dmg = parseFloat(document.getElementById('damage').value);
    var data = [];

    for(ac = AC_MIN; ac <= AC_MAX; ac++) {
        var damage = 0;
        for(roll = 2; roll < 20; roll++) {
            if(roll + hit >= ac) {
                damage += dmg;
            }
        }
        damage += 2 * dmg;
        damage /= 20;
        data[ac-AC_MIN] = {
            x: ac,
            y: damage
        };
    }

    var color = randomColor();

    dataset.push({
        label: "Hit " + hit + "/Damage " + dmg,
        data: data,
        borderColor: color,
        pointBorderColor: color
    });

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

