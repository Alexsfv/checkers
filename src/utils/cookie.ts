import { AccessTokenName, RefreshTokenName } from './../config';
import { LoginResp, Tokens } from './../types/responseTypes';

export const updateCookieTokens = (tokens: Tokens) => {
    const access_exp = Math.floor((tokens.exp_access - Date.now()) / 1000)
    const refresh_exp = Math.floor((tokens.exp_refresh - Date.now()) / 1000)
    setCookie(AccessTokenName, tokens.access_token, access_exp)
    setCookie(RefreshTokenName, tokens.refresh_token, refresh_exp)
}

export const getCookie = (cookieName: string): string | null => {
    let result = null
    const cookieArr = document.cookie.split('; ')
    cookieArr.forEach(c => {
        const equalSignIndex = c.indexOf('=')
        const name = c.slice(0, equalSignIndex)
        const value = c.slice(equalSignIndex + 1)
        if (name === cookieName) result = value
    })
    return result
}

export const setCookie = (name: string, value: string, maxAge: number = 86400) => {
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`
}

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=0; max-age=0`
}