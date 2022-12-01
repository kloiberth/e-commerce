import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slice/cart.slice';
import { getProductsThunk } from '../store/slice/products.slice';

const ProductsDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const productsDetail = useSelector(state => state.products);

    const productFound = productsDetail.find(product => product.id === Number(id));

    const relateProduct = productsDetail.filter(product => product.category.id === productFound.category.id);

    const [quantity, setQuantity] = useState(1);

    const increment = () => {

        setQuantity(quantity + 1)
    }

    const decrement = () => {

        if (quantity <= 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity - 1)
        }
    }


    useEffect(() => {
        dispatch(getProductsThunk());

    }, []);

    const addCart = () => {

        const product = {
            id: productFound.id,
            quantity: quantity
        }
        dispatch(addCartThunk(product))
    }

    return (
        <div>
            <div className='home'><Link to={'/'}>Home</Link><div className='circle'></div><h2>{productFound?.title}</h2></div>
            <Row>
                <Col lg={6}>
                    <div className='product-detail'>
                        <img className='product__img' src={productFound?.productImgs[0]} alt={productFound?.title} />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className='card__info'>
                        <h2>{productFound?.title}</h2>
                        <p> {productFound?.description}</p>
                        <div className='btn__cont'>
                            <button onClick={decrement} className='btn__product'><i className="fa-solid fa-minus"></i></button>
                            <span>{quantity}</span>
                            <button onClick={increment} className='btn__product'><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <Button onClick={addCart} style={{width: '20rem'}}>Add Cart</Button>
                    </div>
                </Col>


            </Row>
            <Row>
                <div className='items-card'>
                    <h3>Discover similar items</h3>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {relateProduct.map(product => (
                            <Col key={product.id}>
                                <Card className='card__product'>
                                    <Link className='card__link' to={`/product/${product.id}`}>
                                        <Card.Img className='card__img' variant="top" src={product.productImgs[0]} alt={product.title} />
                                        <div className='line'></div>
                                        <Card.Body>
                                            <Card.Title className='card__title'>{product.title}</Card.Title>
                                            <Card.Text className='card__text'>
                                                ${product.price}
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                </div>
            </Row>
        </div>
    );
};

export default ProductsDetails;