import { createSlice } from "@reduxjs/toolkit";

export const StatusSlice = createSlice({
    name: 'status',
    initialState: {
        filterQuery: '',
    },
    reducers: {

        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload
        },
        setFilterMerchant: (state, action) => {
            state.merchantId = action.payload
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        },
    },

})

export const { setFilterQuery, setFilterMerchant,setStartDate, setEndDate } = StatusSlice.actions
export default StatusSlice.reducer