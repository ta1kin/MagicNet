import type { InfoProps } from '@/types/types.info'

type InfoProps = typeof InfoProps

const InfoHeader = ({ t, basePath }: InfoProps) => {
    return (
        <div className="content__header w-full flex flex-col items-center gap-[10px]">
            <h2 className="headline">{ t(`${basePath}.title`) }</h2>
            <p className="sub-headline">{ t(`${basePath}.description`) }</p>
        </div>
    )
}

export default InfoHeader