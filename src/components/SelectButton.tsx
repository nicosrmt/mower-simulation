import React from 'react';
import '../styles/SelectButton.css';

interface SelectButtonProps {
  onClick: () => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({ onClick }) => {
  return (
    <button className="select-button" onClick={onClick}>
    </button>
  );
};

export default SelectButton;
