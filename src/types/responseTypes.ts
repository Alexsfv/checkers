import { Roles } from './redux';
import { GlobalMessage } from './state';

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
    image: string
}




/// WS

// global message
type GlobalMessagesResp = {
    type: 'all_messages',
    data: GlobalMessage[]
}

type GlobalMessageResp = {
    type: 'added_message',
    data: GlobalMessage
}

export type AllGlobalMessageResp = GlobalMessagesResp | GlobalMessageResp
//