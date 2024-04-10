import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <form className='login' /*onSubmit={handleSubmit}*/>
            <h2>Welcome</h2>
            
            <input
                type='username'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input
                type="password"
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Link to="/welcome">
            <button className='button'>Login</button>    
            </Link>
                
        </form>
    )

}

export default Login