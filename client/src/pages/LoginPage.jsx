import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'



export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect ,setredirect] = useState("")
    const {setUser}=useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
       
        try{
        const {data} = await axios.post('/login', {email,password},{withCredentials:true})
        
        alert("Login Successful")
        setredirect(true);
        setUser(data)
        }
        catch(err)
        {
            alert("Login Failed")
        }
    }

    if(redirect)
    {
        return <Navigate to={'/'}/>
    }


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl mb-4 text-center'>Login</h1>
                <form className='max-w-md mx-auto ' onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder="youremail.com" name="" value={email} required onChange={e => { setEmail(e.target.value) }} />
                    <input type="password" placeholder='password' name="" value={password} required onChange={e => { setPassword(e.target.value) }}/>
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet?<Link className='underline text-black' to={'/register'}> Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
