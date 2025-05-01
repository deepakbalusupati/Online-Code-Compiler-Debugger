import React, { createContext, useState, useCallback } from 'react';
import { runCode, debugCode } from '../services/compiler.service';

export const CompilerContext = createContext();

const defaultCode = {
  'c': `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  'cpp': `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`,
  'java': `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
};

export const CompilerProvider = ({ children }) => {
  const [language, setLanguage] = useState('c');
  const [code, setCode] = useState(defaultCode['c']);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Handle language change
  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage] || '');
    setOutput('');
    setError('');
  }, []);

  // Handle code change
  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  // Handle input change
  const handleInputChange = useCallback((newInput) => {
    setInput(newInput);
  }, []);

  // Handle code execution
  const executeCode = useCallback(async () => {
    setIsLoading(true);
    setOutput('');
    setError('');
    
    try {
      const result = await runCode(code, language, input);
      
      if (result.success) {
        setOutput(result.output || 'Program executed with no output.');
      } else {
        setError(result.error || 'Unknown error occurred.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while executing code.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language, input]);

  // Handle code debugging
  const debugCodeExecution = useCallback(async () => {
    setIsLoading(true);
    setOutput('');
    setError('');
    
    try {
      const result = await debugCode(code, language, input);
      
      if (result.success) {
        setOutput(result.output || 'Debug completed with no output.');
      } else {
        setError(result.error || 'Unknown error occurred during debugging.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while debugging code.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language, input]);

  // Toggle debug mode
  const toggleDebugMode = useCallback(() => {
    setIsDebugMode(prevMode => !prevMode);
  }, []);

  // Clear all output
  const clearOutput = useCallback(() => {
    setOutput('');
    setError('');
  }, []);

  const compilerValue = {
    language,
    code,
    input,
    output,
    error,
    isLoading,
    isDebugMode,
    handleLanguageChange,
    handleCodeChange,
    handleInputChange,
    executeCode,
    debugCodeExecution,
    toggleDebugMode,
    clearOutput
  };

  return (
    <CompilerContext.Provider value={compilerValue}>
      {children}
    </CompilerContext.Provider>
  );
};