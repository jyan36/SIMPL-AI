"use client"

import { VertexAI } from "@langchain/google-vertexai-web";
import React, { useState, useEffect } from 'react';

const GeminiTest = () => {
    const [textInput, setTextInput] = useState('');
    const [response, setResponse] = useState(null);
    const [finalJSON, setFinalJSON] = useState(null);

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

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
                const parsedJSON = JSON.parse(finalJSON);
                console.log(parsedJSON);
                console.log(parsedJSON.numberOfInputs);
            } catch (error) {
                console.error("Error parsing final JSON:", error);
                setResponse(null);
                setFinalJSON(null);

                handleSubmit();
            }
            //const parsedJSON = JSON.parse('{"numberOfInputs":2,"numberOfHiddenLayers":2,"numberOfOutputs":1,"outputActivationFunction":"Sigmoid","lossFunction":"Binary_Crossentropy","optimizer":"Adam","learningRate":0.001,"batchSize":32,"epochs":100,"validationSplit":0.2,"testSplit":0.2,"hiddenLayers":[{"numberOfNodes":4,"activationFunction":"Relu"},{"numberOfNodes":4,"activationFunction":"Relu"}]}');
        }
    }, [finalJSON]);

    return (
        <div>
            <h1>Gemini AI Test</h1>
            <textarea
                value={textInput}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                rows={10}
                cols={50}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {finalJSON && (
                <div>
                    <h2>Response:</h2>
                    <p>{finalJSON}</p>
                </div>
            )}
        </div>
    );
};

export default GeminiTest;