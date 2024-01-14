import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'


const ProfilePage = () => {
  const [redirectHomePage, setRedirectHomePage] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)


  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logout = async () => {
    await axios.post('/logout')
    setRedirectHomePage('/')
    setUser(null)
  }
  
  if (ready && !user && !redirectHomePage) {
    return <Navigate to={'/login'} />
  }






  if (redirectHomePage)
    return <Navigate to={redirectHomePage} />


  return (
    <div>
      <AccountNav/>
      {
        subpage === 'profile' && (
          <div className='text-center max-w-xl mx-auto'>
            Logged in as {user.name} ({user.email})<br />
            <button onClick={logout} className='primary max-w-md mt-2'>Logout</button>
          </div>
        )
      }
      {
        subpage === 'places' && (
          <PlacesPage />
        )
      }
    </div>
  )
}

export default ProfilePage
