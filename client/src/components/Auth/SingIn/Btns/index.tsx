import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginAsync, onIsClicked, resetValid } from '@/store/slices/singInSlice'
import { setAccessToken, setRole, resetData } from '@/store/slices/authSlice'
import { setPersonalInfo } from '@/store/slices/homeSlice'
import { setTheme } from '@/store/slices/settingsSlice'
import { RouterPathes } from '@/config/config.router'

import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'
import type{ LoginData } from '@/types/types.auth'

type BtnsProps = typeof BtnsProps
type State = typeof State
type LoginData = typeof LoginData


const SingInBtns = ({ i18nPath, baseBtnsPath }: BtnsProps) => {
    const { t } = useTranslation([ i18nPath ])
    const data: LoginData = useSelector( ( state: State )  => (
        {   
            email: state.auth.email,
            password: state.auth.password
        }
    ))
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNext = async () => {
        dispatch( onIsClicked() )

        if( data.email && data.password ) {
            const { payload } = await dispatch( loginAsync( data ) )

            console.log( payload )

            if( payload ) {
                dispatch(setAccessToken(payload.accessToken))
                dispatch(setRole(payload.role))
                dispatch(setTheme(payload.theme))
                dispatch(
                    setPersonalInfo(
                        {
                            nickname: payload.nickname,
                            name: payload.name,
                            phone: payload.phone,
                        }
                    )
                )
                dispatch(resetValid())
                navigate( RouterPathes.Home )
            }
        }
    }
    const handlePrev = () => {
        navigate( RouterPathes.Register )
        dispatch(resetData())
    }

    return (
        <>
            <div className="btns__content w-full flex flex-col gap-[10px]">
                <Button variant="contained"
                        className="w-full"
                        onClick={handleNext}
                >
                    <p className="flex flex-row items-center mr-[10px]">
                        <ArrowForwardIcon /> 
                        <span className="-translate-y-[1px]">]</span>
                    </p>
                    { t( `${baseBtnsPath}.next` ) }
                </Button>
                <hr />
                <Button variant="outlined"
                        className="w-full"
                        onClick={handlePrev}
                >
                    { t( `${baseBtnsPath}.prev` ) }
                </Button> 
            </div>
        </>
    )
}

export default SingInBtns
    