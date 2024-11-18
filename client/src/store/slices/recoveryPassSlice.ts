import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import type { RecoveryPassState } from '@/types/redux/interfaces/recoveryPass'

type RecoveryPassState = typeof RecoveryPassState


const initialState: RecoveryPassState = {
    step: 0,
    maxStep: 3,
    isClicked: false,
    isLoading: false,
}

export const verifyEmailAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/verify-email`,
    async ( data, _thunkAPI ) => {
        console.log('Верификация email в системе')
        console.log( data )

        return new Promise<void>((resolve) => {
            console.log('Начало задержки')
            
            setTimeout(() => {
                console.log('Задержка завершена')
                resolve();
            }, 1000);

            return { message: 'success' }
        })
    }
)

export const verifyCodeAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/verify-code`,
    async ( data, _thunkAPI ) => {
        console.log('Верификация code в системе')
        console.log( data )

        return new Promise<void>((resolve) => {
            console.log('Начало задержки')
            
            setTimeout(() => {
                console.log('Задержка завершена')
                resolve();
            }, 1000);

            return { message: 'success' }
        })
    }
)

export const sendNewPassAsync = createAsyncThunk(
    `${RouterPathes.Recovery}/send-new-pass`,
    async ( data, _thunkAPI ) => {
        console.log('Смена пароля в системе')
        console.log( data )

        return new Promise<void>((resolve) => {
            console.log('Начало задержки')
            
            setTimeout(() => {
                console.log('Задержка завершена')
                resolve();
            }, 1000);

            return { message: 'success' }
        })
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
        })
        builder.addCase(verifyCodeAsync.rejected, (state) => {
            state.isLoading = false
        })

        // sendNewPassAsync
        builder.addCase(sendNewPassAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(sendNewPassAsync.fulfilled, (state, _action) => {
            state.isLoading = false
            state.isClicked = false
        })
        builder.addCase(sendNewPassAsync.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { nextStep, prevStep, onIsClicked } = recoveryPassSlice.actions
export default recoveryPassSlice.reducer