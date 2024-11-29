import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import HomeContent from '@/components/Home/'

import type { State } from '@/types/redux'

type State = typeof State


const HomePage = () => {
    const i18nPath = 'home'
    const titlePath = `${i18nPath}:title`

    const { t } = useTranslation([ 'home' ])

    const navigate = useNavigate()

    const accessToken = useSelector( (state: State) => state.auth.accessToken )

    useEffect(
        () => {
            if( !accessToken ) {
                navigate( RouterPathes.Login )
            }
        }, 
        [accessToken]
    )

    document.title = t(titlePath)
    return (
        <>
            <div  className="home-page">
                <HomeContent t={t} i18nPath={i18nPath} />
            </div>
        </>
    )
}

export default HomePage