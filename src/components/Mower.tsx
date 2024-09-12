import React from 'react';
import { Orientation } from '../models/Instruction';
import '../styles/Mower.css';

interface MowerProps {
  orientation: Orientation;
}

const Mower: React.FC<MowerProps> = ({ orientation }) => {
  const arrowMap = {
    N: '↑',
    E: '→',
    W: '←',
    S: '↓',
  };

  return <div className="mower">{arrowMap[orientation]}</div>;
};

export default Mower;
