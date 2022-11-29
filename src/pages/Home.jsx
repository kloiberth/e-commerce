import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductsThunk, filterTextThunk, getProductsThunk } from '../store/slice/products.slice';

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [categories, setCategories] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        dispatch(getProductsThunk());
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories));
    }, []);

    console.log(products);

    return (
        <div>
            <Row>
                {/* categoria */}
                <Col lg={3}>
                    <ListGroup>
                        {
                            categories.map(category => (
                                <ListGroup.Item onClick={() => dispatch(filterProductsThunk(category.id))}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>

                </Col>
                {/* productos */}
                <Col lg={9}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={e => setText(e.target.value)}
                            value={text}
                        />
                        <Button variant="outline-secondary" id="button-addon2"
                            onClick={() => dispatch(filterTextThunk(text))}
                        >
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products.map(product => (
                            <Col key={product.id}>
                                <Card>
                                    <Link className='card__link' to={`/product/${product.id}`}>
                                        <Card.Img className='card__img' variant="top" src={product.productImgs[0]} alt={product.title} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>
                                                {product.price}
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;