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
            <h3>Log in</h3>

            <label>username:</label>
            <input
                type='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Link to="/welcome">
            <button>Log in</button>    
            </Link>
                
        </form>
    )

}

export default Login