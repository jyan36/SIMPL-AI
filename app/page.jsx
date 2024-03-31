"use client"
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { VertexAI } from "@langchain/google-vertexai-web";
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const Home = () => {
  const router = useRouter();

  const [textInput, setTextInput] = useState('');
  const [response, setResponse] = useState(null);
  const [finalJSON, setFinalJSON] = useState(null);
  const [printedJSON, setPrintedJSON] = useState(null);
  const [redirect, setRedirect] = useState(false);

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
    if (!textInput) {
      return;
    }

    let prompt = "Your job will be to generate a JSON file containing neural network parameters. You will a json with the following parameters, exactly with these names: numberOfInputs, numberOfHiddenLayers, numberOfOutputs, outputActivationFunction, lossFunction (either Mean Square Error, Binary_Crossentropy, Categorical_Crossentropy, LogCosh), optimizer, learningRate, batchSize, epochs, validationSplit, testSplit. Also for each hidden layer you will need a numberOfNodes and activationFunction (Relu, Selu, Sigmoid, Softmax, Linear, Tanh).\n\nExample:\n{\n  \"numberOfInputs\": 2,\n  \"numberOfHiddenLayers\": 2,\n \"numberOfOutputs\": 1,\n \"outputActivationFunction\": linear,\n \"lossFunction\": \"Mean Square Error\",\n  \"optimizer\": \"Adam\",\n  \"learningRate\": 0.001,\n  \"batchSize\": 32,\n  \"epochs\": 100,\n  \"validationSplit\": 0.2,\n  \"testSplit\": 0.2,\n  \"hiddenLayers\": [\n    {\n      \"numberOfNodes\": 4,\n      \"activationFunction\": \"Relu\"\n    },\n    {\n      \"numberOfNodes\": 4,\n      \"activationFunction\": \"Relu\"\n    }\n  ]\n}";
    prompt += "\nGenerate a netowork that does this:\n";
    prompt += textInput;
    prompt += "\nMAKE SURE TO RETURN THE JSON AND NOTHING ELSE. OUPUT THE RAW JSON CODE SO I CAN USE IT IN MY CODE. OMIT ANY ` SYMBOLS. DO NOT ADD ANYTHING ELSE TO THE OUTPUT JSON. JUST THE JSON.";
    console.log({ prompt });

    const res = await model.invoke(prompt);
    console.log(res);

    setResponse(res);
  };

  useEffect(() => {
    const stringifyJSON = async (json) => {
      let prompt = "Can you fix this JSON for me:\n";
      prompt += json;
      prompt += "\nMAKE SURE TO RETURN THE REPAIRED JSON AND NOTHING ELSE.";

      console.log(prompt);

      const res = await model.invoke(prompt);
      setFinalJSON(res);
    };

    if (response) stringifyJSON(response);
  }, [response]);

  useEffect(() => {
    if (finalJSON) {
      console.log(finalJSON);
      try {
        const parsedJSON = JSON.parse('{"numberOfInputs":2,"numberOfHiddenLayers":2,"numberOfOutputs":1,"outputActivationFunction":"Sigmoid","lossFunction":"Binary_Crossentropy","optimizer":"Adam","learningRate":0.01,"batchSize":32,"epochs":100,"validationSplit":0.2,"testSplit":0.2,"hiddenLayers":[{"numberOfNodes":4,"activationFunction":"Sigmoid"},{"numberOfNodes":4,"activationFunction":"Sigmoid"}]}');
        //const parsedJSON = JSON.parse(finalJSON);
        console.log(parsedJSON);
        console.log(parsedJSON.numberOfInputs);
        setPrintedJSON(parsedJSON);
      } catch (error) {
        console.error("Error parsing final JSON:", error);
        setResponse(null);
        setFinalJSON(null);

        handleSubmit();
      }

      setRedirect(true);
    }
  }, [finalJSON]);

  const getRandomPosition = () => {
    const left = Math.floor(Math.random() * 90) + 5; // Random left position between 1 and 100
    const top = Math.floor(Math.random() * 90) + 5; // Random top position between 1 and 100
    return { left: `${left}%`, top: `${top}vh` }; // Use vh units for vertical positioning
  };

  if (redirect) {
    return (
      <div className="container mx-auto p-4 bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">JSON Data</h1>
        {printedJSON && (
          <JsonView data={printedJSON} shouldExpandNode={allExpanded} style={darkStyles} />
        )}
      </div>
    );
  }

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
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <button className="absolute right-0 mr-3 p-2 bg-blue-500 rounded-full text-white" onClick={handleSubmit} type="button" disabled={!textInput} >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;