import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterProductsThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterTextThunk = (inputText) => (dispatch) => {
    const text = inputText[0].toUpperCase() + inputText.slice(1);
    dispatch(setIsLoading(true));
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${text}`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(setIsLoading(false)));
}
/* https://e-commerce-api.academlo.tech/api/v1/products?query=samsung */


export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
