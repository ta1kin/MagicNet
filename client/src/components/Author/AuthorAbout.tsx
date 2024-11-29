import type { AuthorProps } from '@/types/types.author'

type AuthorProps = typeof AuthorProps


const AuthorAbout = ({ t, basePath }: AuthorProps) => {
    return (
        <>
            <div className="content__block">
                <h2 className="min-headline">{ t(`${basePath}.title`) }</h2>
                <div className="block__items mt-[15px]">
                    <p className="paragraph">{ t(`${basePath}.description`) }</p>
                </div>
            </div>
        </>
    )
}

export default AuthorAbout