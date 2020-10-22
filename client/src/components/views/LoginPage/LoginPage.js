import React, { useState } from 'react'

export default function Loginpage(props) {
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            
            <form style={{display:'flex', flexDirection: 'column'}}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="Password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>
                    Login
                </button>

            </form>
        </div>
    )
}
