export type Orientation = 'N' | 'E' | 'W' | 'S';
export type Command = 'L' | 'R' | 'F';

export interface GridSize {
  width: number;
  height: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Position {
  coordinates: Coordinates;
  orientation: Orientation; 
}

export interface MowerType {
  id: number;
  commands: Command[];
  positions: Position[];
  currentPositionIndex: number;
}
