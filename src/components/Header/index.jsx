import React from "react";
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <Navbar bg="light" expand="lg" id="header-navbar">
            <Container>
                <Navbar.Brand href="">VISUAL PROJECT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto d-flex ">
                        <Link className='nav-link' to="/">HOME</Link>
                        <Link className='nav-link'to="/orientacao">ORIENTAÇÃO</Link>
                        <Link className='nav-link'to="/canva">CRIE SEU CANVA</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;