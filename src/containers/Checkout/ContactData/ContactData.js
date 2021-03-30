import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zipcode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            }         
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();//prevent default to send request and reload the page
        this.setState({ loading: true });

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){ //fetch the value of propotys name,email,zipcode... from the state
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    };

    inputChangedHendler = (event, inputIdentifier) => { //inputIdentifier is values like email and name in the state
        const updatedOrderForm = { //fetch the propotys name, street, zipcode... from the state
            ...this.state.orderForm
        };
        const updatedFormElement = { // fetch the inside values of propotys name, streer,zipcode.. from the state
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHendler(event, formElement.id)} />
            ))}
            <Button btnType="Success"> ORDER </Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={style.ContactData}>
                <h4> Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;