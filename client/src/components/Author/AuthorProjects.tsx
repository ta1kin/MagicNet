import { Link } from 'react-router-dom'

import PointSvg from '@/assets/icons/point.svg'

import type { AuthorProps, ProjectsListItem } from '@/types/types.author'

type AuthorProps = typeof AuthorProps
type ProjectsListItem = typeof ProjectsListItem


const AuthorProjects = ({ t, basePath }: AuthorProps) => {
    const itemsList: ProjectsListItem[] = t(`${basePath}.items`, { returnObjects: true })

    return (
        <>
            <div className="content__projects">
                <h2 className="min-headline">{ t(`${basePath}.title`) }</h2>
                <div className="block__items mt-[15px]">
                    <ul>
                        {
                            itemsList.map(
                                (item, index) => (
                                    <li key={index} className="flex flex-row items-start gap-[5px]">
                                        <img src={PointSvg} alt="point-svg" />
                                        <div>
                                            <p className="description">{ item.headline }</p>
                                            <Link  className="paragraph" to={item.link}>{item.link}</Link>
                                        </div>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AuthorProjects