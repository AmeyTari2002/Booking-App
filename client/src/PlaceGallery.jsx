import React, { useState } from 'react'
import Image from './Image'


const PlaceGallery = ({ place }) => {
    const [showAllPhoto, setShowAllPhoto] = useState(false)


    if (showAllPhoto) {
        return (
            <div className='absolute inset-0 bg-white  min-h-screen'>
                <div className='p-8 grid gap-4 bg-black'>
                    <div>
                        <h2>Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhoto(false)} className='bg-gray-300  fixed flex gap-2 p-1 rounded-full shadow-md shadow-black top-8 right-12'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Button
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className='w-full flex flex-row justify-center overflow-hidden '>
                            <Image className='object-fill' src={ photo} alt="" />
                        </div>

                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='relative '>
            <div className="grid gap-2 rounded-3xl overflow-hidden   grid-cols-[2fr_1fr] ">
                <div >
                    {place.photos?.[0] && (
                        <div>
                            <Image onClick={() => setShowAllPhoto(true)} className='aspect-square object-cover' src={ place.photos[0]} alt="" />
                        </div>
                    )}
                </div>
                <div className='grid '>
                    {place.photos?.[1] && (

                        <Image onClick={() => setShowAllPhoto(true)} className='aspect-square object-cover' src={place.photos[1]} alt="" />

                    )}
                    <div>
                        {place.photos?.[2] && (
                            <div className='overflow-hidden'>
                                <Image onClick={() => setShowAllPhoto(true)} className='aspect-square object-cover relative top-2' src={place.photos[2]} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhoto(true)} className=' flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                </svg>
                Show More Photos
            </button>
        </div>
    )
}

export default PlaceGallery
