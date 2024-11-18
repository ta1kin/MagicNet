import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginAsync, onIsClicked } from '@/store/slices/singInSlice'
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
            password: state.auth.password,
            saveMe: state.auth.saveMe
        }
    ))
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNext = async () => {
        dispatch( onIsClicked() )

        if( data.email && data.password ) {
            await dispatch( loginAsync( data ) )
        }
    }
    const handlePrev = () => {
        navigate( RouterPathes.Register )
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
    