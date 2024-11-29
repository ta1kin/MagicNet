import { useTranslation } from 'react-i18next'

import ErrorContent from '@/components/Error/'


const ErrorPage = () => {
    const { t } = useTranslation([ 'error' ])

    document.title = t('error:title')
    return (
        <>
            <div className="error-page">
                <ErrorContent />
            </div>
        </>
    )
}

export default ErrorPage