import React from 'react'
import Link from 'next/link';

const Testing = () => {

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
            <a className="text-white pl-16 hover:text-gray-300 pr-16">Network Builder</a>
          </Link>
        </nav>
      </div>
    </header>
      <main className="bg-black min-h-screen text-white">
      <div className="bg-gray-200">
      <h2 className="font-bold text-lg mb-2">Model Name:</h2>
      <p className="mb-4">This parameter specifies the name of the AI model.</p>
      <p className="italic ml-4">Example: modelName = "MyNeuralNetwork"</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Network Type:</h2>
      <p className="mb-4">This parameter specifies the type of neural network.</p>
      <p className="italic ml-4">Example: networkType = "ANN" (Artificial Neural Network)</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Number of Inputs:</h2>
      <p className="mb-4">This parameter specifies the number of inputs for the model.</p>
      <p className="italic ml-4">Example: numberOfInputs = 10</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Input Names:</h2>
      <p className="mb-4">This parameter specifies a list of input names for the model.</p>
      <p className="italic ml-4">Example: inputNames = ["input1", "input2", "input3"]</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Hidden Layers:</h2>
      <p className="mb-4">This parameter specifies the hidden layers for the model.</p>
      <p className="italic ml-4">Example: hiddenLayers = ["Layer1", "Layer2", "Layer3"]</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Number of Nodes:</h2>
      <p className="mb-4">This parameter specifies the number of nodes in each hidden layer.</p>
      <p className="italic ml-4">Example: nodes = 128</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Activation Function:</h2>
      <p className="mb-4">This parameter specifies the activation function for the model.</p>
      <p className="italic ml-4">Example: activationFunction = "Relu"</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Regularization:</h2>
      <p className="mb-4">This parameter specifies the regularization type and parameter.</p>
      <p className="italic ml-4">Example: regularization.type = "L2", regularization.param = 0.001</p>

      <h2 className="font-bold text-lg mt-4 mb-2">For Output Layer:</h2>
      <p className="mb-4">This parameter specifies the settings for the output layer.</p>
      <p className="italic ml-4">Example: outputLayer: nodes = 10, activationFunction = "Softmax"</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Loss Function:</h2>
      <p className="mb-4">This parameter specifies the loss function for training the model.</p>
      <p className="italic ml-4">Example: lossFunction = "Mean Square Error"</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Optimizer:</h2>
      <p className="mb-4">This parameter specifies the optimizer for training the model.</p>
      <p className="italic ml-4">Example: optimizer = "adam"</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Learning Rate:</h2>
      <p className="mb-4">This parameter specifies the learning rate for training the model.</p>
      <p className="italic ml-4">Example: learningRate = 0.001</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Batch Size:</h2>
      <p className="mb-4">This parameter specifies the batch size for training the model.</p>
      <p className="italic ml-4">Example: batchSize = 32</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Epochs:</h2>
      <p className="mb-4">This parameter specifies the number of epochs for training the model.</p>
      <p className="italic ml-4">Example: epochs = 100</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Validation Split:</h2>
      <p className="mb-4">This parameter specifies the validation split percentage for training the model.</p>
      <p className="italic ml-4">Example: validationSplit = 0.2 (20%)</p>

      <h2 className="font-bold text-lg mt-4 mb-2">Test Split:</h2>
      <p className="mb-4">This parameter specifies the test split percentage for evaluating the model.</p>
      <p className="italic ml-4">Example: testSplit = 0.1 (10%)</p>

      <h2 className="font-bold text-lg mt-4 mb-2">CNN ONLY Parameters:</h2>
      <p className="mb-4">For Convolutional Neural Network (CNN) models:</p>
      <p className="italic ml-4">Example: CNNkernelSize = 3</p>

      <h2 className="font-bold text-lg mt-4 mb-2">RNN ONLY Parameters:</h2>
      <p className="mb-4">For Recurrent Neural Network (RNN) models:</p>
      <p className="italic ml-4">Example: LSTMfeatures = 128</p>
    </div>
      </main>
    </div>
  )
}

export default Testing