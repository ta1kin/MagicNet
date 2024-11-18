import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { RouterPathes } from '@/config/config.router'

import type{ LoginData } from '@/types/types.auth'
import type { SingInState } from '@/types/redux/interfaces/singIn'


type SingInState = typeof SingInState
type LoginData = typeof LoginData

const initialState: SingInState = {
    step: 0,
    isClicked: false,
    isLoading: false
}

export const loginAsync = createAsyncThunk(
    `${RouterPathes.Login}sing-in/login`,
    async ( data: LoginData, _thunkAPI ) => {
        console.log('Вход в систему')
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

const singInSlice = createSlice({
    name: 'singIn',
    initialState,
    reducers: {
        nextStep: state => {
            state.step++
        },
        prevStep: state => {
            if( state.step > 0 ) {
                state.step--
            }
        },
        onIsClicked: state => {
           state.isClicked = true 
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(loginAsync.fulfilled, (state, _action) => {
            state.isLoading = false
            state.isClicked = false
        })
        builder.addCase(loginAsync.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const { nextStep, prevStep, onIsClicked } = singInSlice.actions
export default singInSlice.reducer