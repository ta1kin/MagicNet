import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import Button from '@mui/material/Button'
import ThemeAndLang from '@/components/UI/ThemeAndLang'

import ManSvg from '@/assets/icons/Man.svg'

import type { State } from '@/types/redux'
import type { HeaderRouting } from '@/types/types.home'

type State = typeof State
type HeaderRouting = typeof HeaderRouting


const HomeHeader = () => {
    const i18nPath = 'homeLayout'
    const baseHeadPath = `${i18nPath}:header`
    const { t } = useTranslation([ i18nPath ])
    const location = useLocation()

    const regex = /\/(\d+)/
    const modifyLocation = location.pathname.replace(regex, '/:id')

    let locationObject: HeaderRouting = {}

    locationObject[ RouterPathes.Home ] = { to: RouterPathes.Docs, text: t(`${baseHeadPath}.toDocs`) }
    locationObject[ RouterPathes.Docs ] = { to: RouterPathes.Home, text: t(`${baseHeadPath}.toProfile`) }
    locationObject[ RouterPathes.Book ] = { to:RouterPathes.Docs, text: t(`${baseHeadPath}.toDocs`)}

    const toItem = locationObject[ modifyLocation ]

    const email = useSelector( ( state: State ) => state.auth.email )

    return (
        <>
            <div className="home-layout__header box">
                <div className="w-full flex flex-row flex-wrap justify-between max-lg:justify-center items-center gap-5">
                    <div className="flex flex-row items-center gap-4">
                        <img className="person-img" src={ManSvg} alt="" />
                        <h2 className="description">{email}xcdfbdfnfndfgndfndfn</h2>
                    </div>
                    <div className="flex flex-row max-[480px]:flex-col items-center gap-10">
                        <ThemeAndLang />
                        <Link to={toItem.to} className="w-[220px] max-[480px]:260px">
                            <Button variant="contained" className="btn w-full">
                                { toItem.text }
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeHeader
