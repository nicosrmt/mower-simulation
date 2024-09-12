import { parseInstructions, ParsedFile } from './instructionParser';
import { Coordinates, Orientation, Command, GridSize } from '../models/Instruction';

jest.mock('../utils/movementUtils', () => ({
    calculateMowerPositions: (coordinates: Coordinates, orientation: Orientation, commands: Command[], gridSize: GridSize) => [
        { coordinates, orientation }
    ]
}));

describe('instructionParser', () => {

    it('should correctly parse a valid instruction file', () => {
        const fileContent = `55\r\n44 S\r\nLFRL\r\n22 N\r\nFFLR`;

        const result: ParsedFile = parseInstructions(fileContent);

        expect(result.gridSize).toEqual({ width: 6, height: 6 });

        expect(result.mowers.length).toBe(2);

        expect(result.mowers[0]).toEqual({
            id: 1,
            commands: ['L', 'F', 'R', 'L'],
            positions: [{ coordinates: { x: 4, y: 4 }, orientation: 'S' }],
            currentPositionIndex: 0
        });

        expect(result.mowers[1]).toEqual({
            id: 2,
            commands: ['F', 'F', 'L', 'R'],
            positions: [{ coordinates: { x: 2, y: 2 }, orientation: 'N' }],
            currentPositionIndex: 0
        });
    });

    it('should throw an error if file content is missing or invalid', () => {
        const invalidFileContent = ``;
        
        expect(() => parseInstructions(invalidFileContent)).toThrow();
    });

    it('should throw an error if file content is missing commands for a mower', () => {
        const invalidFileContent = `55\r\n44 S\r\n\r\n22 N\r\nFFLR`;

        expect(() => parseInstructions(invalidFileContent)).toThrow();
    });
});
