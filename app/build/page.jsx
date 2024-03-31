"use client"

import React, { useEffect } from 'react'
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
      units: parseInt(numberOfInputs),
      inputShape: [parseInt(numberOfInputs),],
      kernelInitializer: 'heNormal'
    }))

    hiddenLayers.forEach(obj => {
      if (obj.regularization.type.toLowerCase() == 'dropout') {
        model.add(tf.layers.dense({
          units: parseInt(obj.nodes),
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: parseFloat(obj.regularization.param),
        }))
      } else if (obj.regularization.type.toLowerCase() == 'l2') {
        model.add(tf.layers.dense({
          units: parseInt(obj.nodes),
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: tf.regularizers.l2({ l2: parseFloat(obj.regularization.param) }),
        }))
      } else if (obj.regularization.type.toLowerCase() == "l1") {
        model.add(tf.layers.dense({
          units: parseInt(obj.nodes),
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: tf.regularizers.l1({ l1: parseFloat(obj.regularization.param) }),
        }))
      } else {
        model.add(tf.layers.dense({
          units: parseInt(obj.nodes),
          activation: obj.activation,
          kernelInitializer: 'heNormal',
        }))
      }
    });

    model.add(tf.layers.dense({
      units: parseInt(outputLayer.nodes),
      activation: outputLayer.activationFunction,
      metrics: ['accuracy']
    }))


    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(parseFloat(learningRate)),
        loss: lossFunction,
      });
    }
  }
  else if (networkType.toLowerCase() == 'cnn') {
    model.add(tf.layers.conv2d({
      inputShape: [parseInt(numberOfInputs), parseInt(numberOfInputs), 1],
      kernelSize: parseInt(CNNkernelSize),
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
      units: parseInt(outputLayer.nodes),
      activation: outputLayer.activationFunction,
      metrics: ['accuracy']
    }))


    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(parseFloat(learningRate)),
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
      units: parseInt(outputLayer.nodes),
      activation: outputLayer.activationFunction,
      metrics: ['accuracy']
    }));

    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(parseFloat(learningRate)),
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

    let arr1 = arr.slice(0, parseInt(numberOfInputs));
    let arr2 = arr.slice(parseInt(numberOfInputs), arr.length);

    inputarray.push([...arr1]);
    outputarray.push([...arr2]);
  }).then(() => {
    console.log(inputarray);
    console.log(outputarray);

    const inputTensor = tf.tensor2d(inputarray, [inputarray.length, parseInt(numberOfInputs)]);
    const outputTensor = tf.tensor2d(outputarray, [outputarray.length, parseInt(outputLayer.nodes)]);

    if (optimizer.toLowerCase() == 'adam') {
      model.compile({
        optimizer: tf.train.adam(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(parseFloat(learningRate)),
        loss: lossFunction,
      });
    } else if (optimizer.toLowerCase() == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(parseFloat(learningRate)),
        loss: lossFunction,
      });
    }

    model.fit(inputTensor, outputTensor, {
      epochs: parseInt(epochs),
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


const BuildModel = () => {

  const modelProps = {
    modelName: 'exampleModel',
    networkType: 'ANN',
    numberOfInputs: 2,
    inputNames: ['input1', 'input2', 'input3', 'input4'],
    hiddenLayers: [
      { nodes: 4, activation: 'sigmoid', regularization: { type: 'L2', param: 0.01 } },
      { nodes: 4, activation: 'sigmoid', regularization: { type: 'Dropout', param: 0.2 } }
    ],
    outputLayer: { nodes: 1, activationFunction: 'sigmoid' },
    lossFunction: 'meanSquaredError',
    optimizer: 'adam',
    learningRate: 0.001,
    batchSize: 32,
    epochs: 1000,
    testSplit: 0.2,
    CNNkernalSize: 3,
    CNNactivationFunction: 'relu',
    CNNnumberOfHiddenLayers: 2,
    LSTMtimeSteps: 10,
    LSTMunits: 11,
    LSTMfeatures: 100,
    LSTMnumberOfHiddenLayers: 3,
    LSTMactivation: 'tanh'
  };

  

  useEffect(() => {

    const JSONmodelProps2 = localStorage.getItem('model-params');
    const modelProps2 = JSON.parse(JSONmodelProps2);

    buildModel(modelProps2);
    trainModel(modelProps2);

  }, []);

  return (
    <button>Train Model</button>
  )
}

export default BuildModel