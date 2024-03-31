"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { buildModel, trainModel } from './utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const FormComponent = () => {
  // Define state variables for form inputs
  const [modelName, setModelName] = useState('');
  const [networkType, setNetworkType] = useState('ANN');
  const [numberOfInputs, setNumberOfInputs] = useState('');
  const [inputNames, setInputNames] = useState([]);
  const [numberOfHiddenLayers, setNumberOfHiddenLayers] = useState(0);
  const [hiddenLayers, setHiddenLayers] = useState([]);
  const [outputLayer, setOutputLayer] = useState('');
  const [lossFunction, setLossFunction] = useState('');
  const [optimizer, setOptimizer] = useState('');
  const [learningRate, setLearningRate] = useState('');
  const [batchSize, setBatchSize] = useState('');
  const [epochs, setEpochs] = useState('');
  const [validationSplit, setValidationSplit] = useState('');
  const [testSplit, setTestSplit] = useState('');
  const [CNNkernelSize, setCNNkernelSize] = useState(0);
  const [CNNactivationFunction, setCNNactivationFunction] = useState('relu');
  const [CNNnumberOfHiddenLayers, setCNNnumberOfHiddenLayers] = useState(0);
  const [LSTMfeatures, setLSTMfeatures] = useState(0);
  const [LSTMtimeSteps, setLSTMtimesteps] = useState(0);
  const [LSTMunits, setLSTMunits] = useState(0);
  const [LSTMnumberOfHiddenLayers, setLSTMnumberOfHiddenLayers] = useState(0);
  const [LSTMactivation, setLSTMactivation] = useState(0);


  const [hL, setHL] = useState([]);
  const [misc, setMisc] = useState([]);


  useEffect(() => {
    let hi = ['Mean Square Error'];
    setLossFunction(hi);
    let bye = ['SGD'];
    setOptimizer(bye);
    let oof = ['relu'];
    setCNNactivationFunction(oof);
    let t = { nodes: 0, activation: "relu" };
    setOutputLayer(t);
  }, []);


  useEffect(() => {
    let hi = [];
    if (networkType == 'cnn') {
      hi.push(
        <div><label htmlFor="CNNkernelSize">Number of Kernels:</label>
          <input
            type="text"
            id="name"
            value={CNNkernelSize}
            onChange={(e) => setCNNkernelSize(e.target.value)}
          />
          <label htmlFor={`cnnAct`}>Activation Function:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`cnnAct`}>{CNNactivationFunction ? CNNactivationFunction : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleActivationCNNChange('relu')}>Relu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationCNNChange('selu')}>Selu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationCNNChange('sigmoid')}>Sigmoid</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationCNNChange('softmax')}>Softmax</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationCNNChange('linear')}>Linear</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationCNNChange('tanh')}>Tanh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <label htmlFor="CNNkernelSize">Number of Hidden Layers:</label>
          <input
            type="text"
            id="name"
            value={CNNnumberOfHiddenLayers}
            onChange={(e) => setCNNnumberOfHiddenLayers(e.target.value)}
          />
        </div>

      );
    }
    else if (networkType == 'rnn') {
      hi.push(
        <div><label htmlFor="LSTMfeatures">Number of Features:</label>
          <input
            type="text"
            id="name"
            value={LSTMfeatures}
            onChange={(e) => setLSTMfeatures(e.target.value)}
          />
          <label htmlFor="LSTMtimeSteps">Number of Timesteps:</label>
          <input
            type="text"
            id="name"
            value={LSTMtimeSteps}
            onChange={(e) => setLSTMtimesteps(e.target.value)}
          />
          <label htmlFor="LSTMtimeSteps">Number of LSTM Units:</label>
          <input
            type="text"
            id="name"
            value={LSTMunits}
            onChange={(e) => setLSTMunits(e.target.value)}
          />

        </div>
      )
    }
    setMisc(hi);
  }, [networkType, CNNkernelSize, CNNactivationFunction, CNNnumberOfHiddenLayers, LSTMfeatures, LSTMtimeSteps, LSTMunits]);
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form validation or submit data here
    console.log('Form submitted:', { modelName, networkType, numberOfInputs, inputNames, numberOfHiddenLayers, hiddenLayers, outputLayer, lossFunction, optimizer, learningRate, batchSize, epochs, validationSplit, testSplit });
  };

  useEffect(() => {
    let hiddenLayerstemp = [];
    for (let i = 0; i < numberOfHiddenLayers; i++) {
      hiddenLayerstemp.push({ nodes: 0, activation: 'relu', regularization: { type: 'None', param: 0 } });
    }
    setHiddenLayers(hiddenLayerstemp);
  }, [numberOfHiddenLayers]);

  const handleActivationChange = (index, selectedActivation) => {
    const updatedHiddenLayers = [...hiddenLayers];
    updatedHiddenLayers[index].activation = selectedActivation;
    setHiddenLayers(updatedHiddenLayers);
  };

  const handleActivationCNNChange = (selectedActivation) => {
    let updatedActivation = CNNactivationFunction;
    updatedActivation = selectedActivation;
    setCNNactivationFunction(updatedActivation);
  };

  const handleActivationOutChange = (selectedActivation) => {
    const updatedOutputLayers = { ...outputLayer };
    updatedOutputLayers.activation = selectedActivation;
    setOutputLayer(updatedOutputLayers);
  };

  const handleTypeChange = (selectedType) => {
    setNetworkType(selectedType);
  }

  const handleChangeNumberOfNodes = (index, value) => {
    const updatedChange = [...hiddenLayers];
    updatedChange[index].nodes = value;
    setHiddenLayers(updatedChange);
  };

  const handleRegularizationType = (index, selectedActivation) => {
    const updatedHiddenLayers = [...hiddenLayers];
    updatedHiddenLayers[index].regularization.type = selectedActivation;
    setHiddenLayers(updatedHiddenLayers);
  };

  const handleRegularizationParam = (index, value) => {
    const updatedChange = [...hiddenLayers];
    updatedChange[index].regularization.param = value;
    setHiddenLayers(updatedChange);
  };

  useEffect(() => {
    let thing = [];
    for (let i = 0; i < numberOfHiddenLayers; i++) {
      thing.push(
        <div key={i}>
          <label htmlFor={`numberOfNodes${i}`}>Number of Nodes:</label>
          <input
            type="text"
            id="name"
            value={hiddenLayers[i] ? hiddenLayers[i].nodes : ''}
            onChange={(e) => handleChangeNumberOfNodes(i, e.target.value)}
          />
          <label htmlFor={`hiddenLayers${i}`}>Hidden Layers:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`hiddenLayers${i}`}>{hiddenLayers[i]?.activation ? hiddenLayers[i].activation.charAt(0).toUpperCase() + hiddenLayers[i].activation.slice(1) : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'relu')}>Relu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'selu')}>Selu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'sigmoid')}>Sigmoid</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'softmax')}>Softmax</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'linear')}>Linear</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'tanh')}>Tanh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <label htmlFor={`regularizationType${i}`}>Regularization Type:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`regularizationType${i}`}>{hiddenLayers[i]?.regularization ? hiddenLayers[i].regularization.type.charAt(0).toUpperCase() + hiddenLayers[i].regularization.type.slice(1) : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'None')}>None</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'L1')}>L1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'L2')}>L2</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'Dropout')}>Dropout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <label htmlFor={`regularizationParam`}>Regularization Parameters:</label>
          <input
            type="text"
            id="name"
            value={hiddenLayers[i]?.regularization ? hiddenLayers[i].regularization.param : ''}
            onChange={(e) => handleRegularizationParam(i, e.target.value)}
          />
        </div>
      );
    }
    setHL(thing);
  }, [numberOfHiddenLayers, hiddenLayers]);

  // const [kS, setKS] = useState();
  // useEffect(() => {
  //   let thing = [];
  //     thing.push(
  //       <div>
  //         <label htmlFor="CNNkernelSize">Test Split:</label>
  //         <input
  //           type="text"
  //           id="name"
  //           value={CNNkernelSize}
  //           onChange={(e) => setCNNkernelSize(e.target.value)}
  //         />
  //       </div>);
  //   setKS(thing);
  // }, [networkType]);

  const [iN, setIN] = useState();
  const handleInputChange = (index, value) => {
    const updatedChange = inputNames;
    updatedChange[index] = value;
    setHiddenLayers(updatedChange);
  };
  const handleOutputLayerNodesChange = (value) => {
    const hi = { ...outputLayer };
    hi.nodes = value;
    setOutputLayer(hi);
    console.log(hi);
  };

  useEffect(() => {
    let thing = [];
    for (let i = 0; i < numberOfInputs; i++) {
      thing.push(
        <div key={i}>
          <label htmlFor={`inputNames${i}`}>Input Names:</label>
          <input
            type="text"
            id="name"
            value={inputNames[i]}
            onChange={(e) => handleInputChange(i, e.target.value)}
          />
        </div>
      );
    }
    setIN(thing);
  }, [numberOfInputs, inputNames]);

  const handleLossFunction = (index, selectedActivation) => {
    const updatedLossFunction = [...lossFunction];
    updatedLossFunction[index] = selectedActivation;
    setLossFunction(updatedLossFunction);
  };

  const [lF, setLF] = useState([]);
  useEffect(() => {
    let thing = [];
    for (let i = 0; i < 1; i++) {
      thing.push(
        <div>
          <label htmlFor={`lossFunction${i}`}>Loss Function:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`lossFunction${i}`}>{lossFunction[i] ? lossFunction[i].charAt(0).toUpperCase() + lossFunction[i].slice(1) : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleLossFunction(i, 'Mean_Square_Error')}>Mean Square Error</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLossFunction(i, 'Binary_Crossentropy')}>Binary Crossentropy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLossFunction(i, 'Categorical_Crossentropy')}>Categorical Crossentropy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLossFunction(i, 'LogCosh')}>Log Cosh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>);
    }
    setLF(thing);
  }, [lossFunction]);

  const handleOptimizer = (index, selectedActivation) => {
    const updatedOptimizer = [...optimizer];
    updatedOptimizer[index] = selectedActivation;
    setOptimizer(updatedOptimizer);
  };

  const [oP, setOP] = useState([]);
  useEffect(() => {
    let thing = [];
    for (let i = 0; i < 1; i++) {
      thing.push(
        <div>
          <label htmlFor={`optimizer${i}`}>Optimizer:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`optimizer${i}`}>{optimizer[i] ? optimizer[i].charAt(0).toUpperCase() + optimizer[i].slice(1) : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleOptimizer(i, 'sgd')}>sgd</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOptimizer(i, 'adam')}>adam</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOptimizer(i, 'rmsprop')}>rmsprop</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>);
    }
    setOP(thing);
  }, [optimizer]);

  return (
    <div>
      <header className="bg-black py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <Link legacyBehavior href="/" passHref>
            <h1 className="pl-16 text-white text-2xl font-bold">SIMPL-AI</h1>
          </Link>
          <nav className="flex space-x-4">
            <Link legacyBehavior href="/about" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Instructions</a>
            </Link>
            <Link legacyBehavior href="/builder" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Network Builder</a>
            </Link>
            <Link legacyBehavior href="/predictions" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Predictions</a>
            </Link>
            <Link legacyBehavior href="/terminal" passHref>
              <a className="text-white pl-16 pr-16 hover:text-gray-300">Terminal</a>
            </Link>
          </nav>
        </div>
      </header>
      <div class="bg-black text-white font-bold">
        <h1 class="text-8xl font-bold mb-8 ml-4">Network Builder</h1>
        <div class="flex justify-center">
          <form class="w-1/2" onSubmit={handleSubmit}>
            <div class="mb-4">
              <label for="modelName" class="block mb-2">Model Name:</label>
              <input type="text" id="modelName" value={modelName} onChange={(e) => setModelName(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              <label for="networkType" class="block mb-2">Network Type:</label>
              <div class="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger id={`type`} class="px-4 py-2 rounded border border-gray-400 bg-transparent text-black">
                    {networkType ? networkType.charAt(0).toUpperCase() + networkType.slice(1) : ''}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleTypeChange('ann')}>ANN</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTypeChange('rnn')}>RNN</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTypeChange('cnn')}>CNN</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div class="mb-4">
              <label for="numberOfInputs" class="block mb-2">Number of Inputs:</label>
              <input type="text" id="numberOfInputs" value={numberOfInputs} onChange={(e) => setNumberOfInputs(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              {iN}
            </div>
            <div class="mb-4">
              <label for="numberOfHiddenLayers" class="block mb-2">Number of Hidden Layers:</label>
              <input type="text" id="numberOfHiddenLayers" value={numberOfHiddenLayers} onChange={(e) => setNumberOfHiddenLayers(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              {hL}
            </div>
            <div class="mb-4">
              <h1 class="text-white font-bold">Output Layer</h1>
              <label for="outputLayerNodes" class="block mb-2">Number of Nodes:</label>
              <input type="text" id="outputLayerNodes" value={outputLayer.nodes} onChange={(e) => handleOutputLayerNodesChange(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
              <label for={`outact`} class="block mb-2">Activation Function:</label>
              <div class="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger id={`outact`} class="px-4 py-2 rounded border border-gray-400 bg-transparent text-white">
                    {outputLayer?.activation ? outputLayer.activation.charAt(0).toUpperCase() + outputLayer.activation.slice(1) : ''}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleActivationOutChange('relu')}>Relu</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleActivationOutChange('selu')}>Selu</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleActivationOutChange('sigmoid')}>Sigmoid</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleActivationOutChange('softmax')}>Softmax</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleActivationOutChange('linear')}>Linear</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleActivationOutChange('tanh')}>Tanh</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div class="mb-4">
              {lF}
            </div>
            <div class="mb-4">
              {oP}
            </div>
            <div class="mb-4">
              <label for="learningRate" class="block mb-2">Learning Rate:</label>
              <input type="text" id="learningRate" value={learningRate} onChange={(e) => setLearningRate(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              <label for="batchSize" class="block mb-2">Batch Size:</label>
              <input type="text" id="batchSize" value={batchSize} onChange={(e) => setBatchSize(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              <label for="epochs" class="block mb-2">Epochs:</label>
              <input type="text" id="epochs" value={epochs} onChange={(e) => setEpochs(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              <label for="validationSplit" class="block mb-2">Validation Split:</label>
              <input type="text" id="validationSplit" value={validationSplit} onChange={(e) => setValidationSplit(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              <label for="testSplit" class="block mb-2">Test Split:</label>
              <input type="text" id="testSplit" value={testSplit} onChange={(e) => setTestSplit(e.target.value)} class="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-white" />
            </div>
            <div class="mb-4">
              {misc}
            </div>
            <button onSubmit={buildModel(
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
            )} type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;