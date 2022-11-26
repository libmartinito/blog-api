export type Query = {
    text: string,
    values?: string[],
    rowMode?: string
}
export type User = {
    user_id: number,
    email: string,
    password?: string,
    created_at?: string,
    updated_at?: string
}
