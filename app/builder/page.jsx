"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { buildModel, trainModel } from './utils'
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const [modelName, setModelName] = useState('');
  const [networkType, setNetworkType] = useState('ANN');
  const [numberOfInputs, setNumberOfInputs] = useState(0);
  const [inputNames, setInputNames] = useState([]);
  const [numberOfHiddenLayers, setNumberOfHiddenLayers] = useState(0);
  const [hiddenLayers, setHiddenLayers] = useState([]);
  const [outputLayer, setOutputLayer] = useState('');
  const [lossFunction, setLossFunction] = useState('');
  const [optimizer, setOptimizer] = useState('');
  const [learningRate, setLearningRate] = useState(0);
  const [batchSize, setBatchSize] = useState(0);
  const [epochs, setEpochs] = useState(0);
  const [validationSplit, setValidationSplit] = useState(0);
  const [testSplit, setTestSplit] = useState(0);
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
    let hi = 'meanSquaredError';
    setLossFunction(hi);
    let bye = 'sgd';
    setOptimizer(bye);
    let oof = 'relu';
    setCNNactivationFunction(oof);
    let t = { nodes: 0, activation: "relu" };
    setOutputLayer(t);
  }, []);


  useEffect(() => {
    let hi = [];
    if (networkType == 'CNN') {
      hi.push(
        <div><label htmlFor="CNNkernelSize">Number of Kernels:</label>
          <input
            type="number"
            id="name"
            value={CNNkernelSize}
            onChange={(e) => setCNNkernelSize(e.target.value)}
            style={{ color: 'black' }}
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
            type="number"
            id="name"
            value={CNNnumberOfHiddenLayers}
            onChange={(e) => setCNNnumberOfHiddenLayers(e.target.value)}
            style={{ color: 'black' }}
          />
        </div>

      );
    }
    else if (networkType == 'RNN') {
      hi.push(
        <div><label htmlFor="LSTMfeatures">Number of Features:</label>
          <input
            type="number"
            id="name"
            value={LSTMfeatures}
            onChange={(e) => setLSTMfeatures(e.target.value)}
            style={{ color: 'black' }}
          />
          <label htmlFor="LSTMtimeSteps">Number of Timesteps:</label>
          <input
            type="number"
            id="name"
            value={LSTMtimeSteps}
            onChange={(e) => setLSTMtimesteps(e.target.value)}
            style={{ color: 'black' }}
          />
          <label htmlFor="LSTMtimeSteps">Number of LSTM Units:</label>
          <input
            type="number"
            id="name"
            value={LSTMunits}
            onChange={(e) => setLSTMunits(e.target.value)}
            style={{ color: 'black' }}
          />
          <label htmlFor="LSTMnumberOfHiddenLayers">Number of LSTM Hidden Layers:</label>
          <input
            type="number"
            id="name"
            value={LSTMnumberOfHiddenLayers}
            onChange={(e) => setLSTMnumberOfHiddenLayers(e.target.value)}
          />

          <label htmlFor={`lstmAct`}>Activation Function:</label>
          <DropdownMenu>
            <DropdownMenuTrigger id={`lstmAct`}>{LSTMactivation ? LSTMactivation : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleActivationLSTMChange('relu')}>Relu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationLSTMChange('selu')}>Selu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationLSTMChange('sigmoid')}>Sigmoid</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationLSTMChange('softmax')}>Softmax</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationLSTMChange('linear')}>Linear</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationLSTMChange('tanh')}>Tanh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      )
    }
    setMisc(hi);
  }, [networkType, CNNkernelSize, CNNactivationFunction, CNNnumberOfHiddenLayers, LSTMfeatures, LSTMtimeSteps, LSTMunits]);
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      modelName: parseInt(modelName),
      networkType: networkType,
      numberOfInputs: parseInt(numberOfInputs),
      inputNames: inputNames,
      hiddenLayers: hiddenLayers,
      outputLayer: outputLayer,
      lossFunction: lossFunction,
      optimizer: optimizer,
      learningRate: parseInt(learningRate),
      batchSize: parseInt(batchSize),
      epochs: parseInt(epochs),
      testSplit: parseFloat(testSplit),
      CNNkernelSize: parseInt(CNNkernelSize),
      CNNnumberOfHiddenLayers: parseInt(CNNnumberOfHiddenLayers),
      CNNactivationFunction: CNNactivationFunction,
      LSTMtimeSteps: parseInt(LSTMtimeSteps),
      LSTMunits: parseInt(LSTMunits),
      LSTMfeatures: parseInt(LSTMfeatures),
      LSTMnumberOfHiddenLayers: parseInt(LSTMnumberOfHiddenLayers),
      LSTMactivation: LSTMactivation
    };

    const jsonString = JSON.stringify(data);
    console.log(jsonString);

    localStorage.setItem('model-params', jsonString)

    router.push('/build');

    // buildModel({
    //   modelName: parseInt(modelName),
    //   networkType: networkType,
    //   numberOfInputs: parseInt(numberOfInputs),
    //   inputNames: inputNames,
    //   hiddenLayers: hiddenLayers,
    //   outputLayer: outputLayer,
    //   lossFunction: lossFunction,
    //   optimizer: optimizer,
    //   learningRate: parseInt(learningRate),
    //   batchSize: parseInt(batchSize),
    //   epochs: parseInt(epochs),
    //   testSplit: parseFloat(testSplit),
    //   CNNkernelSize: parseInt(CNNkernelSize),
    //   CNNnumberOfHiddenLayers: parseInt(CNNnumberOfHiddenLayers),
    //   CNNactivationFunction: CNNactivationFunction,
    //   LSTMtimeSteps: parseInt(LSTMtimeSteps),
    //   LSTMunits: parseInt(LSTMunits),
    //   LSTMfeatures: parseInt(LSTMfeatures),
    //   LSTMnumberOfHiddenLayers: parseInt(LSTMnumberOfHiddenLayers),
    //   LSTMactivation: LSTMactivation
    // })
    // trainModel({
    //   modelName,
    //   networkType,
    //   numberOfInputs,
    //   inputNames,
    //   hiddenLayers,
    //   outputLayer,
    //   lossFunction,
    //   optimizer,
    //   learningRate,
    //   batchSize,
    //   epochs,
    //   testSplit,
    //   CNNkernelSize,
    //   CNNnumberOfHiddenLayers,
    //   CNNactivationFunction,
    //   LSTMtimeSteps,
    //   LSTMunits,
    //   LSTMfeatures,
    //   LSTMnumberOfHiddenLayers,
    //   LSTMactivation
    // })


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

  const handleActivationLSTMChange = (selectedActivation) => {
    let updatedLSTM = LSTMactivation;
    updatedLSTM = selectedActivation;
    setLSTMactivation(updatedLSTM);
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
          <div className="py-2 font-bold">Hidden Layer {i + 1}</div>
          <div className="py-2"><label htmlFor={`numberOfNodes${i}`}>Number of Nodes:</label></div>
          <input
            type="number"
            id="name"
            className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black"
            value={hiddenLayers[i] ? hiddenLayers[i].nodes : ''}
            onChange={(e) => handleChangeNumberOfNodes(i, e.target.value)}
            style={{ color: 'black' }}
          />
          <div className="py-2"><label htmlFor={`hiddenLayers${i}`}>Activation Function:</label></div>
          <DropdownMenu>
            <DropdownMenuTrigger id={`hiddenLayers${i}`} className="px-4 py-2 rounded border border-gray-400 bg-transparent text-black">{hiddenLayers[i]?.activation ? hiddenLayers[i].activation.charAt(0).toUpperCase() + hiddenLayers[i].activation.slice(1) : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'relu')}>Relu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'selu')}>Selu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'sigmoid')}>Sigmoid</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'softmax')}>Softmax</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'linear')}>Linear</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActivationChange(i, 'tanh')}>Tanh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="py-2"><label htmlFor={`regularizationType${i}`}>Regularization Type:</label></div>
          <DropdownMenu>
            <DropdownMenuTrigger id={`regularizationType${i}`} className="px-4 py-2 rounded border border-gray-400 bg-transparent text-black">{hiddenLayers[i]?.regularization ? hiddenLayers[i].regularization.type.charAt(0).toUpperCase() + hiddenLayers[i].regularization.type.slice(1) : ''}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'None')}>None</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'L1')}>L1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'L2')}>L2</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRegularizationType(i, 'Dropout')}>Dropout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="py-2"><label htmlFor={`regularizationParam`}>Regularization Parameter:</label></div>
          <input
            type="number"
            id="name"
            className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black"
            value={hiddenLayers[i]?.regularization ? hiddenLayers[i].regularization.param : ''}
            onChange={(e) => handleRegularizationParam(i, e.target.value)}
            style={{ color: 'black' }}
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
        <div key={i} className="py-2">
          <div>          <label htmlFor={`inputNames${i}`}>Input Name {i + 1} :</label></div>
          <input
            type="text"
            id="name"
            value={inputNames[i]}
            className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black"
            onChange={(e) => handleInputChange(i, e.target.value)}
            style={{ color: 'black' }}
          />
        </div>
      );
    }
    setIN(thing);
  }, [numberOfInputs, inputNames]);

  const handleLossFunction = (index, selectedActivation) => {
    // const updatedLossFunction = [...lossFunction];
    // updatedLossFunction[index] = selectedActivation;
    setLossFunction(selectedActivation);
  };

  const lossFunctionParse = (lossFunction) => {
    let loss = lossFunction ? lossFunction.charAt(0).toUpperCase() + lossFunction.slice(1) : '';
    if (loss != '') {
      if (loss == "MeanSquaredError") loss = "Mean Square Error";
      else if (loss == "Binary_Crossentropy") loss = "Binary Crossentropy";
      else if (loss == "Categorical_Crossentropy") loss = "Categorical Crossentropy";
      else if (loss == "LogCosh") loss = "Log Cosh";
    }
    return loss;
  }
  const [lF, setLF] = useState([]);
  useEffect(() => {
    let thing = [];
    for (let i = 0; i < 1; i++) {
      thing.push(
        <div>
          <label htmlFor={`lossFunction${i}`}>Loss Function:</label>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger id={`lossFunction${i}`} className="px-4 py-2 rounded border border-gray-400 bg-transparent text-black">{lossFunctionParse(lossFunction)}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLossFunction(i, 'meanSquaredError')}>Mean Square Error</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLossFunction(i, 'Binary_Crossentropy')}>Binary Crossentropy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLossFunction(i, 'Categorical_Crossentropy')}>Categorical Crossentropy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLossFunction(i, 'LogCosh')}>Log Cosh</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>);
    }
    setLF(thing);
  }, [lossFunction]);

  const handleOptimizer = (index, selectedActivation) => {
    // const updatedOptimizer = [...optimizer];
    // updatedOptimizer[index] = selectedActivation;
    setOptimizer(selectedActivation);
  };

  const [oP, setOP] = useState([]);
  useEffect(() => {
    let thing = [];
    for (let i = 0; i < 1; i++) {
      thing.push(
        <div>
          <label htmlFor={`optimizer${i}`}>Optimizer:</label>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger id={`optimizer${i}`} className="px-4 py-2 rounded border border-gray-400 bg-transparent text-black">{optimizer ? optimizer.charAt(0) + optimizer.slice(1) : ''}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleOptimizer(i, 'sgd')}>sgd</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOptimizer(i, 'adam')}>adam</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOptimizer(i, 'rmsprop')}>rmsprop</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>);
    }
    setOP(thing);
  }, [optimizer]);

  return (
    <div>
      <header className="bg-black py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
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
            <Link legacyBehavior href="/train" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Network Trainer</a>
            </Link>
            <Link legacyBehavior href="/predict" passHref>
              <a className="text-white pl-16 hover:text-gray-300">Network Predictor</a>
            </Link>
          </nav>
        </div>
      </header>
      <div className="bg-black text-white font-bol py-6">
        <h1 className="pt-10 text-8xl font-bold text-center">Network Builder</h1>
        <div className="flex justify-center">
          <form className="w-1/2" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label for="modelName" className="block mb-2">Model Name:</label>
              <input type="text" id="modelName" value={modelName} onChange={(e) => setModelName(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              <label for="networkType" className="block mb-2">Network Type:</label>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger id={`type`} className="px-4 py-2 rounded border border-gray-400 bg-transparent text-black">
                    {networkType ? networkType.charAt(0).toUpperCase() + networkType.slice(1) : ''}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleTypeChange('ANN')}>ANN</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTypeChange('RNN')}>RNN</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTypeChange('CNN')}>CNN</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="mb-4">
              <label for="numberOfInputs" className="block mb-2">Number of Inputs:</label>
              <input type="number" id="numberOfInputs" value={numberOfInputs} onChange={(e) => setNumberOfInputs(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              {iN}
            </div>
            <div className="mb-4">
              <label for="numberOfHiddenLayers" className="block mb-2">Number of Hidden Layers:</label>
              <input type="number" id="numberOfHiddenLayers" value={numberOfHiddenLayers} onChange={(e) => setNumberOfHiddenLayers(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              {hL}
            </div>
            <div className="mb-4">
              <h1 className="text-white font-bold">Output Layer</h1>
              <label for="outputLayerNodes" className="block mb-2">Number of Nodes:</label>
              <input type="number" id="outputLayerNodes" value={outputLayer.nodes} onChange={(e) => handleOutputLayerNodesChange(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
              <label for={`outact`} className="block mb-2 py-2 ">Activation Function:</label>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger id={`outact`} className="px-4 py-2 rounded border border-gray-400 bg-transparent text-black">
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
            <div className="mb-4">
              {lF}
            </div>
            <div className="mb-4">
              {oP}
            </div>
            <div className="mb-4">
              <label for="learningRate" className="block mb-2">Learning Rate:</label>
              <input type="number" id="learningRate" value={learningRate} onChange={(e) => setLearningRate(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              <label for="batchSize" className="block mb-2">Batch Size:</label>
              <input type="number" id="batchSize" value={batchSize} onChange={(e) => setBatchSize(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              <label for="epochs" className="block mb-2">Epochs:</label>
              <input type="number" id="epochs" value={epochs} onChange={(e) => setEpochs(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              <label for="validationSplit" className="block mb-2">Validation Split:</label>
              <input type="number" id="validationSplit" value={validationSplit} onChange={(e) => setValidationSplit(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              <label for="testSplit" className="block mb-2">Test Split:</label>
              <input type="number" id="testSplit" value={testSplit} onChange={(e) => setTestSplit(e.target.value)} className="w-full px-4 py-2 rounded border border-gray-400 bg-transparent text-black" style={{ color: 'black' }} />
            </div>
            <div className="mb-4">
              {misc}
            </div>
            <div className="flex justify-center items-center h-screen pb-10">
              <button type="submit" className="border border-white hover:text-black hover:border-black bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
            <div className="mb-10"></div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;