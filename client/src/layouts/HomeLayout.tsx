import { Outlet } from 'react-router-dom'

import HomeHeader from '../components/HomeLayout/Header'
import InfoFooter from '../components/InfoLayout/Footer'


const HomeLayout = () => {

    return (
        <>
            <div className="layout home-layout">
                <HomeHeader />
                <Outlet />
                <InfoFooter />
            </div>
        </>
    )
}

export default HomeLayout