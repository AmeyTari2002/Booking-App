import React, { useEffect } from 'react'
import { useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import AccountNav from '../AccountNav';
import { Link, Navigate, useParams } from 'react-router-dom';



const PlacesFormPage = () => {
    const {id} = useParams();
    console.log({id})
    const [addedPhotos, setaddedPhotos] = useState([]);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");

    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState(1)
    const [redirect,setRedirect] = useState(false)
    const [price,setPrice] = useState(100)

    useEffect(()=>{
        if(!id)
        {
            return;
        }
        axios.get('/places/'+id).then(res=>{
            const {data} = res;
            setTitle(data.title)
            setAddress(data.address)
            setaddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuest(data.maxGuest)
            setPrice(data.price)
        })
    },[id])


    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            id,title, address, addedPhotos, description, perks,
            extraInfo, checkIn, checkOut, maxGuest, price
        }
        if(id)
        {
            // update
            await axios.put('/places', {
                id, ...placeData
            })
            setRedirect(true)

        }
        else
        {
            // new places
            const { data } = await axios.post('/places', placeData)
            setRedirect(true)
        }     
    }

    if(redirect)
    {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav/>
            <form  >
                <h2 className='text-2xl mt-4'>Title</h2>
                <p className='text-gray-500 text-sm'>Title for your place. should be short and catchy as in advertisment</p>
                <input value={title} onChange={ev => setTitle(ev.target.value)} type="text" placeholder='title  for My Lovely apt' />
                <h2 className='text-2xl mt-4'>Address</h2>
                <p className='text-gray-500 text-sm'>Address to the place</p>
                <input value={address} onChange={ev => setAddress(ev.target.value)} type="text" placeholder='address' />
                <h2 className='text-2xl mt-4'>Photos</h2>
                <p className='text-gray-500 text-sm'>more= better</p>

                <PhotosUploader addedPhotos={addedPhotos} onChange={setaddedPhotos} />

                <h2 className='text-2xl mt-4'>Description</h2>
                <p className='text-gray-500 text-sm'>Description of place</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                <h2 className='text-2xl mt-4'>Perks</h2>
                <p className='text-gray-500 text-sm'>Select all the  of perks of your place</p>
                <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6' >
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                <h2 className='text-2xl mt-4'>Extra Info</h2>
                <p className='text-gray-500 text-sm'>House Rules ,etc</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                <h2 className='text-2xl mt-4'>Check in&out times , max guests</h2>
                <p className='text-gray-500 text-sm'>Add check in and Check out times </p>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                            type="text" placeholder='16:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check Out time</h3>
                        <input value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            type="text" placeholder='16:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max Number Guest</h3>
                        <input value={maxGuest}
                            onChange={ev => setMaxGuest(ev.target.value)}
                            type="text" placeholder='2' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price Per</h3>
                        <input value={price}
                            onChange={ev => setPrice(ev.target.value)}
                            type="text" placeholder='2' />
                    </div>
                </div>
                <div>
                    <button><Link to={'/'} className='primary mt-4'>Save</Link></button>
                </div>
            </form>


        </div>
    )
}

export default PlacesFormPage
