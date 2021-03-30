import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    bacon: 1,
    meat: 1.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 3, //base price
        purchasable: false,
        orderWasClicked: false,
        loading: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-bd365-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(err => console.log(err));
    }

    updatePurchasState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredeients = {
            ...this.state.ingredients
        };
        updateIngredeients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredeients });
        this.updatePurchasState(updateIngredeients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredeients = {
            ...this.state.ingredients
        };
        updateIngredeients[type] = updateCount;
        const priceDetuction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDetuction;
        this.setState({ totalPrice: newPrice, ingredients: updateIngredeients });
        this.updatePurchasState(updateIngredeients);
    };

    orderWasClickedHandler = () => {
        this.setState({ orderWasClicked: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ orderWasClicked: false });
    };

    purchaseContinueHandler = () => {
        // console.log('total price: ' + this.state.totalPrice);
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // }); //Special methos provided by Router
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Inbal',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '351',
        //             country: 'Israel'
        //         },
        //         email: 'test@test.com'
        //     },
        // }
        // axios.post('orders.json', order)
        //     .then(res => {
        //         this.setState({ loading: false, orderWasClicked: false });
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false, orderWasClicked: false })
        //     });
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render() {
        // const disableInfo = {
        //     ...this.state.ingredients
        // };
        // for (let key in disableInfo) {
        //     disableInfo[key] = disableInfo[key] <= 0; //{salad: true, meat: false, ...}
        // }
        // let orderSummary = null;
        // let burger = <Spinner />
        // if (this.state.ingredients) {
        //     burger = (
        //         <Aux>
        //             <Burger ingredients={this.state.ingredients} />
        //             <BuildControls
        //                 ingredientAdded={this.addIngredientHandler}
        //                 ingredientRemove={this.removeIngredientHandler}
        //                 disabled={disableInfo}
        //                 price={this.state.totalPrice}
        //                 purchasable={this.state.purchasable}
        //                 ordered={this.orderWasClickedHandler} />
        //         </Aux>);
        //     orderSummary = (<OrderSummary
        //         ingredients={this.state.ingredients}
        //         purchaseCanceled={this.purchaseCancelHandler}
        //         purchaseContinue={this.purchaseContinueHandler}
        //         price={this.state.totalPrice} />);

        //     if (this.state.loading) {
        //         orderSummary = <Spinner />
        //     }
        // }
        // return (
        //     <Aux>
        //         <Modal show={this.state.orderWasClicked} modalClosed={this.purchaseCancelHandler}>
        //             {orderSummary}
        //         </Modal>
        //         {burger}
        //     </Aux>
        // );
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.orderWasClickedHandler} />
                </Aux>);
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.orderWasClicked} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default BurgerBuilder;