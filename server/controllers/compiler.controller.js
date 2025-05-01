const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { 
  createSourceFile, 
  getOutputFilePath, 
  cleanupFiles 
} = require('../utils/fileOperations.utils');
const { 
  getCompileCommand, 
  getExecuteCommand 
} = require('../utils/compiler.utils');

// Convert callbacks to promises
const execPromise = util.promisify(exec);

/**
 * Execute code in the specified language
 */
exports.compileAndRun = async (req, res) => {
  const { code, language, input = '' } = req.body;
  
  if (!code || !language) {
    return res.status(400).json({
      success: false,
      message: 'Code and language are required'
    });
  }
  
  let sourceFilePath;
  let outputFilePath;
  
  try {
    // Create source file
    sourceFilePath = await createSourceFile(code, language);
    outputFilePath = getOutputFilePath(sourceFilePath);
    
    // Get compile command based on language
    const compileCommand = getCompileCommand(language, sourceFilePath, outputFilePath);
    
    // Compile the code
    const { stderr: compileErrors } = await execPromise(compileCommand);
    
    if (compileErrors) {
      return res.status(200).json({
        success: false,
        output: null,
        error: compileErrors,
        message: 'Compilation failed'
      });
    }
    
    // Get execute command
    const executeCommand = getExecuteCommand(language, outputFilePath, input);
    
    // Execute the code with timeout
    const maxExecutionTime = 10000; // 10 seconds
    const executionPromise = execPromise(executeCommand);
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Execution timed out'));
      }, maxExecutionTime);
    });
    
    // Race between execution and timeout
    const { stdout, stderr } = await Promise.race([
      executionPromise,
      timeoutPromise
    ]);
    
    return res.status(200).json({
      success: true,
      output: stdout,
      error: stderr || null,
      message: 'Code executed successfully'
    });
    
  } catch (error) {
    console.error('Error executing code:', error);
    
    return res.status(200).json({
      success: false,
      output: null,
      error: error.message,
      message: 'Error executing code'
    });
  } finally {
    // Clean up temporary files
    try {
      if (sourceFilePath) {
        await cleanupFiles(sourceFilePath, outputFilePath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
    }
  }
};

/**
 * Debug code with runtime error tracking
 */
exports.debugCode = async (req, res) => {
  const { code, language, input = '' } = req.body;
  
  if (!code || !language) {
    return res.status(400).json({
      success: false,
      message: 'Code and language are required'
    });
  }
  
  let sourceFilePath;
  let outputFilePath;
  
  try {
    // Create source file with debug flags
    sourceFilePath = await createSourceFile(code, language, true);
    outputFilePath = getOutputFilePath(sourceFilePath);
    
    // Get compile command with debug flags
    const compileCommand = getCompileCommand(language, sourceFilePath, outputFilePath, true);
    
    // Compile the code with debug flags
    const { stderr: compileErrors } = await execPromise(compileCommand);
    
    if (compileErrors) {
      return res.status(200).json({
        success: false,
        output: null,
        error: compileErrors,
        message: 'Compilation failed during debug'
      });
    }
    
    // Execute the code with debug mode
    const executeCommand = getExecuteCommand(language, outputFilePath, input, true);
    const { stdout, stderr } = await execPromise(executeCommand);
    
    return res.status(200).json({
      success: true,
      output: stdout,
      error: stderr || null,
      message: 'Debug completed'
    });
    
  } catch (error) {
    console.error('Error debugging code:', error);
    
    return res.status(200).json({
      success: false,
      output: null,
      error: error.message,
      message: 'Error debugging code'
    });
  } finally {
    // Clean up temporary files
    try {
      if (sourceFilePath) {
        await cleanupFiles(sourceFilePath, outputFilePath);
      }
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
    }
  }
};