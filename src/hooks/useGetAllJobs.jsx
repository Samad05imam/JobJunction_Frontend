import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job)
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                });

                dispatch(setAllJobs(res.data.job));
                console.log("Jobs fetched:", res.data.job);
            } catch (error) {
                console.error("Job fetch error:", error);
            }
        };

        fetchJobs();
    }, [dispatch]);
};

export default useGetAllJobs;
