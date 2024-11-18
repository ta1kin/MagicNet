import { createSlice } from '@reduxjs/toolkit'
import { professionConfig  } from '@/config/config.auth'

import type { AuthState } from '@/types/redux/interfaces/auth'
type AuthState = typeof AuthState

const initialState: AuthState = {
    profession: professionConfig[0],
    whoIs: {
        first: false,
        second: false,
        third: false,
    },
    email: '',
    password: '',
    accessToken: '',
    saveMe: false,
    code: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setProfession: (state, action) => {
            state.profession = action.payload
        },
        setWhoIs: (state, action) => {
            state.whoIs = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setSaveMe: (state, action) => {
            state.saveMe = action.payload
        },
        setCode: (state, action) => {
            state.code = action.payload
        },
    }
})

export const {

    setProfession, 
    setWhoIs, 
    setEmail,
    setPassword,
    setSaveMe, 
    setCode,

} = authSlice.actions
export default authSlice.reducer