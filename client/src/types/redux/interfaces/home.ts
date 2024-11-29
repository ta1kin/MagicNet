export interface PersonalInfoType {
    nickName: string
    fullName: string
    phone: string
}

export interface HomeState {
    variant: number
    personalInfo: PersonalInfoType
    delErr: boolean
    isReset: boolean
}

export interface SettingsPutData {
    key: string
    data: string
    accessToken: string
}
