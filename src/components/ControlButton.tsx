import React from 'react';
import '../styles/ControlButton.css'; // Importer le fichier CSS

interface ControlButtonProps {
  label: string;
  onClick: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ label, onClick }) => {
  return (
    <button className="control-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default ControlButton;
