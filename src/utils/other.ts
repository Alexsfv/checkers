import axios from "axios"
import { CHECK_UNIQUE_EMAIL_URL } from "../config"
import { UniqueEmailResp } from "../types/responseTypes"


export const checkUniqueEmail = async (value: string | undefined) => {
    try {
        const res = await axios.post(CHECK_UNIQUE_EMAIL_URL, { email: value })
        console.log(res)
        const data = res.data as UniqueEmailResp
        if (data) {
            return data.isUnique
        }
        return false
    } catch(e) {
        console.log(e)
        return false
    }
}