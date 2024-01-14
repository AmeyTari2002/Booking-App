import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PlacesFormPage from './PlacesFormPage'
import AccountNav from '../AccountNav'
import axios from 'axios'
import Image from '../Image'

const PlacesPage = () => {
    const [places, setPlaces] =useState([])

    useEffect(()=>{
        axios.get('/user-places').then(({data})=>{
            setPlaces(data);
        })
    },[])

    // console.log(places)

    return (
        <div>
            <AccountNav/>
                <div className='text-center'>
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                        </svg>
                        Add new Places
                    </Link>
                </div>
                <div className='mt-4'>
                    {places.length>0 && places.map((place)=>(
                        <Link to={'/account/places/'+ place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl '>
                            <div className='flex h-32 w-32 bg-gray-200 grow shrink-0'>
                                {place.photos.length>0 && (
                                    <Image className='object-cover' src={place.photos[0]} alt="" />
                                )}
                            </div>
                            <div className='grow-0 shrink'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
          
        </div >
    )
}

export default PlacesPage
