"use client"

import React, { useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'

const buildModel = async ({
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
  CNNkernalSize,
  CNNnumberOfHiddenLayers,
  CNNactivationFunction,
  LSTMtimeSteps,
  LSTMunits,
  LSTMfeatures,
  LSTMnumberOfHiddenLayers,
  LSTMactivation
}) => {

  let model = tf.sequential();
  if (networkType == 'ANN') {
    model.add(tf.layers.dense({
      units: numberOfInputs,
      inputShape: [numberOfInputs],
      kernelInitializer: 'heNormal'
    }))

    hiddenLayers.forEach(obj => {
      if (obj.regularization.type == 'Dropout') {
        model.add(tf.layers.dense({
          units: obj.nodes,
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: obj.regularization.param,
        }))
      } else if (obj.regularization.type == 'L2') {
        model.add(tf.layers.dense({
          units: obj.nodes,
          activation: obj.activation,
          kernelInitializer: 'heNormal',
          dropout: tf.regularizers.l2({ l2: obj.regularization.param }),
        }))
      } else if (obj.regularization.type == "L1") {
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


    if (optimizer == 'adam') {
      model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(learningRate),
        loss: lossFunction,
      });
    }
  }
  else if (networkType == 'CNN') {
    model.add(tf.layers.conv2d({
      inputShape: [numberOfInputs, numberOfInputs, 1],
      kernelSize: CNNkernalSize,
      filters: 1,
      kernelInitializer: 'heNormal',
      activation: CNNactivationFunction
    }))

    for (let i = 1; i <= CNNnumberOfHiddenLayers; i++) {
      model.add(tf.layers.conv2d({
        kernelSize: CNNkernalSize,
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


    if (optimizer == 'adam') {
      model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(learningRate),
        loss: lossFunction,
      });
    }
  } else if (networkType == 'RNN') {
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

    if (optimizer == 'adam') {
      model.compile({
        optimizer: tf.train.adam(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer == 'sgd') {
      model.compile({
        optimizer: tf.train.sgd(learningRate),
        loss: lossFunction,
      });
    } else if (optimizer == 'rmsprop') {
      model.compile({
        optimizer: tf.train.rmsprop(learningRate),
        loss: lossFunction,
      });
    }
  }

  const modelJSON = await model.toJSON();
  console.log(modelJSON);

  const jsonBlob = new Blob([JSON.stringify(modelJSON)], { type: 'application/json' });
  // const downloadLink = document.createElement('a');
  // downloadLink.href = URL.createObjectURL(jsonBlob);
  // downloadLink.download = 'model.json';
  // downloadLink.click();

}

const BuildModel = () => {
  const modelProps = {
    modelName: 'exampleModel',
    networkType: 'RNN',
    numberOfInputs: 30,
    inputNames: ['input1', 'input2', 'input3', 'input4', 'input5'],
    hiddenLayers: [
      { nodes: 10, activation: 'relu', regularization: { type: 'L2', param: 0.01 } },
      { nodes: 8, activation: 'relu', regularization: { type: 'Dropout', param: 0.2 } }
    ],
    outputLayer: { nodes: 69, activationFunction: 'sigmoid' },
    lossFunction: 'categoricalCrossentropy',
    optimizer: 'adam',
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    testSplit: 0.2,
    CNNkernalSize: 3,
    CNNactivationFunction: 'relu',
    CNNnumberOfHiddenLayers: 3,
    LSTMtimeSteps: 10,
    LSTMunits: 11,
    LSTMfeatures: 100,
    LSTMnumberOfHiddenLayers: 3,
    LSTMactivation: 'tanh'
  };

  return (
    <button onClick={() => buildModel(modelProps)}>Train Model</button>
  )
}

export default BuildModel