import { useContext } from 'react';
import { CompilerContext } from '../contexts/CompilerContext';

/**
 * Custom hook to access compiler functionality
 * @returns {Object} Compiler context
 */
const useCompiler = () => {
  const context = useContext(CompilerContext);
  
  if (!context) {
    throw new Error('useCompiler must be used within a CompilerProvider');
  }
  
  return context;
};

export default useCompiler;