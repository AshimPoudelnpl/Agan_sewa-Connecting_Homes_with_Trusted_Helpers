import { indexSlice } from "./indexSlice";

export const branchAPIs=indexSlice.injectEndpoints({
    endpoints:(builder)=>({
        getBranches:builder.query({
            query:()=>({
                url:"/branch/get-district",
                method:"GET",
            }),
            providesTags:["branch"],
        }),
        getBranchesByDistrict:builder.query({
            query:(district_id)=>({
                url:`/branch/get-branches-by-district/${district_id}`,
                method:"GET",
            }),
            providesTags:["branch"],
        }),
        getAllDistricts:builder.query({
            query:()=>({
                url:"/branch/get-all-districts",
                method:"GET",
            }),
            providesTags:["branch"],
        }),
    })
});
export const {useGetBranchesQuery,useGetAllDistrictsQuery,useGetBranchesByDistrictQuery}=branchAPIs;