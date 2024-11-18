import { useSelector } from 'react-redux'

import Loader from '@/components/UI/Loader'
import RecoveryHeader from './Header'
import RecoveryBody from './Body'
import RecoveryBtns from './Btns'

import type { State } from '@/types/redux'


type State = typeof State

const RecoveryPass = () => {
    const loaderColor = 'var(--auth-loader-color)'
    const i18nPath = 'recoveryPass'
    
    const baseHeaderPath = `${i18nPath}:header`
    const baseBodyPath = `${i18nPath}:body`
    const baseBtnsPath = `${i18nPath}:btns`

    const {step, isLoading} = useSelector( ( state: State ) => ({
        step: state.recoveryPass.step,
        isLoading: state.recoveryPass.isLoading
    }) )

    return (
        <>
            <div className="recovery-pass__conteiner w-full flex items-center">
                {
                    isLoading
                        ?
                        <div className="flex w-full justify-center">
                            <Loader color={loaderColor} />
                        </div>
                        :
                        <div className="w-full flex flex-col gap-[15px]">
                            <div className="conteiner__header w-full">
                                <RecoveryHeader i18nPath={ i18nPath } baseHeaderPath={ baseHeaderPath } step={step} />
                            </div>
                            <div className="conteiner__body w-full">
                                <RecoveryBody i18nPath={ i18nPath } baseBodyPath={ baseBodyPath } />
                            </div>
                            <div className="conteiner__btns w-full">
                                <RecoveryBtns i18nPath={ i18nPath } baseBtnsPath={ baseBtnsPath } />
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default RecoveryPass