import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setWhoIs } from '@/store/slices/authSlice'

import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@/components/UI/CheckBox'

import type { State } from '@/types/redux'
import type { RecoveryStepProps, WhoIsLocalType } from '@/types/types.auth'

type State = typeof State
type RecoveryStepProps = typeof RecoveryStepProps
type WhoIsLocalType = typeof WhoIsLocalType


const SecondStep = ({ t, stepPath }: RecoveryStepProps) => {
    const dispatch = useDispatch()
    const profession = useSelector( (state: State) => state.auth.profession )

    const [ whoIsLocal, setWhoIsLocal ] = useState<WhoIsLocalType>(
        {
            first: false,
            second: false,
            third: false,
        }
    )
    const labels = Object.keys( whoIsLocal )

    const handleChange = ( checked: boolean, key: string ) => {
        const newState: WhoIsLocalType = Object({ ...whoIsLocal })
        newState[key] = checked
        
        setWhoIsLocal(newState)

        let whoIsList: string[] | [] = []

        labels.forEach(
            (item, index) => {
                if( newState[ item ] ) {
                    //@ts-ignore
                    whoIsList.push( t( `${stepPath}.${profession}.${index}` ) )
                }
            }
        )

        dispatch( setWhoIs( whoIsList ) )
    }
    
    return (
        <>
            <Box>
                <FormGroup className="checkbox-form">
                    {
                        labels.map( (item, index) => (
                            <FormControlLabel
                                className="noBorder"
                                control={
                                    <Checkbox
                                        id={item}
                                        checked={whoIsLocal[ item ]}
                                        onChange={handleChange}
                                    />
                                }
                                label={t( `${stepPath}.${profession}.${index}` )}
                            />
                        ) )
                    }
                </FormGroup>
            </Box>
        </>
    )
}

export default SecondStep
