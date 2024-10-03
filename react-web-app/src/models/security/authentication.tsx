export class User
{
    id?: number;
    username?: string;
    authorities?: Authority[];
}

class Authority
{
    name?: string
}

export class AuthenticatedUser
{
    token?: string
    user?: User
}
