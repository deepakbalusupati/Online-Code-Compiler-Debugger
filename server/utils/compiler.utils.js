/**
 * Get the appropriate compile command based on language
 * @param {string} language - The programming language
 * @param {string} sourceFilePath - Path to the source file
 * @param {string} outputFilePath - Path to the output file
 * @param {boolean} debug - Whether to include debug flags
 * @returns {string} The compile command
 */
exports.getCompileCommand = (language, sourceFilePath, outputFilePath, debug = false) => {
    switch (language.toLowerCase()) {
      case 'c':
        return `gcc ${debug ? '-g' : ''} "${sourceFilePath}" -o "${outputFilePath}" ${debug ? '-Wall -Wextra' : ''}`;
      case 'c++':
      case 'cpp':
        return `g++ ${debug ? '-g' : ''} "${sourceFilePath}" -o "${outputFilePath}" ${debug ? '-Wall -Wextra' : ''}`;
      case 'java':
        // For Java, output path is the directory containing the class file
        const classDir = outputFilePath.substring(0, outputFilePath.lastIndexOf('\\'));
        return `javac ${debug ? '-g' : ''} -d "${classDir}" "${sourceFilePath}"`;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  };
  
  /**
   * Get the appropriate execute command based on language
   * @param {string} language - The programming language
   * @param {string} outputFilePath - Path to the output file
   * @param {string} input - Input to provide to the program
   * @param {boolean} debug - Whether to run in debug mode
   * @returns {string} The execute command
   */
  exports.getExecuteCommand = (language, outputFilePath, input = '', debug = false) => {
    let command;
    
    switch (language.toLowerCase()) {
      case 'c':
      case 'c++':
      case 'cpp':
        command = `"${outputFilePath}"`;
        break;
      case 'java':
        // Extract class name from path
        const className = outputFilePath.substring(
          outputFilePath.lastIndexOf('\\') + 1,
          outputFilePath.lastIndexOf('.')
        );
        const classDir = outputFilePath.substring(0, outputFilePath.lastIndexOf('\\'));
        command = `java -cp "${classDir}" ${className}`;
        break;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
    
    // If there's input, pipe it to the command
    if (input && input.trim() !== '') {
      // Escape input for command line
      const escapedInput = input.replace(/"/g, '\\"');
      return `echo "${escapedInput}" | ${command}`;
    }
    
    return command;
  };
  
  /**
   * Get file extension based on language
   * @param {string} language - The programming language
   * @returns {string} The file extension
   */
  exports.getFileExtension = (language) => {
    switch (language.toLowerCase()) {
      case 'c':
        return '.c';
      case 'c++':
      case 'cpp':
        return '.cpp';
      case 'java':
        return '.java';
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  };
  
  /**
   * Get the class name from Java code
   * @param {string} code - The Java source code
   * @returns {string} The class name
   */
  exports.getJavaClassName = (code) => {
    // Simple regex to extract public class name
    const match = code.match(/public\s+class\s+(\w+)/);
    if (match && match[1]) {
      return match[1];
    }
    
    // If no public class found, try to find any class
    const classMatch = code.match(/class\s+(\w+)/);
    if (classMatch && classMatch[1]) {
      return classMatch[1];
    }
    
    // Default class name
    return 'Main';
  };