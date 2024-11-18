import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocation  } from 'react-router-dom'

import { RouterPathes } from '@/config/config.router'
import type { State } from '@/types/redux'

import Hat from '@/assets/icons/Hat.svg'


type State = typeof State

const Instruction = () => {
    const { t } = useTranslation([ 'auth' ])
    const state = useSelector( ( state: State ) => state.singUp )
    const location  = useLocation ()

    return (
        <>
            <div className="instruction component-block">
                <div className="instraction__main">
                    <img src={ Hat } alt="hat-logo" />
                    <h2 className="title">{ t('auth:instruction.main_text') }</h2>
                    <p className="description">{ t('auth:instruction.sub_text') }</p>
                </div>
                {
                    location.pathname === RouterPathes.Register
                            ?
                        <div className="instruction__description">
                            {    
                                state.step === state.maxStep
                                    ?
                                <h2 className="title pre-title">
                                    { t('auth:instruction.steps_text.last') }
                                </h2>
                                    :
                                <h2 className="title pre-title">
                                    { 
                                        t('auth:instruction.steps_text.regular')
                                            .replace( '{step_counter}', `${state.maxStep - state.step + 1}` ) 
                                    }
                                </h2>
                            }
                        </div>
                            :
                        null
                }
                
            </div>
        </>
    )
}

export default Instruction