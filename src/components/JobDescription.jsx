import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {}, // ✅ send empty body to fix 400 error
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      setIsApplied(true);
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };


  useEffect(() => {
  const fetchSingleJobById = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });

      dispatch(setSingleJob(res.data.job));

      // ✅ FIXED: safe optional chaining and correct key
      setIsApplied(
        res.data.job?.applications?.some(application => application.applicant === user?._id) || false
      );
    } catch (error) {
      console.log(error);
    }
  };
  fetchSingleJobById();
}, [jobId, dispatch, user?._id]);


  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 border border-gray-200 rounded-full font-bold'>
              {singleJob?.position} Positions
            </Badge>
            <Badge className='text-[#F83002] border border-gray-200 rounded-full font-bold'>
              {singleJob?.jobType}
            </Badge>
            <Badge className='text-[#7209B7] border border-gray-200 rounded-full font-bold'>
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          className={`rounded-lg ${
            isApplied
              ? 'bg-gray-600 text-white cursor-not-allowed'
              : 'bg-[#7209B7] text-white hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className='border-b-2 border-b-gray-300 font-medium my-4 py-4'>{singleJob?.description}</h1>

      <div>
        <h1 className='font-bold my-2'>
          Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
        </h1>
        <h1 className='font-bold my-2'>
          Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
        </h1>
        <h1 className='font-bold my-2'>
          Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span>
        </h1>
        <h1 className='font-bold my-2'>
          Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} years</span>
        </h1>
        <h1 className='font-bold my-2'>
          Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
        </h1>
        <h1 className='font-bold my-2'>
          Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
        </h1>
        <h1 className='font-bold my-2'>
          Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
