import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import type { HeaderProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type HeaderProps = typeof HeaderProps
type State = typeof State

const SingUpHeader = ( { i18nPath, baseHeaderPath }: HeaderProps ) => {
    const { t, i18n } = useTranslation([ i18nPath ])
    const email = useSelector( ( state: State ) => state.auth.email )

    return (
        <>
            <div className="header__content w-full">
                {
                    i18n.exists( `${baseHeaderPath}.description` )
                        &&
                        <p className="description">
                            { t( `${baseHeaderPath}.description` ) }
                        </p>
                }
                <h2 className="title">{ t( `${baseHeaderPath}.title`, { email: email } ) }</h2>
                {
                    i18n.exists( `${baseHeaderPath}.postTitle` )
                        &&
                        <p className="description">
                            { t( `${baseHeaderPath}.postTitle` ) }
                        </p>
                }
            </div>
        </>
    )
}

export default SingUpHeader
