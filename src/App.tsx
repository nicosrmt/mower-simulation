import React, { useState } from 'react';
import Grid from './components/Grid';
import Table from './components/Table';
import UploadFiles from './components/UploadFiles';
import { GridSize, MowerType } from './models/Instruction';
import { parseInstructions } from './services/instructionParser';
import './App.css';
import Controls from './components/Controls';
import Advancement from './components/Advancement';

const App: React.FC = () => {
  const [gridSize, setGridSize] = useState<GridSize>({ width: 0, height: 0 });
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mowers, setMowers] = useState<MowerType[]>([]);
  const [currentMowerIndex, setCurrentMowerIndex] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleFileUpload = (fileContent: string) => {
    try {
      const { gridSize, mowers } = parseInstructions(fileContent);
      setMowers(mowers);
      setGridSize(gridSize);
      setIsFileLoaded(true)
      setCurrentMowerIndex(0); 
      setError(null);
    } catch (err) {
      setError(`Invalid instructions file :\n ${err}`);
    }
  };

  const handleSelectMower = (mowerIndex: number) => {
    setCurrentMowerIndex(mowerIndex);
    setCurrentStep(0);
  }

  const handleNextStep = () => {
    if (currentMowerIndex !== null) {
      const mower: MowerType = mowers[currentMowerIndex];
      if (currentStep < mower.positions.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div>
      <h1>Mower Simulation</h1>
      <UploadFiles onFileUpload={handleFileUpload} />
      {error && <p className="error-message">{error}</p>}
      <div className="grid-container">
        {isFileLoaded && <Grid
          gridSize={gridSize}
          currentStep={currentStep}
          mower={currentMowerIndex !== null ? mowers[currentMowerIndex] : null}
        />}
        <div>
          {isFileLoaded && <Controls
            onPrevStep={handlePreviousStep}
            onNextStep={handleNextStep}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentStep={currentStep}
            mowers={mowers}
            currentMowerIndex={currentMowerIndex}
          />}
          {isFileLoaded && <Advancement
            mowers={mowers}
            currentMowerIndex={currentMowerIndex}
            currentStep={currentStep}
          />}
        </div>
      </div>
      <div>
        {isFileLoaded && <Table
          currentMowerIndex={currentMowerIndex}
          mowers={mowers}
          onSelectMower={handleSelectMower}
        />}
      </div>
    </div>
  );
};

export default App;
