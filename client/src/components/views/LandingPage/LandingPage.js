import React, {useEffect} from 'react'
import axios from 'axios'

// props.history.push('/login') 사용하기 위해 필요함.
import { withRouter } from 'react-router-dom'

function Landingpage(props) {
    
    // Landing Page('/')에 들어오게 되면 실행하는 코드
    // '/api/hello'로 get 통신을 한다. -> 서버 response를 console에 출력
    useEffect(() =>{
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, [])

    const onClickHandler = () => {
        axios.get(`api/users/logout`)
        .then(response => {
            if(response.data.success === true){
                props.history.push('/login') // react에서 해당 url로 가게 하는 방법
            } else{
                alert('로그아웃 실패')
            }
            

        })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
            
        </div>
    )
}


export default withRouter(Landingpage)