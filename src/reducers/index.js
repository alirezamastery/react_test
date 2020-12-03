import cartReducer from './cartReducer'
import warningReducer from "./warningReducer";
import { combineReducers } from 'redux'
import { withReduxStateSync } from 'redux-state-sync'

const allReducers = combineReducers({
    cart: cartReducer,
    warning: warningReducer
})

export default allReducers
// export default withReduxStateSync(allReducers) //redux-state-sync (no need to use it when using redux-persist)