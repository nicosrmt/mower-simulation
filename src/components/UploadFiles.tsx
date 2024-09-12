import React, { useState } from 'react';
import '../styles/UploadFiles.css';

interface UploadFilesProps {
  onFileUpload: (fileContent: string) => void;
}

const UploadFiles: React.FC<UploadFilesProps> = ({ onFileUpload }) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onFileUpload(content);
        };
        reader.readAsText(file);
      }
    };
  
    return (
        <div className="upload-files-container">
          <label htmlFor="file-upload" className="custom-file-upload">
            {fileName ? `File uploaded : ${fileName}` : 'Upload file'}
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept=".txt" 
            onChange={handleFileChange} 
            className="file-input"
          />
        </div>
    );
};

export default UploadFiles;