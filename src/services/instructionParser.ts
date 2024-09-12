import { MowerType, Coordinates, Command, Orientation } from '../models/Instruction';
import { calculateMowerPositions } from '../utils/movementUtils';

interface GridSize {
  width: number;
  height: number;
}

export interface ParsedFile {
  gridSize: GridSize;
  mowers: MowerType[];
}

export const parseInstructions = (fileContent: string): ParsedFile => {
  const normalizedContent = fileContent.replace(/\r\n/g, '\n');
  const lines: string[] = normalizedContent.trim().split('\n');
  
  if (lines.length < 3 || lines.length % 2 === 0) {
    throw new Error('Invalid file format: The file must contain at least grid size, mower position, and instructions.');
  }

  const gridSizeLine: string = lines[0];
  if (!/^\d{2}$/.test(gridSizeLine)) {
    throw new Error('Invalid grid size: The first line must contain two digits representing the grid dimensions (e.g., "55").');
  }

  const [gridWidth, gridHeight]: number[] = gridSizeLine.split('').map(Number);
  const gridSize: GridSize = { width: gridWidth + 1, height: gridHeight + 1 };

  const mowers: MowerType[] = [];
  let counter: number = 0;

  for (let i = 1; i < lines.length; i += 2) {
    counter += 1;

    const mowerPositionLine: string = lines[i];
    const positionMatch = mowerPositionLine.match(/^(\d)(\d) ([NESW])$/);
    if (!positionMatch) {
      throw new Error(`Invalid mower position on line ${i + 1}: Expected format is "XY O" (e.g., "11 N").`);
    }

    const [, x, y, orientation] = positionMatch;
    const coordinates: Coordinates = { x: parseInt(x), y: parseInt(y) };

    if (coordinates.x > gridSize.width || coordinates.y > gridSize.height) {
      throw new Error(`Mower position out of bounds on line ${i + 1}: Mower's coordinates must be within the grid size.`);
    }

    const mowerCommandsLine: string = lines[i + 1];
    if (!/^[LRF]+$/.test(mowerCommandsLine)) {
      throw new Error(`Invalid commands on line ${i + 2}: Commands must be a sequence of 'L', 'R', and 'F'.`);
    }

    const commands: Command[] = mowerCommandsLine.split('') as Command[];

    mowers.push({
      id: counter,
      commands,
      positions: calculateMowerPositions(coordinates, orientation as Orientation, commands, gridSize),
      currentPositionIndex: 0,
    });
  }

  return {
    gridSize,
    mowers
  };
};
