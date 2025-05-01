import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CodeEditor from '../components/CodeEditor';
import CompilerControls from '../components/CompilerControls';
import ConsoleOutput from '../components/ConsoleOutput';
import LanguageSelector from '../components/LanguageSelector';
import useCompiler from '../hooks/useCompiler';

const Home = () => {
  const { isLoading } = useCompiler();
  
  return (
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col>
          <h1 className="text-center">Online Code Compiler & Debugger</h1>
          <p className="text-center text-muted">
            Write, compile, and debug your C, C++, and Java code with real-time error detection.
          </p>
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col sm={12} md={6} lg={9}>
          <LanguageSelector />
        </Col>
        <Col sm={12} md={6} lg={3}>
          <CompilerControls />
        </Col>
      </Row>
      
      <Row>
        <Col lg={8}>
          <CodeEditor />
        </Col>
        <Col lg={4}>
          <ConsoleOutput />
        </Col>
      </Row>
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Home;