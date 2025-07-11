import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT} from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true,
                });

                dispatch(setSingleCompany(res.data.company));
                console.log("Jobs fetched:", res.data.job);
            } catch (error) {
                console.error("Job fetch error:", error);
            }
        };

        fetchSingleCompany();
    }, [companyId , dispatch]);
};

export default useGetCompanyById;
