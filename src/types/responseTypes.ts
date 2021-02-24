import { Roles } from './redux';

export type Tokens = {
    access_token: string
    refresh_token: string
    exp_access: number
    exp_refresh: number
}

export type UniqueEmailResp = {
    email: string
    isUnique: boolean
}

export type LoginResp = {
    success: boolean
    tokens: Tokens
    message?: string
}

export type UserInfoResp = {
    email: string
    nickName: string
    password: string
    id: string
    roles: Roles[]
}