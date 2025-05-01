import React from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import useCompiler from '../hooks/useCompiler';

const CompilerControls = () => {
  const { 
    executeCode, 
    debugCodeExecution, 
    isLoading, 
    isDebugMode, 
    toggleDebugMode, 
    clearOutput 
  } = useCompiler();
  
  return (
    <div className="d-flex flex-column mb-3">
      <ButtonGroup className="mb-2">
        <Button 
          variant="success" 
          onClick={executeCode} 
          disabled={isLoading}
        >
          <i className="bi bi-play-fill me-1"></i>
          Run
        </Button>
        <Button 
          variant="warning" 
          onClick={debugCodeExecution} 
          disabled={isLoading}
        >
          <i className="bi bi-bug-fill me-1"></i>
          Debug
        </Button>
        <Button 
          variant="secondary" 
          onClick={clearOutput} 
          disabled={isLoading}
        >
          <i className="bi bi-trash me-1"></i>
          Clear
        </Button>
      </ButtonGroup>
      
      <Form.Check 
        type="switch"
        id="debug-mode-switch"
        label="Debug Mode"
        checked={isDebugMode}
        onChange={toggleDebugMode}
        disabled={isLoading}
      />
    </div>
  );
};

export default CompilerControls;