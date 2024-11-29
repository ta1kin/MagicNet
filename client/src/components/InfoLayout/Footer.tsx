import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SourcesLinks } from '@/config/config.router'

import HatSvg from '@/assets/icons/Hat.svg'
import GitSvg from '@/assets/icons/git.svg'
import VkSvg from '@/assets/icons/vk.svg'
import TgSvg from '@/assets/icons/telegram.svg'


const InfoFooter = () => {
    const i18nPath = 'infoLayout'
    const baseHeadPath = `${i18nPath}:footer`
    const { t } = useTranslation([ i18nPath ])

    return (
        <>
            <footer className="info-layout__footer box pt-[15px]">
                <div className="w-full flex flex-wrap flex-row sm:justify-between justify-center gap-[40px]">
                    <div  className="flex flex-row items-center gap-[15px]">
                        <img src={ HatSvg } alt="hat-logo" />
                        <h2 className="sub-headline">{ t(`${baseHeadPath}.title`) }</h2>
                    </div>
                    <div>
                        <h2 className="description">{ t(`${baseHeadPath}.navTitle`) }</h2>
                        <nav className="flex items-center mt-[10px] flex justify-center gap-[20px]">
                            <Link  to={ SourcesLinks.Vk } target="_blank" title="VK">
                                <button>
                                    <img src={VkSvg} alt="vk-logo" className="btn" />
                                </button>
                            </Link>
                            <Link to={ SourcesLinks.Git } target="_blank" title="Git Hub">
                                <button>
                                    <img src={GitSvg} alt="git-logo" className="btn" />
                                </button>
                            </Link>
                            <Link to={ SourcesLinks.Tg } target="_blank" title="Telegram">
                                <button>
                                    <img src={TgSvg} alt="tg-logo" className="btn" />
                                </button>
                            </Link>
                        </nav>
                    </div>
                </div>
                <div className="w-full h-[40px] mt-[20px] mb-[20px] flex justify-center">
                    <p className="description">
                        © { t(`${baseHeadPath}.description`) }
                    </p>
                </div>
            </footer>
        </>
    )
}

export default InfoFooter