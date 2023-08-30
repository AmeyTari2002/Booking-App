import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { useState } from 'react'
import BookingWidget from '../BookingWidget'
import PlaceGallery from '../PlaceGallery'
import AddressLink from '../AddressLink'

const PlacePage = () => {
    const [place, setPlace] = useState([])
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get(`/places/${id}`).then(Response => {
            console.log(Response)
            setPlace(Response.data)
        })
    }, [id])

    if (!place) {
        return ''
    }

    return (
        <div className='mt-8 bg-pink-50 -mx-8 px-8 py-6'>
            <h1 className='text-2xl'> {place.title}   </h1>
        <AddressLink>
            {place.address}
        </AddressLink>
          <PlaceGallery place={place}/>

            <div className='mt-4 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl text-justify' >Description</h2>
                        {place.description}
                    </div>
                    Check In :{place.checkIn}<br />
                    Check Out :{place.checkOut}<br />
                    Max number of Guests:{place.maxGuest ? place.maxGuest : 100 }

                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div>
                <h2 className='font-semibold text-2xl text-justify' >Extra Info</h2>
            </div>
            <div className='mb-4 mt-1 text-sm text-gray-700 text-justify'>
                {place.extraInfo}
            </div>
        </div>
    )
}

export default PlacePage
