import { MouseEvent, useState } from 'react'
import { resetData } from '@/store/slices/authSlice'
import { deleteAsync, toggleReset, updatePersonalInfo } from '@/store/slices/homeSlice'
import { sendNewPassAsync } from '@/store/slices/recoveryPassSlice'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@mui/material/Button'
import ResetForm from '@/components/HomeLayout/ResetForm'

import type { State } from '@/types/redux'
import type { SettingsBlock, BlockItem, SettingTargetFunc } from '@/types/types.home'
import type { BaseProps } from '@/types/types.components'

type State = typeof State
type BlockItem = typeof BlockItem
type SettingsBlock = typeof SettingsBlock
type SettingTargetFunc = typeof SettingTargetFunc
type BaseProps = typeof BaseProps


const HomeSettings = ({ t, baseTextPath }: BaseProps) => {
    const settingBlocks: SettingsBlock[] = t(`${baseTextPath}.list`, { returnObjects: true })
    
    const dispatch = useDispatch()
    
    const { delErr, isReset, accessToken } = useSelector(
        ( state: State ) => (
            {
                delErr: state.home.delErr,
                isReset: state.home.isReset,
                accessToken: state.auth.accessToken
            }
        )
    )

    const [ content, setContent ] = useState(
        {
            inputText: '',
            btnText: '',
            targetFunc: {} as SettingTargetFunc
        }
    )

    const storeFuncList = [
        [
            {
                key: 'nickname',
                func: updatePersonalInfo
            },
            {
                key: 'name',
                func: updatePersonalInfo
            },
            {
                key: 'phone',
                func: updatePersonalInfo
            },
        ],
        [
            {
                key: 'password',
                func: sendNewPassAsync
            },
        ]
    ]

    const resetSetting = ( inp: string, btn: string, func: SettingTargetFunc ) => {
        setContent(
            {
                inputText: inp,
                btnText: btn,
                targetFunc: func
            }
        )

        dispatch( toggleReset() )
    }

    const deleteProfile = async ( _event: MouseEvent<HTMLButtonElement> ) => {
        await dispatch(deleteAsync(accessToken))
        if( !delErr ) {
            dispatch(resetData())
        }
    }

    return (
        <>  
            {
                isReset
                    &&
                    <ResetForm 
                        inputText={ content.inputText }
                        btnText={ content.btnText }
                        targetFunc={ content.targetFunc }
                    />
            }
            <div className="main__settings w-full h-[100%] flex flex-col gap-[15px]">
                {
                    settingBlocks.map(
                        ( elem, i ) => (
                            <div className="settings__block w-full" key={i} >
                                <h2 className="description  w-full">{ elem.headline }</h2>
                                <ul className="ml-5 flex flex-col gap-[5px] w-full">
                                    {
                                        elem.list.map(
                                            ( item: BlockItem, j: number ) => (
                                                <li key={j} className="w-full">
                                                    <Button 
                                                        className="icon w-[30%] max-md:w-[57%] max-sm:w-full"
                                                        variant="text"
                                                        onClick={
                                                            _event => resetSetting( item.inp, item.btn, storeFuncList[i][j] )
                                                        }
                                                    >
                                                        { item.item }
                                                    </Button>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    )
                }
                <Button 
                    className="btn w-[25%] max-lg:w-[35%] max-md:w-[45%] max-sm:w-full"
                    variant="contained"
                    onClick={deleteProfile}
                >
                    { t(`${baseTextPath}.delete`) }
                </Button>
            </div>
        </>
    )
}

export default HomeSettings
