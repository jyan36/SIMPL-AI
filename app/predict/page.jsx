"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const Predict = () => {
    const [inputParams, setInputParams] = useState(null);
    const [inputList, setInputList] = useState({});

    
    useEffect(() => {
        const JSONmodel = localStorage.getItem('model-params');
        const modelProps = JSON.parse(JSONmodel);
        setInputParams(modelProps.inputNames);

        //console.log(inputParams)
    }, []);

    useEffect(() => {
        if (inputParams) {
            const emptyInputList = inputParams.map((name) => {name: ''})
            console.log(inputParams);
        }
    }, [inputParams])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputList(inputList => ({
            ...inputList,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputList);
    };



    return (
        <div className='flex h-screen bg-black items-center justify-center p-5 flex-col'>
            <div className="w-full flex justify-between items-center basis-2/12 ">
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
            <div className='flex basis-10/12 h-full w-full p-4 flex-row gap-5 rounded-lg'>
                <div className='basis-5/12 h-full w-full border rounded-lg items-center justify-center flex flex-col'>
                    <div className='text-white basis-2/12 text-4xl  flex items-center justify-center'>Input</div>
                    <div className='basis-10/12 bg-blue-500 w-full flex items-center justify-center'>
                        {inputParams ?
                            <form onSubmit={(e) => handleSubmit(e)} className="bg-gray-200 p-4 rounded-lg shadow-md">
                                {inputParams.map((inputParam, index) => (
                                    <div key={index} className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor={`inputParam-${index}`}>
                                            {inputParam}
                                        </label>
                                        <input
                                            id={`inputParam-${index}`}
                                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            onChange={handleChange}
                                            placeholder={inputParam}
                                        />
                                    </div>
                                ))}
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit' >
                                    Submit
                                </button>
                            </form>
                            :
                            <div />}
                    </div>
                </div>

                <div className='basis-7/12 h-full w-full bg-blue-500 rounded-lg'></div>

            </div>
        </div>
    )
}

export default Predict