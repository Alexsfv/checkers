export type AllActionsCreators<A> = A extends { [key: string]: infer U } ? U : never

export type Roles = 'user' | 'admin'