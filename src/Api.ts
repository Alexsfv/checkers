import { getCookie } from './utils/cookie';
import { LoginResp, UserInfoResp, Tokens } from './types/responseTypes';
import { LOGIN_URL, USER_INFO_URL, AccessTokenName, TOKEN_REFRESH_URL, RefreshTokenName, LOGOUT_URL } from './config';
import axios from 'axios';
import { LoginFormValues } from './types/requestTypes';


export const Api = {

    async login(data: LoginFormValues) {
        try {
            const res = await axios.post(LOGIN_URL, data)
            return res.data as LoginResp
        } catch(e) {
            console.log(e)
        }
    },
    async userInfo() {
        try {
            const option = {headers: {'Authorization': `${getCookie(AccessTokenName) || ''}`}}
            const res = await axios.get(USER_INFO_URL, option)
            return res.data as UserInfoResp | string
        } catch(e) {
            console.log(e)
        }
    },
    async updateTokens(refreshToken: string) {
        try {
            const option = {headers: {'Authorization': refreshToken}}
            const res = await axios.get(TOKEN_REFRESH_URL, option)
            return res.data as Tokens
        } catch(e) {
            console.log(e)
            return null
        }
    },
    async logout() {
        try {
            const data = { refresh_token: getCookie(RefreshTokenName) }
            await axios.post(LOGOUT_URL, data)
        } catch(e) {
            console.log(e)
        }
    }
}