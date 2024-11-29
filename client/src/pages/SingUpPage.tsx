import { useTranslation } from 'react-i18next'

import SingUpContent from '@/components/Auth/SingUp'


const SingUpPage = () => {
    const { t } = useTranslation(['singUp'])

    document.title = t( 'singUp:title' )
    return (
        <>
            <div className="sing-up-page">
                <SingUpContent />
            </div>
        </>
    )
}

export default SingUpPage