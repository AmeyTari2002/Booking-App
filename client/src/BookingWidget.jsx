import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from "date-fns"
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'


const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuest, setNumberOfGuest] = useState(1)
    const [fullName, setFullName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user)
        {
            setFullName(user.name)
        }
    },[user])


    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    console.log(numberOfNights)
    async function bookinThisPlace() {

        const response =await axios.post('/bookings', {
            place: place._id,
            checkIn,
            checkOut, numberOfGuest, fullName, mobile,   
            price: numberOfNights * place.price
        })
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect)
    {
        return <Navigate to={redirect}/>
    }



    return (
        <div className='bg-white p-4 rounded-2xl '>
            <div className='text-xl text-center'>
                Price : ${place.price} /per night
            </div>
            <div className='border rounded-2xl px-4 mt-4'>
                <div className='flex md:flex'>
                    <div className=' py-4  rounded-2xl'>
                        <label>Check in:</label>
                        <input type="date" value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className=' py-4  rounded-2xl border-t-2'>
                        <label>Check in:</label>
                        <input type="date" value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col  py-3 border-t'>
                    <label c>Number of Guests:</label>
                    <input type="number" value={numberOfGuest}
                        onChange={ev => setNumberOfGuest(ev.target.value)} />
                </div>
                <div>
                    {
                        numberOfNights > 0 &&
                        (
                            <>
                                <div className='flex flex-col  py-3 border-t'>
                                    <label c>Your FullName:</label>
                                    <input type="text" placeholder='Amey Tari' value={fullName}
                                        onChange={ev => setFullName(ev.target.value)} />
                                </div>
                                <div className='flex flex-col  py-3 border-t'>
                                    <label c>Phone No:</label>
                                    <input type="tel" value={mobile}
                                        onChange={ev => setMobile(ev.target.value)} />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <button onClick={bookinThisPlace} className='primary mt-4'>
                Book this Place
                {
                    numberOfNights > 0 &&
                    (
                        <span> ${numberOfNights * place.price} </span>
                    )
                }
            </button>
        </div>
    )
}

export default BookingWidget
