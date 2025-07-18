import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice'; // ✅ Correct slice
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import AdminJobsTable from './AdminJobsTable';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder='Filter by name || role'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className='bg-black text-white'
            onClick={() => navigate('/admin/job/create')}
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
