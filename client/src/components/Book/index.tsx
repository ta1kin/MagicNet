import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDocAsync } from '@/store/slices/docsSlice'
import { Viewer, Worker } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'

import { Base64 } from 'js-base64'

import type { State } from '@/types/redux'
import type { BookProps } from '@/types/types.home'

type BookProps = typeof BookProps
type State = typeof State


const BookContent = ({ bookId }: BookProps) => {
    const dispatch = useDispatch()
    let [pdfBase64, setPdfBase64] = useState<string>()

    const accessToken = useSelector((state: State) => state.auth.accessToken)

    const loadPdf = async () => {
            const content = await dispatch(getDocAsync({ bookId, accessToken }))
            const u8s = new Uint8Array( content.payload.data.data )
            const ret = Base64.fromUint8Array(u8s)
            setPdfBase64( ret )
    }

    useEffect(() => {
        loadPdf()
    }, [])


    return (
        <>
            <div className="book-page__content box">
                <div className="w-full flex justify-center items-center">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={`data:application/pdf;base64,${pdfBase64}`} />
                    </Worker>
                </div>
            </div>
        </>
    )
}

export default BookContent
