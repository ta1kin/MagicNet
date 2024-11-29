import { useState, ChangeEvent, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadDocsAsync } from '@/store/slices/docsSlice'

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'

import type { UploadedFile } from '@/types/types.home'
import type { BaseProps } from '@/types/types.components'
import type { State } from '@/types/redux'

type UploadedFile = typeof UploadedFile
type BaseProps = typeof BaseProps
type State = typeof State


const HomeLoad = ({ t, baseTextPath }: BaseProps) => {
    const dispatch = useDispatch()
    const accessToken = useSelector( (state: State) => state.auth.accessToken )
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        const fileArray = Array.from(files)

        const newUploadedFiles = [...uploadedFiles, ...fileArray]
        if( newUploadedFiles.length <= 5 ) {
            setUploadedFiles(newUploadedFiles)
        } else {
            alert( t(`${baseTextPath}.alert`) )
        }
    }

    const handleDeleteFile = (index: number) => {
        const newListUploadedFiles = [ ...uploadedFiles ]
        newListUploadedFiles.splice( index, 1 )
        setUploadedFiles([ ...newListUploadedFiles ])
    }
    const handleSaveFiles = async (_event: MouseEvent<HTMLButtonElement>) => {
        await dispatch(
            loadDocsAsync(
                {
                    accessToken: accessToken,
                    files: uploadedFiles
                }
            )
        )
        setUploadedFiles( [] )
    }

    return (
        <>
            <div className="main__load flex flex-row">
                <main className="load__body w-[70%] max-md:w-full">
                    <input
                        type="file"
                        multiple
                        accept=".pdf"
                        max-files="3"
                        onChange={handleFileUpload}
                    />
                    <div className="w-full h-[100%] flex flex-row justify-center items-center gap-[10px]">
                        <PictureAsPdfIcon />
                        <h2 className="description">{ t(`${baseTextPath}.input`) }</h2>
                    </div>
                </main>
                {
                    Boolean( uploadedFiles.length )
                        &&
                        <aside className="load__files flex flex-col gap-[20px]">
                            <div className="w-full flex flex-col gap-[10px]">
                                {
                                    uploadedFiles.map(
                                        (file, index) => (
                                            <div className="files__item flex flex-row justify-between" key={index}>
                                                <p className="file__name">{ file.name }</p>
                                                <Button 
                                                    className="icon" 
                                                    variant="text"
                                                    onClick={_event => handleDeleteFile(index)}
                                                >
                                                    <CloseIcon /> 
                                                </Button>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            {
                                Boolean( uploadedFiles.length )
                                    &&
                                    <Button 
                                        className="btn w-full"
                                        title="сохранить"
                                        variant="contained"
                                        onClick={handleSaveFiles}
                                    >
                                        { t(`${baseTextPath}.save`) }
                                        <SaveIcon className="ml-2" /> 
                                    </Button>
                            }
                        </aside>
                }
            </div>
        </>
    )
}

export default HomeLoad
