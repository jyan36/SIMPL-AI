"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { VertexAI } from "@langchain/google-vertexai-web";

const Testing = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);

  const model = new VertexAI({
    authOptions: {
      credentials: {
        "type": "service_account",
        "project_id": process.env.NEXT_PUBLIC_GOOGLEAUTH_PROJECT_ID,
        "private_key_id": process.env.NEXT_PUBLIC_GOOGLEAUTH_PRIVATE_KEY_ID,
        "private_key": JSON.parse(process.env.NEXT_PUBLIC_GOOGLEAUTH_PRIVATE_KEY).private_key,
        "client_email": process.env.NEXT_PUBLIC_GOOGLEAUTH_CLIENT_EMAIL,
        "client_id": process.env.NEXT_PUBLIC_GOOGLEAUTH_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token"
      },
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
  });

  const handleSubmit = async () => {
    if (!input) {
      return;
    }

    let prompt = "Your job will be to generate a JSON file containing neural network parameters. You will a json with the following parameters, exactly with these names: numberOfInputs, numberOfHiddenLayers, numberOfOutputs, outputActivationFunction, lossFunction (either Mean Square Error, Binary_Crossentropy, Categorical_Crossentropy, LogCosh), optimizer, learningRate, batchSize, epochs, validationSplit, testSplit. Also for each hidden layer you will need a numberOfNodes and activationFunction (Relu, Selu, Sigmoid, Softmax, Linear, Tanh).\n\nExample:\n{\n  \"numberOfInputs\": 2,\n  \"numberOfHiddenLayers\": 2,\n \"numberOfOutputs\": 1,\n \"outputActivationFunction\": linear,\n \"lossFunction\": \"Mean Square Error\",\n  \"optimizer\": \"Adam\",\n  \"learningRate\": 0.001,\n  \"batchSize\": 32,\n  \"epochs\": 100,\n  \"validationSplit\": 0.2,\n  \"testSplit\": 0.2,\n  \"hiddenLayers\": [\n    {\n      \"numberOfNodes\": 4,\n      \"activationFunction\": \"Relu\"\n    },\n    {\n      \"numberOfNodes\": 4,\n      \"activationFunction\": \"Relu\"\n    }\n  ]\n}";
    prompt += "\nGenerate a netowork that does this:\n";
    prompt += input;
    prompt += "\nMAKE SURE TO RETURN THE JSON AND NOTHING ELSE. OUPUT THE RAW JSON CODE SO I CAN USE IT IN MY CODE. OMIT ANY ` SYMBOLS. DO NOT ADD ANYTHING ELSE TO THE OUTPUT JSON.";

    const res = await model.invoke(prompt);
    setResponse(res);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const getRandomPosition = () => {
    const left = Math.floor(Math.random() * 90) + 5; // Random left position between 10 and 90
    const top = Math.floor(Math.random() * 90) + 5; // Random top position between 10 and 90
    return { left: `${left}%`, top: `${top}vh` }; // Use vh units for vertical positioning
  };

  useEffect(() => {
    if (response) {
      console.log( response );

      
    }
  }, [response]);

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
          </nav>
        </div>
      </header>
      <main className="bg-black min-h-screen relative">
        {/* Stars scattered throughout the main section */}
        <div className="absolute w-full flex justify-center pb-128 z-0">
          {[...Array(100)].map((_, index) => (
            <span
              key={index}
              className="text-white text-sm absolute"
              style={getRandomPosition()}
            >
              &#9733;
            </span>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 w-full">
          <div className="bg-black bg-opacity-100 pb-36 p-2 text-center w-3/5">
            <h1 className="text-white text-8xl font-bold mb-6">SIMPL-AI</h1>
            <h2 className="text-white text-3xl font-bold mb-4 pb-16">A Neural Network Builder</h2>
            {/* Yellow rectangular textbox with rounded ends */}
            <div className="relative w-full mx-auto">
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="block w-full p-4 rounded-full bg-yellow-400 placeholder-gray-700 pr-16"
                  placeholder="Make me an artificial neural network that..."
                  value={input}
                  onChange={(e) => handleInputChange(e)}
                />
                {/*<Link legacyBehavior href="/builder" passHref>*/}
                  <button className="absolute right-0 mr-3 p-2 bg-blue-500 rounded-full text-white" onClick={handleSubmit} type="button" disabled={!input} style={{ cursor: !input ? 'not-allowed' : 'pointer' }} >
                    Enter
                  </button>
                {/*</Link>*/}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Testing;
