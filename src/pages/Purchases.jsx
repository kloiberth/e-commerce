import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slice/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const purchasesProduct = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    console.log(purchasesProduct);
    return (
        <div>
            <div className='home'>
                <Link to={'/'}>Home</Link>
                <div className='circle'></div>
                <h2>purchases</h2>
            </div>
            <h2>My Purchases</h2>
            {purchasesProduct.map(product => (
                <Card key={product.cartId} className='purchases__card'>
                    <Card.Header>{product.createdAt}</Card.Header>
                    <Card.Body>
                        {product.cart.products.map(cart => (
                            <div key={cart.id} className='purchases'>
                                <div className='purchases__img'>

                                </div>
                                <div className='purchases__title'>
                                    <h3>{cart.title}</h3>
                                </div>

                                <div className='cart__quantity'>
                                    <p>{cart.productsInCart.quantity}</p>
                                </div>
                                <div>
                                    <p style={{ margin: '0' }}>${cart.price}</p>
                                </div>
                            </div>

                        ))}

                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Purchases;       