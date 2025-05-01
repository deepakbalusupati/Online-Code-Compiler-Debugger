import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {currentYear} Online Code Compiler & Debugger | All Rights Reserved
            </p>
            <p className="small mb-0 text-muted">
              Created with React.js and Express.js
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;