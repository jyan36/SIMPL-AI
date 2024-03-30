"use client"
import React, { useState, useEffect } from 'react';
import ObjectDetection from '../Aditya/page.jsx'

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
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
  const [networkType, setNetworkType] = useState('ann');
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
  const [CNNkernelSize, setCNNkernelSize] = useState('');
  const [CNNactivationFunction, setCNNactivationFunction] = useState('');
  const [CNNnumberOfHiddenLayers, setCNNnumberOfHiddenLayers] = useState('');
  const [hL, setHL] = useState([]);



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

  const handleTypeChange = (selectedType) => {
    setNetworkType(selectedType);
  }

  const handleChangeNumberOfNodes = (index, value) => {
    const updatedChange = [...hiddenLayers];
    updatedChange[index] = value;
    setHiddenLayers(updatedChange);
  };

  const handleRegularizationType = (index, selectedActivation) => {
    const updatedHiddenLayers = [...hiddenLayers];
    updatedHiddenLayers[index].activation = selectedActivation;
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

  const [kS, setKS] = useState();

  useEffect(() => {
    let thing = [];
    if (networkType == "cnn") {
      thing.push(
        <div>
          <label htmlFor="CNNkernelSize">Test Split:</label>
          <input
            type="text"
            id="name"
            value={CNNkernelSize}
            onChange={(e) => setCNNkernelSize(e.target.value)}
          />
        </div>);
    }
    setKS(thing);
  }, [networkType]);

  const [iN, setIN] = useState();
  const handleInputChange = (index, value) => {
    const updatedChange = inputNames;
    updatedChange[index] = value;
    setHiddenLayers(updatedChange);
  };
  const handleOutputLayerNodesChange = (value) => {
      const hi = outputLayer;
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

  return (
    <div>
      <h1>Network Builder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="modelName">Model Name:</label>
          <input
            type="text"
            id="name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="networkType">Network Type:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`type`}>{networkType ? networkType.charAt(0).toUpperCase() + networkType.charAt(1).toUpperCase() + networkType.charAt(2).toUpperCase(): ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleTypeChange('ann')}>ANN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('rnn')}>RNN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('cnn')}>CNN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <label htmlFor="numberOfInputs">Number of Inputs:</label>
          <input
            type="text"
            id="name"
            value={numberOfInputs}
            onChange={(e) => setNumberOfInputs(e.target.value)}
          />
        </div>
        <div>
          {iN}
        </div>
        <div>
          <label htmlFor="numberOfHiddenLayers">Number of Hidden Layers:</label>
          <input
            type="text"
            id="name"
            value={numberOfHiddenLayers}
            onChange={(e) => setNumberOfHiddenLayers(e.target.value)}
          />
        </div>
        <div>
          {hL}
        </div>
        <div>
          <label htmlFor="outputLayer">Output Layer:</label>
          <input
            type="text"
            id="name"
            value={outputLayer}
            onChange={(e) => setOutputLayer(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lossFunction">Loss Function:</label>
          <input
            type="text"
            id="name"
            value={lossFunction}
            onChange={(e) => setLossFunction(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="optimizer">Optimizer:</label>
          <input
            type="text"
            id="name"
            value={optimizer}
            onChange={(e) => setOptimizer(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="learningRate">Learning Ratee:</label>
          <input
            type="text"
            id="name"
            value={learningRate}
            onChange={(e) => setLearningRate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="batchSize">Batch Size:</label>
          <input
            type="text"
            id="name"
            value={batchSize}
            onChange={(e) => setBatchSize(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="epochs">Epochs:</label>
          <input
            type="text"
            id="name"
            value={epochs}
            onChange={(e) => setEpochs(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="validationSplit">Validation Split:</label>
          <input
            type="text"
            id="name"
            value={validationSplit}
            onChange={(e) => setValidationSplit(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="testSplit">Test Split:</label>
          <input
            type="text"
            id="name"
            value={testSplit}
            onChange={(e) => setTestSplit(e.target.value)}
          />
        </div>
        <div>
          {kS}
        </div>
        <div>
          <label htmlFor="CNNactivationFunction">Test Split:</label>
          <input
            type="text"
            id="name"
            value={CNNactivationFunction}
            onChange={(e) => setCNNactivationFunction(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="CNNnumberOfHiddenLayers">Test Split:</label>
          <input
            type="text"
            id="name"
            value={CNNnumberOfHiddenLayers}
            onChange={(e) => setCNNnumberOfHiddenLayers(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
  );
};

export default FormComponent;