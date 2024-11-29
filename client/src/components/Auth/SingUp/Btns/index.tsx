import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'
import { nextStep, prevStep, registerAsync, onIsClicked, resetStep } from '@/store/slices/singUpSlice'
import { resetData } from '@/store/slices/authSlice'

import Button from '@mui/material/Button'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'
import type{ RegisterData } from '@/types/types.auth'


type BtnsProps = typeof BtnsProps
type State = typeof State
type RegisterData = typeof RegisterData

const SingUpBtns = ({ i18nPath, baseBtnsPath }: BtnsProps) => {
    const { t, i18n } = useTranslation( [i18nPath] )
    const step = useSelector( ( state: State ) => state.singUp.step)

    const data: RegisterData = useSelector( ( state: State ) => (
        {
            sphereDef: state.auth.profValue,
            direction: state.auth.whoIs[0],
            email: state.auth.email,
            password: state.auth.password,
        }
    ))

    const  isValid = useSelector( ( state: State ) => state.singUp.isValid )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNext = async () => {
        dispatch( onIsClicked() )

        switch ( step ) {
            case 0: {
                if( data.sphereDef ) {
                    dispatch( nextStep() )
                }
                break
            }
            case 1: {
                if( data.direction ) {
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
                if( isValid ) {
                    navigate( RouterPathes.Login )
                    dispatch(resetData())
                } else {
                    dispatch(resetStep())
                }
                break
            }
        }
    }


    const handlePrev = () => {
        switch ( step ) {
            case 0: {
                navigate( RouterPathes.Info )
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
                    {
                        isValid
                            ?
                            t( `${baseBtnsPath}.next` )
                            :
                            t( `${baseBtnsPath}.error` )
                    }
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