import { useTranslation } from 'react-i18next'

import InfoContent from '@/components/Info/'


const InfoPage = () => {
    const { t } = useTranslation([ 'info' ])

    document.title = t('info:title')
    return (
        <>  
            <div className="info-page">
                <InfoContent />
            </div>
        </>
    )
}

export default InfoPage
