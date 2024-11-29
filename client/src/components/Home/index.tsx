import { ReactElement, MouseEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setVariant } from '@/store/slices/homeSlice'
import { resetData } from '@/store/slices/authSlice'
import { RouterPathes } from '@/config/config.router'

import HomePersonal from './HomePersonal'
import HomeSettings from './HomeSettings'
import HomeLoad from './HomeLoad'
import Button from '@mui/material/Button'
import LayersIcon from '@mui/icons-material/Layers';

import type { State } from '@/types/redux'
import type { PageProps } from '@/types/types.components'

type State = typeof State
type PageProps = typeof PageProps


const HomeContent = ({i18nPath, t}: PageProps) => {
    const basePersonalPath = `${i18nPath}:personal`
    const baseSettingsPath = `${i18nPath}:settings`
    const baseLoadPath = `${i18nPath}:load`

    const [ isClosed, setClosed ] = useState(true)
    
    const componentList: ReactElement[] = [
        <HomePersonal t={t} baseTextPath={basePersonalPath} />,
        <HomeSettings t={t} baseTextPath={baseSettingsPath} />,
        <HomeLoad t={t} baseTextPath={baseLoadPath} />,
    ]

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const variant = useSelector( (state: State) => state.home.variant )

    const navList: string[] = t(`${i18nPath}:nav.list`, { returnObjects: true })

    const handleNav = (index: number) => {
        dispatch(setVariant(index))
    }
    const handleExit = (_event: MouseEvent<HTMLButtonElement>) => {
        dispatch(resetData())
        navigate(RouterPathes.Info)
    }
    const handleClickNav = (_event: MouseEvent<HTMLButtonElement>) => {
        setClosed( !isClosed )
    }


    return (
        <>
            <div className="home-page__content w-full flex flex-row">
                <aside className={`content__aside ${isClosed ? 'closed' : ''}`}>
                    <ul className="aside__list">
                        <div className="list__header w-full flex flex-row justify-between max-[550px]:justify-end items-center">
                            <p className="description">{ t(`${i18nPath}:nav.panel`) }</p>
                            <Button className="icon" variant="text" onClick={handleClickNav}>
                                <LayersIcon /> 
                            </Button>
                        </div>
                        <div>
                            {
                                navList.map(
                                    (item: string, index: number) => (
                                        <li className="w-full" key={index}>
                                            <Button className="w-full" variant="text" onClick={_event => handleNav(index)}>
                                                { item }
                                            </Button>
                                        </li>
                                    )
                                )
                            }
                        </div>
                        <li className="list__footer w-full">
                            <Button 
                                className="end w-full"
                                variant="text"
                                onClick={handleExit}
                            >
                                {t(`${i18nPath}:nav.exit`)}  
                            </Button>
                        </li>
                    </ul>
                </aside>
                <main className="content__main w-full">
                    { componentList[variant] }
                </main>
            </div>
        </>
    )
}

export default HomeContent