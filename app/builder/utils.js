import * as tf from '@tensorflow/tfjs'

export const buildModel = async ({
  modelName,
  networkType,
  numberOfInputs,
  inputNames,
  hiddenLayers,
  outputLayer,
  lossFunction,
  optimizer,
  learningRate,
  batchSize,
  epochs,
  testSplit,
  CNNkernelSize,
  CNNnumberOfHiddenLayers,
  CNNactivationFunction,
  LSTMtimeSteps,
  LSTMunits,
  LSTMfeatures,
  LSTMnumberOfHiddenLayers,
  LSTMactivation
}) => {

  let model = tf.sequential();
  if (networkType.toLowerCase() == 'ann') {
    model.add(tf.layers.dense({
      units: numberOfInputs,
      inputShape: [numberOfInputs,],
      kernelInitializer: 'heNormal'
    }))

    hiddenLayers.forEach(obj => {
      if (obj.regularization.type.toLowerCase() == 'dropout') {
        model.add(tf.layers.dense({
          units: obj.nodes,
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: obj.regularization.param,
        }))
      } else if (obj.regularization.type.toLowerCase() == 'l2') {
        model.add(tf.layers.dense({
          units: obj.nodes,
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: tf.regularizers.l2({ l2: obj.regularization.param }),
        }))
      } else if (obj.regularization.type.toLowerCase() == "l1") {
        model.add(tf.layers.dense({
          units: obj.nodes,
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: tf.regularizers.l1({ l1: obj.regularization.param }),
        }))
      } else {
        model.add(tf.layers.dense({
          units: obj.nodes,
          activation: obj.activation,
          kernelInitializer: 'heNormal',
        }))
      }
    });

    model.add(tf.layers.dense({
      units: outputLayer.nodes,
      activation: outputLayer.activationFunction,
      metrics: ['accuracy']
    }))


    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(learningRate),
        loss: lossFunction,
      });
    }
  }
  else if (networkType.toLowerCase() == 'cnn') {
    model.add(tf.layers.conv2d({
      inputShape: [numberOfInputs, numberOfInputs, 1],
      kernelSize: CNNkernelSize,
      filters: 1,
      kernelInitializer: 'heNormal',
      activation: CNNactivationFunction
    }))

    for (let i = 1; i <= CNNnumberOfHiddenLayers; i++) {
      model.add(tf.layers.conv2d({
        kernelSize: CNNkernelSize,
        filters: 1,
        kernelInitializer: 'heNormal',
        activation: CNNactivationFunction
      }))
    }

    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({
      units: outputLayer.nodes,
      activation: outputLayer.activationFunction,
      metrics: ['accuracy']
    }))


    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(learningRate),
        loss: lossFunction,
      });
    }
  } else if (networkType.toLowerCase() == 'rnn') {
    model.add(tf.layers.lstm({
      units: LSTMunits,
      returnSequences: true,
      inputShape: [LSTMtimeSteps, LSTMfeatures],
      activation: LSTMactivation
    }))

    for (let i = 0; i < LSTMnumberOfHiddenLayers; i++) {
      model.add(tf.layers.lstm({
        units: LSTMunits,
        returnSequences: true,
        activation: LSTMactivation
      }))
    }

    model.add(tf.layers.lstm({
      units: LSTMunits,
      activation: LSTMactivation
    }))

    model.add(tf.layers.dense({
      units: outputLayer.nodes,
      activation: outputLayer.activationFunction,
      metrics: ['accuracy']
    }));

    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(learningRate),
        loss: lossFunction,
      });
    }
  }

  const modelJSON = model.toJSON();
  const saveResults = await model.save('indexeddb://my-model-1');

  // const saveResult = await model.save('localstorage://my-model');
  // console.log(saveResult);

  // const jsonBlob = new Blob([JSON.stringify(modelJSON)], { type: 'application/json' });
  // const downloadLink = document.createElement('a');
  // downloadLink.href = URL.createObjectURL(jsonBlob);
  // downloadLink.download = 'model.json';
  // downloadLink.click();

  //return modelJSON;
}

export const trainModel = async ({
  modelName,
  networkType,
  numberOfInputs,
  inputNames,
  hiddenLayers,
  outputLayer,
  lossFunction,
  optimizer,
  learningRate,
  batchSize,
  epochs,
  testSplit,
  CNNkernelSize,
  CNNnumberOfHiddenLayers,
  CNNactivationFunction,
  LSTMtimeSteps,
  LSTMunits,
  LSTMfeatures,
  LSTMnumberOfHiddenLayers,
  LSTMactivation
}) => {

  const model = await tf.loadLayersModel('indexeddb://my-model-1');

  const trainData = tf.data.csv(
    'XOR_Data.csv', {
    hasHeader: true,
  }
  );

  console.log(trainData)

  let inputarray = [];
  let outputarray = [];
  trainData.forEachAsync((d) => {
    const arr = Object.values(d);

    let arr1 = arr.slice(0, numberOfInputs);
    let arr2 = arr.slice(numberOfInputs, arr.length);

    inputarray.push([...arr1]);
    outputarray.push([...arr2]);
  }).then(() => {
    console.log(inputarray);
    console.log(outputarray);

    const inputTensor = tf.tensor2d(inputarray, [inputarray.length, numberOfInputs]);
    const outputTensor = tf.tensor2d(outputarray, [outputarray.length, outputLayer.nodes]);

    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(learningRate),
        loss: lossFunction,
      });
    }

    model.fit(inputTensor, outputTensor, {
      epochs: epochs,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
        }
      }
    }).then(() => {
      model.save('indexeddb://my-model-1');
    });
  });
}