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
  const [CNNkernelSize, setCNNkernelSize] = useState(0);
  const [CNNactivationFunction, setCNNactivationFunction] = useState('relu');
  const [CNNnumberOfHiddenLayers, setCNNnumberOfHiddenLayers] = useState(0);
  const [LSTMfeatures, setLSTMfeatures] = useState(0);
  const [LSTMtimeSteps, setLSTMtimesteps] = useState(0);
  const [LSTMunits, setLSTMunits] = useState(0);

  const [hL, setHL] = useState([]);
  const [misc, setMisc] = useState([]);


  useEffect(() => {
    let hi = ['Mean Square Error'];
    setLossFunction(hi);
    let bye = ['SGD'];
    setOptimizer(bye);
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
  }, [networkType]);
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
    const updatedOutputLayers = { ... outputLayer};
    updatedOutputLayers.activation = selectedActivation;
    setOutputLayer(updatedOutputLayers);
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
            <DropdownMenuTrigger id={`lossFunction${i}`}>{lossFunction[i]? lossFunction[i].charAt(0).toUpperCase() + lossFunction[i].slice(1) : ''}</DropdownMenuTrigger>
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
    const updatedOptimizer = [...optiizer];
    updatedOptimizer[index] = selectedActivation;
    setLossFunction(updatedOptimizer);
  };

  const [oP, setOP] = useState([]);
  useEffect(() => {
    let thing = [];
    for (let i = 0; i < 1; i++) {
      thing.push(
        <div>
          <label htmlFor={`optimizer${i}`}>Optimizer:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`optimizer${i}`}>{optimizer[i]? optimizer[i].charAt(0).toUpperCase() + optimizer[i].slice(1) : ''}</DropdownMenuTrigger>
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
          <h1>Output Layer</h1>
          <label htmlFor="outputLayer">Number of Nodes</label>
          <input
            type="text"
            id="name"
            value={outputLayer.nodes}
            onChange={(e) => handleOutputLayerNodesChange(e.target.value)}
          />
          <label htmlFor={`outact`}>Activation Function</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`outact`}>{outputLayer ? outputLayer.activation.charAt(0).toUpperCase() + outputLayer.activation.substring(1) : ''}</DropdownMenuTrigger>
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
        <div>
          {lF}
        </div>
        <div>
          {oP}
        </div>
        <div>
          <label htmlFor="learningRate">Learning Rate:</label>
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
        <div>
          {misc}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;