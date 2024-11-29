import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import ErrorIcon from '@mui/icons-material/Error'

import type { HeaderProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type HeaderProps = typeof HeaderProps
type State = typeof State

const SingUpHeader = ( { i18nPath, baseHeaderPath }: HeaderProps ) => {
    const { t, i18n } = useTranslation([ i18nPath ])
    const { email, isValid } = useSelector(
        ( state: State ) => (
            {
                email: state.auth.email,
                isValid: state.singUp.isValid
            }
        )
    )

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
                <div className="w-full">
                    {
                        isValid
                            ?
                            <h2 className="title">{ t( `${baseHeaderPath}.title`, { email: email } ) }</h2>
                            :
                            <h2 className="title flex flex-row items-center">
                                <ErrorIcon className="mr-2" />
                                {t( `${baseHeaderPath}.error` )}
                            </h2>
                    }
                </div>
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
