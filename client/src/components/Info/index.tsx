import { useTranslation } from 'react-i18next'

import InfoHeader from './InfoHeader'
import InfoDescription from './InfoDescription'


const InfoContent = () => {
    const i18nPath = 'info'
    const baseHeaderPath = `${i18nPath}:header`
    const baseDescriptionPath = `${i18nPath}:description`

    const { t } = useTranslation([ i18nPath ])

    return (
        <>
            <main className="info__content box w-full flex flex-col gap-[40px]">
                <InfoHeader t={t} basePath={baseHeaderPath} />
                <InfoDescription t={t} basePath={baseDescriptionPath} />
            </main>
        </>
    )
}

export default InfoContent