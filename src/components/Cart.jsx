import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutThunk, getCartThunk } from '../store/slice/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    console.log(cart);

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.map(product => (
                    <div key={product.id}>
                        <div className='card__cart'>
                            <p>{product.title}</p>
                            <div className='cart__quantity start'>
                                <p>{product.productsInCart.quantity}</p>
                            </div>
                            <div className='cart__price'>
                                <span>Total: </span><p>${product.price}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </Offcanvas.Body>
            <Button onClick={() => dispatch(checkoutThunk())}>Checkout</Button>
        </Offcanvas>
    );
};

export default Cart;