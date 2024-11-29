import { useTranslation } from 'react-i18next'

import FirsStep from './Steps/First'
import SecondStep from './Steps/Second'
import ThirdStep from './Steps/Third'

import type { BodyProps } from '@/types/types.auth'


type BodyProps = typeof BodyProps

const SingUpBody = ({ i18nPath, baseBodyPath, step }: BodyProps) => {
    const { t, i18n } = useTranslation([i18nPath])

    return (
        <>
            {
                i18n.exists(baseBodyPath)
                    &&
                    <div className="body__content">
                        { step === 0 && <FirsStep t={t} stepPath={ `${baseBodyPath}` } />   }
                        { step === 1 && <SecondStep t={t} stepPath={ baseBodyPath } /> }
                        { step === 2 && <ThirdStep t={t} stepPath={ baseBodyPath } />  }
                    </div>   
            }
        </>
    )
}

export default SingUpBody