import { GLOBAL_TYPE } from '../actions/globalType'

const initialState = false

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_TYPE.THEME:
            return action.payload
    
        default:
            return state
    }
}

export default themeReducer