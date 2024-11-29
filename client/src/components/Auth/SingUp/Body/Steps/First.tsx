import { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProfession, setProfValue } from '@/store/slices/authSlice'
import { professionConfig } from '@/config/config.auth'
import { Link } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import Radio from '@mui/material/Radio'
import Box from '@mui/material/Box'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const FirsStep = ({ t, stepPath }: RecoveryStepProps) => {
    const profession = useSelector((state: State) => state.auth.profession)
    const dispatch = useDispatch()

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newProf = event.target.value
        dispatch(setProfession(newProf))
        dispatch(setProfValue(t(`${stepPath}.${newProf}`)))
    }

    return (
        <>  
            <Box className="Translate">
                <FormControl className="form-control">
                    <RadioGroup
                        className="flex flex-col gap-[10px] ml-[10px]"
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={profession}
                        name="radio-buttons-group"
                        onChange={handleRadioChange}
                    >   
                        {
                            professionConfig.map(
                                (item: string, index: number) => (
                                    <FormControlLabel
                                        key={index}
                                        value={item}
                                        label={t(`${stepPath}.radioList.${index}`)}
                                        control={
                                            <Radio />
                                        }  
                                    />
                                )
                            )
                        }
                    </RadioGroup>
                </FormControl>
                <div className="mt-2 w-full flex justify-end">
                    <Link to={RouterPathes.Login}>{ t(`${stepPath}.link`) }</Link>
                </div>
            </Box>
        </>
    )
}

export default FirsStep
