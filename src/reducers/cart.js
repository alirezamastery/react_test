const initialState = {
    cartData: {}
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, cartData: { ...state.cartData, ...action.payload } }

        case 'EDIT_ITEM':
            return { ...state, cartData: { ...state.cartData, ...action.payload } }

        case 'INCREMENT_ITEM': {
            let newState = { ...state.cartData }
            newState[action.payload].quantity += 1
            return { ...state, cartData: newState }
        }

        case 'DECREMENT_ITEM': {
            let newState = { ...state.cartData }
            if (newState[action.payload].quantity > 1) newState[action.payload].quantity -= 1;
            return { ...state, cartData: newState }
        }

        case 'REMOVE_ITEM':
            let newState = Object.keys(state.cartData).reduce((r, e) => {
                if (!action.payload[e]) r[e] = state.cartData[e];
                return r
            }, {})
            return { ...state, cartData: newState }

        case 'CLEAR_CART':
            return {
                ...state,
                cartData: {}
            }

        default:
            return state
    }
}

export default cartReducer