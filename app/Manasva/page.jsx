"use client"

import { VertexAI } from "@langchain/google-vertexai-web";
import React, { useState, useEffect } from 'react';

// Vertex AI project ID and model name
const PROJECT_ID = 'simpl-ai-418817';
const REGION = 'us-central1';
const MODEL_NAME = 'gemini-1.0-pro';

const GeminiTest = () => {
    const [textInput, setTextInput] = useState('');
    const [response, setResponse] = useState(null);

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

        const res = await model.invoke(textInput);
        console.log({res});

        setResponse(res);
    };

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
            {response && (
                <div>
                    <h2>Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default GeminiTest;