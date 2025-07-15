// File: src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import './styles/App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFilesChange = (files) => {
    setSelectedFiles(files);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Header />
        <main className="app-main">
          <FileUpload onFilesChange={handleFilesChange} />
        </main>
      </div>
    </div>
  );
}

export default App;
