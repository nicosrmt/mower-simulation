import React, { useEffect, useRef } from 'react';
import ControlButton from './ControlButton';
import { MowerType } from '../models/Instruction';

interface ControlsProps {
  onPrevStep: () => void;
  onNextStep: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentStep: number;
  mowers: MowerType[];
  currentMowerIndex: number | null;
}

const Controls: React.FC<ControlsProps> = ({
  onPrevStep,
  onNextStep,
  isPlaying,
  setIsPlaying,
  currentStep,
  mowers,
  currentMowerIndex
}) => {
  const previousMowerRef = useRef<MowerType | null>(null);
  const mower: MowerType = mowers[currentMowerIndex ? currentMowerIndex : 0];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (mower && currentStep >= mower.positions.length - 1) {
          setIsPlaying(false);
        } else {
          onNextStep();
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, onNextStep, mower, currentStep, setIsPlaying]);

  useEffect(() => {
    if (isPlaying && previousMowerRef.current !== mower) {
      setIsPlaying(false);
    }
    previousMowerRef.current = mower;
  }, [currentMowerIndex, isPlaying, setIsPlaying, mower]);

  return (
    <div>
      <ControlButton
        onClick={onPrevStep}
        label="Previous Step"
      />
      <ControlButton
        onClick={onNextStep}
        label="Next Step"
      />
      <ControlButton
        onClick={() => setIsPlaying(!isPlaying)}
        label={isPlaying ? 'Pause' : 'Play'}
      />
    </div>
  );
};

export default Controls;
