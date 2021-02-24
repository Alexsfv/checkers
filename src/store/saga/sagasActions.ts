import { AllActionsCreators } from '../../types/redux';
import { SAGA_INITIAL_APP, SAGA_INITIAL_USER, SAGA_LOGOUT } from './sagasTypes';


export const sagasActions = {
    initialApp() {
        return {
            type: SAGA_INITIAL_APP
        } as const
    },
    initialUser() {
        return {
            type: SAGA_INITIAL_USER
        } as const
    },
    logout() {
        return {
            type: SAGA_LOGOUT
        } as const
    }
}


export type AllSagasActions = ReturnType<AllActionsCreators<typeof sagasActions>>