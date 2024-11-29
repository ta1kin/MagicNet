import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import type { State } from '@/types/redux'

type State = typeof State


const ErrorContent = () => {
    const { t } = useTranslation([ 'error' ])
    const text = useSelector( ( state: State ) => state.error.text )
    
    return (
        <>
            <pre className="text-1xl">{ text ? text : t( 'error:text' ) }</pre>
        </>
    )
}

export default ErrorContent
