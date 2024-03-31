"use client"

import React, { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import Link from 'next/link';


const BuildModel = () => {
  const [outputState, setOutputState] = useState([]);
  const [loss, setLoss] = useState(0);

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
        inputShape: [parseInt(numberOfInputs), parseInt(numberOfInputs), 1],
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
        units: parseInt(outputLayer.nodes),
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
        units: parseInt(outputLayer.nodes),
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
          optimizer: tf.train.adam(learningRate),
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

            let newOutputState = [...outputState, `Epoch ${epoch + 1}: loss = ${logs.loss}`];
            console.log(newOutputState);
            if (newOutputState.length > 10) newOutputState = newOutputState.slice(1, newOutputState.length);
            setOutputState(newOutputState);
            setLoss(logs.loss);
          }
        }
      }).then(() => {
        model.save('indexeddb://my-model-2');
      });
    });
  }

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
    learningRate: 0.01,
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

  const [dataImported, setDataImported] = useState(false);
  const [data, setData] = useState('');

  const convertCSVtoJSON = (csvData) => {
    // Converting the headers and lines from the .csv file to arrays
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    for (let i = 0; i < headers.length; i++) {
      headers[i] = headers[i].replace(/\r/g, '');
    }
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/\r/g, '');
    }
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      if (currentLine.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        jsonData.push(obj);
      }
    }

    return jsonData;
  };

  const handleTrain = (e) => {
    e.preventDefault();
    if (dataImported) {
      // PUT STUFF HERE
      console.log(data);

      buildModel(modelProps);
      trainModel(modelProps);

    }

    buildModel(modelProps);
    trainModel(modelProps);
  }
  const handleClick = (e) => {
    e.preventDefault();
    const csvFileInput = document.getElementById('csvFileInput');
    const file = csvFileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const csvData = event.target.result;
        const jsonData = convertCSVtoJSON(csvData);
        setData(jsonData);
        setDataImported(true);
      };

      reader.readAsText(file);
      alert('Completed.');
    } else {
      alert('Please select a CSV file to convert.');
    }
  };

  useEffect(() => {


    const JSONmodelProps2 = localStorage.getItem('model-params')
    const modelProps2 = JSON.parse(JSONmodelProps2)
    console.log(modelProps2);

  }, []);

  return (
    <div className='flex flex-col h-screen items-center p-5 bg-black gap-5 pr-20 pl-20'>
      <div className="bg-black py-4 w-full">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link legacyBehavior href="/" passHref>
            <h1 className="pl-16 text-white text-2xl font-bold">SIMPL-AI</h1>
          </Link>
          <nav className="flex space-x-4">
            <Link legacyBehavior href="/about" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Instructions</a>
            </Link>
            <Link legacyBehavior href="/builder" passHref>
              <a className="text-white pl-16 hover:text-gray-300 pr-16">Network Builder</a>
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-row h-full w-full items-center justify-center gap-2 p-2 text-black">
        <div className='h-full basis-5/12  flex flex-col justify-center items-center gap-5'>
          <form className='flex flex-col gap-5 justify-center items-center'>
            <input type="file" id="csvFileInput" className=' p-5 bg-gray-500 w-[300px] h-19 items-center flex justify-center rounded-3xl' />
            <button className='w-[300px] p-5 rounded-3xl bg-gray-500 text-3xl' onClick={handleClick}>Import CSV</button>
          </form>
          <button className='text-3xl w-[300px] rounded-3xl p-5 bg-gray-500' onClick={handleTrain}>Train</button>
        </div>
        <div className='basis-7/12 h-full bg-green-500'>
          <div className='flex flex-col gap-5 justify-center items-center'>
            <h1 className='text-3xl py-5'>Output</h1>
            <div className='flex flex-col gap-5 justify-center items-center'>
              {outputState.map((output, index) => {
                return <p key={index} className='text-2xl'>{output}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildModel