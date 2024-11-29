import { ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEmail } from '@/store/slices/authSlice'

import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import EmailIcon from '@mui/icons-material/Email'

import validator from 'validator'

import type { RecoveryStepProps } from '@/types/types.auth'
import type { State } from '@/types/redux'

type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State


const FirsStep = ({ t, stepPath }: RecoveryStepProps) => {
    const dispatch = useDispatch()
    const isClicked = useSelector( ( state: State ) => state.recoveryPass.isClicked )

    const [ input, setInput ] = useState(
        {
            email: '',
            isEmail: false
        }
    )

    const handleInputEmail = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.value
        const isValidValue = validator.isEmail( newValue )

        setInput({ ...input, email: newValue, isEmail: isValidValue })
        dispatch(setEmail( isValidValue ? newValue : '' ))
    }

    const isEmailErr = isClicked ? !input.isEmail : false

    return (
        <>
            <Box>
                <FormControl variant="outlined"  className={ `${ isEmailErr ? 'error' : '' }` }>
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${stepPath}.email`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        value={input.email}
                        onChange={handleInputEmail}
                        endAdornment={
                            <InputAdornment position="end">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        label={ t(`${stepPath}.email`) }
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default FirsStep
