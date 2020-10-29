import {
    LOGIN_USER, REGISTER_USER
} from '../_action/types'

export default function(state={}, action){
    switch (action.type) {
        case LOGIN_USER:
            // action.payload에는 server딴의 index.js에서
            // login에 성공하게 되면 json형식으로
            // loginSuccess와 user_id값을 반환함.
            return {...state, loginSuccess : action.payload}
            break;
        case REGISTER_USER:
            // action.payload에는 server딴의 index.js에서
            // login에 성공하게 되면 json형식으로
            // loginSuccess와 user_id값을 반환함.
            return {...state, register : action.payload}
            break;

        default:
            return state;
    }
}