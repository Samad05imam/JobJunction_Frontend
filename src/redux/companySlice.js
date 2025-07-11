import { createSlice } from "@reduxjs/toolkit"; 

const companySlice = createSlice({
    name:'company',
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompaniesByText:"",
    },
    reducers:{
        // actions

        setSingleCompany:(state , action)=>{
            state.singleCompany = action.payload;
        },
        setAllCompanies:(state , action)=>{
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state , action)=>{
            state.searchCompaniesByText = action.payload;
        }
    }

})

export const {setSingleCompany , setAllCompanies , setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer