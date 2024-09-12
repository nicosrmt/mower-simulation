import React from 'react';
import { MowerType } from '../models/Instruction';
import '../styles/Table.css';
import SelectButton from './SelectButton';

interface TableProps {
  mowers: MowerType[];
  onSelectMower: (index: number) => void;
  currentMowerIndex: number | null;
}

const Table: React.FC<TableProps> = ({ mowers, onSelectMower, currentMowerIndex }) => {

  const renderCommands = (mower: MowerType): string => {
    return mower.commands.reduce((acc, cur, i) => acc.concat(i === 0 ? '' : ' - ', cur), '')
  }

  return (
    <div className="mower-table-container">
      <table className="mower-table">
        <thead>
          <tr>
            <th>Display</th>
            <th>ID</th>
            <th>Initial Position</th>
            <th>Initial Orientation</th>
            <th>Instructions</th>
            <th>Final Position</th>
            <th>Final Orientation</th>
          </tr>
        </thead>
        <tbody>
          { mowers.map((mower, index) => {
            const positions = [...mower.positions];
            return (
              <tr key={index} style={ currentMowerIndex === index ? { backgroundColor: '#ccc' } : {}}>
                <td>
                  <SelectButton onClick={() => onSelectMower(index)} /> 
                </td>
                <td>{index + 1}</td>
                <td>({positions[0].coordinates.x}, {positions[0].coordinates.y})</td>
                <td>{positions[0].orientation}</td>
                <td>{renderCommands(mower)}</td>
                <td>({positions[positions.length - 1].coordinates.x}, {positions[positions.length - 1].coordinates.y})</td>
                <td>{positions[positions.length - 1].orientation}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
