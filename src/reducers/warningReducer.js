const initialState = {
    warningMessage: ''
}

const warningReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ISSUE_WARNING':
            return { ...state, warningMessage: action.payload }
        case 'REMOVE_WARNING':
            return { ...state, warningMessage: '' }
        default:
            return state
    }
}

export default warningReducer
