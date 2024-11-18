import { ChangeEvent } from 'react'
import Checkbox from '@mui/material/Checkbox'

import type { CheckboxProps } from '@/types/types.ui'

type CheckboxProps = typeof CheckboxProps

const CheckBox = ({ checked, onChange, id }: CheckboxProps) => {
    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        if (onChange) {
            onChange( event.target.checked, id )
        }
    }

    return (
        <>
            <Checkbox
                checked={checked}
                onChange={handleChange}
            />
        </>
    )
}

export default CheckBox