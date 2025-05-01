import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import useCompiler from '../hooks/useCompiler';

const LanguageSelector = () => {
  const { language, handleLanguageChange } = useCompiler();
  
  const languages = [
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
    { id: 'java', name: 'Java' }
  ];
  
  return (
    <div className="mb-3">
      <label className="form-label">Language:</label>
      <div>
        <ButtonGroup>
          {languages.map((lang) => (
            <Button
              key={lang.id}
              variant={language === lang.id ? 'primary' : 'outline-primary'}
              onClick={() => handleLanguageChange(lang.id)}
            >
              {lang.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default LanguageSelector;