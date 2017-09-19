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
    var out = "";
    var data = [];

    for(ac = 8; ac < 26; ac++) {
        var damage = 0;
        for(roll = 2; roll < 20; roll++) {
            if(roll + hit >= ac) {
                damage += dmg;
            }
        }
        damage += 2 * dmg;
        damage /= 20;
        out = out + "AC " + ac + " Damage: " + damage + "\n";
        data[ac-8] = {
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

