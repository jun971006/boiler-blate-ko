import React, {useEffect} from 'react'
import axios from 'axios'

export default function Landingpage(props) {
    
    // Landing Page('/')에 들어오게 되면 실행하는 코드
    // '/api/hello'로 get 통신을 한다. -> 서버 response를 console에 출력
    useEffect(() =>{
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}
