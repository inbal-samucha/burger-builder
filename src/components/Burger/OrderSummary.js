import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {
    //This could be functional component because I change Modal.js from functional Component to cllass component 8.38
    
    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // };


    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (
                    <li key={ingKey}>
                        <span style={{ textTransform: 'capitalize' }}>{ingKey} </span> : {this.props.ingredients[ingKey]}
                    </li>)
            });
        return (
            <Aux>
                <h3> Your order:</h3>
                <p>burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong> Total Price: {this.props.price.toFixed(2)} </strong></p>
                <p>Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}


export default OrderSummary;