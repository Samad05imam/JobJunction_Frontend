import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT} from "@/utils/constant";
import { setAllCompanies} from "@/redux/companySlice";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true,
                });

                dispatch(setAllCompanies(res.data.companies));
            } catch (error) {
                console.error("Companies fetch error:", error);
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
