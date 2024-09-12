import { Position, Orientation, Coordinates, Command, GridSize } from '../models/Instruction';

const orientationOrder: Orientation[] = ['N', 'E', 'S', 'W'];

export const calculateMowerPositions = (initialCoordinates: Coordinates, initialOrientation: Orientation, commands: Command[], gridSize: GridSize): Position[] => {
    const positions: Position[] = [];
    positions.push({ coordinates: initialCoordinates, orientation: initialOrientation });

    commands.forEach(command => {
        const lastPosition: Position = positions[positions.length - 1];
        let newOrientation: Orientation = lastPosition.orientation;
        let newCoordinates: Coordinates = { ...lastPosition.coordinates };

        if (command === 'F') {
            newCoordinates = moveForward(lastPosition, gridSize);
        } else {
            newOrientation = rotate(newOrientation, command);
        }

        positions.push({ coordinates: newCoordinates, orientation: newOrientation });
    });
  
    return positions;
};

const rotate = (currentOrientation: Orientation, direction: 'L' | 'R'): Orientation => {
    const currentIndex: number = orientationOrder.indexOf(currentOrientation);
    if (direction === 'L') {
        return orientationOrder[(currentIndex + 3) % 4];
    } else {
        return orientationOrder[(currentIndex + 1) % 4];
    }
};
  
const moveForward = (position: Position, gridSize: { width: number; height: number }): Coordinates => {
    const newCoordinates: Coordinates = { ...position.coordinates };
    switch (position.orientation) {
        case 'N': 
            newCoordinates.y = Math.min(position.coordinates.y + 1, gridSize.height - 1);
            break;
        case 'E':
            newCoordinates.x = Math.min(position.coordinates.x + 1, gridSize.width - 1);
            break;
        case 'W':
            newCoordinates.x = Math.max(position.coordinates.x - 1, 0);
            break;
        case 'S':
            newCoordinates.y = Math.max(position.coordinates.y - 1, 0);
            break;
    }
    return newCoordinates;
};
