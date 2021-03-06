import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/index';

class Checkout extends Component {


    
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search); //Brings the queries from the url
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         //[salad, 1]
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = +param[1];
    //         }  
    //     }
    //     this.setState({ ingredients: ingredients , totalPrice: price});
    // }

    checkoutCancelledHendler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHendler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.parchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHendler}
                        checkoutContinued={this.checkoutContinuedHendler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );

        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        parchased: state.order.parchased
    }
};



export default connect(mapStateToProps)(Checkout);


