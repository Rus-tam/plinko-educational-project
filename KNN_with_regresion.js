const tf = require('@tensorflow/tfjs')

const features = tf.tensor([
    [-121, 47],
    [-121.2, 46.5],
    [-122, 46.6],
    [-120.9, 46.7]
]);

const labels = tf.tensor([
    [200],
    [250],
    [215],
    [240]
]);

const predictionPoint = tf.tensor([-121, 47]);
const k = 2;

const result = features
    .sub(predictionPoint)
    .pow(2)
    .sum(1)
    .pow(0.5)
    .expandDims(1)
    .concat(labels, 1)
    .unstack()
    .sort((a, b) => a.arraySync()[0] > b.arraySync()[0] ? 1 : -1)
    .slice(0, k)
    .reduce((acc, pair) => acc + pair.arraySync()[1], 0) / k

// result.print()
console.log(result)