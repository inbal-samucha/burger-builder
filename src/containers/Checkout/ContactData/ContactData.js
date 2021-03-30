import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner';
import axios from '../../../axios-orders';
class ContactData extends Component {

    state = {
        name: '',
        email: '',
        adress: {
            streest: '',
            number: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();//prevent default to send request and reload the page
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Inbal',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '351',
                    country: 'Israel'
                },
                email: 'test@test.com'
            },
        }
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false})
            });
    }; 

    render() {
        let form = (<form>
            <input className={style.Input} type="text" name="name" placeholder="Your name" />
            <input className={style.Input} type="text" name="email" placeholder="Your email" />
            <input className={style.Input} type="text" name="street" placeholder="Your street" />
            <input className={style.Input} type="text" name="number" placeholder="Your number street" />
            <Button btnType="Success" clicked={this.orderHandler}> ORDER </Button>
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