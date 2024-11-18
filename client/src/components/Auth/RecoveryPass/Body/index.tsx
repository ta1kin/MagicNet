import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import FirsStep from './Steps/First'
import SecondStep from './Steps/Second'
import ThirdStep from './Steps/Third'

import type { BodyProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type BodyProps = typeof BodyProps
type State = typeof State

const RecoveryBody = ({ i18nPath, baseBodyPath }: BodyProps) => {
    const { t } = useTranslation([ i18nPath ])
    const step = useSelector( ( state: State ) => state.recoveryPass.step ) 

    return (
        <>
            {
                step !== 3
                    &&
                <div className="body__content">
                    { step === 0 && <FirsStep t={t} stepPath={ baseBodyPath } />   }
                    { step === 1 && <SecondStep t={t} stepPath={ baseBodyPath } /> }
                    { step === 2 && <ThirdStep t={t} stepPath={ `${baseBodyPath}.resetPass` } />  }
                </div>   
            }
        </>
    )
}

export default RecoveryBody
