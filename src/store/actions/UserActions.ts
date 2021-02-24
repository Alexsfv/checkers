import { AllActionsCreators } from './../../types/redux';
import { UserInfoResp } from './../../types/responseTypes';
import { USER_INITIAL, USER_LOGOUT } from './actionTypes';


export const userActions = {
    initial(payload: UserInfoResp) {
        return {
            type: USER_INITIAL,
            payload
        } as const
    },
    logout() {
        return {
            type: USER_LOGOUT
        } as const
    },
}

export type AllUserActions = ReturnType<AllActionsCreators<typeof userActions>>