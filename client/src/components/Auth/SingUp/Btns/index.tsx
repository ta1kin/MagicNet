import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { nextStep, prevStep } from '@/store/slices/singUpSlice'
import { RouterPathes } from '@/config/config.router'
import { registerAsync, onIsClicked } from '@/store/slices/singUpSlice'

import Button from '@mui/material/Button'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'
import type{ RegisterData } from '@/types/types.auth'


type BtnsProps = typeof BtnsProps
type State = typeof State
type RegisterData = typeof RegisterData

const SingUpBtns = ({ i18nPath, baseBtnsPath }: BtnsProps) => {
    const { t, i18n } = useTranslation( [i18nPath] )
    const { step, maxStep } = useSelector( ( state: State ) => (
        {
            step: state.singUp.step,
            maxStep: state.singUp.maxStep
        }
    ))

    const data: RegisterData = useSelector( ( state: State ) => (
        {
            profession: state.auth.profession,
            whoIs: state.auth.whoIs,
            email: state.auth.email,
            password: state.auth.password,
            saveMe: state.auth.saveMe,
        }
    ))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNext = async () => {
        dispatch( onIsClicked() )

        switch ( step ) {
            case 1: {
                if( data.whoIs.length ) {
                    dispatch( nextStep() )
                }
                break
            }
            case 2: {
                if( data.email, data.password ) {
                    await dispatch( registerAsync( data ) )
                    dispatch( nextStep() )
                }
                break
            }
            case 3: {
                navigate( RouterPathes.Login )
                break
            }
            default:  {
                dispatch( nextStep() )
                break
            }
        }
    }


    const handlePrev = () => {
        switch ( step ) {
            case 0: {
                navigate( RouterPathes.Login )
                break
            }
            default:  {
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
                    { t( `${baseBtnsPath}.next` ) }
                </Button>
                {
                    i18n.exists(`${baseBtnsPath}.prev`)
                        && 
                        <Button variant="outlined"
                                className="w-full"
                                onClick={handlePrev}
                        >
                            { t( `${baseBtnsPath}.prev` ) }
                        </Button> 
                }
            </div>
        </>
    )
}

export default SingUpBtns