import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../Image'


export const IndexPage = () => {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/api/places').then(res => {
            setPlaces([...res.data])
        })
    })
    return (
        <div className=' mt-8 grid gap-x-6  gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                places.length > 0 && places.map(place => (
                    <Link to={'/place/'+place._id}>
                        {
                            place.photos?.[0] && (
                                <div className='flex'>
                                     <Image className='rounded-2xl object-cover aspect-square' src={place.photos?.[0]} alt="" />
                                </div>   
                            )}
                        <div>
                            <h2 className='font-bold'>{place.title}</h2>
                            <h3 className='text-sm  text-gray-500'>{place.address}</h3>
                            <div className='mt-1'>
                                ${place.price} per night 
                            </div>
                        </div>    
                    </Link>
                ))
            }
        </div>

    )
}
