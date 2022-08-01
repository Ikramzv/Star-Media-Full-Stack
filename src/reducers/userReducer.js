import { LOGOUT, SET_USER } from "../actions/actionTypes"
const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
}

export default (state = initialState , action) => {
    switch (action.type) {
        case SET_USER: 
            localStorage.setItem('user' , JSON.stringify(action.payload))
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT: 
            localStorage.removeItem('user')
            return {
                ...state,
                user: null
            }
        default: 
            return state
    } 
}