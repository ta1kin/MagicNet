import { useState, ChangeEvent, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleReset, setPersonalInfo } from '@/store/slices/homeSlice'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import type { ResetFormProps } from '@/types/types.home'
import type { State } from '@/types/redux'

type ResetFormProps = typeof ResetFormProps
type State = typeof State


const ResetForm = ({inputText, btnText, targetFunc}: ResetFormProps) => {
    const dispatch = useDispatch()
    const {accessToken, personalInfo} = useSelector(
        ( state: State ) => (
            {
                accessToken: state.auth.accessToken,
                personalInfo: state.home.personalInfo,
            }
        )
    )

    const [ value, setValue ] = useState('')

    const handleInput = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newVal = event.target.value
        setValue( newVal )
    }
    const handleBtn = async ( _event: MouseEvent<HTMLButtonElement> ) => {
        const data: { [key: string]: string } = {
            accessToken: accessToken,
        }
        data[ targetFunc.key ] = value
        await dispatch( targetFunc.func( data ) )

        if( targetFunc.key !== 'password' ) {
            const newPersInfo = { ...personalInfo }
            newPersInfo[ targetFunc.key ] = value
            dispatch(setPersonalInfo(newPersInfo))
        }

        dispatch(toggleReset())
    }
    const handleExit = ( _event: MouseEvent<HTMLButtonElement> )=> {
        dispatch(toggleReset())
    }
  
    return (
        <>
            <div className="home-layout__reset box">
                <Button className="exit w-[30px]" variant="text" onClick={ handleExit }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                </Button>
                <Box className="w-[40%] max-lg:w-[60%] max-sm:w-full flex flex-col gap-[20px]">
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-password">{ inputText }</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="text"
                            value={ value }
                            onChange={ handleInput }
                            label={ inputText }
                        />
                    </FormControl>
                    <Button 
                        className="btn w-full"
                        variant="contained"
                        onClick={ handleBtn }
                    >
                        { btnText }
                    </Button>
                </Box>
            </div>
        </>
    )
}

export default ResetForm
