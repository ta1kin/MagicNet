import { useSelector } from 'react-redux'

import type { State } from '@/types/redux'
import type { HomeState } from '@/types/redux/interfaces/home'
import type { BaseProps } from '@/types/types.components'

type State = typeof State
type HomeState = typeof HomeState
type BaseProps = typeof BaseProps


const HomePersonal = ({ t, baseTextPath }: BaseProps) => {
    const personalInfo: HomeState = useSelector( (state: State) => state.home.personalInfo )
    const keyList = Object.keys( personalInfo )

    return (
        <>
            <div className="personal__content flex flex-col gap-[20px]">
                {
                    keyList.map(
                        (key, index) => (
                            <div key={index}>
                                <h3 className="description">{t(`${baseTextPath}.${key}`)}</h3>
                                <h4 className="ml-10 max-md:ml-5">{personalInfo[ key ]}</h4>
                            </div>
                        )
                    )
                }
            </div>
        </>
    )
}

export default HomePersonal