import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img5.webp'

import image1Mobile from '../assets/banner/img1_mobile.jpg'
import image2Mobile from '../assets/banner/img2_mobile.webp'
import image3Mobile from '../assets/banner/img3_mobile.jpg'
import image4Mobile from '../assets/banner/img4_mobile.jpg'
import image5Mobile from '../assets/banner/img5_mobile.png'

import { FaAngleRight, FaAngleLeft, FaPlay, FaPause } from "react-icons/fa6";
import { BannerSkeleton } from './LoadingSkeleton'

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)
        } else {
            setCurrentImage(0)
        }
    }

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1)
        } else {
            setCurrentImage(desktopImages.length - 1)
        }
    }

    const goToImage = (index) => {
        setCurrentImage(index)
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        // Simulate loading time for banner images
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        let interval
        if (isPlaying && !isLoading) {
            interval = setInterval(() => {
                if (desktopImages.length - 1 > currentImage) {
                    nextImage()
                } else {
                    setCurrentImage(0)
                }
            }, 4000)
        }

        return () => clearInterval(interval)
    }, [currentImage, isPlaying, isLoading])

    if (isLoading) {
        return <BannerSkeleton />
    }

    return (
        <div className='container mx-auto px-4 py-6'>
            <div className='relative h-64 md:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200'>
                
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 z-10'></div>
                
                {/* Additional overlay for better text readability */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10'></div>
                
                {/* Navigation Controls */}
                <div className='absolute z-20 h-full w-full flex items-center justify-between px-4'>
                    <button 
                        onClick={prevImage} 
                        className='bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-xl group'
                    >
                        <FaAngleLeft className='text-gray-700 group-hover:text-gray-900 transition-colors'/>
                    </button>
                    <button 
                        onClick={nextImage} 
                        className='bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-xl group'
                    >
                        <FaAngleRight className='text-gray-700 group-hover:text-gray-900 transition-colors'/>
                    </button>
                </div>

                {/* Play/Pause Control */}
                <div className='absolute top-4 right-4 z-20'>
                    <button 
                        onClick={togglePlayPause}
                        className='bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110'
                    >
                        {isPlaying ? <FaPause className='text-gray-700'/> : <FaPlay className='text-gray-700'/>}
                    </button>
                </div>

                {/* Desktop and Tablet Version */}
                <div className='hidden md:block h-full w-full overflow-hidden'>
                    {desktopImages.map((imageUrl, index) => (
                        <div 
                            className='absolute w-full h-full transition-all duration-700 ease-in-out' 
                            key={`desktop-${index}`} 
                            style={{
                                transform: `translateX(${(index - currentImage) * 100}%)`,
                                opacity: index === currentImage ? 1 : 0
                            }}
                        >
                            <img 
                                src={imageUrl} 
                                className='w-full h-full object-cover'
                                alt={`Banner ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className='block md:hidden h-full w-full overflow-hidden'>
                    {mobileImages.map((imageUrl, index) => (
                        <div 
                            className='absolute w-full h-full transition-all duration-700 ease-in-out' 
                            key={`mobile-${index}`} 
                            style={{
                                transform: `translateX(${(index - currentImage) * 100}%)`,
                                opacity: index === currentImage ? 1 : 0
                            }}
                        >
                            <img 
                                src={imageUrl} 
                                className='w-full h-full object-cover'
                                alt={`Banner ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Dot Indicators */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2'>
                    {desktopImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentImage 
                                    ? 'bg-white scale-125 shadow-lg' 
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className='absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20'>
                    <div 
                        className='h-full bg-white transition-all duration-300 ease-linear'
                        style={{
                            width: `${((currentImage + 1) / desktopImages.length) * 100}%`
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

export default BannerProduct