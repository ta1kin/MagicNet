import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation  } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import HatSvg from '@/assets/icons/Hat.svg'
import DraftSvg from '@/assets/icons/Draft.svg'
import ThemeAndLang from '@/components/UI/ThemeAndLang'


const InfoHeader = () => {
    const i18nPath = 'infoLayout'
    const baseHeadPath = `${i18nPath}:header`
    const { t } = useTranslation([ i18nPath ])
    const location= useLocation ()

    const [ link, setLink ] = useState(
        location.pathname === RouterPathes.Info ? 'first' : 'second'
    )

    const handleFirstLink = () => setLink('first')
    const handleSecondLink = () => setLink('second')

    return (
        <>
            <header className="info-layout__header box">
                <div className="w-full mt-[10px] mb-[10px]">
                    <div className="w-full flex flex-wrap flex-row justify-between max-md:justify-center gap-[40px]">
                        <div className="flex flex-row items-center">
                            <div>
                                <Link to={ RouterPathes.Info }>
                                    <img src={ HatSvg } alt="hat-logo" />
                                </Link>
                            </div>
                            <div className="ml-[10px] flex flex-col">
                                <h2 className="sub-headline">{ t(`${baseHeadPath}.logo.title`) }</h2>
                                <p className="description">{ t(`${baseHeadPath}.logo.description`) }</p>
                            </div>
                        </div>
                        <ThemeAndLang />
                        <nav className=" flex flex-row items-center gap-[30px]">
                            <Link 
                                to={ RouterPathes.Info }
                                className={`nav__link ${link === 'first' ? 'is-active' : '' }`}
                                onClick={handleFirstLink}
                            >
                                { t('info:title') }
                            </Link>
                            <Link 
                                to={ RouterPathes.Author }
                                className={`nav__link ${link === 'second' ? 'is-active' : '' }`}
                                onClick={handleSecondLink}
                            >
                                { t('author:title') }
                            </Link>
                        </nav>
                    </div>
                    <div className="w-full mt-[40px] flex flex-row justify-between  max-md:justify-center">
                        <div className="w-[50%] max-md:w-full flex flex-col justify-center items-start gap-[20px]">
                            <h2 className="headline w-[80%] max-md:w-full">{ t(`${baseHeadPath}.text.headline`) }</h2>
                            <p className="paragraph max-md:w-full">{ t(`${baseHeadPath}.text.paragraph`) }</p>
                            <Link to={ RouterPathes.Register  } className="w-full">
                                <button className="btn w-[70%] max-md:w-full">{ t(`${baseHeadPath}.text.button`) }</button>
                            </Link>
                        </div>
                        <div className="bottom__img w-[50%] flex flex-col justify-center items-end max-lg:w-[30%] max-md:hidden">
                            <img src={ DraftSvg } alt="draft-info-header" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default InfoHeader