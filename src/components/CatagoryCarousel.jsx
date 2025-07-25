import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const catagory = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer"
]

const CatagoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    return (
        <div>

            <Carousel className='w-full max-w-xl mx-auto'>
                <CarouselContent>
                    {catagory.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className='md:basis-1/2 lg-basis-1/3'
                        >
                            <Button 
                                onClick={()=>searchJobHandler(cat)} 
                                variant="outline" 
                                className='rounded-full border border-gray-200'
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CatagoryCarousel
