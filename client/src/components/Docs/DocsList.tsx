import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import type { State } from '@/types/redux'
import type { DocsFile } from '@/types/redux/interfaces/docs'
import type { BaseProps } from '@/types/redux/interfaces/docs'

type State = typeof State
type BaseProps = typeof BaseProps
type DocsFile = typeof DocsFile

interface DocsSelectorData {
    files: DocsFile[]
    select: string
    search: string
}

const DocsList = ({t, baseTextPath}: BaseProps) => {
    const { files, select, search }: DocsSelectorData = useSelector( 
        (state: State) => (
            {
                files: state.docs.fileList,
                select: state.docs.select,
                search: state.docs.search,
            }
        )
    )

    let sortedList = [ ...files ]

    if( select )
        sortedList = sortedList.sort((a, b) => b[select] - a[select])

    if( search )
        sortedList = sortedList.filter( item => item.headline.includes( search ) )

    return (
        <>
            <div className="list__block w-full flex flex-col justify-center gap-5">
                {   
                    sortedList.length
                        ?
                        sortedList.map(
                            ( item: DocsFile ) => (
                                <div key={item.id} className="block__card w-full flex justify-between items-center">
                                    <div className=" w-[45%]">
                                        <h2 className="description file__name">{item.headline}</h2>
                                        <div className="card__text flex flex-row items-center gap-2">
                                            <p>{t(`${baseTextPath}.date`)}</p>
                                            <p>{item.formatDate}</p>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div>
                                        <Link to={RouterPathes.Book.replace(':id', item.id )}>
                                            <Button variant="outlined" className="card__btn btn outlined flex justify-between items-center gap-1">
                                                <p>{ t(`${baseTextPath}.btn`) }</p>
                                                <ArrowForwardIcon />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        )
                        :
                        <div className="w-full mt-[40px]">
                            <p className="description text-center">{ t(`${baseTextPath}.void`) }</p>
                        </div>
                }
            </div>
        </>
    )
}

export default DocsList
