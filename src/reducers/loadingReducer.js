import { END_LOADING, START_LOADING } from "../actions/actionTypes"

export default (loading = false , action) => {
    switch (action.type) {
        case START_LOADING: 
            return loading = true
        case END_LOADING: 
            return loading = false
        default: 
            return loading
    }
}