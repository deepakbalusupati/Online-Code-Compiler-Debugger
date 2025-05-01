import React from 'react';
import { Card, Form, Nav, Tab } from 'react-bootstrap';
import useCompiler from '../hooks/useCompiler';
import '../styles/ConsoleOutput.css';

const ConsoleOutput = () => {
  const { input, output, error, handleInputChange } = useCompiler();
  
  return (
    <Card className="h-100 console-card">
      <Tab.Container id="console-tabs" defaultActiveKey="output">
        <Card.Header>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="output">Output</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="input">Input</Nav.Link>
            </Nav.Item>
            {error && (
              <Nav.Item>
                <Nav.Link eventKey="error" className="text-danger">
                  Errors
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Card.Header>
        
        <Card.Body className="p-0">
          <Tab.Content>
            <Tab.Pane eventKey="output">
              <pre className="console-output">
                {output || 'Your program output will appear here...'}
              </pre>
            </Tab.Pane>
            
            <Tab.Pane eventKey="input">
              <Form.Group>
                <Form.Control 
                  as="textarea" 
                  rows={10} 
                  placeholder="Enter program input here..."
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="console-input"
                />
              </Form.Group>
              <div className="p-2">
                <small className="text-muted">
                  Enter input for your program here. Each line will be passed as a separate input.
                </small>
              </div>
            </Tab.Pane>
            
            {error && (
              <Tab.Pane eventKey="error">
                <pre className="console-error">
                  {error}
                </pre>
              </Tab.Pane>
            )}
          </Tab.Content>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
};

export default ConsoleOutput;