import {setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"


const useGetSingleJobVIAid = (jobId) => {
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     const fetchSingleJobById = async()=>{
    //         try {
    //             const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
    //                 withCredentials: true,
    //             });

    //             dispatch(setSingleJob(res.data.job));
    //             console.log("Jobs fetched:", res.data.job);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchSingleJobById();
    // },[])
}

export default useGetSingleJobVIAid