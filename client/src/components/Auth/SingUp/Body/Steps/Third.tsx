import { useState, ChangeEvent, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEmail, setPassword } from '@/store/slices/authSlice'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import validator from 'validator'

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const ThirdStep = ({ t, stepPath }: RecoveryStepProps) => {
    const dispatch = useDispatch()
    const isClicked = useSelector( ( state: State ) => state.singUp.isClicked )

    const [ input, setInput ] = useState(
        {   
            email: '',
            isEmail: false,

            pass: '',
            passIsValid: false,
            showPass: false,

            repass: '',
            repassIsValid: false,
            showRepass: false,
        }
    )
    
    const handleClickShowPass = () => setInput({ ...input, showPass: !input.showPass })
    const handleClickShowRePass = () => setInput({ ...input, showRepass: !input.showRepass })

    const handleMouseDownPassword = ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }
    const handleMouseUpPassword = ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }

    const handleInputEmail = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.value
        const isValidValue = validator.isEmail( newValue )

        setInput({ ...input, email: newValue, isEmail: isValidValue })
        dispatch(setEmail( isValidValue ? newValue : '' ))
    }
    const handleInputPass = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.value
        const isValidValue = newValue.length >= 4
        const isValidRepass = input.repass.length >= 4 && newValue === input.repass
        const eqPassRepass = newValue === input.repass

        setInput({ ...input, pass: newValue, passIsValid: isValidValue, repassIsValid: isValidRepass })
        dispatch(setPassword( eqPassRepass && isValidValue ? newValue : '' ))
    }
    const handleInputRepass = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.value
        const isValidValue = newValue.length >= 4 && newValue === input.pass
        const eqPassRepass = newValue === input.pass

        setInput({ ...input, repass: newValue, repassIsValid: isValidValue })
        dispatch(setPassword( eqPassRepass && isValidValue ? newValue : '' ))
    }

    const isEmailErr = isClicked ? !input.isEmail : false
    const isPassErr = isClicked ? !input.passIsValid : false
    const isRepassErr = isClicked ? !input.repassIsValid : false

    return (
        <>  
            <Box>
            <FormControl variant="outlined" className={ `${ isEmailErr ? 'error' : '' }` }>
                    <InputLabel htmlFor="outlined-register-email">{ t(`${stepPath}.email`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-register-email"
                        type="text"
                        value={input.email}
                        onChange={handleInputEmail}
                        endAdornment={
                            <InputAdornment position="end">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        label={t(`${stepPath}.email`)}
                    />
                </FormControl>
                <FormControl variant="outlined" className={ `${ isPassErr ? 'error' : '' }` }>
                    <InputLabel htmlFor="outlined-register-pass">{ t(`${stepPath}.pass`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-register-pass"
                        type={input.showPass ? 'text' : 'password'}
                        value={input.pass}
                        onChange={handleInputPass}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        input.showPass ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPass}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {input.showPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={t(`${stepPath}.pass`)}
                    />
                </FormControl>
                <FormControl variant="outlined" className={ `${ isRepassErr ? 'error' : '' }` }>
                    <InputLabel htmlFor="outlined-register-repass">{t(`${stepPath}.repass`)}</InputLabel>
                    <OutlinedInput
                        id="outlined-register-repass"
                        type={input.showRepass ? 'text' : 'password'}
                        value={input.repass}
                        onChange={handleInputRepass}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        input.showRepass ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowRePass}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {input.showRepass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={t(`${stepPath}.repass`)}
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default ThirdStep