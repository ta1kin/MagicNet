import PointSvg from '@/assets/icons/point.svg'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import type { AuthorProps, AuthorScills } from '@/types/types.author'

type AuthorProps = typeof AuthorProps
type AuthorScills = typeof AuthorScills


const AuthorExperience = ({ t, basePath }: AuthorProps) => {
    const itemsList: AuthorScills[] = t(`${basePath}.skills`, { returnObjects: true })

    return (
        <>
            <div className="content__experience">
                <h2 className="min-headline">{ t(`${basePath}.title`) }</h2>
                <div className="block__items mt-[15px]">
                    <ul>
                        {
                            itemsList.map(
                                (block, index) => (
                                    <li key={index} className="mt-[15px] flex flex-col items-start gap-[5px]">
                                        <div className="flex flex-row items-center gap-[5px]">
                                            <img src={PointSvg} alt="point-svg" />
                                            <h2 className="description">{ block.title }:</h2>
                                        </div>
                                        <dl className="ms:ml-[100px] ml-[50px]">
                                            {
                                                block.items.map(
                                                    (elem: string, ind: number) => (
                                                        <div key={ind} className="flex flex-row gap-2">
                                                            <ArrowRightIcon />
                                                            <li className="description">{ elem }</li>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </dl>
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

export default AuthorExperience