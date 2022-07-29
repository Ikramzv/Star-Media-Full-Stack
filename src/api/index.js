import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
})

API.interceptors.request.use(req => {
    if(localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        req.headers.authorization = `Bearer ${user.accessToken}`
        return req
    }

    return req
})

// USER

export const login = async(payload) => await API.post('/auth/login' , payload)
export const register = async(payload) => await API.post('/auth/register' , payload)
export const getUser = async(id) => await API.get(`/users/${id}`)
export const getUserAllPost = async(id) => await API.get(`/users/profile/${id}`)
export const getFollowingUser = async(id) => await API.get(`/users/profile/${id}/online`)
export const getFollowings = async(id) => await API.get(`/users/followings/${id}`)
export const followUserApi = async(id) => await API.put(`/users/${id}/follow`)
export const unfollowUserApi = async(id) => await API.put(`/users/${id}/unfollow`)


// POSTS

export const getTimeline = async() => await API.get(`/posts/timeline/all`)

export const likePost = async(id) => await API.put(`/posts/${id}/like`)
export const createPost = async(payload) => await API.post('/posts' , payload)
export const deletePostApi = async(id) => await API.delete(`/posts/${id}`)
