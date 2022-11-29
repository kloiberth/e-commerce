import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slice/products.slice';

const ProductsDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const productsDetail = useSelector(state => state.products);
    const productFound = productsDetail.find(product => product.id === Number(id));
    const relateProduct = productsDetail.filter(product => product.category.id === productFound.category.id);
    console.log(relateProduct);


    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);

    return (
        <div>
            <Row>
                <Col lg={6}>
                    <div className='product-detail'>
                        <h2>{productFound?.title}</h2>
                        <img className='product__img' src={productFound?.productImgs[0]} alt={productFound?.title} />
                    </div>
                </Col>
                <Col lg={6}>
                    <div className='card__info'>
                        <h2>{productFound?.title}</h2>
                        <p> {productFound?.description}</p>

                    </div>
                </Col>


            </Row>
            <Row>
                <div className='items-card'>
                    <h3>Discover similar items</h3>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {relateProduct.map(product => (
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
                </div>
            </Row>
        </div>
    );
};

export default ProductsDetails;