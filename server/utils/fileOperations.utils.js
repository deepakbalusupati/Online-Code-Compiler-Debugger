const fs = require('fs');
const path = require('path');
const util = require('util');
const { getFileExtension, getJavaClassName } = require('./compiler.utils');

// Convert callbacks to promises
const writeFilePromise = util.promisify(fs.writeFile);
const unlinkPromise = util.promisify(fs.unlink);
const existsPromise = util.promisify(fs.exists);

// Base directory for temporary files
const TMP_DIR = path.join(__dirname, '..', 'tmp');

/**
 * Create a source file with the provided code
 * @param {string} code - The source code
 * @param {string} language - The programming language
 * @param {boolean} debug - Whether to include debug code
 * @returns {Promise<string>} The path to the created file
 */
exports.createSourceFile = async (code, language, debug = false) => {
  // Ensure the tmp directory exists
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
  
  const extension = getFileExtension(language);
  let fileName;
  
  // For Java, extract the class name from the code
  if (language.toLowerCase() === 'java') {
    const className = getJavaClassName(code);
    fileName = `${className}${extension}`;
  } else {
    // Generate a unique filename for other languages
    fileName = `source_${Date.now()}${extension}`;
  }
  
  const filePath = path.join(TMP_DIR, fileName);
  
  // Add debug code if needed
  let sourceCode = code;
  if (debug) {
    // Add language-specific debug code
    switch (language.toLowerCase()) {
      case 'c':
      case 'c++':
      case 'cpp':
        // No special debug code needed for C/C++ as we use compiler flags
        break;
      case 'java':
        // We could add custom Java debug logic here if needed
        break;
    }
  }
  
  await writeFilePromise(filePath, sourceCode);
  return filePath;
};

/**
 * Get the output file path based on the source file path
 * @param {string} sourceFilePath - Path to the source file
 * @returns {string} The path to the output file
 */
exports.getOutputFilePath = (sourceFilePath) => {
  const extension = path.extname(sourceFilePath);
  const baseName = path.basename(sourceFilePath, extension);
  const outputDir = path.dirname(sourceFilePath);
  
  // For Java, return the class file path
  if (extension === '.java') {
    return path.join(outputDir, `${baseName}.class`);
  }
  
  // For C/C++, return the executable path
  return path.join(outputDir, `${baseName}.exe`);
};

/**
 * Clean up temporary files
 * @param {string} sourceFilePath - Path to the source file
 * @param {string} outputFilePath - Path to the output file
 */
exports.cleanupFiles = async (sourceFilePath, outputFilePath) => {
  try {
    // Delete source file if it exists
    if (await existsPromise(sourceFilePath)) {
      await unlinkPromise(sourceFilePath);
    }
    
    // Delete output file if it exists
    if (await existsPromise(outputFilePath)) {
      await unlinkPromise(outputFilePath);
    }
  } catch (error) {
    console.error('Error cleaning up files:', error);
  }
};