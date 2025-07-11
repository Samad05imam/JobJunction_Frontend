import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const applicants = useSelector((store) => store.application?.applicants || []);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.job.applications || []));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl my-5 font-bold">Applicants ({applicants.length})</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
