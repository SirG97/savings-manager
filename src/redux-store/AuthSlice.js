import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        userToken: null,
        loggedIn: false,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload
        },
        setLoginState: (state, action) => {
            state.loggedIn = action.payload
        },
        logoutUser: (state) => {
            state.userInfo = null
            state.token = null
            state.loggedIn = false
        },
    },

})

export const { setUserInfo, setUserToken, setLoginState, logoutUser } = AuthSlice.actions
export default AuthSlice.reducer