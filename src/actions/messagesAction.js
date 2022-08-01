import { getMessagesApi, sendMessageApi } from "../api";
import { GET_MESSAGES, SEND_MESSAGE } from "./actionTypes";


export const getMessages = (convId) => async(dispatch) => {
    try {
        const { data } = await getMessagesApi(convId)
        dispatch({
            type: GET_MESSAGES,
            payload: data
        })
    } catch (error) {
        Promise.reject(error)
    }
} 

export const sendMessageAction = (message) => async(dispatch) => {
    try {
        const { data } = await sendMessageApi(message)
        dispatch({
            type: SEND_MESSAGE,
            payload: data
        })
    } catch (error) {
        
    }
} 