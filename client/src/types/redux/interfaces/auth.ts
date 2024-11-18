export interface AuthState {
    profession: string
    whoIs: [string] | []
    email: string
    password: string
    saveMe: boolean
    accessToken: string
    code: string
}