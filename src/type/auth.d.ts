import "next-auth"

declare module "next-auth" {
    interface Profile {
        id: string
        name: string
        email: string
        imageURL: string
        description: string
        calendar_id: string
    }
    interface User {
        token: string;
        exp: string;
        user: Profile;
    }
    interface Session {
        user: User;
        token: string;
        expires: string;
    }
}