export const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                ...action.payload
            };

        case 'EDIT_ITEM':
            return {
                ...state,
                ...action.payload
            }

        case 'REMOVE_ITEM':
            let newState = Object.keys(state).reduce((r, e) => {
                if (!action.payload[e]) r[e] = state[e];
                return r
            }, {})

            return newState

        default:
            return state
    }
}

export default cartReducer