export const TYPES = {
    AUTH: 'AUTH'
}

export const login = (data) => (dispatch) => {
    try {
        dispatch({ 
            style: 'NOTIFY',
            payload: {
                loading: true
            }
        })
    } catch (error) {
        
    }
}
