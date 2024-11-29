import { createSlice } from '@reduxjs/toolkit'

import type { AuthState } from '@/types/redux/interfaces/auth'

type AuthState = typeof AuthState


const initialState: AuthState = {
    profession: '',
    profValue: '',
    whoIs: [],
    email: '',
    password: '',
    accessToken: '',
    resetToken: '',
    saveMe: false,
    code: '',
    role: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setProfession: (state, action) => {
            state.profession = action.payload
        },
        setProfValue: (state, action) => {
            state.profValue = action.payload
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
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setResetToken: (state, action) => {
            state.resetToken = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        resetData: state => {
            state.profession = ''
            state.whoIs = []
            state.email = ''
            state.password = ''
            state.accessToken = ''
            state.saveMe = false
            state.code = ''
            state.role = ''
        }
    }
})

export const {

    setProfession,
    setProfValue,
    setWhoIs, 
    setEmail,
    setPassword,
    setSaveMe, 
    setCode,
    setAccessToken,
    setRole,
    resetData,

} = authSlice.actions
export default authSlice.reducer