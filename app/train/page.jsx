"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Train = () => {
  const [dataImported, setDataImported] = useState(false);
  const [data, setData] = useState('');

  const convertCSVtoJSON = (csvData) => {
    // Converting the headers and lines from the .csv file to arrays
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    for (let i = 0; i < headers.length; i++) {
      headers[i] = headers[i].replace(/\r/g, '');
    }
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/\r/g, '');
    }
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      if (currentLine.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        jsonData.push(obj);
      }
    }

    return jsonData;
  };

  const handleTrain = (e) => {
    e.preventDefault();
    if (dataImported) {
      // PUT STUFF HERE
      console.log(data);


      
    }
  }
  const handleClick = (e) => {
    e.preventDefault();
    const csvFileInput = document.getElementById('csvFileInput');
    const file = csvFileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const csvData = event.target.result;
        const jsonData = convertCSVtoJSON(csvData);
        setData(jsonData);
        setDataImported(true);
      };

      reader.readAsText(file);
      alert('Completed.');
    } else {
      alert('Please select a CSV file to convert.');
    }
  };

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
        </nav>
      </div>
    </header>
      <main className="bg-black min-h-screen text-white">
      <div>
      <form>
      <input type="file" id="csvFileInput"/>
      <button onClick={handleClick}>Import CSV</button>
      </form>
      <button onClick={handleTrain}>Train</button>

    </div>
      </main>
    </div>
  )
}

export default Train