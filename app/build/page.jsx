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
      inputShape: [numberOfInputs,],
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

  const modelJSON = model.toJSON();
  const saveResults = await model.save('indexeddb://my-model-1');

  // const saveResult = await model.save('localstorage://my-model');
  // console.log(saveResult);

  const jsonBlob = new Blob([JSON.stringify(modelJSON)], { type: 'application/json' });
  // const downloadLink = document.createElement('a');
  // downloadLink.href = URL.createObjectURL(jsonBlob);
  // downloadLink.download = 'model.json';
  // downloadLink.click();

  return modelJSON;
}

const trainModel = async ({
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

  const model = await tf.loadLayersModel('indexeddb://my-model-1');

  // const model = tf.sequential();
  // model.add(tf.layers.conv2d({
  //   inputShape: [28, 28, 1],
  //   filters: 32,
  //   kernelSize: [5, 5],
  //   activation: 'relu',
  // }));
  // model.add(tf.layers.conv2d({
  //   filters: 32,
  //   kernelSize: [5, 5],
  //   activation: 'relu',
  // }));
  // model.add(tf.layers.maxPooling2d({
  //   poolSize: [2, 2]
  // }));
  // model.add(tf.layers.dropout({
  //   rate: 0.25
  // }));
  // model.add(tf.layers.conv2d({
  //   filters: 64,
  //   kernelSize: [3, 3],
  //   activation: 'relu',
  // }));
  // model.add(tf.layers.conv2d({
  //   filters: 64,
  //   kernelSize: [3, 3],
  //   activation: 'relu',
  // }));
  // model.add(tf.layers.maxPooling2d({
  //   poolSize: [2, 2]
  // }));
  // model.add(tf.layers.dropout({
  //   rate: 0.25
  // }));
  // model.add(tf.layers.flatten());

  // model.add(tf.layers.dense({
  //   units: 256,
  //   activation: 'relu'
  // }));
  // model.add(tf.layers.dropout({
  //   rate: 0.5
  // }));
  // model.add(tf.layers.dense({
  //   units: 10,
  //   activation: 'softmax'
  // }));

  const trainData = tf.data.csv(
    'XOR_Data.csv', {
    hasHeader: true,
    // columnConfigs: {
    //   A: {
    //     isLabel: true
    //   }
    // }
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
    // const inputTensor = tf.tensor2d([[1, 1], [0, 1], [1, 0], [0, 0]]);
    // const outputTensor = tf.tensor2d([[0], [1], [1], [0]]);

    //const processedData = [...inputTensor, ...outputTensor]

    // const processedData = trainData.map(({
    //   xs,
    //   ys
    // }) => {
    //   return {
    //     // get all pixels and put them into a tensor with 28 * 28 * 1
    //     xs: tf.tensor(Object.values(xs), [2, 1]).div(255),
    //     // we need to do one-hot encoding for each label
    //     ys: tf.oneHot((Object.values(ys)[0]), 1)
    //   };
    // })//.shuffle(4).batch(4);

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

    model.fit(inputTensor, outputTensor, {
      epochs: 1000,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
        }
      }
    });
  });



  // model.fit((processedData), {
  //   epochs: 20,
  //   verbose: true,
  //   // regist tensorboard for visualization

  // }).then(() => {
  //   // save the current model
  //   console.log("finished!!!")
  //   model.save("./mnist")
  // })
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
    outputLayer: { nodes: 1, activationFunction: 'linear' },
    lossFunction: 'meanSquaredError',
    optimizer: 'adam',
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
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

    buildModel(modelProps);
    trainModel(modelProps);

  }, []);

  return (
    <button onClick={() => buildModel(modelProps)}>Train Model</button>
  )
}

export default BuildModel