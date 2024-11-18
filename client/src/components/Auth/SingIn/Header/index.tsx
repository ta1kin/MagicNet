import { useTranslation } from 'react-i18next'

import type { HeaderProps } from '@/types/types.auth'

type HeaderProps = typeof HeaderProps


const SingInHeader = ( { i18nPath, baseHeaderPath }: HeaderProps ) => {
    const { t } = useTranslation([i18nPath])

    return (
        <>
            <div className="header__content">
                <h2 className="title">{ t( `${baseHeaderPath}.title` ) }</h2>
                <p className="description">{ t( `${baseHeaderPath}.description` ) }</p>
            </div>
        </>
    )
}

export default SingInHeader
