import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate()
  const jobId = job?._id

  const daysAgo = (mongoDBTime) => {
    const createdAt = new Date(mongoDBTime)
    const currentDate = new Date()
    const difference = currentDate - createdAt
    return Math.floor(difference / (1000 * 60 * 60 * 24))
  }

  if (!job) return null // Fallback

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-300'>
      <div className='flex justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgo(job?.createdAt) === 0 ? 'Today' : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          variant='outline'
          className='rounded-full border border-gray-300 hover:border-none hover:bg-gray-200'
          size='icon'
        >
          <Bookmark />
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' varient='outline' size='icon'>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name || 'N/A'}</h1>
          <p className='text-sm text-gray-500'>{job?.location || 'N/A'}</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title || 'N/A'}</h1>
        <p className='text-sm text-gray-600'>{job?.description || 'N/A'}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 border border-gray-200 rounded-full font-bold'>
          {job?.position} Positions
        </Badge>
        <Badge className='text-[#F83002] border border-gray-200 rounded-full font-bold'>
          {job?.jobType}
        </Badge>
        <Badge className='text-[#7209B7] border border-gray-200 rounded-full font-bold'>
          {job?.salary} LPA
        </Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${jobId}`)} variant='outline'>
          Details
        </Button>
        <Button className='text-white bg-[#7209b7]'>Save for later</Button>
      </div>
    </div>
  )
}

export default Job
