import { Roles } from "../../types/redux"
import { USER_INITIAL, USER_LOGOUT } from "../actions/actionTypes"
import { AllUserActions } from "../actions/UserActions"

export type UserState = {
    nickName: string
    email: string
    id: string
    roles: Roles[] | null
    image: string
}

const userInitialState: UserState = {
    nickName: '',
    email: '',
    id: '',
    roles: null,
    image: '',
}

export const userReducer = (state = userInitialState, action: AllUserActions): UserState => {
    switch(action.type) {
        case(USER_INITIAL): {
            const { roles, nickName, email, id, image } = action.payload
            return {
                ...state,
                nickName,
                email,
                id,
                roles,
                image
            }
        }
        case(USER_LOGOUT): {
            return {
                ...userInitialState,
                roles: []
            }
        }
        default: { return state }
    }
}