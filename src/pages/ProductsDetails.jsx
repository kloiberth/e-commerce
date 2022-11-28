import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slice/products.slice';

const ProductsDetails = () => {

    const {id} = useParams();
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
            <h2>ruta de productos</h2>
            {productFound?.title}
            <img src={productFound?.productImgs[0]} alt={productFound?.title} />

            <h3>product filter</h3>
            {relateProduct.map(product => (
                <li>{product.title}</li>
            ))}
        </div>
    );
};

export default ProductsDetails;