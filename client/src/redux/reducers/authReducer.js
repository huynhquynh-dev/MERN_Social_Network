import { GLOBAL_TYPE } from '../actions/globalType'

const initialState = {}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_TYPE.AUTH:
            return action.payload
    
        default:
            return state
    }
}

export default authReducer