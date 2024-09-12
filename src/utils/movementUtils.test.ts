import { calculateMowerPositions } from '../utils/movementUtils';
import { Coordinates, Command, Orientation, Position, GridSize } from '../models/Instruction';

describe('calculateMowerPositions', () => {
  const gridSize: GridSize = { width: 5, height: 5 };

    test('should return the correct positions for a given set of commands', () => {
        const initialCoordinates: Coordinates = { x: 1, y: 2 };
        const initialOrientation: Orientation = 'N';
        const commands: Command[] = ['F', 'R', 'F', 'L', 'F'];
        
        const expectedPositions: Position[] = [
            { coordinates: { x: 1, y: 2 }, orientation: 'N' },
            { coordinates: { x: 1, y: 3 }, orientation: 'N' },
            { coordinates: { x: 1, y: 3 }, orientation: 'E' },
            { coordinates: { x: 2, y: 3 }, orientation: 'E' },
            { coordinates: { x: 2, y: 3 }, orientation: 'N' },
            { coordinates: { x: 2, y: 4 }, orientation: 'N' }
        ];

        const result = calculateMowerPositions(initialCoordinates, initialOrientation, commands, gridSize);

        expect(result).toEqual(expectedPositions);
    });

    test('should handle a 1x1 grid', () => {
        const initialCoordinates: Coordinates = { x: 0, y: 0 };
        const initialOrientation: Orientation = 'N';
        const commands: Command[] = ['F', 'R', 'F'];

        const gridSize: GridSize = { width: 1, height: 1 };

        const expectedPositions: Position[] = [
            { coordinates: { x: 0, y: 0 }, orientation: 'N' },
            { coordinates: { x: 0, y: 0 }, orientation: 'N' },
            { coordinates: { x: 0, y: 0 }, orientation: 'E' },
            { coordinates: { x: 0, y: 0 }, orientation: 'E' }
        ];

        const result = calculateMowerPositions(initialCoordinates, initialOrientation, commands, gridSize);

        expect(result).toEqual(expectedPositions);
    });
    
    test('should handle rotation correctly', () => {
        const initialCoordinates: Coordinates = { x: 1, y: 1 };
        const initialOrientation: Orientation = 'N';
        const commands: Command[] = ['R', 'R', 'R', 'R', 'R'];

        const expectedPositions: Position[] = [
            { coordinates: { x: 1, y: 1 }, orientation: 'N' },
            { coordinates: { x: 1, y: 1 }, orientation: 'E' },
            { coordinates: { x: 1, y: 1 }, orientation: 'S' },
            { coordinates: { x: 1, y: 1 }, orientation: 'W' },
            { coordinates: { x: 1, y: 1 }, orientation: 'N' },
            { coordinates: { x: 1, y: 1 }, orientation: 'E' }
        ];

        const result = calculateMowerPositions(initialCoordinates, initialOrientation, commands, gridSize);

        expect(result).toEqual(expectedPositions);
    });

    test('should handle forward movement with boundaries', () => {
        const initialCoordinates: Coordinates = { x: 4, y: 4 };
        const initialOrientation: Orientation = 'E';
        const commands: Command[] = ['F', 'F'];

        const expectedPositions: Position[] = [
            { coordinates: { x: 4, y: 4 }, orientation: 'E' },
            { coordinates: { x: 4, y: 4 }, orientation: 'E' },
            { coordinates: { x: 4, y: 4 }, orientation: 'E' }
        ];

        const result = calculateMowerPositions(initialCoordinates, initialOrientation, commands, gridSize);

        expect(result).toEqual(expectedPositions);
    });

    test('should handle backward movement correctly', () => {
        const initialCoordinates: Coordinates = { x: 2, y: 2 };
        const initialOrientation: Orientation = 'S';
        const commands: Command[] = ['F', 'F'];

        const expectedPositions: Position[] = [
            { coordinates: { x: 2, y: 2 }, orientation: 'S' },
            { coordinates: { x: 2, y: 1 }, orientation: 'S' },
            { coordinates: { x: 2, y: 0 }, orientation: 'S' }
        ];

        const result = calculateMowerPositions(initialCoordinates, initialOrientation, commands, gridSize);

        expect(result).toEqual(expectedPositions);
    });

});
