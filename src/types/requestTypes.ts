export type RegisterFormValues = {
    email: string
    password: string
    nickName: string
}

export interface RegisterFormData extends RegisterFormValues {
    image: string
}

export type LoginFormValues = {
    email: string
    password: string
}

// global chat
export type CreateGloballMessage = {
    userId: string,
    text: string,
    created_at: number
}
//