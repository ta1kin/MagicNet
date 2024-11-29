import { useTranslation } from 'react-i18next'

import SingInContent from '@/components/Auth/SingIn'


const SingInPage = () => {
    const { t } = useTranslation(['singIn'])

    document.title = t( 'singIn:title' )
    return (
        <>
            <div className="sing-in-page">
                <SingInContent />
            </div>
        </>
    )
}

export default SingInPage