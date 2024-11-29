import { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetData } from '@/store/slices/authSlice'
import 
    { 
        nextStep, prevStep, 
        verifyEmailAsync, verifyCodeAsync, 
        sendNewPassAsync, onIsClicked 
    } 
    from '@/store/slices/recoveryPassSlice'
import { RouterPathes } from '@/config/config.router'

import Button from '@mui/material/Button'
import validator from 'validator'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type BtnsProps = typeof BtnsProps
type State = typeof State

const RecoveryBtns = ( { i18nPath, baseBtnsPath }: BtnsProps ) => {
    const { t } = useTranslation([ i18nPath ])
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {step, maxStep, code, email, password } = useSelector( ( state: State ) => (
        {
            // recovery
            step: state.recoveryPass.step,
            maxStep: state.recoveryPass.maxStep,
            // auth
            code: state.auth.code,
            email: state.auth.email,
            password: state.auth.password,
        }
    ) )
    
    const handleNext = async (_event: MouseEvent<HTMLButtonElement>) => {
        dispatch( onIsClicked() )

        switch ( step ) {
            case 0: {
                if( validator.isEmail( email) ) {
                    await dispatch( verifyEmailAsync( email ) )
                    dispatch( nextStep() )
                }
                break
            }
            case 1: {
                if( validator.isEmail( email) && code ) {
                    const data = {
                        email,
                        secret_code: code,
                    }
                    await dispatch( verifyCodeAsync( data ) )
                }
                break
            }
            case 2: {
                if( password ) {
                    const data = {
                        email,
                        password: password,
                    }
                    await dispatch( sendNewPassAsync( data ) )
                }
                break
            }
            case 3: {
                navigate( RouterPathes.Login )
                dispatch(resetData())
                break
            }
        }
    }
    const handlePrev = (_event: MouseEvent<HTMLButtonElement>) => {
        switch ( step ) {
            case 0: {
                navigate( RouterPathes.Login )
                dispatch(resetData())
                break
            }
            case maxStep - 1: {
                navigate( RouterPathes.Login )
                dispatch(resetData())
                break
            }
            default: {
                dispatch( prevStep() )
                break
            }
        }
    }

    return (
        <>
            <div className="btns__content w-full flex flex-col gap-[10px]">
                <Button variant="contained"
                        className="w-full"
                        onClick={handleNext}
                >
                    { t( `${baseBtnsPath}.${step}.next` ) }
                </Button>
                {
                    step !== maxStep
                        &&
                        <Button variant="outlined"
                                className="w-full"
                                onClick={handlePrev}
                        >
                            { t( `${baseBtnsPath}.${step}.prev` ) }
                        </Button>
                }
            </div>
        </>
    )
}

export default RecoveryBtns
  