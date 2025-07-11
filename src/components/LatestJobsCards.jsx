import React from 'react'
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';


const LatestJobsCards = ({job}) => {
    const navigate = useNavigate()
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer' onClick={()=>navigate(`/description/${job._id}`)}>
            <div>
                <h1 className='font-medium text-lg '>{job?.company?.name || "Unknown Company"}
</h1>
                <p className='text-gray-500 text-sm '>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-medium text-lg my-2'>{job?.title}</h1>
                <p className='text-gray-600 text-sm '>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700  border border-gray-200  rounded-full font-bold'>{job?.position} Positions </Badge>
                <Badge className='text-[#F83002] border border-gray-200  rounded-full  font-bold'>{job?.jobType}</Badge>
                <Badge className='text-[#7209B7] border border-gray-200  rounded-full font-bold'>{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobsCards
