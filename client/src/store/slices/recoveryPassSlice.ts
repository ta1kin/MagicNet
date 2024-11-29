import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import axios from 'axios'

import type { RecoveryPassState } from '@/types/redux/interfaces/recoveryPass'

type RecoveryPassState = typeof RecoveryPassState


const SERVER_URL = import.meta.env.VITE_SERVER_URL
const VERIFY_EMAIL = import.meta.env.VITE_VERIFY_EMAIL
const VERIFY_CODE = import.meta.env.VITE_VERIFY_CODE
const RECOVERY_PASS = import.meta.env.VITE_RECOVERY_PASS

const initialState: RecoveryPassState = {
    step: 0,
    maxStep: 3,
    isClicked: false,
    isLoading: false,
    codeIsValid: true
}

export const verifyEmailAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/verify-email`,
    async ( email, _thunkAPI ) => {
        
        if( !SERVER_URL || !VERIFY_EMAIL ) throw new Error('Нет путей для верификации почты')

        const response = await axios.put(
            `${SERVER_URL}/${VERIFY_EMAIL}`,
            {
                email
            }
        )

        if( response.status !== 202 ) throw new Error('Ошибка подлинности почты')
    }
)

export const verifyCodeAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/verify-code`,
    async ( data, _thunkAPI ) => {
        if( !SERVER_URL || !VERIFY_CODE ) throw new Error('Нет путей для верификации кода')
        
        const response = await axios.post(
            `${SERVER_URL}/${VERIFY_CODE}`,
            data
        )

        if( response.status !== 201 ) throw new Error('Ошибка подлинности кода')

        return response.data.token
    }
)

export const sendNewPassAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/send-new-pass`,
    async ( data, _thunkAPI ) => {
        if( !SERVER_URL || !RECOVERY_PASS ) throw new Error('Нет путей для верификации кода')
        
        const response = await axios.post(
            `${SERVER_URL}/${RECOVERY_PASS}`,
            data
        )

        if( response.status !== 200 ) throw new Error('Ошибка подлинности кода')

        return response.data.token
    }
)

const recoveryPassSlice = createSlice({
    name: 'recoveryPass',
    initialState,
    reducers: {
        nextStep: state => {
            if ( state.step < state.maxStep ) {
                state.step++
            }
        },
        prevStep: state => {
            if (state.step > 0) {
                state.step--
            }
        },
        onIsClicked: state => {
            state.isClicked = true
        },
    },
    extraReducers: (builder) => {
        // verifyEmailAsync
        builder.addCase(verifyEmailAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(verifyEmailAsync.fulfilled, (state, _action) => {
            state.isLoading = false
            state.isClicked = false
        })
        builder.addCase(verifyEmailAsync.rejected, (state) => {
            state.isLoading = false
        })

        // verifyCodeAsync
        builder.addCase(verifyCodeAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(verifyCodeAsync.fulfilled, (state, _action) => {
            state.isLoading = false
            state.isClicked = false
            state.step++
        })
        builder.addCase(verifyCodeAsync.rejected, (state) => {
            state.isLoading = false
            state.codeIsValid = false
        })

        // sendNewPassAsync
        builder.addCase(sendNewPassAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(sendNewPassAsync.fulfilled, (state, _action) => {
            state.isLoading = false
            state.isClicked = false
            state.step++
        })
        builder.addCase(sendNewPassAsync.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { nextStep, prevStep, onIsClicked } = recoveryPassSlice.actions
export default recoveryPassSlice.reducer