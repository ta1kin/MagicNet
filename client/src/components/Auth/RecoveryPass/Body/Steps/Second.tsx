import { ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCode } from '@/store/slices/authSlice'

import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const SecondStep = ({ t, stepPath }: RecoveryStepProps) => {
    const dispatch = useDispatch()
    const isClicked = useSelector( ( state: State ) => state.recoveryPass.isClicked )

    const [ input, setInput ] = useState(
        {
            code: '',
            isValidCode: false
        }
    )

    const handleCode = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.value
        const isValidValue = newValue.length === 6

        setInput({ ...input, code: newValue, isValidCode: isValidValue })
        dispatch(setCode( isValidValue ? newValue : '' ))
    }

    const isCodeErr = isClicked ? !input.isValidCode : false

    return (
        <>
            <Box>
                <FormControl variant="outlined" className={ `${ isCodeErr ? 'error' : '' }` }>
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${stepPath}.code`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        value={input.code}
                        onChange={handleCode}
                        endAdornment={
                            <InputAdornment position="end">
                                <ErrorOutlineIcon />
                            </InputAdornment>
                        }
                        label={ t(`${stepPath}.code`) }
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default SecondStep
