import client from "./client";
import type { Response } from "./client";

export interface LoginResponse {
    profile : ProfileRes
    token: string
    exp: number
}

export interface ProfileRes {
    id: string
    name: string
    email: string
    imageURL: string
    description: string
    calendar_id: string
}

export function login(email: string, password: string) {
    return client.post<LoginResponse>('/auth/login', { email: email, password: password })
}

export function fetchProfile(token: string) {
    return client.get<Response<ProfileRes>>('/auth/profile', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}