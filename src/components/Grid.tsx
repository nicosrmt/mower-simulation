import React from 'react';
import Mower from './Mower';
import { GridSize, MowerType } from '../models/Instruction';
import '../styles/Grid.css';

interface GridProps {
  currentStep: number;
  gridSize: GridSize;
  mower: MowerType | null;
}

const Grid: React.FC<GridProps> = ({ currentStep, gridSize, mower }) => {
  const gridStyle = {
    '--grid-columns': gridSize.width.toString(),
  } as React.CSSProperties;

  const renderGrid = () => {
    const cells = [];
    for (let row = gridSize.height - 1; row >= 0; row--) {
      for (let col = 0; col < gridSize.width; col++) {
        const isMowerHere = mower && mower.positions[currentStep]?.coordinates.x === col && mower.positions[currentStep]?.coordinates.y === row;
        cells.push(
          <div key={`${row}-${col}`} className="cell">
            {isMowerHere && <Mower orientation={mower.positions[currentStep].orientation} />}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="grid" style={gridStyle}>
    {renderGrid()}
    </div>
  );
};

export default Grid;
