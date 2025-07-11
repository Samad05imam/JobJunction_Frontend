import React from 'react'
import LatestJobsCards from './LatestJobsCards'
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { useNavigate } from 'react-router-dom';



const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)
    // console.log("Jobs from Redux:", allJobs);
    const navigate = useNavigate()
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span>Job Opeings</h1>
            <div className='grid grid-cols-3 gap-4 my-5 '>
                {
                    allJobs?.length > 0 ? (
                        allJobs.slice(0, 6).map((job) => (
                            
                            <LatestJobsCards  key={job._id} job={job} />
                        ))
                    ) : (
                        <span>No Job Available!</span>
                    )
                }

            </div>
        </div>
    )
}

export default LatestJobs
