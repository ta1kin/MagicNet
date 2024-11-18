import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import type { HeaderProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type HeaderProps = typeof HeaderProps
type State = typeof State

const RecoveryHeader = ({ i18nPath, baseHeaderPath, step }: HeaderProps) => {
    const { t, i18n } = useTranslation([i18nPath])

    const email = useSelector( (state: State) => state.auth.email )

    return (
        <>
            <div className="header__content">
                <h2 className="title email">
                    { t( `${baseHeaderPath}.${step}.title`, { email: email } ) }
                </h2>
                {   
                    i18n.exists( `${baseHeaderPath}.${step}.description` )
                        &&
                        <p className="description">{ t( `${baseHeaderPath}.${step}.description` ) }</p>
                }
            </div>
        </>
    )
}

export default RecoveryHeader