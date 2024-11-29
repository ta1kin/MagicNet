import { ReactElement } from 'react'


export interface InfoProps {
    t: Function
    basePath: string
}

export interface DescriptionListItem {
    title: string
    description: string
    svgName: string
}

export interface ImgObject {
    [key: string]: ReactElement
}