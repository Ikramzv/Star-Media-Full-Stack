import { LOGOUT, SET_USER } from "../actions/actionTypes"
const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    followings: JSON.parse(localStorage.getItem('user')).followings,
    followers: JSON.parse(localStorage.getItem('user')).followers
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
        case 'FOLLOW':
            localStorage.setItem(
                "user",
                JSON.stringify({
                  ...state.user,
                  followings: action.payload,
                })
              );
            return {
                ...state,
                followings: action.payload
            }
        case 'UNFOLLOW':
            localStorage.setItem(
                "user",
                JSON.stringify({
                  ...state.user,
                  followings: state.user?.followings.filter((id) => id !== action.payload),
                })
              );
            return {
                ...state,
                followings: state.followings.filter(id => id !== action.payload)
            }
        default: 
            return state
    } 
}