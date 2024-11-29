import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { setLng, toggleTheme } from '@/store/slices/settingsSlice'

import FormControlLabel from '@mui/material/FormControlLabel'
import ThemeSwitch from '@/components/UI/ThemeSwitch'

import type { State } from '@/types/redux'

type State = typeof State


const ThemeAndLang = () => {
    const i18nPath = 'homeLayout'
    const baseHeadPath = `${i18nPath}:header`
    const { t, i18n } = useTranslation([ i18nPath ])

    const dispatch =  useDispatch()

    const lng = useSelector( ( state: State ) => state.settings.lng )

    const handleRu = () => {
        dispatch(setLng('ru'))
        i18n.changeLanguage('ru')
    }
    const handleEn = () => {
        dispatch(setLng('en'))
        i18n.changeLanguage('en')
    }

    const handleTheme = () => {
        dispatch(toggleTheme())
    }

    const isRuLng = lng === 'ru'
    const isEnLng = lng === 'en'

    return (
        <>
            <div className="flex flex-row gap-10">
                <FormControlLabel 
                    className="description"
                    control={<ThemeSwitch />} 
                    onClick={handleTheme}
                    label={t(`${baseHeadPath}.theme`)} 
                />
                <div className="flex flex-row items-center gap-2">
                    <span className={ `select-lang ${isRuLng ? 'is-active' : ''}` } onClick={handleRu}>ru</span>
                    <span className={ `select-lang ${isEnLng ? 'is-active' : ''}` } onClick={handleEn}>en</span>
                </div>
            </div>
        </>
    )
}

export default ThemeAndLang
