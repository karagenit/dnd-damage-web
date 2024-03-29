const AC_MIN = 5;
const AC_MAX = 25;

var dataset = [];

/**
 * Add a new dataset by reading user text input fields
 */
function createDataset() {
    //get attributes
    var hitBonus = parseFloat(document.getElementById('tohit').value);
    var avgDamage = parseFloat(document.getElementById('damage').value);
    var name = document.getElementById('name').value || "To Hit " + hitBonus + " Damage " + avgDamage;

    if(isNaN(hitBonus)) {
        alert('To Hit Cannot Be Left Blank!');
        return;
    }

    if(isNaN(avgDamage)) {
        alert('Damage Cannot Be Left Blank!');
        return;
    }

    //add data to graph
    pushDataset(name, calculateDataset(hitBonus, avgDamage));
    updateGraph();

    //clear input boxes
    document.getElementById('tohit').value = '';
    document.getElementById('damage').value = '';
}

/**
 * Computes average damage at different ACs
 */
function calculateDataset(hitBonus, avgDamage) {
    var data = [];

    for(ac = AC_MIN; ac <= AC_MAX; ac++) {
        var hits = Math.min(Math.max(20 + hitBonus - ac, 0), 18);
        var totalDamage = avgDamage * hits;
        totalDamage += 2 * avgDamage;
        totalDamage /= 20;
        data[ac] = totalDamage;
    }

    return data;
}

/**
 * Adds the calculated data to the global dataset array
 */
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

/**
 * Wipes the global dataset array
 */
function clearDatasets() {
    dataset = [];
    updateGraph();
}

/**
 * Updates the rendered graph
 */
function updateGraph() {
    scatterChart.data.datasets = dataset;
    scatterChart.update();
}

/**
 * Returns a new random color
 */
function randomColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
