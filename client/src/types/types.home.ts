interface HeaderRoutingItem{
   to: string,
   text: string
}

export interface HeaderRouting {
    [key: string]: HeaderRoutingItem
}

export interface UploadedFile {
    name: string
    type: string
}

export interface BlockItem {
    inp: string
    btn: string
    item: string
}

export interface SettingsBlock {
    headline: string
    list: BlockItem[]
}

export interface SettingTargetFunc {
    key: string
    func: () => void
}

export interface ResetFormProps {
    inputText: string
    btnText: string
    targetFunc: SettingTargetFunc
}

export interface BookProps {
    bookId: number
}
