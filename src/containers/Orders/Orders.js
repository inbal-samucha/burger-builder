import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/CheckoutSummary/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';

class Orders extends Component {

    componentDidMount() {
        //     axios.get('/orders.json')
        //         .then(res => {
        //             const fetchOrders = [];
        //             for(let key in res.data){
        //                 fetchOrders.push({
        //                     ...res.data[key],
        //                     id: key
        //                 })
        //             }
        //             this.setState({ loading: false , orders: fetchOrders});
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             this.setState({ loading: false });
        //         });
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);