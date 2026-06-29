import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
   reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setAuthUser:(state, action) => {
            state.user = action.payload;
        }
    }
})

export const {setLoading}=authSlice.actions;
export default authSlice.reducer;