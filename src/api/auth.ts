import client from "./client";
import type { Response } from "./client";

export interface LoginResponse {
    user : User
    access_token: string
    expires_at: number
}

export interface User {
    id: string
    name: string
    email: string
    image: string
}

export interface Profile {
    id: string
    name: string
    email: string
    imageURL: string
    description : string
    calendar_id : string
}

export function login(email: string, password: string) {
    return client.post<LoginResponse>('/auth/login', { email: email, password: password })
}

export function signUp(name : string, email : string,password : string ,imageUrl : string,description : string ){
    const payload = { name, email, password, imageUrl, description }
    console.log("payload", JSON.stringify(payload))
    return client.post('/auth/singup', payload, {
        validateStatus : undefined
    })
}

export function fetchProfile(token: string) {
    return client.get<Response<Profile>>('/auth/profile', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}