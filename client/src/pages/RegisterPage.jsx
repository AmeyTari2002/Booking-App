import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(name)
    const registerUser = async(event)=>{
        event.preventDefault()
        try{
             await axios.post('/register', {
                name,
                email,
                password,
            })
            alert("Registration successful")
        } catch(e)
        {
            alert("Already Register")
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64' onSubmit={registerUser}>
                <h1 className='text-4xl mb-4 text-center'>Register</h1>
                <form className='max-w-md mx-auto '>
                    <input type="text" placeholder="Amey Tari" name="" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input type="email" placeholder="youremail.com" name="" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder='password' name="" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <button  className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a Member?<Link className='underline text-black' to={'/login'}> Login Here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
