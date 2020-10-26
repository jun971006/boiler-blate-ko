import axios from 'axios'
import {
    LOGIN_USER
} from './types'

// email, password정보를 parameter를 통해 받는다.
export function loginUser(dataTosubmit){
    const request = axios.post("/api/users/login", dataTosubmit) // 실제 통신 부분
    // 서버에서 받은 부분을 request 변수에 저장한다.
            .then(response => response.data )

    // return을 통해서 reducer로 보내야 한다.
    // previousState와 Action을 통해서 nextState를 만들어야 한다.
    return {
        type: LOGIN_USER,
        payload: request
    }
}