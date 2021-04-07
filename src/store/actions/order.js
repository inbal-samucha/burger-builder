import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('orders.json', orderData)
            .then(res => {
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const purchaseInit = () => {
    return { 
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAILED
    };
};

export const fetchOrdersStart = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () =>{
    return dispatch =>{
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                console.log(err);
            });
    };
};