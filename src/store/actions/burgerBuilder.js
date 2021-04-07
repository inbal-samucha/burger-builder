import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-bd365-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(err=>{
                console.log(err);
            });
    };
};
