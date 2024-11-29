import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import DocsContent from '@/components/Docs/'

import type { State } from '@/types/redux'

type State = typeof State


const DocPage = () => {
    const i18nPath = 'docs'
    const titlePath = `${i18nPath}:title`

    const navigate = useNavigate()

    const { t } = useTranslation([ i18nPath ])
    const accessToken = useSelector( (state: State) => state.auth.accessToken )

    useEffect(
        () => {
            if( !accessToken ) {
                navigate( RouterPathes.Login )
            }
        }, 
        [accessToken]
    )

    document.title = t(`${titlePath}`)
    return (
        <>
            <div className="docs-page">
                <DocsContent  t={t} i18nPath={i18nPath} />
            </div>
        </>
    )
}

export default DocPage