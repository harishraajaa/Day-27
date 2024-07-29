import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Topbar() {
  let navigate=useNavigate()
  return <>
  <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={()=>navigate('/users')}>User Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/users')}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigate('/create')}>Add User</Nav.Link>
            
          </Nav>
        
      </Container>
    </Navbar>
  </>
}

export default Topbar
