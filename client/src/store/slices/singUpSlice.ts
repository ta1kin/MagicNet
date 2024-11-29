import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import axios from 'axios'

import type{ RegisterData } from '@/types/types.auth'
import type { SingUpState } from '@/types/redux/interfaces/singUp'


type SingUpState = typeof SingUpState
type RegisterData = typeof RegisterData

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const SING_UP = import.meta.env.VITE_SING_UP

const initialState: SingUpState = {
    step: 0,
    maxStep: 3,
    isClicked: false,
    isLoading: false,
    isValid: true,
}

export const registerAsync = createAsyncThunk(
    `${RouterPathes.Register}/register`,
    async ( data: RegisterData, _thunkAPI ) => {
        if( !SERVER_URL || !SING_UP ) throw new Error( 'Не заданы пути для регистрации!' )
        
        const response = await axios.post(
            `${SERVER_URL}/${SING_UP}`,
            data
        )

        if( response.status !== 200 ) throw new Error( 'Ошибка при регистрации!' )

        return response.data.data
    }
)

const singUpSlice = createSlice({
    name: 'singUp',
    initialState,
    reducers: {
        nextStep: (state: SingUpState) => {
            if ( state.step < state.maxStep ) {
                state.step = state.step + 1
                state.isClicked = false
            }
        },
        prevStep: (state: SingUpState) => {
            if (state.step > 0) {
                state.step--
            }
        },
        onIsClicked: (state: SingUpState) => {
            state.isClicked = true 
        },
        resetStep: (state: SingUpState) => {
            state.isValid = true
            state.step = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAsync.pending, (state) => {
            state.isLoading = true
            state.isValid = true
        })
        builder.addCase(registerAsync.fulfilled, (state, _action) => {
            state.isValid = true
            state.isLoading = false
            state.isClicked = false
        })
        builder.addCase(registerAsync.rejected, (state) => {
            state.isLoading = false
            state.isValid = false
        })
    }
})

export const { nextStep, prevStep, onIsClicked, resetStep } = singUpSlice.actions
export default singUpSlice.reducer