import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import * as parseInstructions from './services/instructionParser';

        
jest.mock('./components/Grid', () => () => <div data-testid="grid">Grid Component</div>);
jest.mock('./components/Table', () => () => <div data-testid="table">Table Component</div>);
jest.mock('./components/UploadFiles', () => ({ onFileUpload }: { onFileUpload: (fileContent: string) => void }) => (
    <button onClick={() => onFileUpload('55\n11 N\nLFLFLFLFF\n33 E\nFFRFFRFRRF')} data-testid="upload-btn">
        Upload File
    </button>
));
jest.mock('./components/Controls', () => () => <div data-testid="controls">Controls Component</div>);
jest.mock('./components/Advancement', () => () => <div data-testid="advancement">Advancement Component</div>);

describe('App Component before uploading file', () => {
    test('renders correctly with initial state', () => {
        render(<App />);
        
        expect(screen.getByText(/Mower Simulation/i)).toBeInTheDocument();
        expect(screen.getByTestId('upload-btn')).toBeInTheDocument();
        expect(screen.queryByTestId('grid')).not.toBeInTheDocument();
        expect(screen.queryByTestId('table')).not.toBeInTheDocument();
        expect(screen.queryByTestId('controls')).not.toBeInTheDocument();
        expect(screen.queryByTestId('advancement')).not.toBeInTheDocument();
    });
});

describe('App Component after uploading file', () => {

    test('uploads file and initializes grid and table', async () => {
        render(<App />);

        const uploadButton = screen.getByTestId('upload-btn');

        await act(async () => {
        fireEvent.click(uploadButton);
        });

        expect(screen.getByTestId('grid')).toBeInTheDocument();
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.getByTestId('controls')).toBeInTheDocument();
        expect(screen.getByTestId('advancement')).toBeInTheDocument();
    });

    test('displays error message on invalid file upload', async () => {
        const parseInstructionsMock = jest.spyOn(parseInstructions, 'parseInstructions').mockImplementation(() => {
            throw new Error('Invalid instructions file');
        });
        
        render(<App />);

        const uploadButton = screen.getByTestId('upload-btn');
        
        await act(async () => {
            fireEvent.click(uploadButton);
        });

        expect(screen.getByText(/Invalid instructions file/i)).toBeInTheDocument();

        parseInstructionsMock.mockRestore();
    });

    test('selects mower and updates step count', async () => {
        render(<App />);

        const uploadButton = screen.getByTestId('upload-btn');
        
        await act(async () => {
        fireEvent.click(uploadButton);
        });

        const tableComponent = screen.getByTestId('table');
        
        await act(async () => {
        fireEvent.click(tableComponent);
        });

        const controlsComponent = screen.getByTestId('controls');
        
        await act(async () => {
        fireEvent.click(controlsComponent);
        });
    });
});
