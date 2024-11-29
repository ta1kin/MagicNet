import { useTranslation } from 'react-i18next'

import AuthorHeader from './AuthorHeader'
import AuthorAbout from './AuthorAbout'
import AuthorExperience from './AuthorExperience'
import AuthorProjects from './AuthorProjects'


const AuthorComponent = () => {
    const i18nPath = 'author'
    const baseTitlePath = `${i18nPath}:header`
    const baseAboutPath = `${i18nPath}:about`
    const baseExperiencePath = `${i18nPath}:experience`
    const baseProjectsePath = `${i18nPath}:projects`

    const { t } = useTranslation([ i18nPath ])

    return (
        <>
            <main className="author__content box w-full">
                <div className="w-full flex flex-col gap-[30px]">
                    <AuthorHeader t={t} basePath={baseTitlePath} />
                    <AuthorAbout t={t} basePath={baseAboutPath} />
                    <AuthorExperience t={t} basePath={baseExperiencePath} />
                    <AuthorProjects t={t} basePath={baseProjectsePath} />
                </div>
            </main>
        </>
    )
}

export default AuthorComponent
