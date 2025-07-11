import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllAdminJobs } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        dispatch(setAllAdminJobs(res.data.jobs)); // ✅ fixed
      } catch (error) {
        console.error("Admin jobs fetch error:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
