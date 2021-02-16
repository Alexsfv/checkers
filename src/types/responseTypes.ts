export type UniqueEmailResponse = {
    isUniqueEmail: boolean
}

export type User = {
    email: string
    nickName: string
    password: string
    __v: number
    _id: string
}

export type LoginResponse = {
    user: User | null
    success: boolean
}