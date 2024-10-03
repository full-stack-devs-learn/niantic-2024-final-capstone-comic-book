export class LoginCredentials
{
    username!: string
    password!: string
}

export class Registration extends LoginCredentials
{
    confirmPassword!: string
    role: string = 'USER'
}