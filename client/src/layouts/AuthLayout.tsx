import { Outlet } from 'react-router-dom'

import Instruction from '@/components/Auth/Instruction'


const AuthLayout = () => {
    return (
        <>  
            <div className="layout auth-layout box">
                <div className="auth__content flex flex-col gap-[15px]">
                    <Instruction />
                    <div className="component-block">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout