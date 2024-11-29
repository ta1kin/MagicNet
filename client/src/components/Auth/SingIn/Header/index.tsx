import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import type { HeaderProps } from '@/types/types.auth'
import type { State } from '@/types/redux'

type HeaderProps = typeof HeaderProps
type State = typeof State


const SingInHeader = ( { i18nPath, baseHeaderPath }: HeaderProps ) => {
    const { t } = useTranslation([ i18nPath ])

    const isValid = useSelector(  ( state: State ) => state.singIn.isValid )

    return (
        <>
            <div className="header__content">
                <h2 className="title">{ t( `${baseHeaderPath}.title` ) }</h2>
                <p className="description">
                    {
                        isValid
                            ?
                            t( `${baseHeaderPath}.description` )
                            :
                            t( `${baseHeaderPath}.error` )
                    }
                </p>
            </div>
        </>
    )
}

export default SingInHeader
