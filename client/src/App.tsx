import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import type { State } from './types/redux'

import { RouterPathes } from './config/config.router'

import AuthLayout from './layouts/AuthLayout'
import HomeLayout from './layouts/HomeLayout'
import InfoLayout from './layouts/InfoLayout'

import SingInPage from './pages/SingInPage'
import SingUpPage from './pages/SingUpPage'
import NotFoundPage from './pages/NotFoundPage'
import InfoPage from './pages/InfoPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import DocsPage from './pages/DocsPage'
import BookPage from './pages/BookPage'
import AuthorPage from './pages/AuthorPage'
import RecoveryPassPage from './pages/RecoveryPassPage'


const App = () => {
    const theme = useSelector( ( state: State )  => state.settings.theme )

    return (
        <div className="wrapper" id={ theme }>
            <Routes>
                <Route element={  <InfoLayout />} >
                    <Route path={ RouterPathes.Info } element={<InfoPage />} />
                    <Route path={ RouterPathes.Author } element={<AuthorPage />} />
                </Route>

                <Route element={ <AuthLayout /> }>
                    <Route path={ RouterPathes.Login } element={ <SingInPage /> } />
                    <Route path={ RouterPathes.Register } element={ <SingUpPage /> } />
                    <Route path={ RouterPathes.Recovery } element={ < RecoveryPassPage /> } />
                </Route>

                <Route element={ <HomeLayout /> }>
                    <Route path={ RouterPathes.Home } element={ <HomePage /> } />
                    <Route path={ RouterPathes.Docs } element={ <DocsPage /> } />
                    <Route path={ RouterPathes.Book + '/:id' } element={ <BookPage /> } />
                </Route>
  
                <Route path={ RouterPathes.Error } element={ <ErrorPage /> } />
                <Route path={ RouterPathes.NotFound } element={ <NotFoundPage /> } />
            </Routes>
        </div>
    )
}

export default App