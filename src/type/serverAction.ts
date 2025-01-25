export type ActionError = { error: string }
export type ServerActionError = ActionError | undefined

export type ServerActionMessage = { message : string | null  , error : string | null } | undefined