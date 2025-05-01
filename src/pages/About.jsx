import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">About the Online Code Compiler & Debugger</h1>
          <p className="text-center text-muted">
            A powerful web-based compiler supporting C, C++, and Java with real-time execution and error detection
          </p>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h2>Project Overview</h2>
              <p>
                This online code compiler and debugger was created to provide developers with a convenient
                platform to write, compile, and debug code without the need for local setup. The application
                supports multiple programming languages and offers real-time error detection, improving debugging
                speed by up to 35%.
              </p>
              
              <h3 className="mt-4">Key Features</h3>
              <ul>
                <li>Support for C, C++, and Java programming languages</li>
                <li>Real-time code compilation and execution</li>
                <li>Advanced error detection and debugging capabilities</li>
                <li>Syntax highlighting and code formatting</li>
                <li>Custom input support for testing programs</li>
                <li>Responsive design that works on all devices</li>
              </ul>
              
              <h3 className="mt-4">Technologies Used</h3>
              <p>
                The application is built using modern web technologies:
              </p>
              <ul>
                <li><strong>Frontend:</strong> React.js, JavaScript, Bootstrap</li>
                <li><strong>Backend:</strong> Node.js, Express.js</li>
                <li><strong>Editor:</strong> Monaco Editor (same as VS Code)</li>
                <li><strong>Compilers:</strong> GCC (C/C++), JDK (Java)</li>
              </ul>
              
              <h3 className="mt-4">How It Works</h3>
              <p>
                When you write code in the editor and click "Run" or "Debug", the application sends the code to the
                server, which compiles and executes it using the appropriate compiler. The results are then sent back
                to the browser and displayed in the console output panel. Any errors or warnings are highlighted
                in real-time, making it easier to identify and fix issues.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;