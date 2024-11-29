import { Outlet } from 'react-router-dom'

import InfoHeader from '@/components/InfoLayout/Header'
import InfoFooter from '@/components/InfoLayout/Footer'


const InfoLayout = () => {
    return (
        <>
            <div className="layout info-layout">
                <InfoHeader />
                <div className="info__content w-full flex flex-col gap-[50px]">
                    <Outlet />
                </div>
                <InfoFooter />
            </div>
        </>
    )
}

export default InfoLayout