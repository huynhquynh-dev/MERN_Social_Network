import { GLOBAL_TYPE } from '../actions/globalType'

const initialState = {}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_TYPE.ALERT:
            return action.payload
    
        default:
            return state
    }
}

export default alertReducer