import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ruAuthor from './ru/author.json'
import ruDoc from './ru/docs.json'
import ruError from './ru/error.json'
import ruHome from './ru/home.json'
import ruInfo from './ru/info.json'
import ruNotFound from './ru/not-found.json'
import ruSingIn from './ru/sing-in.json'
import ruSingUp from './ru/sing-up.json'
import ruAuth from './ru/auth.json'
import ruRecoveryPass from './ru/recovery-pass.json'
import ruBook from './ru/book.json'
import ruInfoLayout from './ru/info-layout.json'
import ruHomeLayout from './ru/home-layout.json'

import enAuthor from './en/author.json'
import enDoc from './en/docs.json'
import enError from './en/error.json'
import enHome from './en/home.json'
import enInfo from './en/info.json'
import enNotFound from './en/not-found.json'
import enSingIn from './en/sing-in.json'
import enSingUp from './en/sing-up.json'
import enAuth from './en/auth.json'
import enRecoveryPass from './en/recovery-pass.json'
import enBook from './en/book.json'
import enInfoLayout from './en/info-layout.json'
import enHomeLayout from './en/home-layout.json'


const resources = {
    ru: {
        auth: ruAuth,
        author: ruAuthor,
        docs: ruDoc,
        error: ruError,
        home: ruHome,
        homeLayout: ruHomeLayout,
        info: ruInfo,
        infoLayout: ruInfoLayout,
        notFound: ruNotFound,
        singIn: ruSingIn,
        singUp: ruSingUp,
        recoveryPass: ruRecoveryPass,
        book: ruBook
    },
    en: {
        auth: enAuth,
        author: enAuthor,
        docs: enDoc,
        error: enError,
        home: enHome,
        homeLayout: enHomeLayout,
        info: enInfo,
        infoLayout: enInfoLayout,
        notFound: enNotFound,
        singIn: enSingIn,
        singUp: enSingUp,
        recoveryPass: enRecoveryPass,
        book: enBook
    }
}

i18n
    .use( initReactI18next )
    .init({
        resources,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n