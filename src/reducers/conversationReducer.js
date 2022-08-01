import { GET_CONVERSATION } from "../actions/actionTypes"

export default (state = { conversation: []} , action) => {
    switch (action.type) {
        case GET_CONVERSATION: 
            return {
                ...state,
                conversation: action.payload
            }
        default: 
            return state
    }
}