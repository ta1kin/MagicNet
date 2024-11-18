import { useSelector } from 'react-redux'

import Loader from '@/components/UI/Loader'
import SingUpHeader from './Header'
import SingUpBody from './Body'
import SingUpBtns from './Btns'

import type { State } from '@/types/redux'


type State = typeof State

const SingUp = () => {
    const loaderColor = 'var(--auth-loader-color)'
    const i18nPath = 'singUp'

    const {step, isLoading} = useSelector( ( state: State ) => (
        {
            step: state.singUp.step,
            isLoading: state.singUp.isLoading
        }
    ) )
    
    const baseHeaderPath = `${i18nPath}:header.${step}`
    const baseBodyPath = `${i18nPath}:body.${step}`
    const baseBtnsPath = `${i18nPath}:btns.${step}`

    return (
        <>
            <div className="sing-up__conteiner w-full flex items-center">
                {
                    isLoading
                        ?
                        <div className="flex w-full justify-center">
                            <Loader color={loaderColor} />
                        </div>
                        :
                        <div className="w-full flex flex-col gap-[15px]">
                            <div className="conteiner__header w-full">
                                <SingUpHeader i18nPath={ i18nPath } baseHeaderPath={ baseHeaderPath } />
                            </div>
                            <div className="conteiner__body w-full">
                                <SingUpBody i18nPath={ i18nPath } baseBodyPath={ baseBodyPath } step={step} />
                            </div>
                            <div className="conteiner__btns w-full">
                                <SingUpBtns i18nPath={ i18nPath } baseBtnsPath={ baseBtnsPath } />
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default SingUp