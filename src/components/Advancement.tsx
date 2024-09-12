import React, { useEffect, useState } from 'react';
import '../styles/Advancement.css';
import { MowerType } from '../models/Instruction';

interface AdvancementProps {
  mowers: MowerType[];
  currentMowerIndex: number | null;
  currentStep: number;
}

const Advancement: React.FC<AdvancementProps> = ({ mowers, currentMowerIndex, currentStep }) => {
  const [lastInstruction, setLastInstruction] = useState<string>('-');
  const [nextInstruction, setNextInstruction] = useState<string>('-');
  const [position, setPosition] = useState<string>('-');
  const [orientation, setOrientation] = useState<string>('-');
  const mower = mowers[currentMowerIndex ? currentMowerIndex : 0]

  useEffect(() => {
    if (mower) {
      setLastInstruction(mower.commands[currentStep - 1])
      setNextInstruction(mower.commands[currentStep])
      setPosition(`(${mower.positions[currentStep].coordinates.x}, ${mower.positions[currentStep].coordinates.y})`)
      setOrientation(mower.positions[currentStep].orientation)
    }
  }, [currentMowerIndex, currentStep, mower]);
  
  return (
    <div className="advancement">
      <p><strong>Last instruction :</strong> {lastInstruction}</p>
      <p><strong>Next instruction :</strong> {nextInstruction}</p>
      <p><strong>Position :</strong> {position}</p>
      <p><strong>Orientation :</strong> {orientation}</p>
    </div>
  );
};

export default Advancement;
