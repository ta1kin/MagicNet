import { useSelector } from 'react-redux'

import Loader from '@/components/UI/Loader'
import SingInHeader from './Header'
import SingInBody from './Body'
import SingInBtns from './Btns'

import type { State } from '@/types/redux'

type State = typeof State


const SingIn = () => {
    const loaderColor = 'var(--auth-loader-color)'
    const i18nPath = 'singIn'

    const isLoading = useSelector( (state: State) => state.singIn.isLoading )

    const baseHeaderPath = `${i18nPath}:header`
    const baseBodyPath = `${i18nPath}:body`
    const baseBtnsPath = `${i18nPath}:btns`

    return (
        <>
            <div className="sing-in__conteiner w-full flex items-center">
                {
                    isLoading
                        ?
                        <div className="flex w-full justify-center">
                            <Loader color={loaderColor} />
                        </div>
                        :
                        <div className="w-full flex flex-col gap-[15px]">
                            <div className="conteiner__header w-full">
                                <SingInHeader i18nPath={ i18nPath } baseHeaderPath={ baseHeaderPath }  />
                            </div>
                            <div className="conteiner__body w-full">
                                <SingInBody i18nPath={ i18nPath } baseBodyPath={ baseBodyPath } />
                            </div>
                            <div className="conteiner__btns w-full">
                                <SingInBtns i18nPath={ i18nPath } baseBtnsPath={ baseBtnsPath } />
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default SingIn