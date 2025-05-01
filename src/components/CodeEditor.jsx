import React from 'react';
import { Card } from 'react-bootstrap';
import Editor from '@monaco-editor/react';
import useCompiler from '../hooks/useCompiler';
import '../styles/CodeEditor.css';

const CodeEditor = () => {
  const { code, language, handleCodeChange } = useCompiler();
  
  // Map language ID to Monaco editor language
  const getEditorLanguage = (lang) => {
    switch (lang) {
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      default:
        return 'plaintext';
    }
  };
  
  // Editor options
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    lineNumbers: 'on',
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3
  };
  
  return (
    <Card className="mb-3 code-editor-card">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <span>Code Editor</span>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="editor-container">
          <Editor
            height="60vh"
            language={getEditorLanguage(language)}
            value={code}
            onChange={handleCodeChange}
            options={editorOptions}
            theme="vs-dark"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CodeEditor;