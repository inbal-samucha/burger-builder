import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    bacon: 1,
    meat: 1.5
};


const initialState = {
    ingredients: null,
    totalPrice: 3
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: { //new ingredients object, not the old one
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: { //new ingredients object, not the old one
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 3
            };
        default:
            return state;
    }
};

export default reducer;