import type { AuthorProps } from '@/types/types.author'

type AuthorProps = typeof AuthorProps


const AuthorHeader = ({ t, basePath }: AuthorProps) => {
    return (
        <>
            <div className="content__header w-full flex flex-col items-center gap-[10px]">
                <h2 className="headline">{ t(`${basePath}.title`) }</h2>
                <p className="sub-headline">{ t(`${basePath}.description`) }</p>
            </div>
        </>
    )
}

export default AuthorHeader
