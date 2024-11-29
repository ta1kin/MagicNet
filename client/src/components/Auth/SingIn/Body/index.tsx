import { useState, MouseEvent, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setEmail, setPassword, setSaveMe, resetData } from '@/store/slices/authSlice'
import { RouterPathes } from '@/config/config.router'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@/components/UI/CheckBox'
import validator from 'validator'

import type { BodyProps } from '@/types/types.auth'
import type { State } from '@/types/redux'

type BodyProps = typeof BodyProps
type State = typeof State


const SingInBody = ({ i18nPath, baseBodyPath }: BodyProps) => {
    const { t } = useTranslation([ i18nPath ])
    const dispatch = useDispatch()

    const { saveMe, isClicked } = useSelector(
        ( state: State ) => (
            {
                saveMe: state.auth.saveMe,
                isClicked: state.singIn.isClicked
            }
        )
    )

    const [ input, setInput ] = useState(
        {
            email: '',
            isEmail: false,
            password: '',
            showPass: false,
            passIsValid: false,
        }
    )

    const handleClickShowPass = () => setInput({ ...input, showPass: !input.showPass })
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

        setInput({ ...input, password: newValue, passIsValid: isValidValue })
        dispatch(setPassword( isValidValue ? newValue : '' ))
    }
    const handleChange = ( checked: boolean, _id: number ) => {
        dispatch( setSaveMe( checked ) )
    }
    const handleLink = () => {
        dispatch(resetData())
    }

    const isEmailErr = isClicked ? !input.isEmail : false
    const isPassErr = isClicked ? !input.passIsValid : false

    return (
        <>
            <Box>
                <FormControl variant="outlined" className={ `${ isEmailErr ? 'error' : '' }` }>
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${baseBodyPath}.email`) }</InputLabel>
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
                        label={ t(`${baseBodyPath}.email`) }
                    />
                </FormControl>
                <FormControl variant="outlined" className={ `${ isPassErr ? 'error' : '' }` }>
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${baseBodyPath}.pass`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={input.showPass ? 'text' : 'password'}
                        value={input.password}
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
                        label={ t(`${baseBodyPath}.pass`) }
                    />
                </FormControl>
                <div className="flex justify-between items-center">
                    <FormControlLabel
                        className="noBorder" 
                        control={
                            <Checkbox
                                id={0}
                                checked={saveMe}
                                onChange={handleChange}
                            />
                        } 
                        label={t(`${baseBodyPath}.saveMe`)} 
                    />
                    <Link 
                        to={`${RouterPathes.Recovery}`}
                        onClick={handleLink}
                    >
                        { t(`${baseBodyPath}.recoveryPass`) }
                    </Link>
                </div>
            </Box>
        </>
    )
}

export default SingInBody
