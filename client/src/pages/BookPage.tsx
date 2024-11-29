import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RouterPathes } from '@/config/config.router'

import BookContent from '@/components/Book/'

import type { State } from '@/types/redux'

type State = typeof State


const BookPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const bookId = params.id

    const { t } = useTranslation([ 'book' ])  
    const accessToken = useSelector( (state: State) => state.auth.accessToken )

    useEffect(
        () => {
            if( !accessToken ) {
                navigate( RouterPathes.Login )
            }
        }, 
        [accessToken]
    )

    document.title = t([ 'book:title' ])
    return (
        <>
            <div className="book-page">
                <BookContent bookId={ bookId } />
            </div>
        </>
    )
}

export default BookPage