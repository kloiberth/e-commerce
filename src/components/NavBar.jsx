import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsThunk } from '../store/slice/products.slice';
import Cart from './Cart';

const NavBar = () => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" style={{zIndex: '2'}} className='nav-bar'>
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={() => dispatch(getProductsThunk())}>E-COMMERCE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/purchases">Purchase</Nav.Link>
                            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose}/>
        </div>
    );
};

export default NavBar;